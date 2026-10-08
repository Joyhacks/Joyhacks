import Link from 'next/link'
import Head from 'next/head'
import Icon from '@/components/offfreq/Icons'
export default function Page404(){return <><Head><title>Wrong frequency — OFFFREQ</title></Head><div className="page-container error-page"><span className="micro-label">ERROR / 404</span><span className="error-code">4✳4</span><h1>You're a little<br/><em>off the dial.</em></h1><p>Nothing playing at this address. Try a different frequency.</p><Link href="/" className="pill-cta">BACK TO THE MUSIC <Icon name="arrow" size={18}/></Link></div></>}
