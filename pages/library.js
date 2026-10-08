import Head from 'next/head'
import Link from 'next/link'
import {tracks} from '@/data/catalog'
import Icon from '@/components/offfreq/Icons'
import {usePlayer} from '@/components/offfreq/PlayerProvider'
import {SectionHeading,TrackRow,Label} from '@/components/offfreq/MusicUI'

export default function Library() {
  const {liked, playTrack}=usePlayer()
  const saved=liked.map(id=>tracks.find(item=>item.id===id)).filter(Boolean)
  return <><Head><title>Your shelf — OFFFREQ</title><meta name="description" content="Keep the music you want to come back to. Your OFFFREQ saved records, right here."/></Head><div className="page-container sub-page"><div className="page-topline"><Label><span className="asterisk">✳</span> YOUR OWN LITTLE CORNER</Label><span className="issue-line">YOUR SHELF / SAVED RECORDS</span></div><section className="sub-hero library-hero"><span className="micro-label">03 / THE PERSONAL ARCHIVE</span><h1>Keep what<br/><em>moves you.</em></h1><p>No algorithms here. Just a shelf of sounds you picked yourself. Stored in this browser.</p><div className="library-counter"><span>{String(saved.length).padStart(2,'0')}</span><span>RECORDS<br/>ON YOUR SHELF</span></div></section><section className="section-block library-block"><SectionHeading kicker="01 / RECORDS TO REMEMBER" title={saved.length?<>Saved for <em>later.</em></>:<>Still room on <em>the shelf.</em></>} actionText="DISCOVER MUSIC" actionHref="/"/>{saved.length?<><div className="shelf-action"><span>{saved.length} {saved.length===1?'TRACK':'TRACKS'} / YOUR COLLECTION</span><button type="button" className="pill-cta" onClick={()=>playTrack(saved[0].id,saved.map(item=>item.id))}><Icon name="play" fill="currentColor" size={18}/> PLAY YOUR SHELF</button></div><div className="results-list">{saved.map((track,i)=><TrackRow key={track.id} track={track} index={i} list={saved.map(item=>item.id)}/>)}</div></>:<div className="empty-state"><span className="empty-asterisk">♡</span><h3>Good things take collecting.</h3><p>Hit the heart next to any track and it will find a home here.</p><Link className="pill-cta" href="/search">FIND SOMETHING GOOD <Icon name="arrow" size={17}/></Link></div>}</section><div className="site-signoff"><span>YOUR TASTE. YOUR TIME.</span><span>OFFFREQ / ISSUE 001</span></div></div></>
}
