import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { tracks, getTrack } from '@/data/catalog'
import { makeDemoAudio, PREVIEW_SECONDS } from '@/lib/demoAudio'

const PlayerContext = createContext(null)

export const formatTime = (n) => {
  if (!Number.isFinite(n) || n < 0) return '0:00'
  return `${Math.floor(n / 60)}:${String(Math.floor(n % 60)).padStart(2,'0')}`
}

export function PlayerProvider({ children }) {
  const audioRef = useRef(null)
  const [currentId, setCurrentId] = useState('almost-morning')
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(PREVIEW_SECONDS)
  const [volume, setVolume] = useState(0.7)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [liked, setLiked] = useState([])
  const [queue, setQueue] = useState(tracks.map(track => track.id))
  const [queueVisible, setQueueVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [ready, setReady] = useState(false)
  const audioIdRef = useRef(null)
  const audioUrlRef = useRef(null)
  const repeatRef = useRef(false)
  const shuffleRef = useRef(false)
  const queueRef = useRef(queue)
  const currentIdRef = useRef(currentId)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('offfreq-liked') || '[]')
      setLiked(Array.isArray(saved) ? [...new Set(saved.filter(id=>Boolean(getTrack(id))))] : [])
    } catch { setLiked([]) }
    setReady(true)
  }, [])
  useEffect(() => { if (ready) { try { localStorage.setItem('offfreq-liked', JSON.stringify(liked)) } catch {} } }, [liked, ready])
  useEffect(() => { repeatRef.current = repeat }, [repeat])
  useEffect(() => { shuffleRef.current = shuffle }, [shuffle])
  useEffect(() => { queueRef.current = queue }, [queue])
  useEffect(() => { currentIdRef.current = currentId }, [currentId])

  const playTrack = useCallback((id, nextQueue) => {
    if (!getTrack(id)) return
    if (Array.isArray(nextQueue) && nextQueue.length) {
      const filtered=nextQueue.filter(item=>Boolean(getTrack(item)))
      if (filtered.length) { queueRef.current=filtered; setQueue(filtered) }
    }
    const audio=audioRef.current
    if (!audio) return
    setMessage('')
    if (audioIdRef.current !== id) {
      try {
        audio.pause()
        if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current)
        const src=makeDemoAudio(id)
        audioUrlRef.current=src
        audioIdRef.current=id
        audio.src=src
        audio.load()
        currentIdRef.current=id
        setCurrentId(id)
        setCurrentTime(0)
        setDuration(PREVIEW_SECONDS)
      } catch {
        setPlaying(false)
        setMessage('Unable to prepare audio on this device.')
        return
      }
    }
    audio.play().then(()=>setPlaying(true)).catch(()=>{
      setPlaying(false)
      setMessage('Unable to play audio on this device.')
    })
  }, [])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (!audio.src) { playTrack(currentIdRef.current); return }
    if (!audio.paused) { audio.pause(); setPlaying(false) }
    else audio.play().then(()=>{setPlaying(true);setMessage('')}).catch(()=>{
      setPlaying(false);setMessage('Unable to play audio on this device.')
    })
  }, [playTrack])

  const advance = useCallback((direction = 1) => {
    const ids = queueRef.current.length ? queueRef.current : tracks.map(track=>track.id)
    const index = ids.indexOf(currentIdRef.current)
    let nextIndex = (index + direction + ids.length) % ids.length
    if (shuffleRef.current && direction === 1 && ids.length > 1) {
      const options = ids.filter(id => id !== currentIdRef.current)
      const picked = options[Math.floor(Math.random()*options.length)]
      playTrack(picked)
      return
    }
    playTrack(ids[nextIndex])
  }, [playTrack])


  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const update = () => setCurrentTime(audio.currentTime)
    const meta = () => { if (Number.isFinite(audio.duration)) setDuration(audio.duration) }
    const end = () => {
      if (repeatRef.current) { audio.currentTime = 0; audio.play().catch(()=>setPlaying(false)) }
      else advance(1)
    }
    const pause = () => setPlaying(false)
    const error = () => { setPlaying(false); setMessage('Could not play this audio preview.') }
    const play = () => setPlaying(true)
    audio.addEventListener('timeupdate', update)
    audio.addEventListener('loadedmetadata', meta)
    audio.addEventListener('ended', end)
    audio.addEventListener('pause', pause)
    audio.addEventListener('error', error)
    audio.addEventListener('play', play)
    return () => {
      audio.removeEventListener('timeupdate', update)
      audio.removeEventListener('loadedmetadata', meta)
      audio.removeEventListener('ended', end)
      audio.removeEventListener('pause', pause)
      audio.removeEventListener('error', error)
      audio.removeEventListener('play', play)
    }
  }, [advance])
  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume }, [volume])
  useEffect(() => () => {
    if (audioRef.current) audioRef.current.pause()
    if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current)
  }, [])

  const seek = (value) => {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(audio.duration)) return
    audio.currentTime = Math.max(0,Math.min(audio.duration,value))
    setCurrentTime(audio.currentTime)
  }
  const toggleLike = id => setLiked(prev => prev.includes(id) ? prev.filter(item=>item!==id) : [...prev,id])
  const currentTrack = getTrack(currentId) || tracks[0]

  return <PlayerContext.Provider value={{ currentTrack, currentId, playing, duration, currentTime, volume, setVolume, repeat, setRepeat, shuffle, setShuffle, liked, toggleLike, playTrack, togglePlay, next:()=>advance(1), previous:()=>{if (audioRef.current?.currentTime > 3) seek(0); else advance(-1)}, seek, queue, queueVisible, setQueueVisible, message, setMessage }}>
    {children}
    <audio ref={audioRef} preload="none" />
  </PlayerContext.Provider>
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) throw new Error('usePlayer must be called inside PlayerProvider')
  return context
}
