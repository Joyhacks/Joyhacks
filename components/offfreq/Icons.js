const shapes = {
  discover:<><circle cx="11" cy="11" r="7.5"/><path d="m16.5 16.5 4 4M8.5 14.5l2-6 6-2-2 6-6 2Z"/></>,
  search:<><circle cx="10.8" cy="10.8" r="7"/><path d="m16 16 5 5"/></>,
  grid:<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  heart:<path d="M20.4 5.6a5.3 5.3 0 0 0-7.5 0l-.9.9-.9-.9a5.3 5.3 0 0 0-7.5 7.5l.9.9L12 21l7.5-7 1-1a5.3 5.3 0 0 0-.1-7.4Z"/>,
  home:<><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z"/><path d="M9 21v-8h6v8"/></>,
  play:<path d="m8 5 12 7-12 7V5Z"/>,
  pause:<><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></>,
  next:<><path d="m5 5 9 7-9 7V5Z"/><path d="m14 5 9 7-9 7V5Z"/></>,
  previous:<><path d="m19 5-9 7 9 7V5Z"/><path d="m10 5-9 7 9 7V5Z"/></>,
  shuffle:<><path d="M3 7h3c4 0 7 10 11 10h4M18 14l3 3-3 3M3 17h3c2.1 0 3.8-2.2 5-4M14 9c.9-1.3 1.8-2 3-2h4M18 4l3 3-3 3"/></>,
  repeat:<><path d="m17 2 4 4-4 4M3 11V8a2 2 0 0 1 2-2h16M7 22l-4-4 4-4M21 13v3a2 2 0 0 1-2 2H3"/></>,
  volume:<><path d="m4 10 5 0 6-5v14l-6-5H4v-4ZM18 9c1.5 1 1.5 5 0 6"/></>,
  mute:<><path d="m4 10 5 0 6-5v14l-6-5H4v-4ZM18 9l4 6m0-6-4 6"/></>,
  plus:<path d="M12 5v14M5 12h14"/>,
  check:<path d="m5 12 5 5L20 7"/>,
  arrow:<><path d="M4 12h16M13 5l7 7-7 7"/></>,
  diagonal:<><path d="M5 19 19 5M7 5h12v12"/></>,
  close:<path d="M5 5 19 19M19 5 5 19"/>,
  queue:<><path d="M4 6h16M4 11h16M4 16h10M17 16l4 2.5-4 2.5V16Z"/></>,
  menu:<path d="M4 7h16M4 12h16M4 17h16"/>,
  dot:<circle cx="12" cy="12" r="4"/>,
  headphones:<><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="13" width="4" height="7" rx="2"/><rect x="17" y="13" width="4" height="7" rx="2"/></>,
  info:<><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/></>,
}

export default function Icon({ name, size=20, strokeWidth=1.8, fill='none', className='' }) {
  return <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill={fill} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[name] || shapes.dot}</svg>
}
