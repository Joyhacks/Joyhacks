import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'

const source=fs.readFileSync(new URL('../lib/demoAudio.js',import.meta.url),'utf8')
const code=source.replace(/export const /g,'const ').replace(/export function /g,'function ')
const buffers=[]
const FakeURL={createObjectURL:blob=>{buffers.push(blob);return `blob:offfreq/${buffers.length}`}}
const {makeDemoAudio,PREVIEW_SECONDS}=vm.runInNewContext(`${code}\n;({makeDemoAudio,PREVIEW_SECONDS})`,{Blob,URL:FakeURL,ArrayBuffer,DataView,Math})

test('preview synthesis returns a valid local WAV recording',async()=>{
  assert.equal(PREVIEW_SECONDS,24)
  assert.equal(makeDemoAudio('almost-morning'),'blob:offfreq/1')
  const b=Buffer.from(await buffers[0].arrayBuffer())
  assert.equal(b.toString('ascii',0,4),'RIFF')
  assert.equal(b.toString('ascii',8,12),'WAVE')
  assert.equal(b.readUInt32LE(24),16000)
  assert.equal(b.readUInt32LE(40),16000*24*2)
  assert.ok(b.some(x=>x!==0))
})

test('different tracks generate different WAV data',async()=>{
  makeDemoAudio('soft-edges')
  const [a,b]=await Promise.all([buffers[0].arrayBuffer(),buffers[1].arrayBuffer()])
  assert.notEqual(Buffer.from(a).subarray(500,1500).toString('hex'),Buffer.from(b).subarray(500,1500).toString('hex'))
})
