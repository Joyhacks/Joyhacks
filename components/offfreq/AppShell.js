import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import Icon from './Icons'
import { usePlayer, formatTime } from './PlayerProvider'
import { getTrack, mixes } from '@/data/catalog'
import { Artwork, SaveButton } from './MusicUI'

const nav = [
  { href:'/', title:'Discover', icon:'discover' },
  { href:'/search', title:'Search', icon:'search' },
  { href:'/mixes', title:'The mixes', icon:'grid' },
  { href:'/library', title:'Your shelf', icon:'heart' },
]

function Brand({ compact=false }) {
  return <Link href="/" className={`brand ${compact?'brand-small':''}`} aria-label="OFFFREQ home">
    <span className="brand-glyph" aria-hidden="true"><i/><i/><i/><i/></span>
    <span className="brand-word">offfreq<span className="brand-period">.</span></span>
  </Link>
}

function Sidebar({ mobileOpen, closeMenu }) {
  const router = useRouter()
  const { liked }=usePlayer()
  useEffect(()=>closeMenu(),[router.asPath,closeMenu]) // keep mobile drawer in sync with route changes
  return <>
    {mobileOpen && <button className="mobile-backdrop" aria-label="Close menu" onClick={closeMenu}/>}
    <aside className={`sidebar ${mobileOpen?'sidebar-open':''}`}>
      <div className="sidebar-brand"><Brand/><button className="close-mobile-menu" onClick={closeMenu} aria-label="Close navigation"><Icon name="close"/></button><div className="sidebar-brand-caption">GOOD MUSIC. NO SHORTCUTS.</div></div>
      <div className="sidebar-section-label">THE LISTENING ROOM <span>01—04</span></div>
      <nav className="primary-nav" aria-label="Main navigation">
        {nav.map(item => <Link key={item.href} href={item.href} className={`nav-link ${router.pathname===item.href || (item.href==='/mixes'&&router.pathname.startsWith('/mixes/'))?'nav-link-active':''}`}>
          <Icon name={item.icon} size={20}/><span>{item.title}</span>{item.href==='/library'&&liked.length>0&&<span className="nav-count">{liked.length}</span>}
        </Link>)}
      </nav>
      <div className="sidebar-divider"/>
      <div className="sidebar-section-label">ON THE DIAL <span>002</span></div>
      <div className="sidebar-mixes">
        {mixes.slice(0,2).map(mix=><Link href={`/mixes/${mix.slug}`} className="sidebar-mix" key={mix.slug}><Artwork src={mix.cover} alt=""/><span><strong>{mix.title}</strong><small>{mix.type.split(' / ')[0]}</small></span><Icon name="arrow" size={15}/></Link>)}
      </div>
      <div className="sidebar-bottom">
        <Link href="/about" className="sidebar-feature"><span className="feature-cross" aria-hidden="true">✳</span><span className="sidebar-feature-title">LESS SKIPPING.<br/>MORE FEELING.</span><span className="sidebar-feature-bottom">MEET OFFFREQ <Icon name="diagonal" size={16}/></span></Link>
        <div className="sidebar-footer"><span>EST. FOR THE LOVE OF IT</span><span>© 2026 / OF.</span></div>
      </div>
    </aside>
  </>
}

function Topbar({onMenu}) {
  const router=useRouter()
  const pathLabel = router.pathname === '/' ? 'DISCOVER' : router.pathname.startsWith('/mixes/') ? 'MIX / DETAILS' : router.pathname === '/mixes' ? 'MIXTAPES' : router.pathname === '/library' ? 'YOUR SHELF' : router.pathname === '/search' ? 'SEARCH' : 'THE STORY'
  return <header className="topbar">
    <div className="topbar-left"><button className="mobile-menu-button" aria-label="Open navigation" onClick={onMenu}><Icon name="menu"/></button><span className="mobile-logo"><Brand compact/></span><span className="topbar-index">OF. / 001</span><span className="topbar-slash">/</span><span className="topbar-location">{pathLabel}</span></div>
    <div className="topbar-right"><span className="topbar-statement">AN INDEPENDENT CORNER OF THE INTERNET</span><Link href="/about" className="about-link">THE STORY <Icon name="diagonal" size={15}/></Link><span className="topbar-avatar" title="OFFFREQ studio">OF</span></div>
  </header>
}

function PlayerDock() {
  const {currentTrack, playing, togglePlay, next, previous, volume, setVolume, duration, currentTime, seek, repeat, setRepeat, shuffle, setShuffle, queueVisible, setQueueVisible, message, setMessage}=usePlayer()
  return <>
    {message&&<div className="player-notice" role="status">{message}<button aria-label="Dismiss" onClick={()=>setMessage('')}><Icon name="close" size={16}/></button></div>}
    <footer className="player-dock" aria-label="Music player">
      <div className="player-current"><Artwork src={currentTrack.cover} alt={`${currentTrack.album} artwork`}/><div className="player-current-text"><span className="player-overline">NOW ON THE DIAL <span className="on-air" aria-hidden="true"/></span><strong>{currentTrack.title}</strong><span>{currentTrack.artist}</span></div><SaveButton id={currentTrack.id} compact/></div>
      <div className="player-center"><div className="player-controls"><button type="button" className={`player-side-control ${shuffle?'control-active':''}`} title="Shuffle" aria-label="Toggle shuffle" aria-pressed={shuffle} onClick={()=>setShuffle(!shuffle)}><Icon name="shuffle" size={17}/></button><button type="button" className="player-skip" aria-label="Previous track" onClick={previous}><Icon name="previous" size={19} fill="currentColor" /></button><button type="button" className="player-play" aria-label={playing?'Pause':'Play'} onClick={togglePlay}><Icon name={playing?'pause':'play'} size={20} fill={playing?'none':'currentColor'}/></button><button type="button" className="player-skip" aria-label="Next track" onClick={next}><Icon name="next" size={19} fill="currentColor"/></button><button type="button" className={`player-side-control ${repeat?'control-active':''}`} title="Repeat track" aria-label="Toggle repeat track" aria-pressed={repeat} onClick={()=>setRepeat(!repeat)}><Icon name="repeat" size={17}/></button></div><div className="player-progress"><span>{formatTime(currentTime)}</span><input type="range" aria-label="Track position" min="0" max={duration||1} step="1" value={Math.min(currentTime,duration||1)} onChange={e=>seek(Number(e.target.value))} style={{'--progress':`${Math.min(100,((currentTime||0)/(duration||1))*100)}%`}}/><span>{formatTime(duration)}</span></div></div>
      <div className="player-right"><span className="player-right-caption">SOUND GOOD?</span><button className={`player-side-control queue-button ${queueVisible?'control-active':''}`} type="button" title="Playing next" aria-label="Show playing queue" aria-expanded={queueVisible} onClick={()=>setQueueVisible(!queueVisible)}><Icon name="queue" size={19}/></button><button className="player-side-control" type="button" title={volume===0?'Unmute':'Mute'} aria-label={volume===0?'Unmute':'Mute'} onClick={()=>setVolume(volume===0?0.7:0)}><Icon name={volume===0?'mute':'volume'} size={19}/></button><input className="player-volume" type="range" min="0" max="1" step="0.01" value={volume} aria-label="Volume" onChange={e=>setVolume(Number(e.target.value))} style={{'--progress':`${volume*100}%`}}/><span className="player-volume-number">{Math.round(volume*100)}</span></div>
    </footer>
  </>
}

function QueueDrawer() {
  const {queue, queueVisible, setQueueVisible, currentId, playTrack, playing}=usePlayer()
  useEffect(()=>{
    if (!queueVisible) return
    const onKey=e=>{if(e.key==='Escape')setQueueVisible(false)}
    window.addEventListener('keydown',onKey)
    return ()=>window.removeEventListener('keydown',onKey)
  },[queueVisible,setQueueVisible])
  if (!queueVisible) return null
  return <div className="queue-scrim"><button className="queue-backdrop" onClick={()=>setQueueVisible(false)} aria-label="Close queue"/><aside className="queue-drawer" aria-label="Playing queue"><div className="queue-heading"><span className="micro-label">ON THE DIAL / UP NEXT</span><button aria-label="Close queue" onClick={()=>setQueueVisible(false)}><Icon name="close"/></button></div><h2>Coming up<span>.</span></h2><p>Good things are worth listening through.</p><div className="queue-track-list">{queue.map((id,index)=>{const track=getTrack(id);if(!track)return null;return <button key={`${id}-${index}`} onClick={()=>{playTrack(id); setQueueVisible(false)}} className={`queue-track ${currentId===id?'queue-track-active':''}`}><span className="queue-n">{String(index+1).padStart(2,'0')}</span><Artwork src={track.cover} alt=""/><span className="queue-track-text"><strong>{track.title}</strong><small>{track.artist}</small></span>{currentId===id&&<span className="playing-indicator">{playing?'ON AIR':'CUED'}</span>}</button>})}</div><p className="queue-note">ORIGINAL SYNTHESIZED DEMO AUDIO • WORKS OFFLINE</p></aside></div>
}

export default function AppShell({children}) {
  const [mobileOpen,setMobileOpen]=useState(false)
  const closeMenu=useCallback(()=>setMobileOpen(false),[])
  return <div className="app-shell"><a href="#main-content" className="skip-link">Skip to content</a><Sidebar mobileOpen={mobileOpen} closeMenu={closeMenu}/><div className="app-workspace"><Topbar onMenu={()=>setMobileOpen(true)}/><main id="main-content" className="main-scroll">{children}</main></div><PlayerDock/><QueueDrawer/></div>
}
