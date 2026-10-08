import Link from 'next/link'
import Icon from './Icons'
import { usePlayer } from './PlayerProvider'
import { getMixTracks } from '@/data/catalog'

export function Label({ children, className='' }) { return <span className={`micro-label ${className}`}>{children}</span> }

export function Artwork({ src, alt='', className='' }) { return <img className={`artwork ${className}`} src={src} alt={alt} loading="lazy"/> }

export function SaveButton({ id, compact=false }) {
  const { liked, toggleLike } = usePlayer()
  const saved = liked.includes(id)
  return <button className={`save-button ${saved ? 'saved':''} ${compact?'save-compact':''}`} type="button" aria-label={saved?'Remove from saved tracks':'Save track'} aria-pressed={saved} title={saved?'Remove from your shelf':'Save to your shelf'} onClick={e=>{e.stopPropagation(); toggleLike(id)}}>
    <Icon name="heart" size={compact?17:19} fill={saved?'currentColor':'none'} />
  </button>
}

export function TrackCard({ track, index }) {
  const { playTrack, togglePlay, currentId, playing } = usePlayer()
  const active = track.id === currentId && playing
  return <article className="track-card">
    <button type="button" className="track-art-button" aria-label={`Play ${track.title} by ${track.artist}`} onClick={()=>currentId === track.id && playing ? togglePlay() : playTrack(track.id)}>
      <Artwork src={track.cover} alt={`${track.album} original cover artwork`} />
      <span className="track-art-overlay"><Icon name={active?'pause':'play'} size={22} fill={active?'none':'currentColor'} /></span>
    </button>
    <div className="track-card-details">
      <div className="track-number">{String(index+1).padStart(2,'0')} / {track.genre}</div>
      <div className="track-card-title-row"><button onClick={()=>currentId === track.id && playing ? togglePlay() : playTrack(track.id)} className="text-button track-title" type="button">{track.title}</button><SaveButton id={track.id} compact/></div>
      <span className="track-artist">{track.artist}</span>
    </div>
  </article>
}

export function TrackRow({ track, index, subtle=false, list }) {
  const { playTrack, togglePlay, currentId, playing } = usePlayer()
  const active = track.id === currentId && playing
  return <div className={`track-row ${subtle?'track-row-subtle':''} ${active?'track-row-active':''}`}>
    <button className="track-row-main" onClick={()=>currentId === track.id && playing ? togglePlay() : playTrack(track.id,list)} type="button" aria-label={`Play ${track.title}`}>
      <span className="track-row-index">{String(index+1).padStart(2,'0')}</span>
      <span className="row-cover-wrap"><Artwork src={track.cover} alt=""/><span className="row-cover-play"><Icon name={active?'pause':'play'} size={18} fill={active?'none':'currentColor'}/></span></span>
      <span className="row-track-names"><strong>{track.title}</strong><span>{track.artist}</span></span>
    </button>
    <span className="row-track-genre">{track.genre}</span>
    <span className="row-track-time">{track.duration}</span>
    <SaveButton id={track.id} compact />
  </div>
}

export function MixCard({ mix, wide=false }) {
  const { playTrack } = usePlayer()
  const trackList=getMixTracks(mix)
  return <article className={`mix-card ${wide?'mix-card-wide':''}`}>
    <Link href={`/mixes/${mix.slug}`} className="mix-card-visual" aria-label={`View ${mix.title} mix`}>
      <Artwork src={mix.cover} alt={`${mix.title} original editorial cover artwork`} />
      <span className="mix-card-issue">OFFFREQ / MIX {mix.index}</span>
    </Link>
    <div className="mix-card-footer">
      <div><span className="mix-card-label">{mix.label}</span><h3><Link href={`/mixes/${mix.slug}`}>{mix.title}</Link></h3><p>{mix.tagline}</p></div>
      <button className="round-arrow dark" type="button" aria-label={`Play ${mix.title}`} title={`Play ${mix.title}`} onClick={()=>playTrack(trackList[0].id,trackList.map(track=>track.id))}><Icon name="play" size={19} fill="currentColor"/></button>
    </div>
  </article>
}

export function SectionHeading({ kicker, title, extra, actionText, actionHref }) {
  return <div className="section-heading"><div><Label>{kicker}</Label><h2>{title}</h2>{extra&&<p>{extra}</p>}</div>{actionText && <Link className="inline-link" href={actionHref}>{actionText} <Icon name="arrow" size={17}/></Link>}</div>
}
