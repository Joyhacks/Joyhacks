import '@/styles/globals.css'
import AppShell from '@/components/offfreq/AppShell'
import { PlayerProvider } from '@/components/offfreq/PlayerProvider'

export default function App({ Component, pageProps }) {
  return <PlayerProvider><AppShell><Component {...pageProps} /></AppShell></PlayerProvider>
}
