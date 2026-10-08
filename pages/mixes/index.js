import Head from 'next/head'
import { mixes } from '@/data/catalog'
import {MixCard, Label} from '@/components/offfreq/MusicUI'

export default function Mixes() {
  return <><Head><title>The mixes — OFFFREQ</title><meta name="description" content="Thoughtfully made mixtapes for the long way home, the slow Sunday, and everything in between."/></Head><div className="page-container sub-page"><div className="page-topline"><Label><span className="asterisk">✳</span> CURATED, NOT CALCULATED</Label><span className="issue-line">THE MIXES / VOLUME 001</span></div><section className="sub-hero mixes-hero"><span className="micro-label">02 / PEOPLE WITH GOOD EARS</span><h1>Made to<br/><em>be played.</em></h1><p>Not an endless feed. Just a handful of lovingly assembled collections for where you are and how you feel.</p><div className="mixes-hero-stamp">MIXTAPE<br/>SOCIETY <span>↗</span></div></section><section className="section-block mixes-grid-block"><div className="section-rule"><span>THE MIXTAPE ARCHIVE</span><span>01—04 / ALWAYS OPEN</span></div><div className="mixes-grid">{mixes.map(mix=><MixCard key={mix.slug} mix={mix}/>)}</div></section><div className="site-signoff"><span>NO FILLER. ALL FEELING.</span><span>OFFFREQ / ISSUE 001</span></div></div></>
}
