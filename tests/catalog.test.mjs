import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync, existsSync} from 'node:fs'
import vm from 'node:vm'

const code=readFileSync(new URL('../data/catalog.js',import.meta.url),'utf8')
const script=code.replace(/export (const|function) /g,'$1 ')
const {tracks,mixes,moods,getTrack,getMix,getMixTracks}=vm.runInNewContext(`${script}\n;({tracks,mixes,moods,getTrack,getMix,getMixTracks})`) 

test('catalog IDs and routes are unique',()=>{
  assert.equal(tracks.length,12)
  assert.equal(mixes.length,4)
  assert.equal(new Set(tracks.map(t=>t.id)).size,tracks.length)
  assert.equal(new Set(mixes.map(m=>m.slug)).size,mixes.length)
  for(const mix of mixes) {
    assert.equal(getMix(mix.slug),mix)
    assert.ok(getMixTracks(mix).length>=1)
    for(const id of mix.trackIds) assert.ok(getTrack(id),id)
  }
})

test('cover artwork exists and playback is self-contained',()=>{
  for(const entry of [...tracks,...mixes]) {
    assert.ok(entry.cover.startsWith('/artwork/'))
    assert.ok(existsSync(new URL('../public'+entry.cover,import.meta.url)),entry.cover)
    assert.ok(!entry.audio,'Music does not require an external audio service')
  }
  assert.ok(moods.includes('All sounds'))
})
