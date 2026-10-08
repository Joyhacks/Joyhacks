/**
 * Offline playable compositions for this portfolio prototype.
 * Every sound is synthesized locally in the browser, so the demo keeps working
 * without a music API, external audio CDN, or licensed commercial recordings.
 */
export const PREVIEW_SECONDS = 24
const SAMPLE_RATE = 16000
const TAU = Math.PI * 2
const clamp = (n, min, max) => Math.max(min, Math.min(max, n))
const note = (midi) => 440 * Math.pow(2, (midi - 69) / 12)

function hash(text) {
  let h = 2166136261
  for (let i=0; i<text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function oscillator(hz, seconds, instrument) {
  const phase = TAU * hz * seconds
  if (instrument === 0) return Math.sin(phase) + .18 * Math.sin(phase * 2)
  if (instrument === 1) return Math.sin(phase) + .11 * Math.sin(phase * 3) + .06 * Math.sin(phase * 5)
  return .74 * Math.sin(phase) + .15 * Math.sin(phase * 2) + .07 * Math.sin(phase * 4)
}

/** Returns an Object URL containing a real WAV track that <audio> can play. */
export function makeDemoAudio(trackId) {
  const seed = hash(trackId)
  const count = SAMPLE_RATE * PREVIEW_SECONDS
  const bytes = new ArrayBuffer(44 + count * 2)
  const data = new DataView(bytes)
  const put = (at, str) => { for (let i=0; i<str.length; i++) data.setUint8(at + i, str.charCodeAt(i)) }
  put(0, 'RIFF'); data.setUint32(4, 36 + count * 2, true)
  put(8, 'WAVE'); put(12, 'fmt ')
  data.setUint32(16, 16, true); data.setUint16(20, 1, true)
  data.setUint16(22, 1, true); data.setUint32(24, SAMPLE_RATE, true)
  data.setUint32(28, SAMPLE_RATE * 2, true); data.setUint16(32, 2, true)
  data.setUint16(34, 16, true); put(36, 'data'); data.setUint32(40, count * 2, true)

  const root = 43 + (seed % 13)
  const minor = seed % 4 === 0
  const scale = minor ? [0, 3, 7, 10, 12, 15] : [0, 4, 7, 9, 12, 16]
  const pattern = [0, 3, 5, 4, 0, 2, 4, 3]
  const chordChanges = [0, 5, 3, 4]
  const bpm = 84 + seed % 32
  const beatDuration = 60 / bpm
  const instrument = (seed >>> 8) % 3
  const bassRoot = root - 12
  let noise = seed || 1
  for (let i=0; i<count; i++) {
    const t = i / SAMPLE_RATE
    const bar = Math.floor(t / (beatDuration * 4))
    const chord = chordChanges[bar % chordChanges.length]
    const base = root + chord
    const beat = t / beatDuration
    const step = Math.floor(beat * 2)
    const stepTime = (beat * 2 - step) * beatDuration / 2
    const arp = pattern[(step + bar * 3 + (seed % 3)) % pattern.length]

    // Warm drone that ties the melody together.
    let sample = 0
    const bass = note(bassRoot + chord)
    sample += .19 * Math.sin(TAU * bass * t)
    sample += .075 * Math.sin(TAU * bass * 2 * t)
    for (let k=0; k<3; k++) {
      const hz = note(base + scale[[0, 2, 4][k]])
      sample += .055 * (Math.sin(TAU * hz * t + k) + .17 * Math.sin(TAU * hz * 2.01 * t))
    }
    // Short plucked arp. Different seeds produce different instruments and notes.
    const arpHz = note(base + scale[arp])
    const decay = Math.exp(-stepTime * (4.8 + seed % 3))
    sample += .19 * decay * oscillator(arpHz, stepTime, instrument)
    sample += .06 * decay * Math.sin(TAU * arpHz * 2.01 * stepTime)

    // Gentle kick on downbeats, airy noise ticks on the offbeat.
    const onBeat = (beat - Math.floor(beat)) * beatDuration
    if (onBeat < .19 && Math.floor(beat) % 2 === 0) {
      sample += .25 * Math.exp(-onBeat * 24) * Math.sin(TAU * (80 - 35 * onBeat) * onBeat)
    }
    noise ^= noise << 13; noise ^= noise >>> 17; noise ^= noise << 5
    if (Math.floor(beat * 2) % 2 === 1 && stepTime < .05) {
      sample += .022 * (noise / 2147483648) * Math.exp(-stepTime * 60)
    }
    const fade = Math.min(1, t / .45, (PREVIEW_SECONDS - t) / .6)
    const pcm = Math.round(clamp(sample * Math.max(0, fade), -.98, .98) * 32767)
    data.setInt16(44 + i * 2, pcm, true)
  }
  return URL.createObjectURL(new Blob([bytes], {type:'audio/wav'}))
}
