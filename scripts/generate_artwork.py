"""Generate the original OFFFREQ editorial record sleeve artwork as standalone SVG files.
No external assets, images, or proprietary fonts are required.
"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'artwork'
OUT.mkdir(parents=True, exist_ok=True)

def svg(name, background, content, style=''):
    base = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800" role="img" aria-label="OFFFREQ original illustrated record sleeve">
 <defs>
  <filter id="texture" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".51" numOctaves="2" seed="8" stitchTiles="stitch" result="noise"/><feColorMatrix in="noise" type="saturate" values="0" result="gray"/><feComponentTransfer in="gray"><feFuncA type="linear" slope=".10"/></feComponentTransfer></filter>
  <clipPath id="frame"><rect width="800" height="800"/></clipPath>
 </defs>
 <rect width="800" height="800" fill="{background}"/>
 <g clip-path="url(#frame)">{content}</g>
 <rect width="800" height="800" filter="url(#texture)" opacity=".45" pointer-events="none"/>
 <g font-family="Arial,Helvetica,sans-serif" font-size="18" font-weight="700" letter-spacing="2"><text x="42" y="758" fill="{style or '#1c211a'}">OFFFREQ / OF.001</text><text x="760" y="758" text-anchor="end" fill="{style or '#1c211a'}">33⅓ — STEREO</text></g>
</svg>'''
    (OUT / name).write_text(base, encoding='utf8')

svg('almost-morning.svg','#bfc4c9','''
<rect x="0" y="382" width="800" height="418" fill="#d9bcaf"/><circle cx="490" cy="385" r="285" fill="#f3e5c2"/>
<path d="M0 375L800 375M0 411L800 411M0 447L800 447M0 483L800 483M0 519L800 519M0 555L800 555M0 591L800 591" stroke="#b8695f" stroke-width="11"/>
<rect x="46" y="49" width="156" height="33" fill="#242f36"/><text x="57" y="72" fill="#f6e7c9" font-size="16" font-family="Arial" font-weight="700" letter-spacing="2">LUMA VALE</text>
<text x="42" y="166" fill="#263239" font-size="100" font-family="Arial" font-weight="900" letter-spacing="-9">ALMOST</text><text x="40" y="254" fill="#263239" font-size="116" font-family="Georgia" font-style="italic" letter-spacing="-6">morning.</text>
<circle cx="490" cy="385" r="286" fill="none" stroke="#3c4a50" stroke-width="1"/><path d="M0 375H800" stroke="#263239" stroke-width="10"/>
''','#263239')

svg('soft-edges.svg','#304ed0','''
<path d="M-70 160L810 160L400 810L-150 810Z" fill="#e2ecbc"/><circle cx="570" cy="460" r="244" fill="#d2543b"/>
<circle cx="570" cy="460" r="138" fill="#304ed0"/><circle cx="570" cy="460" r="43" fill="#f1ddb8"/>
<path d="M55 240H770M55 272H770M55 304H770" stroke="#cbd4ef" stroke-width="4" opacity=".6"/>
<text transform="translate(115 715) rotate(-90)" fill="#152524" font-family="Arial" font-size="103" font-weight="900" letter-spacing="-8">SOFT EDGES</text>
<rect x="467" y="73" width="290" height="46" fill="#18283a"/><text x="483" y="103" fill="#ecf2dd" font-family="Arial" font-weight="700" font-size="20" letter-spacing="5">YORI KAZE</text>
''','#ecf2dd')

svg('warm-static.svg','#f0b599','''
<circle cx="580" cy="255" r="290" fill="#a34232"/><circle cx="580" cy="255" r="241" fill="#edc8a3"/><circle cx="580" cy="255" r="202" fill="#a34232"/><circle cx="580" cy="255" r="168" fill="#eea889"/><circle cx="580" cy="255" r="126" fill="#8b372e"/><circle cx="580" cy="255" r="79" fill="#f4c8b0"/><circle cx="580" cy="255" r="22" fill="#8b372e"/>
<rect x="0" y="390" width="800" height="204" fill="#382a26"/><text x="40" y="489" fill="#f1bc9c" font-family="Arial" font-size="124" font-weight="900" letter-spacing="-10">WARM</text><text x="35" y="582" fill="#f1bc9c" font-family="Georgia" font-size="125" font-style="italic" letter-spacing="-6">static.</text><text x="47" y="647" fill="#382a26" font-size="19" font-family="Arial" font-weight="700" letter-spacing="7">OTIS NERA / SIGNALS IN THE DARK</text>
''','#372924')

svg('park-bench.svg','#243a30','''
<circle cx="620" cy="170" r="224" fill="#e9bc55"/><rect x="48" y="64" width="289" height="51" fill="#e3e8c4"/><text x="63" y="98" font-family="Arial" font-size="24" font-weight="700" letter-spacing="5" fill="#243a30">THE WAX STILLS</text>
<path d="M-40 388C95 282 188 514 315 393S542 296 861 384M-40 440C95 334 188 566 315 445S542 348 861 436M-40 492C95 386 188 618 315 497S542 400 861 488M-40 544C95 438 188 670 315 549S542 452 861 540M-40 596C95 490 188 722 315 601S542 504 861 592" stroke="#c5da83" stroke-width="18" fill="none"/>
<text x="40" y="250" fill="#e3e8c4" font-family="Arial" font-size="109" font-weight="900" letter-spacing="-9">PARK BENCH</text><text x="41" y="332" fill="#e3e8c4" font-family="Georgia" font-size="108" font-style="italic" letter-spacing="-5">cinema</text>
''','#e3e8c4')

svg('open-late.svg','#171c1c','''
<rect x="92" y="75" width="618" height="580" fill="none" stroke="#dbe477" stroke-width="5"/><circle cx="408" cy="340" r="197" fill="#e9f076"/>
<circle cx="408" cy="340" r="117" fill="#171c1c"/><path d="M408 140V550M209 341H608" stroke="#e9f076" stroke-width="4"/>
<rect x="0" y="525" width="800" height="129" fill="#e87958"/><text x="27" y="625" fill="#1f2420" font-family="Arial" font-size="139" font-weight="900" letter-spacing="-13">OPEN LATE</text>
<text x="103" y="129" fill="#dfe47e" font-family="Arial" font-size="20" font-weight="700" letter-spacing="5">PARSA MOON / 24H</text>
''','#dfe47e')

svg('second-nature.svg','#d7b4ab','''
<rect x="42" y="41" width="716" height="702" fill="none" stroke="#5c564a" stroke-width="3"/>
<path d="M145 650C200 411 350 209 740 122" stroke="#91684d" stroke-width="113" fill="none"/>
<path d="M155 625C210 385 365 213 762 145" stroke="#ead6a2" stroke-width="52" fill="none"/>
<ellipse cx="520" cy="390" rx="150" ry="260" transform="rotate(29 520 390)" fill="#5f6852"/>
<text x="55" y="188" font-family="Arial" font-size="76" font-weight="900" letter-spacing="-4" fill="#353b34">SECOND</text><text x="54" y="262" font-family="Georgia" font-size="97" font-style="italic" fill="#353b34">nature.</text>
<text transform="translate(70 683) rotate(-90)" font-family="Arial" font-size="20" font-weight="700" letter-spacing="5" fill="#353b34">IMANI GREY / LITTLE RITUALS</text>
''','#353b34')

svg('no-signal.svg','#eb783c','''
<g stroke="#2b3028" stroke-width="6" fill="none"><circle cx="400" cy="430" r="80"/><circle cx="400" cy="430" r="144"/><circle cx="400" cy="430" r="211"/><circle cx="400" cy="430" r="278"/><circle cx="400" cy="430" r="349"/></g>
<path d="M0 328L800 328M0 530L800 530" stroke="#253124" stroke-width="9"/><rect x="128" y="191" width="540" height="455" fill="#273526" transform="rotate(11 398 419)"/>
<text x="173" y="341" fill="#ef814a" font-family="Arial" font-size="127" font-weight="900" letter-spacing="-13" transform="rotate(11 173 341)">NO</text><text x="153" y="451" fill="#ee814a" font-family="Arial" font-size="105" font-weight="900" letter-spacing="-12" transform="rotate(11 153 451)">SIGNAL</text><text x="148" y="531" fill="#e6ebc7" font-family="Georgia" font-size="62" font-style="italic" transform="rotate(11 148 531)">no problem.</text>
''','#213122')

svg('midnight-bloom.svg','#27234b','''
<circle cx="426" cy="384" r="138" fill="#ffbd91"/>
<g fill="#a96f9a" opacity=".95"><ellipse cx="420" cy="190" rx="105" ry="154"/><ellipse cx="420" cy="570" rx="105" ry="154"/><ellipse cx="230" cy="380" rx="154" ry="105"/><ellipse cx="610" cy="380" rx="154" ry="105"/></g>
<g fill="#e5d8ad"><ellipse cx="286" cy="254" rx="90" ry="142" transform="rotate(-47 286 254)"/><ellipse cx="554" cy="519" rx="90" ry="142" transform="rotate(-47 554 519)"/><ellipse cx="286" cy="519" rx="90" ry="142" transform="rotate(47 286 519)"/><ellipse cx="554" cy="254" rx="90" ry="142" transform="rotate(47 554 254)"/></g>
<circle cx="426" cy="384" r="116" fill="#ed835e"/><circle cx="426" cy="384" r="29" fill="#27234b"/>
<text x="40" y="116" font-family="Arial" font-size="81" font-weight="900" letter-spacing="-7" fill="#efebda">MIDNIGHT</text><text x="43" y="205" font-family="Georgia" font-size="105" font-style="italic" letter-spacing="-4" fill="#efebda">bloom.</text>
''','#efebda')

svg('other-side.svg','#adc7d3','''
<circle cx="599" cy="215" r="209" fill="#f1cf76"/><path d="M0 475H330V410H390V345H450V280H510V215H570V150H630" stroke="#2c5766" stroke-width="71" fill="none"/>
<path d="M0 755H800" stroke="#263947" stroke-width="16"/><rect x="30" y="51" width="278" height="43" fill="#e7eedc"/><text x="49" y="80" font-family="Arial" font-size="20" font-weight="700" letter-spacing="4" fill="#284352">NILO SERA / VOL.2</text>
<text x="46" y="595" font-family="Arial" font-size="103" font-weight="900" letter-spacing="-9" fill="#e9efde">THE OTHER</text><text x="44" y="694" font-family="Georgia" font-size="139" font-style="italic" fill="#e9efde">side.</text>
''','#273d4c')

svg('after-rain.svg','#b0c3bf','''
<g fill="none" stroke="#4c706d" stroke-width="2"><circle cx="440" cy="339" r="85"/><circle cx="440" cy="339" r="139"/><circle cx="440" cy="339" r="193"/><circle cx="440" cy="339" r="247"/><circle cx="440" cy="339" r="301"/><circle cx="440" cy="339" r="355"/></g>
<rect x="0" y="360" width="800" height="153" fill="#496b67" opacity=".87"/><rect x="0" y="517" width="800" height="11" fill="#e0dfc9"/><rect x="0" y="545" width="800" height="7" fill="#4c706d"/><rect x="0" y="572" width="800" height="4" fill="#f8e6d4"/><rect x="0" y="595" width="800" height="13" fill="#4c706d"/>
<text x="35" y="211" font-family="Arial" font-size="129" font-weight="900" letter-spacing="-12" fill="#294b49">AFTER</text><text x="37" y="326" font-family="Georgia" font-size="138" font-style="italic" fill="#294b49">the rain.</text>
<text x="38" y="685" font-family="Arial" font-size="21" font-weight="700" letter-spacing="5" fill="#294b49">MONO ARC / LOW WEATHER</text>
''','#294b49')

svg('stay-awhile.svg','#e7ddbd','''
<rect x="67" y="65" width="666" height="655" fill="none" stroke="#383c29" stroke-width="4"/>
<circle cx="485" cy="400" r="239" fill="#b8c36a"/><circle cx="485" cy="400" r="181" fill="#d6a778"/><circle cx="485" cy="400" r="125" fill="#e7ddbd"/><circle cx="485" cy="400" r="42" fill="#b8c36a"/>
<g stroke="#404a35" stroke-width="8"><path d="M65 100L735 100M65 700L735 700"/></g>
<text x="91" y="210" font-family="Georgia" font-size="109" font-style="italic" fill="#2f4034">stay</text><text x="85" y="310" font-family="Arial" font-weight="900" font-size="118" letter-spacing="-11" fill="#2f4034">AWHILE</text>
<text x="94" y="646" font-family="Arial" font-weight="700" letter-spacing="5" font-size="23" fill="#2f4034">TORA FIELDS</text>
''','#2f4034')

svg('slow-motion.svg','#d3a6bd','''
<rect x="40" y="40" width="720" height="720" fill="none" stroke="#482b43" stroke-width="2"/><g stroke="#8c658d" stroke-width="1" opacity=".8">'''+''.join(f'<path d="M{x} 40V760"/>' for x in range(40,801,40))+''.join(f'<path d="M40 {y}H760"/>' for y in range(40,801,40))+'''</g>
<circle cx="411" cy="400" r="288" fill="#85435d"/><circle cx="411" cy="400" r="189" fill="#d3a6bd"/><circle cx="411" cy="400" r="98" fill="#e0c667"/>
<path d="M95 345H709M95 410H709M95 475H709" stroke="#ece5d9" stroke-width="32"/>
<text x="60" y="149" font-family="Arial" font-size="92" font-weight="900" letter-spacing="-10" fill="#3d2542">SLOW</text><text x="60" y="245" font-family="Georgia" font-size="125" font-style="italic" fill="#3d2542">motion.</text>
<text x="60" y="671" font-family="Arial" font-weight="700" font-size="33" letter-spacing="7" fill="#3d2542">MIRO JUNO / CITIES</text>
''','#3d2542')

# Curated mix cover series: all four share a tiny editorial system, but each is art-directed individually.
svg('mix-late.svg','#d3bac6','''
<circle cx="555" cy="420" r="325" fill="#242522"/><circle cx="555" cy="420" r="263" fill="none" stroke="#888a7e" stroke-width="2"/><circle cx="555" cy="420" r="207" fill="none" stroke="#77786d" stroke-width="2"/><circle cx="555" cy="420" r="150" fill="#ef8062"/><circle cx="555" cy="420" r="18" fill="#242522"/>
<rect x="-45" y="65" width="559" height="170" fill="#e4ef75" transform="rotate(-8 180 150)"/><text x="43" y="168" fill="#1f241c" font-family="Arial" font-size="139" font-weight="900" letter-spacing="-12" transform="rotate(-8 43 168)">THE LATE</text>
<rect x="-56" y="250" width="520" height="142" fill="#ed866c" transform="rotate(8 170 320)"/><text x="53" y="339" fill="#272522" font-family="Georgia" font-style="italic" font-size="113" transform="rotate(8 53 339)">shift.</text>
<text x="48" y="670" fill="#1f241c" font-family="Arial" font-size="35" font-weight="700" letter-spacing="5">AFTER HOURS EDIT.</text>
''','#1f241c')

svg('mix-sunday.svg','#d4ddbe','''
<circle cx="426" cy="392" r="291" fill="#e48d69"/><circle cx="426" cy="392" r="206" fill="#d4ddbe"/><circle cx="426" cy="392" r="141" fill="#a2ab85"/><circle cx="426" cy="392" r="63" fill="#e48d69"/>
<path d="M77 667C211 528 340 716 446 613S617 554 783 634" fill="none" stroke="#283b36" stroke-width="8"/>
<text x="40" y="212" fill="#263830" font-family="Georgia" font-style="italic" font-size="138">Slow</text><text x="39" y="330" fill="#263830" font-family="Arial" font-size="130" font-weight="900" letter-spacing="-11">SUNDAY</text>
<text x="47" y="689" fill="#263830" font-family="Arial" font-weight="700" font-size="22" letter-spacing="6">NO PLANS NECESSARY.</text>
''','#263830')

svg('mix-somewhere.svg','#c9c8df','''
<rect x="0" y="390" width="800" height="410" fill="#e8a87c"/><path d="M0 482L230 252L425 467L634 210L800 401V800H0Z" fill="#536e75"/><path d="M0 580L230 380L425 580L634 330L800 540V800H0Z" fill="#a9c194"/>
<circle cx="588" cy="178" r="123" fill="#ebe87c"/>
<rect x="31" y="56" width="715" height="180" fill="#293942" transform="rotate(-5 380 150)"/><text x="52" y="137" fill="#f1efdb" font-family="Arial" font-size="109" font-weight="900" letter-spacing="-10" transform="rotate(-5 52 137)">SOMEWHERE</text><text x="62" y="220" fill="#e9f17c" font-family="Georgia" font-size="119" font-style="italic" transform="rotate(-5 62 220)">else.</text>
''','#293942')

svg('mix-colour.svg','#f1ca6f','''
<rect x="220" y="70" width="198" height="680" fill="#283d66" transform="rotate(19 320 410)"/><rect x="428" y="-30" width="193" height="740" fill="#e66d53" transform="rotate(19 525 345)"/><rect x="636" y="-90" width="150" height="750" fill="#b5bfd9" transform="rotate(19 711 285)"/>
<path d="M0 425H800" stroke="#f6e8c6" stroke-width="14"/><text x="35" y="201" fill="#2d3130" font-family="Arial" font-size="121" font-weight="900" letter-spacing="-12">IN FULL</text><text x="30" y="316" fill="#2d3130" font-family="Georgia" font-size="133" font-style="italic">colour.</text><rect x="25" y="600" width="468" height="66" fill="#2d3130"/><text x="46" y="642" fill="#f5d887" font-family="Arial" font-size="25" letter-spacing="4" font-weight="700">A GOOD DISTRACTION.</text>
''','#2d3130')

print('Generated',len(list(OUT.glob('*.svg'))),'original OFFFREQ record sleeve assets.')
