/* Gomitolo – illustrazioni SVG generate in codice */
(function () {
  'use strict';

  const shade = (hex, amt) => {
    let c = hex.replace('#', ''); if (c.length === 3) c = c.split('').map((x) => x + x).join('');
    const n = parseInt(c, 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    const f = (v) => Math.max(0, Math.min(255, Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt)));
    return '#' + [f(r), f(g), f(b)].map((v) => v.toString(16).padStart(2, '0')).join('');
  };
  const INK = '#2B2233';
  const tex = (w = 3) => `stroke="rgba(255,255,255,.5)" stroke-width="${w}" stroke-dasharray="1.5 7" stroke-linecap="round" fill="none"`;
  const shadow = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${rx * 0.14}" fill="#000" opacity=".08"/>`;
  const face = (cx, cy, s = 1) => `
    <circle cx="${cx - 15 * s}" cy="${cy}" r="${4.6 * s}" fill="${INK}"/><circle cx="${cx + 15 * s}" cy="${cy}" r="${4.6 * s}" fill="${INK}"/>
    <circle cx="${cx - 13.6 * s}" cy="${cy - 1.6 * s}" r="${1.5 * s}" fill="#fff"/><circle cx="${cx + 16.4 * s}" cy="${cy - 1.6 * s}" r="${1.5 * s}" fill="#fff"/>
    <ellipse cx="${cx - 25 * s}" cy="${cy + 9 * s}" rx="${6.5 * s}" ry="${3.8 * s}" fill="#FF7FA0" opacity=".55"/>
    <ellipse cx="${cx + 25 * s}" cy="${cy + 9 * s}" rx="${6.5 * s}" ry="${3.8 * s}" fill="#FF7FA0" opacity=".55"/>
    <path d="M${cx - 5 * s} ${cy + 7 * s} q${2.5 * s} ${3.5 * s} ${5 * s} 0 q${2.5 * s} ${3.5 * s} ${5 * s} 0" stroke="${INK}" stroke-width="${2.2 * s}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

  const D = {
    coaster(c) {
      let s = shadow(100, 178, 70);
      const rings = [82, 64, 46, 28];
      rings.forEach((r, i) => { s += `<circle cx="100" cy="98" r="${r}" fill="${c[3 - i] || c[0]}"/><circle cx="100" cy="98" r="${r - 9}" ${tex(3.5)}/>`; });
      return s + `<circle cx="100" cy="98" r="5" fill="${shade(c[0], -0.25)}"/>`;
    },
    mandala(c) {
      let s = shadow(100, 182, 74);
      const petals = 15;
      for (let i = 0; i < petals; i++) { const a = (i / petals) * Math.PI * 2; s += `<circle cx="${100 + Math.cos(a) * 70}" cy="${98 + Math.sin(a) * 70}" r="15" fill="${c[4] || c[1]}"/>`; }
      s += `<circle cx="100" cy="98" r="70" fill="${c[3] || c[0]}"/>`;
      [56, 42, 28, 15].forEach((r, i) => { s += `<circle cx="100" cy="98" r="${r}" fill="${c[i] || c[0]}"/><circle cx="100" cy="98" r="${r - 6}" ${tex(3)}/>`; });
      return s;
    },
    granny(c) {
      let s = shadow(100, 182, 70) + `<g transform="rotate(-6 100 100)">`;
      const n = c.length; const step = 70 / n;
      for (let i = 0; i < n; i++) {
        const h = 72 - i * step; const col = c[i];
        s += `<rect x="${100 - h}" y="${98 - h}" width="${h * 2}" height="${h * 2}" rx="${10 - i}" fill="${col}"/>`;
        s += `<rect x="${100 - h + step * 0.45}" y="${98 - h + step * 0.45}" width="${(h - step * 0.45) * 2}" height="${(h - step * 0.45) * 2}" rx="4" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="2.5" stroke-dasharray="12 5" stroke-linecap="round"/>`;
      }
      return s + '</g>';
    },
    scarf(c) {
      const cols = c.length ? c : ['#7FD6BE'];
      let s = shadow(100, 184, 60) + '<g transform="rotate(-28 100 100)">';
      const x = 74, w = 52, y0 = 6, h = 172; const n = 14; const sh = h / n;
      for (let i = 0; i < n; i++) s += `<rect x="${x}" y="${y0 + i * sh}" width="${w}" height="${sh + 0.5}" fill="${cols[i % cols.length]}"/>`;
      s = s.replace('<rect', `<clipPath id="sc"><rect x="${x}" y="${y0}" width="${w}" height="${h}" rx="10"/></clipPath><g clip-path="url(#sc)"><rect`);
      s += '</g>';
      for (let i = 0; i < 5; i++) s += `<line x1="${x + 10 + i * 8}" y1="${y0 + 8}" x2="${x + 10 + i * 8}" y2="${y0 + h - 8}" ${tex(2.5)}/>`;
      for (let i = 0; i < 7; i++) {
        const fx = x + 5 + i * 7;
        s += `<path d="M${fx} ${y0 + h} q2 10 -1 18" stroke="${cols[0]}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
        s += `<path d="M${fx} ${y0} q-2 -10 1 -14" stroke="${cols[cols.length - 1]}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
      }
      return s + '</g>';
    },
    ball(c, o = {}) {
      const col = c[0]; const dk = shade(col, -0.18);
      let s = shadow(100, 176, 62);
      if (o.ears === 'cat') s += `<path d="M52 72 L60 26 L94 52 Z" fill="${dk}"/><path d="M148 72 L140 26 L106 52 Z" fill="${dk}"/><path d="M62 58 L65 38 L82 52Z" fill="#FFB3C6"/><path d="M138 58 L135 38 L118 52Z" fill="#FFB3C6"/>`;
      if (o.ears === 'bunny') s += `<ellipse cx="76" cy="30" rx="13" ry="34" fill="${dk}" transform="rotate(-12 76 30)"/><ellipse cx="124" cy="30" rx="13" ry="34" fill="${dk}" transform="rotate(12 124 30)"/><ellipse cx="76" cy="32" rx="6" ry="24" fill="#FFB3C6" transform="rotate(-12 76 32)"/><ellipse cx="124" cy="32" rx="6" ry="24" fill="#FFB3C6" transform="rotate(12 124 32)"/>`;
      if (o.ears === 'bear') s += `<circle cx="54" cy="56" r="18" fill="${dk}"/><circle cx="146" cy="56" r="18" fill="${dk}"/><circle cx="54" cy="56" r="9" fill="#FFB3C6"/><circle cx="146" cy="56" r="9" fill="#FFB3C6"/>`;
      if (o.ears === 'tuft') s += `<path d="M100 40 q-6 -18 -16 -22 M100 40 q0 -20 4 -26 M100 40 q8 -16 18 -18" stroke="${dk}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      s += `<circle cx="100" cy="106" r="66" fill="${col}"/>`;
      for (let i = 1; i <= 5; i++) s += `<ellipse cx="100" cy="106" rx="${66 - i * 2}" ry="${12 * i}" ${tex(2.5)}/>`;
      s += `<ellipse cx="74" cy="72" rx="16" ry="10" fill="#fff" opacity=".35" transform="rotate(-30 74 72)"/>`;
      s += face(100, 112, 1.05);
      if (o.ears === 'tuft') s += `<path d="M94 122 L106 122 L100 130Z" fill="#FF9F43"/>`;
      return s;
    },
    heart(c) {
      const col = c[0];
      return shadow(100, 180, 60) + `<path d="M100 170 C 40 125 18 95 30 62 C 42 30 84 28 100 58 C 116 28 158 30 170 62 C 182 95 160 125 100 170 Z" fill="${col}"/>
        <path d="M100 152 C 54 118 38 96 46 70 C 54 46 84 46 100 72 C 116 46 146 46 154 70 C 162 96 146 118 100 152 Z" ${tex(3)}/>
        <path d="M100 132 C 70 110 58 94 64 78 C 70 64 88 64 100 84 C 112 64 130 64 136 78 C 142 94 130 110 100 132 Z" ${tex(3)}/>
        <ellipse cx="60" cy="66" rx="12" ry="7" fill="#fff" opacity=".35" transform="rotate(-35 60 66)"/>`;
    },
    flower(c) {
      let s = shadow(100, 182, 60);
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        s += `<ellipse cx="${100 + Math.cos(a) * 44}" cy="${98 + Math.sin(a) * 44}" rx="34" ry="30" fill="${c[0]}" transform="rotate(${(a * 180) / Math.PI + 90} ${100 + Math.cos(a) * 44} ${98 + Math.sin(a) * 44})"/>`;
        s += `<path d="M100 98 L${100 + Math.cos(a) * 66} ${98 + Math.sin(a) * 66}" ${tex(2.5)}/>`;
      }
      return s + `<circle cx="100" cy="98" r="28" fill="${c[1]}"/><circle cx="100" cy="98" r="18" ${tex(3)}/>` + face(100, 98, 0.55);
    },
    potholder(c) {
      let s = shadow(100, 182, 64) + `<g transform="rotate(8 100 100)"><circle cx="150" cy="34" r="12" fill="none" stroke="${shade(c[0], -0.15)}" stroke-width="6"/>
        <rect x="34" y="40" width="124" height="124" rx="14" fill="${c[0]}"/>`;
      for (let i = 0; i < 9; i++) s += `<line x1="44" y1="${54 + i * 12.5}" x2="148" y2="${54 + i * 12.5}" ${tex(3)}/>`;
      s += `<rect x="34" y="40" width="124" height="124" rx="14" fill="none" stroke="${c[1]}" stroke-width="7"/>`;
      return s + '</g>';
    },
    headband(c) {
      const [a, b] = c;
      let s = shadow(100, 178, 72);
      s += `<ellipse cx="100" cy="104" rx="76" ry="56" fill="none" stroke="${a}" stroke-width="30"/>`;
      for (let i = -3; i <= 3; i++) s += `<ellipse cx="100" cy="104" rx="${76 + i * 4}" ry="${56 + i * 4}" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.6"/>`;
      s += `<path d="M84 38 C 96 60 104 60 116 38 L 120 70 C 106 82 94 82 80 70 Z" fill="${shade(a, -0.15)}"/>`;
      s += `<path d="M78 34 C 92 50 108 50 122 34" stroke="${b}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      return s;
    },
    bag(c) {
      const [a, b] = c;
      let s = shadow(100, 186, 64);
      s += `<path d="M70 70 C 70 20 130 20 130 70" stroke="${a}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
      s += `<path d="M44 70 L156 70 L144 172 Q100 184 56 172 Z" fill="${b}" opacity=".35"/>`;
      let net = '';
      for (let i = 0; i < 9; i++) { const x = 44 + i * 14; net += `<path d="M${x} 74 Q ${x + 7} 120 ${x + 2} 172" stroke="${a}" stroke-width="3" fill="none"/>`; }
      for (let j = 0; j < 7; j++) { const y = 86 + j * 13; net += `<path d="M${46 + j * 1.6} ${y} Q 100 ${y + 8} ${154 - j * 1.6} ${y}" stroke="${a}" stroke-width="3" fill="none"/>`; }
      s += net + `<rect x="40" y="62" width="120" height="14" rx="7" fill="${a}"/>`;
      s += `<circle cx="84" cy="128" r="16" fill="#FF9F43"/><circle cx="114" cy="140" r="14" fill="#F0454B"/><path d="M114 126 q3 -6 8 -6" stroke="#5BBF6A" stroke-width="3" fill="none"/>`;
      return s;
    },
    hat(c) {
      const [a, b] = c;
      let s = shadow(100, 182, 66);
      s += `<circle cx="100" cy="36" r="22" fill="${b}"/>`;
      for (let i = 0; i < 10; i++) { const ang = (i / 10) * Math.PI * 2; s += `<path d="M100 36 l${Math.cos(ang) * 22} ${Math.sin(ang) * 22}" stroke="rgba(0,0,0,.06)" stroke-width="2"/>`; }
      s += `<path d="M36 140 C 36 80 64 52 100 52 C 136 52 164 80 164 140 Z" fill="${a}"/>`;
      for (let i = 1; i < 6; i++) s += `<path d="M${36 + i * 3} ${140 - i * 15} Q 100 ${128 - i * 17} ${164 - i * 3} ${140 - i * 15}" ${tex(3)}/>`;
      s += `<rect x="30" y="134" width="140" height="40" rx="14" fill="${shade(a, -0.12)}"/>`;
      for (let i = 0; i < 14; i++) s += `<line x1="${40 + i * 9.4}" y1="140" x2="${40 + i * 9.4}" y2="168" stroke="rgba(255,255,255,.3)" stroke-width="3" stroke-linecap="round"/>`;
      return s;
    },
    octopus(c) {
      const col = c[0]; const dk = shade(col, -0.12);
      let s = shadow(100, 182, 70);
      for (let i = 0; i < 8; i++) {
        const x = 40 + i * 17; const dir = i % 2 ? 1 : -1;
        s += `<path d="M${x} 120 q${dir * 10} 22 0 38 q${-dir * 10} 12 ${dir * 8} 20" stroke="${dk}" stroke-width="13" fill="none" stroke-linecap="round"/>`;
      }
      s += `<path d="M34 128 C 30 60 60 34 100 34 C 140 34 170 60 166 128 Z" fill="${col}"/>`;
      for (let i = 1; i < 5; i++) s += `<path d="M${36 + i * 2} ${128 - i * 18} Q 100 ${118 - i * 20} ${164 - i * 2} ${128 - i * 18}" ${tex(2.5)}/>`;
      s += `<ellipse cx="72" cy="62" rx="14" ry="8" fill="#fff" opacity=".35" transform="rotate(-30 72 62)"/>`;
      return s + face(100, 98, 1);
    },
    strawberry(c) {
      const [r, g] = c;
      let s = shadow(100, 186, 50);
      s += `<circle cx="100" cy="22" r="12" fill="none" stroke="#C9CDD6" stroke-width="5"/><line x1="100" y1="34" x2="100" y2="50" stroke="#C9CDD6" stroke-width="4"/>`;
      s += `<path d="M100 178 C 52 150 30 110 40 82 C 50 56 80 52 100 56 C 120 52 150 56 160 82 C 170 110 148 150 100 178 Z" fill="${r}"/>`;
      const seeds = [[70, 92], [100, 86], [130, 92], [60, 116], [86, 112], [114, 112], [140, 116], [74, 138], [100, 136], [126, 138], [88, 158], [112, 158]];
      seeds.forEach(([x, y]) => { s += `<ellipse cx="${x}" cy="${y}" rx="2.6" ry="4" fill="#FFE27A"/>`; });
      for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i - 2) * 0.55; s += `<ellipse cx="${100 + Math.cos(a) * 22}" cy="${62 + Math.sin(a) * 8 + 4}" rx="18" ry="9" fill="${g}" transform="rotate(${(a * 180) / Math.PI + 90} ${100 + Math.cos(a) * 22} ${66 + Math.sin(a) * 8})"/>`; }
      s += `<circle cx="100" cy="58" r="10" fill="${shade(g, -0.15)}"/>`;
      return s + face(100, 116, 0.8);
    },
    basket(c) {
      const [a, b] = c;
      let s = shadow(100, 184, 72);
      s += `<path d="M30 70 L170 70 L160 166 Q100 180 40 166 Z" fill="${a}"/>`;
      for (let i = 0; i < 7; i++) s += `<path d="M${31 + i * 1.4} ${84 + i * 13} Q 100 ${92 + i * 13} ${169 - i * 1.4} ${84 + i * 13}" stroke="rgba(255,255,255,.35)" stroke-width="3" fill="none" stroke-dasharray="2 6" stroke-linecap="round"/>`;
      s += `<ellipse cx="100" cy="70" rx="70" ry="16" fill="${shade(a, -0.2)}"/><ellipse cx="100" cy="68" rx="70" ry="14" fill="none" stroke="${b}" stroke-width="7"/>`;
      s += `<rect x="38" y="92" width="18" height="10" rx="5" fill="${shade(a, -0.3)}"/><rect x="144" y="92" width="18" height="10" rx="5" fill="${shade(a, -0.3)}"/>`;
      s += `<circle cx="78" cy="54" r="16" fill="#FF7AB6"/><circle cx="104" cy="50" r="18" fill="#8EC5FF"/><circle cx="128" cy="56" r="14" fill="#FFD66B"/>`;
      s += `<path d="M66 50 q12 -8 24 4 M90 44 q14 -10 28 4 M118 52 q10 -6 20 2" ${tex(2.5)}/>`;
      return s;
    },
    c2c(c) {
      const [a, b] = c;
      const heart = ['0110110', '1111111', '1111111', '0111110', '0011100', '0001000'];
      let s = shadow(100, 186, 70) + `<g transform="rotate(-8 100 100)"><rect x="24" y="24" width="152" height="152" rx="12" fill="${b}"/>`;
      const cs = 19;
      for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
        const hy = y - 1, hx = x;
        const on = hy >= 0 && hy < heart.length && hx < 7 && heart[hy][hx] === '1';
        s += `<rect x="${28 + x * cs}" y="${28 + y * cs}" width="${cs - 2}" height="${cs - 2}" rx="3" fill="${on ? a : shade(b, -0.06)}" transform="rotate(0)"/>`;
        s += `<line x1="${30 + x * cs}" y1="${43 + y * cs}" x2="${43 + x * cs}" y2="${30 + y * cs}" stroke="rgba(255,255,255,.35)" stroke-width="1.5"/>`;
      }
      return s + '</g>';
    },
    mug(c) {
      const [a] = c;
      let s = shadow(100, 182, 64);
      s += `<path d="M138 84 q34 0 34 30 q0 30 -34 30" stroke="#E6E1EA" stroke-width="12" fill="none"/>`;
      s += `<rect x="42" y="56" width="100" height="120" rx="16" fill="#F4F0F7"/><ellipse cx="92" cy="58" rx="50" ry="10" fill="#C9A27E"/>`;
      s += `<rect x="38" y="88" width="108" height="56" rx="10" fill="${a}"/>`;
      for (let i = 0; i < 11; i++) s += `<line x1="${46 + i * 9.4}" y1="92" x2="${46 + i * 9.4}" y2="140" stroke="rgba(255,255,255,.3)" stroke-width="3" stroke-linecap="round"/>`;
      s += `<circle cx="132" cy="116" r="7" fill="#FFD66B" stroke="${shade('#FFD66B', -0.2)}" stroke-width="2"/>`;
      s += `<path d="M76 40 q-8 -10 0 -20 q8 -10 0 -18 M104 40 q-8 -10 0 -20 q8 -10 0 -18" stroke="#D8D0DE" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      return s;
    },
    yarn(c) {
      const col = c[0] || '#FF7A6B';
      let s = shadow(100, 176, 60) + `<circle cx="100" cy="104" r="62" fill="${col}"/>`;
      for (let i = 0; i < 6; i++) s += `<path d="M${50 + i * 4} ${70 + i * 12} Q 100 ${40 + i * 22} ${150 - i * 4} ${70 + i * 12}" stroke="${shade(col, -0.15)}" stroke-width="3" fill="none"/>`;
      for (let i = 0; i < 5; i++) s += `<path d="M${64 + i * 14} 50 Q ${40 + i * 24} 110 ${70 + i * 14} 162" stroke="rgba(255,255,255,.35)" stroke-width="3" fill="none"/>`;
      s += `<path d="M150 136 q30 20 10 40 q-14 14 10 22" stroke="${col}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      s += `<line x1="40" y1="30" x2="150" y2="170" stroke="#C9A27E" stroke-width="7" stroke-linecap="round"/><path d="M40 30 q-6 -2 -4 6" stroke="#C9A27E" stroke-width="7" fill="none" stroke-linecap="round"/>`;
      return s;
    }
  };

  function draw(art, cls = '') {
    const fn = D[art.k] || D.yarn;
    return `<svg class="art ${cls}" viewBox="0 0 200 200" aria-hidden="true">${fn(art.c || [], art)}</svg>`;
  }

  /* simboli internazionali dei diagrammi */
  const SYM = {
    nodo: '<path d="M50 78 C20 78 20 40 50 40 C80 40 80 78 50 78 Z M50 78 L50 94" />',
    cat: '<ellipse cx="50" cy="50" rx="26" ry="14"/>',
    mbss: '<circle cx="50" cy="50" r="11" fill="currentColor"/>',
    mb: '<path d="M30 30 L70 70 M70 30 L30 70"/>',
    mma: '<path d="M50 84 L50 22 M30 22 L70 22"/>',
    ma: '<path d="M50 88 L50 16 M30 16 L70 16 M38 58 L62 44"/>',
    mad: '<path d="M50 90 L50 12 M30 12 L70 12 M38 46 L62 32 M38 66 L62 52"/>',
    am: '<circle cx="50" cy="50" r="24"/><path d="M50 50 m0 -10 a10 10 0 1 1 -10 10"/>',
    aum: '<path d="M50 86 L28 26 M50 86 L72 26 M18 30 L38 22 M62 22 L82 30"/>',
    dim: '<path d="M28 80 L50 22 L72 80 M40 22 L60 22"/>',
    cp: '<path d="M32 34 L68 70 M68 34 L32 70"/><path d="M28 84 Q50 98 72 84"/>',
    colore: '<circle cx="34" cy="50" r="16" fill="#FF7A6B" stroke="none"/><circle cx="68" cy="50" r="16" fill="#7FD6BE" stroke="none"/><path d="M44 80 Q50 90 58 80"/>',
    chiudere: '<path d="M22 78 L74 26"/><ellipse cx="78" cy="22" rx="8" ry="4" transform="rotate(-45 78 22)"/><path d="M22 78 q-8 8 4 14"/>',
    gambero: '<path d="M30 30 L70 70 M70 30 L30 70"/><path d="M84 86 L20 86 M30 78 L20 86 L30 94"/>',
    popcorn: '<ellipse cx="50" cy="40" rx="24" ry="22"/><path d="M50 62 L50 90 M38 30 L62 30"/>'
  };
  const sym = (id, cls = '') => `<svg class="sym ${cls}" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${SYM[id] || SYM.cat}</svg>`;

  window.Art = { draw, sym, shade };
})();
