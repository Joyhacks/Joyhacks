import Head from 'next/head'
import Link from 'next/link'
import { tracks, mixes, getMixTracks } from '@/data/catalog'
import { usePlayer } from '@/components/offfreq/PlayerProvider'
import Icon from '@/components/offfreq/Icons'
import { TrackCard, TrackRow, MixCard, SectionHeading, Label } from '@/components/offfreq/MusicUI'

function HeroArt({onPlay}) {
  return <div className="hero-art"><div className="hero-art-top"><span>OFFFREQ SELECTS</span><span>VOL. 001 — 2026</span></div><div className="hero-art-main"><div className="hero-art-arc"/><div className="hero-record"><div className="record-line record-line-1"/><div className="record-line record-line-2"/><div className="record-line record-line-3"/><div className="record-label"><span>OF.</span><small>33⅓ RPM</small></div></div><div className="hero-art-star">✳</div><div className="hero-art-vertical">STAY CURIOUS · KEEP LISTENING</div></div><div className="hero-art-bottom"><div><span>ISSUE NO. 001</span><strong>SOUND<br/>WITHOUT<br/>THE NOISE.</strong></div><button className="hero-art-play" onClick={onPlay} aria-label="Play the featured selection" type="button"><Icon name="diagonal" size={24}/></button></div></div>
}

export default function Home() {
  const { playTrack }=usePlayer()
  const featured = getMixTracks(mixes[0]); const featuredIds=featured.map(item=>item.id)
  return <>
    <Head><title>OFFFREQ — Good music, no shortcuts.</title><meta name="description" content="An independent listening room for curious ears. Find off-centre records, carefully made mixes, and music worth keeping."/></Head>
    <div className="page-container home-page">
      <div className="page-topline"><Label><span className="asterisk">✳</span> WELCOME TO THE OTHER FREQUENCY</Label><span className="issue-line">ISSUE 001 <span className="vertical-separator"/> YOUR NEW LISTENING ROOM</span></div>
      <section className="hero" aria-labelledby="home-title"><div className="hero-copy"><div className="hero-kicker"><span className="hero-kicker-bullet"/> NOT ANOTHER PLAYLIST MACHINE.</div><h1 id="home-title">For ears<br/>that <em>wander.</em></h1><div className="hero-foot"><p>Deep cuts. Happy accidents. New favourites. A little corner of the internet for listening differently.</p><div className="hero-actions"><button className="pill-cta" type="button" onClick={()=>playTrack(featured[0].id,featuredIds)}><span className="cta-circle"><Icon name="play" size={17} fill="currentColor"/></span> START LISTENING <Icon name="diagonal" size={16}/></button><Link href="/about" className="text-link">WHAT IS OFFFREQ? <Icon name="arrow" size={17}/></Link></div></div><div className="hero-serial">AN INDEPENDENT WAY TO PRESS PLAY. <span>↘</span></div></div><HeroArt onPlay={()=>playTrack(featured[0].id,featuredIds)}/></section>
      <div className="ticker"><div className="ticker-track"><span>FRESH FINDS</span><b>✳</b><span>NO ALGORITHMS. JUST GOOD EARS.</span><b>✳</b><span>A LITTLE OFF THE MAINSTREAM</span><b>✳</b><span>FRESH FINDS</span><b>✳</b><span>NO ALGORITHMS. JUST GOOD EARS.</span><b>✳</b></div></div>
      <section className="section-block"><SectionHeading kicker="01 / THE ROTATION" title={<>Worth a <em>listen.</em></>} extra="Twelve tracks we'd happily put our name next to." actionText="FIND MORE SOUNDS" actionHref="/search"/><div className="track-grid">{tracks.slice(0,4).map((track,index)=><TrackCard key={track.id} track={track} index={index}/>)}</div></section>
      <section className="section-block featured-section"><SectionHeading kicker="02 / CURATED WITH INTENTION" title={<>Press play. <em>Go somewhere.</em></>} actionText="ALL THE MIXES" actionHref="/mixes"/><div className="featured-mixes"><MixCard mix={mixes[0]} wide/><MixCard mix={mixes[1]} wide/></div></section>
      <section className="section-block recent-section"><SectionHeading kicker="03 / LITTLE DISCOVERIES" title={<>Still <em>digging.</em></>} extra="A few more that found their way onto our radar."/><div className="recent-layout"><div className="recent-tracks">{tracks.slice(4,9).map((track,index)=><TrackRow track={track} index={index} key={track.id}/>)}</div><div className="recent-note"><span className="recent-note-star">✳</span><span className="micro-label">A NOTE FROM THE EDITORS</span><h3>Less scrolling.<br/><em>More feeling.</em></h3><p>Everything here is picked on purpose. No endless feed. Just music with something to say.</p><Link href="/about">THE IDEA BEHIND IT <Icon name="arrow" size={18}/></Link></div></div></section>
      <div className="site-signoff"><span>GOOD MUSIC IS A GOOD PLACE TO START.</span><span>OFFFREQ STUDIO® <b>2026</b></span></div>
    </div>
  </>
}
