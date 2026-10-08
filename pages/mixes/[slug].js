import Head from 'next/head'
import Link from 'next/link'
import {mixes,getMix,getMixTracks} from '@/data/catalog'
import {usePlayer} from '@/components/offfreq/PlayerProvider'
import Icon from '@/components/offfreq/Icons'
import {Artwork,TrackRow,Label} from '@/components/offfreq/MusicUI'

export async function getStaticPaths() { return {paths:mixes.map(mix=>({params:{slug:mix.slug}})),fallback:false} }
export async function getStaticProps({params}) { return {props:{slug:params.slug}} }
export default function MixDetail({slug}) {
  const mix=getMix(slug)
  const {playTrack}=usePlayer()
  if(!mix) return null
  const list=getMixTracks(mix); const ids=list.map(track=>track.id)
  return <><Head><title>{mix.title} — OFFFREQ Mixes</title><meta name="description" content={mix.description}/></Head><div className="page-container sub-page"><div className="page-topline"><Label><span className="asterisk">✳</span> A HANDMADE COLLECTION</Label><Link href="/mixes" className="back-link">← ALL MIXES</Link></div><section className="mix-detail-hero" style={{'--mix-hue':mix.hue}}><div className="mix-detail-copy"><Label>OFFFREQ / MIX NO. {mix.index}</Label><h1>{mix.title}<span>.</span></h1><p>{mix.description}</p><div className="mix-detail-metadata"><span>{mix.type}</span><span>{list.length} TRACKS / NO SKIPS</span></div><button type="button" onClick={()=>playTrack(list[0].id,ids)} className="pill-cta"><span className="cta-circle"><Icon name="play" size={17} fill="currentColor"/></span> PLAY THIS MIX <Icon name="diagonal" size={17}/></button></div><div className="mix-detail-art"><Artwork src={mix.cover} alt={`${mix.title} illustrated editorial cover`} /></div></section><section className="section-block mix-detail-tracks"><div className="section-rule"><span>INSIDE THIS MIX</span><span>THE TRACKLIST / {String(list.length).padStart(2,'0')}</span></div><div className="results-list">{list.map((track,i)=><TrackRow key={track.id} track={track} index={i} list={ids}/>)}</div></section><div className="mix-detail-more"><span>GOOD TASTE DOESN'T END HERE.</span><Link href="/mixes">MORE OF THE GOOD STUFF <Icon name="arrow" size={16}/></Link></div><div className="site-signoff"><span>MADE FOR LISTENING ALL THE WAY THROUGH.</span><span>OFFFREQ / ISSUE 001</span></div></div></>
}
