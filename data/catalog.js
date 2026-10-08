// Fictional catalogue created for the OFFFREQ portfolio concept.
// Audio is composed procedurally in the browser for offline demo playback.
export const tracks = [
  { id:'almost-morning', title:'Almost Morning', artist:'Luma Vale', album:'Blue Hour', genre:'Ambient', mood:'Slow mornings', duration:'0:24', seconds:24, cover:'/artwork/almost-morning.svg', year:'2026', number:'001' },
  { id:'soft-edges', title:'Soft Edges', artist:'Yori Kaze', album:'Soft Edges EP', genre:'Electronic', mood:'Head in the clouds', duration:'0:24', seconds:24, cover:'/artwork/soft-edges.svg', year:'2026', number:'002' },
  { id:'warm-static', title:'Warm Static', artist:'Otis Nera', album:'Signals in the Dark', genre:'Jazz', mood:'After hours', duration:'0:24', seconds:24, cover:'/artwork/warm-static.svg', year:'2025', number:'003' },
  { id:'park-bench', title:'Park Bench Cinema', artist:'The Wax Stills', album:'Everyday Scenes', genre:'Indie', mood:'Daydreaming', duration:'0:24', seconds:24, cover:'/artwork/park-bench.svg', year:'2026', number:'004' },
  { id:'open-late', title:'Open Late', artist:'Parsa Moon', album:'City After Dark', genre:'Electronic', mood:'After hours', duration:'0:24', seconds:24, cover:'/artwork/open-late.svg', year:'2026', number:'005' },
  { id:'second-nature', title:'Second Nature', artist:'Imani Grey', album:'Little Rituals', genre:'Soul', mood:'Slow mornings', duration:'0:24', seconds:24, cover:'/artwork/second-nature.svg', year:'2025', number:'006' },
  { id:'no-signal', title:'No Signal, No Problem', artist:'Roomtone', album:'Off the Grid', genre:'Alternative', mood:'Daydreaming', duration:'0:24', seconds:24, cover:'/artwork/no-signal.svg', year:'2026', number:'007' },
  { id:'midnight-bloom', title:'Midnight Bloom', artist:'Cala Noor', album:'The Flower Hour', genre:'Jazz', mood:'After hours', duration:'0:24', seconds:24, cover:'/artwork/midnight-bloom.svg', year:'2025', number:'008' },
  { id:'other-side', title:'The Other Side', artist:'Nilo Sera', album:'Soft Departures', genre:'Indie', mood:'On the move', duration:'0:24', seconds:24, cover:'/artwork/other-side.svg', year:'2026', number:'009' },
  { id:'after-rain', title:'After the Rain', artist:'Mono Arc', album:'Low Weather', genre:'Ambient', mood:'Head in the clouds', duration:'0:24', seconds:24, cover:'/artwork/after-rain.svg', year:'2025', number:'010' },
  { id:'stay-awhile', title:'Stay Awhile', artist:'Tora Fields', album:'Nothing Urgent', genre:'Soul', mood:'Slow mornings', duration:'0:24', seconds:24, cover:'/artwork/stay-awhile.svg', year:'2026', number:'011' },
  { id:'slow-motion', title:'Slow Motion Cities', artist:'Miro Juno', album:'In Between Places', genre:'Electronic', mood:'On the move', duration:'0:24', seconds:24, cover:'/artwork/slow-motion.svg', year:'2026', number:'012' },
]

export const moods = ['All sounds', 'After hours', 'Slow mornings', 'On the move', 'Daydreaming', 'Head in the clouds']

export const mixes = [
  { slug:'the-late-shift', index:'01', title:'The late shift', tagline:'For the hours that belong to nobody.', type:'NIGHT DRIVE / JAZZ / ELECTRONIC', label:'EDITOR\'S PICK', cover:'/artwork/mix-late.svg', trackIds:['warm-static','open-late','midnight-bloom','soft-edges','slow-motion'], hue:'#ebaa92', description:'A little company for the long way home. Low-lit grooves, loose ends and the last train you nearly missed.' },
  { slug:'slow-sunday', index:'02', title:'Slow Sunday', tagline:'An unhurried kind of day.', type:'SOUL / AMBIENT / INDIE', label:'THE SOFT EDIT', cover:'/artwork/mix-sunday.svg', trackIds:['almost-morning','second-nature','stay-awhile','after-rain','park-bench'], hue:'#d3deb8', description:'For coffee that goes cold and plans that can wait. Warm, easy listening with room to breathe.' },
  { slug:'somewhere-else', index:'03', title:'Somewhere else', tagline:'Headphones on. World off.', type:'ALTERNATIVE / ELECTRONIC', label:'ROAD MUSIC', cover:'/artwork/mix-somewhere.svg', trackIds:['no-signal','other-side','slow-motion','park-bench','soft-edges'], hue:'#c7c9e4', description:'Music for leaving your desk, missing the exit and taking the scenic route on purpose.' },
  { slug:'in-full-colour', index:'04', title:'In full colour', tagline:'A good kind of distraction.', type:'INDIE / SOUL / EXPERIMENTAL', label:'FRESH FINDS', cover:'/artwork/mix-colour.svg', trackIds:['park-bench','stay-awhile','other-side','second-nature','warm-static'], hue:'#f5cb77', description:'Off-centre melodies and pockets of sunshine. A brighter selection for wherever the day goes.' },
]

export function getTrack(id) { return tracks.find(track => track.id === id) }
export function getMix(slug) { return mixes.find(mix => mix.slug === slug) }
export function getMixTracks(mix) { return mix.trackIds.map(getTrack).filter(Boolean) }
