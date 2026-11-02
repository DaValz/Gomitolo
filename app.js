/* Gomitolo – app */
(function () {
  'use strict';
  const D = window.GOMITOLO; const A = window.Art;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const view = $('#view');

  /* ---------------- lingua ---------------- */
  const LANG = document.documentElement.lang === 'en' ? 'en' : 'it';
  const L = (it, en) => (LANG === 'en' ? en : it);
  const LOC = L('it-IT', 'en-US');

  /* ---------------- stato ---------------- */
  const KEY = 'gomitolo-v1';
  const S = Object.assign({ fav: [], prog: {}, done: [], learned: [], counters: [{ id: 1, name: L('Giri', 'Rows'), n: 0 }], streak: { last: null, count: 0 }, theme: 'auto', name: '', wprog: {}, wsave: {} },
    (() => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } })());
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage pieno o privato */ } };

  /* ---------------- date ---------------- */
  const pad = (n) => String(n).padStart(2, '0');
  const dkey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const dayNum = (d = new Date()) => Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5);
  (function streak() {
    const today = dkey(); const y = new Date(); y.setDate(y.getDate() - 1);
    if (S.streak.last === today) return;
    S.streak.count = S.streak.last === dkey(y) ? S.streak.count + 1 : 1; S.streak.last = today; save();
  })();

  /* ---------------- dati derivati ---------------- */
  const genCache = {};
  function getPattern(id) {
    const p = D.patterns.find((x) => x.id === id); if (p) return p;
    const m = /^gen-(\w+)-(\d+)$/.exec(id || '');
    if (m && D.gen[m[1]]) return genCache[id] || (genCache[id] = D.gen[m[1]](+m[2]));
    return null;
  }
  const getStitch = (id) => D.stitches.find((s) => s.id === id);

  /* ---------------- schemi dal web (data/web.json, aggiornato ogni giorno da una GitHub Action) ---------------- */
  const WEB = { items: [], byId: {}, updated: null, sources: [], state: 'loading' };
  async function loadWeb() {
    try {
      const r = await fetch('data/web.json', { cache: 'no-cache' });
      if (!r.ok) throw new Error(r.status);
      const j = await r.json();
      WEB.items = (j.items || []).map((w) => Object.assign(w, { web: true }));
      WEB.byId = Object.fromEntries(WEB.items.map((w) => [w.id, w]));
      WEB.updated = j.updated; WEB.sources = j.sources || []; WEB.state = 'ok';
    } catch (e) { WEB.state = 'error'; }
    const h = location.hash || '#/';
    if (h === '#/esplora' && $('#results')) renderResults(true);
    else if (/^#?\/?(oggi)?$|^#\/(io|w\/|wfai\/)/.test(h)) render(true);
  }
  const getWeb = (id) => WEB.byId[id] || (S.wsave[id] ? Object.assign({ web: true }, S.wsave[id]) : null);
  const getAny = (id) => (/^w[0-9a-f]{10}$/.test(id) ? getWeb(id) : getPattern(id));
  const remember = (w) => { const { id, title, link, img, src, site, author, date, cat, level, tags, excerpt } = w; S.wsave[id] = { id, title, link, img, src, site, author, date, cat, level, tags, excerpt }; };
  const wprog = (id) => S.wprog[id] || (S.wprog[id] = { n: 0, notes: '', t: Date.now() });
  const WART = {
    amigurumi: { k: 'ball', ears: 'bear', c: ['#C69C7B', '#FFB3C6'] }, casa: { k: 'granny', c: ['#FF7A6B', '#FFD66B', '#7FD6BE', '#fff'] },
    accessori: { k: 'bag', c: ['#8EC5FF', '#fff'] }, abbigliamento: { k: 'hat', c: ['#B7A2F5', '#fff'] },
    decorazioni: { k: 'flower', c: ['#FF9EC2', '#FFD66B'] }, tecniche: { k: 'yarn', c: ['#7FD6BE'] }
  };
  const WBG = ['#FFE1D6', '#E2F5EE', '#FFF1C9', '#E3EEFF', '#EDE6FF', '#FFE3EE'];
  const wbg = (w) => WBG[D.hash(w.id) % WBG.length];
  const catOf = (id) => D.categories.find((c) => c.id === id) || { n: id, e: '🧶' };
  const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return ''; } };
  const wdate = (w) => (w.date ? new Date(w.date).toLocaleDateString(LOC, { day: 'numeric', month: 'short', year: 'numeric' }) : '');
  const wimg = (w, cls = '') => `${A.draw(WART[w.cat] || WART.tecniche, cls)}${w.img ? `<img src="${esc(w.img)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.remove()">` : ''}`;
  function dailyWeb(offset = 0) {
    if (!WEB.items.length) return null;
    const d = new Date(); d.setDate(d.getDate() + offset);
    const pool = WEB.items.filter((w) => w.img); const list = pool.length ? pool : WEB.items;
    return list[D.hash('web' + dkey(d)) % list.length];
  }
  function dailyPattern(offset = 0) {
    const d = new Date(); d.setDate(d.getDate() + offset);
    const types = Object.keys(D.gen); const type = types[dayNum(d) % types.length];
    return getPattern(`gen-${type}-${D.hash(dkey(d) + type) % 1000000}`);
  }
  function shuffled(arr, seed) {
    const r = D.rng(seed); const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const prog = (id) => S.prog[id] || (S.prog[id] = { step: 0, checked: [], cnt: {}, mat: [], t: Date.now() });
  const pct = (p) => { const pr = S.prog[p.id]; if (S.done.includes(p.id)) return 100; return pr ? Math.round((pr.checked.length / p.steps.length) * 100) : 0; };
  const LEVEL = L(['', 'Principiante', 'Intermedio', 'Avanzato'], ['', 'Beginner', 'Intermediate', 'Advanced']);
  const levelDots = (l) => `<span class="dots" aria-label="${LEVEL[l]}">${[1, 2, 3].map((i) => `<i class="${i <= l ? 'on' : ''}"></i>`).join('')}</span>`;

  /* abbreviazioni cliccabili */
  const ABRE = D.abbrRe || /(^|[^\p{L}])(mbss|mma|mad|mb|ma|cat|aum|dim|AM|cp)(?![\p{L}])/gu;
  const fmt = (t) => esc(t).replace(ABRE, (m, pre, a) => `${pre}<button class="ab" data-act="abbr" data-a="${a}">${a}</button>`)
    .replace(/\*/g, '<span class="rep">✱</span>');

  /* ---------------- icone ---------------- */
  const I = {
    back: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9.2-9C1.4 8 3.3 4.5 6.8 4.5c2 0 3.3 1.1 5.2 3 1.9-1.9 3.2-3 5.2-3 3.5 0 5.4 3.5 4 6.5C19 15.6 12 20 12 20z"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    minus: '<svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg>',
    reset: '<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>',
    dice: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="9" cy="9" r="1.2" fill="currentColor"/><circle cx="15" cy="15" r="1.2" fill="currentColor"/><circle cx="15" cy="9" r="1.2" fill="currentColor"/><circle cx="9" cy="15" r="1.2" fill="currentColor"/></svg>',
    share: '<svg viewBox="0 0 24 24"><path d="M12 3v12M7 8l5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg>',
    trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>',
    chev: '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>',
    ext: '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/></svg>',
    globe: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg>',
    fire: '<svg viewBox="0 0 24 24"><path d="M12 22c4.4 0 7-2.9 7-6.6 0-3.3-2.2-5.6-4-7.4.2 2-.7 3.4-1.8 3.9C13.6 8.4 12 5 9 2c.4 3.6-4 6.6-4 11.6C5 18.6 7.6 22 12 22z" fill="currentColor" stroke="none"/></svg>'
  };

  /* ---------------- componenti ---------------- */
  function card(p, cls = '') {
    const pc = pct(p); const fav = S.fav.includes(p.id);
    return `<a class="pcard ${cls}" href="#/p/${p.id}">
      <div class="pcard-art" style="background:${p.bg}">${A.draw(p.art)}
        ${fav ? `<span class="badge-heart">${I.heart}</span>` : ''}
        ${p.gen ? `<span class="badge-new">${L('Nuovo', 'New')}</span>` : ''}
        ${pc > 0 ? `<span class="ring" style="--p:${pc}"><b>${pc === 100 ? '✓' : pc + '%'}</b></span>` : ''}
      </div>
      <div class="pcard-body"><div class="pcard-title">${esc(p.title)}</div>
      <div class="pcard-meta">${levelDots(p.level)}<span>${esc(p.time)}</span></div></div></a>`;
  }
  function wcard(w, cls = '') {
    const fav = S.fav.includes(w.id); const done = S.done.includes(w.id); const n = (S.wprog[w.id] || {}).n || 0;
    return `<a class="pcard webcard ${cls}" href="#/w/${w.id}">
      <div class="pcard-art" style="background:${wbg(w)}">${wimg(w)}
        <span class="badge-src">${esc(w.src)}</span>
        ${fav ? `<span class="badge-heart">${I.heart}</span>` : ''}
        ${done ? '<span class="ring" style="--p:100"><b>✓</b></span>' : n ? `<span class="badge-cnt">${n} ${L('giri', 'rows')}</span>` : ''}
      </div>
      <div class="pcard-body"><div class="pcard-title">${esc(w.title)}</div>
      <div class="pcard-meta">${w.level ? levelDots(w.level) : `<span>${catOf(w.cat).e}</span>`}<span>${esc(catOf(w.cat).n)}</span></div></div></a>`;
  }
  const anyCard = (x, cls) => (x.web ? wcard(x, cls) : card(x, cls));
  const header = (title, sub = '', right = '') => `<header class="lt"><div><p class="lt-sub">${sub}</p><h1>${title}</h1></div>${right}</header>`;
  const section = (title, more = '') => `<div class="sec-h"><h2>${title}</h2>${more}</div>`;

  /* ---------------- pagine ---------------- */
  function pageHome() {
    const now = new Date(); const h = now.getHours();
    const greet = h < 5 ? L('Buonanotte', 'Good night') : h < 13 ? L('Buongiorno', 'Good morning') : h < 18 ? L('Buon pomeriggio', 'Good afternoon') : L('Buonasera', 'Good evening');
    const date = now.toLocaleDateString(LOC, { weekday: 'long', day: 'numeric', month: 'long' });
    const dp = dailyPattern(); const n = dayNum();
    const ds = D.stitches[n % D.stitches.length]; const tip = D.tips[n % D.tips.length];
    const featured = shuffled(D.patterns, n).slice(0, 6);
    const wip = Object.keys(S.prog).filter((id) => !S.done.includes(id) && S.prog[id].checked.length > 0).map(getPattern).filter(Boolean)
      .sort((a, b) => S.prog[b.id].t - S.prog[a.id].t);
    const pick = featured[0];
    const wwip = Object.keys(S.wprog).filter((id) => !S.done.includes(id) && S.wprog[id].n > 0).map(getWeb).filter(Boolean)
      .sort((a, b) => S.wprog[b.id].t - S.wprog[a.id].t);
    const name = S.name ? `, ${esc(S.name)}` : '';
    return `${header(`${greet}${name}`, date, `<a class="streak" href="#/io">${I.fire}<b>${S.streak.count}</b></a>`)}
      <a class="hero-card" href="#/p/${dp.id}" style="--bg:${dp.bg}">
        <div class="hero-tag">✨ ${L('Progetto del giorno', 'Project of the day')}</div>
        <div class="hero-art">${A.draw(dp.art, 'float')}</div>
        <div class="hero-info"><h3>${esc(dp.title)}</h3><p>${esc(dp.subtitle)} · ${esc(dp.time)} · ${LEVEL[dp.level]}</p>
        <span class="btn btn-sm btn-dark">${I.play} ${L('Inizia', 'Start')}</span></div>
      </a>
      ${wip.length || wwip.length ? section(L('Continua a lavorare', 'Keep working')) + `<div class="hscroll">${wip.map((p) => `
        <a class="wip" href="#/fai/${p.id}"><div class="wip-art" style="background:${p.bg}">${A.draw(p.art)}</div>
        <div class="wip-b"><b>${esc(p.title)}</b><small>${L('Passo', 'Step')} ${Math.min(S.prog[p.id].step + 1, p.steps.length)} ${L('di', 'of')} ${p.steps.length}</small>
        <div class="bar"><i style="width:${pct(p)}%"></i></div></div></a>`).join('')}${wwip.map((w) => `
        <a class="wip" href="#/wfai/${w.id}"><div class="wip-art wimg" style="background:${wbg(w)}">${wimg(w)}</div>
        <div class="wip-b"><b>${esc(w.title)}</b><small>${S.wprog[w.id].n} ${L('giri', 'rows')} · ${esc(w.src)}</small></div></a>`).join('')}</div>` : ''}
      <div class="duo">
        <a class="mini-card" href="#/punto/${ds.id}" style="--bg:${ds.color}">
          <span class="mini-tag">${L('Punto del giorno', 'Stitch of the day')}</span>${A.sym(ds.id, 'big')}<b>${esc(ds.name)}</b><small>${esc(ds.us)}</small></a>
        <a class="mini-card" href="#/p/${pick.id}" style="--bg:${pick.bg}">
          <span class="mini-tag">${L('Scelto per te', 'Picked for you')}</span><div class="mini-art">${A.draw(pick.art)}</div><b>${esc(pick.title)}</b><small>${LEVEL[pick.level]}</small></a>
      </div>
      <div class="tip-card"><span>💡</span><div><b>${L('Consiglio del giorno', 'Tip of the day')}</b><p>${fmt(tip)}</p></div></div>
      ${webHome()}
      ${section(L('Novità di oggi', 'New today'), `<a href="#/esplora" class="more">${L('Vedi tutti', 'See all')}</a>`)}
      <div class="hscroll">${featured.slice(1).map((p) => card(p, 'h')).join('')}</div>
      ${section(L('Categorie', 'Categories'))}
      <div class="cats">${D.categories.slice(1).map((c) => `<a class="cat" href="#/esplora" data-act="setcat" data-c="${c.id}"><span>${c.e}</span>${c.n}</a>`).join('')}</div>
      ${section(L('In arrivo domani', 'Coming tomorrow'))}
      <div class="tomorrow">${A.draw(dailyPattern(1).art)}<div><b>${L('Un nuovo progetto a sorpresa', 'A brand-new surprise project')}</b><p>${L('Torna domani: ogni giorno il gomitolo sforna uno schema nuovo, generato solo per oggi.', 'Come back tomorrow: every day Gomitolo spins up a new pattern, generated just for that day.')}</p></div></div>`;
  }

  let EX = { q: '', cat: 'tutti', lvl: 0, src: 'tutti', lim: 40 };
  function webHome() {
    if (WEB.state === 'loading') return `${section(L('Dal web', 'From the web'))}<div class="hscroll">${'<div class="pcard h skel"></div>'.repeat(3)}</div>`;
    if (!WEB.items.length) return '';
    const dw = dailyWeb(); const fresh = WEB.items.slice(0, 12);
    return `<a class="wfeat" href="#/w/${dw.id}" style="--bg:${wbg(dw)}">
        <div class="wfeat-img">${wimg(dw)}<span class="hero-tag">🌍 ${L('Scoperta del giorno', 'Discovery of the day')}</span></div>
        <div class="wfeat-b"><small>${esc(dw.src)} · ${catOf(dw.cat).e} ${esc(catOf(dw.cat).n)}</small><b>${esc(dw.title)}</b>
        ${dw.excerpt ? `<p>${esc(dw.excerpt)}</p>` : ''}</div></a>
      ${section(L('Novità dal web', 'Fresh from the web'), `<a href="#/esplora" class="more" data-act="setsrc" data-s="web">${L('Vedi tutte', 'See all')}</a>`)}
      <div class="hscroll">${fresh.map((w) => wcard(w, 'h')).join('')}</div>`;
  }
  function pageExplore() {
    const wn = WEB.items.length;
    return `${header(L('Esplora', 'Explore'), `${D.patterns.length} ${L('progetti Gomitolo', 'Gomitolo projects')}${wn ? ` + ${wn} ${L('schemi dal web', 'patterns from the web')}` : ''}`)}
      <label class="search">${I.search}<input id="q" type="search" placeholder="${L('Cerca: amigurumi, borsa, granny, cardigan…', 'Search: amigurumi, bag, granny, cardigan…')}" value="${esc(EX.q)}" autocomplete="off" enterkeyhint="search"></label>
      <div class="seg" id="srcseg">${[['tutti', L('✨ Tutto', '✨ All')], ['gomitolo', '🧶 Gomitolo'], ['web', L('🌍 Dal web', '🌍 Web')]].map(([k, n]) => `<button class="${EX.src === k ? 'on' : ''}" data-act="src" data-s="${k}">${n}</button>`).join('')}</div>
      <div class="chips" id="catchips">${D.categories.map((c) => `<button class="chip ${EX.cat === c.id ? 'on' : ''}" data-act="cat" data-c="${c.id}">${c.e} ${c.n}</button>`).join('')}</div>
      <div class="seg" id="lvlseg">${[L('Tutti', 'All')].concat(LEVEL.slice(1)).map((l, i) => `<button class="${EX.lvl === i ? 'on' : ''}" data-act="lvl" data-l="${i}">${l}</button>`).join('')}</div>
      ${EX.src !== 'web' ? `<div class="gen-box">
        <div><b>${L('Generatore di progetti', 'Project generator')}</b><p>${L('Uno schema nuovo, mai visto, in un tocco.', 'A brand-new, never-seen pattern in one tap.')}</p></div>
        <div class="gen-btns">${Object.entries(D.genInfo).map(([k, v]) => `<button class="gen-b" data-act="gen" data-t="${k}"><span>${v.e}</span>${v.n}</button>`).join('')}</div>
      </div>` : ''}
      <div id="results"></div>`;
  }
  const IT_EN = { borsa: 'bag', borse: 'bag', cappello: 'hat', berretto: 'beanie', sciarpa: 'scarf', coperta: 'blanket', copertina: 'blanket', maglione: 'sweater', cardigan: 'cardigan', top: 'top', gilet: 'vest',
    calze: 'socks', pantofole: 'slippers', guanti: 'gloves', scialle: 'shawl', cuscino: 'pillow', cestino: 'basket', tappeto: 'rug', presina: 'potholder', sottobicchiere: 'coaster', fiore: 'flower', fiori: 'flower',
    orsetto: 'bear', coniglio: 'bunny', gatto: 'cat', cane: 'dog', polpo: 'octopus', bambola: 'doll', natale: 'christmas', pasqua: 'easter', zucca: 'pumpkin', cuore: 'heart', punto: 'stitch', orecchini: 'earrings',
    bambini: 'baby', neonato: 'baby', fascia: 'headband', portachiavi: 'keychain', astuccio: 'pouch', tunisino: 'tunisian', mattonella: 'square', piastrella: 'square' };
  const matches = (hay, q) => q.split(/\s+/).every((w) => hay.includes(w) || (IT_EN[w] && hay.includes(IT_EN[w])));
  function renderResults(more) {
    const q = norm(EX.q.trim());
    const own = EX.src === 'web' ? [] : [dailyPattern()].concat(D.patterns).filter((p) => (EX.cat === 'tutti' || p.cat === EX.cat) && (!EX.lvl || p.level === EX.lvl) &&
      (!q || matches(norm([p.title, p.subtitle, p.cat, p.tags.join(' '), p.stitches.map((s) => (getStitch(s) || {}).name).join(' ')].join(' ')), q)));
    const web = EX.src === 'gomitolo' ? [] : WEB.items.filter((w) => (EX.cat === 'tutti' || w.cat === EX.cat) && (!EX.lvl || w.level === EX.lvl) &&
      (!q || matches(norm([w.title, w.excerpt, w.src, w.cat, catOf(w.cat).n, w.tags.join(' ')].join(' ')), q)));
    if (!more) EX.lim = 40;
    const shown = web.slice(0, EX.lim);
    const qs = encodeURIComponent(EX.q.trim() || 'crochet'); const qe = encodeURIComponent(`${EX.q.trim()} crochet free pattern`.trim());
    const elsewhere = `${section(L('Cerca altrove', 'Search elsewhere'), `<span class="muted">${L('si apre nel browser', 'opens in your browser')}</span>`)}
      <div class="else">
        <a href="https://www.ravelry.com/patterns/search#craft=crochet&availability=free&query=${qs}" target="_blank" rel="noopener"><b>Ravelry</b><small>${L('schemi gratuiti', 'free patterns')}</small></a>
        <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(`${EX.q.trim()} ${L('uncinetto', 'crochet')} tutorial`.trim())}" target="_blank" rel="noopener"><b>YouTube</b><small>video tutorial</small></a>
        <a href="https://www.google.com/search?q=${qe}" target="_blank" rel="noopener"><b>Google</b><small>${L('tutto il web', 'the whole web')}</small></a>
        <a href="https://www.pinterest.com/search/pins/?q=${qe}" target="_blank" rel="noopener"><b>Pinterest</b><small>${L('idee e foto', 'ideas & photos')}</small></a>
      </div>`;
    const empty = !own.length && !web.length;
    $('#results').innerHTML = (empty ? `<div class="empty">${A.draw({ k: 'yarn', c: ['#FFB38A'] })}<p>${L('Nessun progetto trovato.<br>Prova il generatore o cerca altrove qui sotto.', 'No projects found.<br>Try the generator or search elsewhere below.')}</p></div>` : '') +
      (own.length ? `${EX.src === 'tutti' && web.length ? section('🧶 Gomitolo', `<span class="muted">${own.length}</span>`) : ''}<div class="grid">${own.map((p) => card(p)).join('')}</div>` : '') +
      (web.length ? `${EX.src === 'tutti' ? section(L('🌍 Dal web', '🌍 From the web'), `<span class="muted">${web.length}</span>`) : ''}<div class="grid">${shown.map((w) => wcard(w)).join('')}</div>
        ${web.length > shown.length ? `<button class="btn btn-ghost btn-block more-btn" data-act="more">${L('Mostra altri', 'Show')} ${Math.min(40, web.length - shown.length)}</button>` : ''}` : '') +
      (EX.src !== 'gomitolo' && WEB.state === 'error' ? `<p class="muted pad">${L('Schemi dal web non disponibili offline: riprova con la connessione.', 'Web patterns are not available offline: try again when connected.')}</p>` : '') + elsewhere;
  }

  function pageProject(id) {
    const p = getPattern(id); if (!p) return pageNotFound();
    const pr = S.prog[id]; const fav = S.fav.includes(id); const done = S.done.includes(id);
    const started = pr && pr.checked.length > 0;
    const cta = done ? `${I.reset} ${L('Rifallo da capo', 'Make it again')}` : started ? `${I.play} ${L('Riprendi · passo', 'Resume · step')} ${Math.min(pr.step + 1, p.steps.length)} ${L('di', 'of')} ${p.steps.length}` : `${I.play} ${L('Inizia passo passo', 'Start step by step')}`;
    return `<div class="phero" style="--bg:${p.bg}">
        <div class="topbtns"><button class="circle" data-act="back" aria-label="${L('Indietro', 'Back')}">${I.back}</button>
        <span><button class="circle" data-act="share" aria-label="${L('Condividi', 'Share')}">${I.share}</button>
        <button class="circle ${fav ? 'fav' : ''}" data-act="fav" data-id="${p.id}" aria-label="${L('Preferito', 'Favorite')}">${I.heart}</button></span></div>
        ${A.draw(p.art, 'float')}
      </div>
      <article class="pbody">
        ${p.gen ? `<span class="pill pill-new">✨ ${L('Generato per te', 'Generated for you')}</span>` : ''}
        <h1>${esc(p.title)}</h1><p class="psub">${esc(p.subtitle)}</p>
        <div class="facts">
          <div><small>${L('Livello', 'Level')}</small><b>${levelDots(p.level)} ${LEVEL[p.level]}</b></div>
          <div><small>${L('Tempo', 'Time')}</small><b>⏱ ${esc(p.time)}</b></div>
          <div><small>${L('Uncinetto', 'Hook')}</small><b>🪡 ${esc(p.hook)}</b></div>
          <div><small>${L('Misure', 'Size')}</small><b>📐 ${esc(p.size)}</b></div>
        </div>
        ${done ? `<div class="done-banner">🎉 ${L('Completato! Sei bravissima.', 'Finished! Amazing work.')}</div>` : ''}
        <p class="desc">${esc(p.desc)}</p>
        ${section(L('Materiali', 'Materials'))}
        <ul class="checklist">${p.materials.map((m, i) => `<li><button class="chk ${pr && pr.mat.includes(i) ? 'on' : ''}" data-act="mat" data-id="${p.id}" data-i="${i}">${I.check}</button>${esc(m)}</li>`).join('')}</ul>
        ${section(L('Punti che userai', 'Stitches you’ll use'))}
        <div class="stitch-chips">${p.stitches.map(getStitch).filter(Boolean).map((s) => `<a class="schip" href="#/punto/${s.id}" style="--bg:${s.color}">${A.sym(s.id)}<span>${esc(s.name)}</span>${S.learned.includes(s.id) ? '<i>✓</i>' : ''}</a>`).join('')}</div>
        ${section(L('Schema', 'Pattern'), `<span class="muted">${p.steps.length} ${L('passi', 'steps')}</span>`)}
        <ol class="steps">${p.steps.map((s, i) => {
          const on = pr && pr.checked.includes(i);
          return `<li class="${on ? 'on' : ''}"><button class="num" data-act="stepchk" data-id="${p.id}" data-i="${i}">${on ? I.check : i + 1}</button>
          <div><b>${s.color ? `<span class="sw" style="background:${s.color}"></span>` : ''}${esc(s.t)}</b><p>${fmt(s.d)}</p>
          ${s.count ? `<span class="count">= ${esc(s.count)}</span>` : ''}</div></li>`;
        }).join('')}</ol>
        <p class="legend">${L('Tocca un’abbreviazione evidenziata per vedere il punto.', 'Tap a highlighted abbreviation to see the stitch.')} <span class="rep">✱</span> ${L('indica l’inizio e la fine della parte da ripetere.', 'marks the start and end of the part to repeat.')}</p>
      </article>
      <div class="cta-bar"><button class="btn btn-primary btn-block" data-act="start" data-id="${p.id}">${cta}</button></div>`;
  }

  function pageWeb(id) {
    const w = getWeb(id);
    if (!w) return WEB.state === 'loading' ? `<div class="empty pad">${A.draw({ k: 'yarn', c: ['#FFB38A'] }, 'float')}<p>${L('Carico lo schema…', 'Loading pattern…')}</p></div>` : pageNotFound();
    const fav = S.fav.includes(id); const done = S.done.includes(id); const pr = S.wprog[id]; const c = catOf(w.cat);
    const related = WEB.items.filter((x) => x.id !== id && x.cat === w.cat).slice(0, 8);
    const tags = L({ granny: 'Granny square', c2c: 'C2C', tunisian: 'Tunisino', mosaico: 'Mosaico', tapestry: 'Tapestry', 'no-sew': 'Senza cuciture', bambini: 'Bambini', natale: 'Natale',
      halloween: 'Halloween', pasqua: 'Pasqua', estate: 'Estate', inverno: 'Inverno', veloce: 'Veloce', scarti: 'Avanzi di filo', video: 'Video', raccolta: 'Raccolta' },
    { granny: 'Granny square', c2c: 'C2C', tunisian: 'Tunisian', mosaico: 'Mosaic', tapestry: 'Tapestry', 'no-sew': 'No-sew', bambini: 'Kids', natale: 'Christmas',
      halloween: 'Halloween', pasqua: 'Easter', estate: 'Summer', inverno: 'Winter', veloce: 'Quick', scarti: 'Scrap yarn', video: 'Video', raccolta: 'Roundup' });
    return `<div class="phero wphero" style="--bg:${wbg(w)}">
        <div class="wphoto">${wimg(w, 'float')}</div>
        <div class="topbtns"><button class="circle" data-act="back" aria-label="${L('Indietro', 'Back')}">${I.back}</button>
        <span><button class="circle" data-act="share" aria-label="${L('Condividi', 'Share')}">${I.share}</button>
        <button class="circle ${fav ? 'fav' : ''}" data-act="fav" data-id="${id}" aria-label="${L('Preferito', 'Favorite')}">${I.heart}</button></span></div>
      </div>
      <article class="pbody">
        <span class="pill">${c.e} ${esc(c.n)}</span> <span class="pill pill-src">${I.globe} ${esc(w.src)}</span> ${L('<span class="pill">EN</span>', '')}
        <h1>${esc(w.title)}</h1>
        <p class="psub">${w.author ? `${L('di', 'by')} ${esc(w.author)} · ` : ''}${esc(host(w.site || w.link))}${w.date ? ` · ${wdate(w)}` : ''}</p>
        ${done ? `<div class="done-banner">🎉 ${L('Completato! Sei bravissima.', 'Finished! Amazing work.')}</div>` : ''}
        ${w.excerpt ? `<p class="desc">${esc(w.excerpt)}</p>` : ''}
        <div class="facts">
          <div><small>${L('Livello', 'Level')}</small><b>${w.level ? `${levelDots(w.level)} ${LEVEL[w.level]}` : L('Vedi schema', 'See pattern')}</b></div>
          <div><small>${L('Contagiri', 'Row counter')}</small><b>🔢 ${pr ? pr.n : 0} ${L('giri', 'rows')}</b></div>
        </div>
        ${w.tags && w.tags.length ? `<div class="wtags">${w.tags.map((t) => `<span>#${esc(tags[t] || t)}</span>`).join('')}</div>` : ''}
        <a class="btn btn-primary btn-block wopen" href="${esc(w.link)}" target="_blank" rel="noopener">${I.ext} ${L('Apri lo schema originale', 'Open the original pattern')}</a>
        <div class="tip-card"><span>📖</span><div><b>${L('Come funziona', 'How it works')}</b><p>${L(`Lo schema completo è sul sito di ${esc(w.src)}: aprilo in una scheda accanto e usa il contagiri di Gomitolo per seguire le righe. Le abbreviazioni inglesi sono nel glossario (es. sc = mb, dc = ma).`, `The full pattern lives on ${esc(w.src)}: open it in another tab and use Gomitolo’s row counter to keep track. Check the source: US and UK terms differ (US sc = UK dc), see the glossary.`)}</p></div></div>
        <a class="row-link" href="#/glossario"><span>📖</span><div><b>${L('Glossario IT · USA · UK', 'Glossary US · UK · IT')}</b><small>${L('Traduci le abbreviazioni dello schema', 'Translate pattern abbreviations')}</small></div>${I.chev}</a>
        <a class="row-link" href="https://www.youtube.com/results?search_query=${encodeURIComponent(w.title)}" target="_blank" rel="noopener"><span>▶️</span><div><b>${L('Cerca un video', 'Find a video')}</b><small>${L('Lo stesso progetto su YouTube', 'The same project on YouTube')}</small></div>${I.chev}</a>
        ${related.length ? section(L(`Altri ${esc(c.n.toLowerCase())} dal web`, `More ${esc(c.n.toLowerCase())} from the web`)) + `<div class="hscroll">${related.map((x) => wcard(x, 'h')).join('')}</div>` : ''}
        <p class="legend">${L(`Contenuto di proprietà di ${esc(w.src)}: Gomitolo mostra solo titolo, anteprima e link all’originale.`, `Content owned by ${esc(w.src)}: Gomitolo only shows the title, a preview and a link to the original.`)}</p>
      </article>
      <div class="cta-bar"><button class="btn btn-primary btn-block" data-act="wstart" data-id="${id}">${done ? `${I.reset} ${L('Rifallo da capo', 'Make it again')}` : pr && pr.n ? `${I.play} ${L('Riprendi', 'Resume')} · ${pr.n} ${L('giri', 'rows')}` : `${I.play} ${L('Lavora con il contagiri', 'Work with the row counter')}`}</button></div>`;
  }

  function pageWebMake(id) {
    const w = getWeb(id); if (!w) return pageWeb(id);
    const pr = wprog(id);
    return `<div class="make" style="--bg:${wbg(w)}">
      <div class="make-top">
        <button class="circle" data-act="wexit" data-id="${id}" aria-label="${L('Chiudi', 'Close')}">${I.close}</button>
        <div class="make-title"><small>${esc(w.src)}</small><b>${esc(w.title)}</b></div>
        <div class="make-mini wimg">${wimg(w)}</div>
      </div>
      <a class="btn btn-ghost btn-block wopen" href="${esc(w.link)}" target="_blank" rel="noopener">${I.ext} ${L('Apri lo schema', 'Open the pattern')}</a>
      <div class="counter big">
        <small>${L('Contagiri', 'Row counter')}</small>
        <div class="counter-row">
          <button class="cbtn" data-act="wcnt" data-id="${id}" data-d="-1" aria-label="${L('Meno', 'Minus')}">${I.minus}</button>
          <button class="cnum" data-act="wcnt" data-id="${id}" data-d="1"><b id="cval">${pr.n}</b><span>${L('giri', 'rows')}</span></button>
          <button class="cbtn plus" data-act="wcnt" data-id="${id}" data-d="1" aria-label="${L('Più', 'Plus')}">${I.plus}</button>
        </div>
        <button class="btn btn-ghost btn-sm" data-act="wreset" data-id="${id}">${I.reset} ${L('Azzera', 'Reset')}</button>
      </div>
      <label class="notes"><small>${L('Note di lavoro', 'Project notes')}</small><textarea id="wnotes" rows="4" placeholder="${L('Es. uncinetto 4 mm, cambio colore al giro 12…', 'E.g. 4 mm hook, color change at round 12…')}">${esc(pr.notes)}</textarea></label>
      <div class="make-nav">
        <button class="btn btn-primary btn-block" data-act="wdone" data-id="${id}">${L('Finito!', 'Finished!')} 🎉</button>
      </div>
    </div>`;
  }

  let wakeLock = null;
  async function keepAwake(on) {
    try {
      if (on && 'wakeLock' in navigator && !wakeLock) { wakeLock = await navigator.wakeLock.request('screen'); wakeLock.addEventListener('release', () => { wakeLock = null; }); }
      if (!on && wakeLock) { await wakeLock.release(); wakeLock = null; }
    } catch (e) { /* non supportato */ }
  }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && document.body.classList.contains('immersive')) keepAwake(true); });

  function pageMake(id) {
    const p = getPattern(id); if (!p) return pageNotFound();
    const pr = prog(id); const i = Math.min(pr.step, p.steps.length - 1); const s = p.steps[i];
    const n = pr.cnt[i] || 0; const last = i === p.steps.length - 1;
    const pcv = Math.round(((i + 1) / p.steps.length) * 100);
    return `<div class="make" style="--bg:${p.bg}">
      <div class="make-top">
        <button class="circle" data-act="exitmake" data-id="${id}" aria-label="${L('Chiudi', 'Close')}">${I.close}</button>
        <div class="make-title"><small>${esc(p.title)}</small><b>${L('Passo', 'Step')} ${i + 1} ${L('di', 'of')} ${p.steps.length}</b></div>
        <div class="make-mini">${A.draw(p.art)}</div>
      </div>
      <div class="pbar"><i style="width:${pcv}%"></i></div>
      <div class="make-dots">${p.steps.map((_, k) => `<button class="${k === i ? 'cur' : ''} ${pr.checked.includes(k) ? 'ok' : ''}" data-act="goto" data-id="${id}" data-i="${k}" aria-label="${L('Passo', 'Step')} ${k + 1}"></button>`).join('')}</div>
      <section class="make-card" id="mcard">
        <div class="make-step-h">${s.color ? `<span class="sw big" style="background:${s.color}"></span>` : ''}<div><small>${s.cn ? esc(s.cn) : L('Passo ', 'Step ') + (i + 1)}</small><h2>${esc(s.t)}</h2></div></div>
        <p class="make-text">${fmt(s.d)}</p>
        ${s.count ? `<div class="make-count">${L('Alla fine:', 'At the end:')} <b>${esc(s.count)}</b></div>` : ''}
        ${s.tip ? `<div class="make-tip">💡 ${fmt(s.tip)}</div>` : ''}
      </section>
      <div class="counter">
        <small>${s.rows ? `${L('Contagiri · obiettivo', 'Row counter · goal')} ${s.rows}` : L('Contagiri', 'Row counter')}</small>
        <div class="counter-row">
          <button class="cbtn" data-act="cnt" data-id="${id}" data-d="-1" aria-label="${L('Meno', 'Minus')}">${I.minus}</button>
          <button class="cnum ${s.rows && n >= s.rows ? 'goal' : ''}" data-act="cnt" data-id="${id}" data-d="1"><b id="cval">${n}</b>${s.rows ? `<span>/ ${s.rows}</span>` : ''}</button>
          <button class="cbtn plus" data-act="cnt" data-id="${id}" data-d="1" aria-label="${L('Più', 'Plus')}">${I.plus}</button>
        </div>
      </div>
      <div class="make-nav">
        <button class="btn btn-ghost" data-act="prev" data-id="${id}" ${i === 0 ? 'disabled' : ''}>${I.back} ${L('Indietro', 'Back')}</button>
        <button class="btn btn-primary" data-act="next" data-id="${id}">${last ? L('Finito! 🎉', 'Finished! 🎉') : L('Fatto, avanti', 'Done, next')}</button>
      </div>
    </div>`;
  }

  function pageLearn() {
    const tot = D.stitches.length; const l = S.learned.length; const p = Math.round((l / tot) * 100);
    return `${header(L('Impara', 'Learn'), L('Dal primo nodo al punto popcorn', 'From your first knot to the popcorn stitch'))}
      <div class="learn-hero">
        <div class="ring big" style="--p:${p}"><b>${l}/${tot}</b></div>
        <div><b>${l === tot ? L('Maestra dell’uncinetto! 🏆', 'Crochet master! 🏆') : l ? L('Stai andando alla grande!', 'You’re doing great!') : L('Iniziamo dalle basi', 'Let’s start with the basics')}</b>
        <p>${l === tot ? L('Hai imparato tutti i punti e le tecniche.', 'You’ve learned every stitch and technique.') : L('Segna i punti come imparati per seguire i tuoi progressi.', 'Mark stitches as learned to track your progress.')}</p></div>
      </div>
      ${D.learnGroups.map((g, gi) => `${section(`<span class="gnum">${gi + 1}</span> ${g}`)}
        <div class="lessons">${D.stitches.filter((s) => s.group === g).map((s) => `
          <a class="lesson ${S.learned.includes(s.id) ? 'ok' : ''}" href="#/punto/${s.id}">
            <span class="ltile" style="--bg:${s.color}">${A.sym(s.id)}</span>
            <span class="lmid"><b>${esc(s.name)}</b><small>${s.abbr !== '—' ? `<em>${esc(s.abbr)}</em> · ` : ''}${L(esc(s.us), `UK ${esc(s.uk)}`)}</small></span>
            <span class="lend">${S.learned.includes(s.id) ? I.check : I.chev}</span></a>`).join('')}</div>`).join('')}
      ${section(L('Strumenti di studio', 'Study tools'))}
      <a class="row-link" href="#/glossario"><span>📖</span><div><b>${L('Glossario abbreviazioni', 'Abbreviations glossary')}</b><small>${L('Italiano · USA · UK', 'US · UK · Italian')}</small></div>${I.chev}</a>
      <a class="row-link" href="#/strumenti/uncinetti"><span>🪡</span><div><b>${L('Misure uncinetti e filati', 'Hook & yarn sizes')}</b><small>${L('Convertitore mm / US / UK', 'mm / US / UK converter')}</small></div>${I.chev}</a>`;
  }

  function pageStitch(id) {
    const s = getStitch(id); if (!s) return pageNotFound();
    const learned = S.learned.includes(id);
    const practice = D.patterns.filter((p) => p.stitches.includes(id)).slice(0, 6);
    const q = encodeURIComponent(L(`uncinetto ${s.name} tutorial`, `crochet ${s.name} tutorial`));
    return `<div class="phero small" style="--bg:${s.color}">
        <div class="topbtns"><button class="circle" data-act="back" aria-label="${L('Indietro', 'Back')}">${I.back}</button></div>
        <div class="sym-hero">${A.sym(id)}</div>
      </div>
      <article class="pbody">
        <span class="pill">${esc(s.group)} · ${LEVEL[s.level]}</span>
        <h1>${esc(s.name)}</h1>
        <div class="names">${L(`<div><small>Italiano</small><b>${esc(s.abbr)}</b></div><div><small>🇺🇸 USA</small><b>${esc(s.us)}</b></div>`, `<div><small>🇺🇸 US</small><b>${esc(s.us)}</b></div>`)}<div><small>🇬🇧 UK</small><b>${esc(s.uk)}</b></div>${L('', `<div><small>🇮🇹 Italian</small><b>${esc(s.it || '—')}</b></div>`)}</div>
        <p class="desc">${esc(s.intro)}</p>
        ${section(L('Passo passo', 'Step by step'))}
        <div class="howto">${s.steps.map((t, i) => `<div class="how"><span>${i + 1}</span><p>${fmt(t)}</p></div>`).join('')}</div>
        <div class="tip-card"><span>💡</span><div><b>${L('Trucco', 'Pro tip')}</b><p>${fmt(s.tip)}</p></div></div>
        <a class="row-link" href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener"><span>▶️</span><div><b>${L('Guarda un video', 'Watch a video')}</b><small>${L('Tutorial su YouTube', 'YouTube tutorials')}</small></div>${I.chev}</a>
        ${practice.length ? section(L('Esercitati con', 'Practice with')) + `<div class="hscroll">${practice.map((p) => card(p, 'h')).join('')}</div>` : ''}
      </article>
      <div class="cta-bar"><button class="btn ${learned ? 'btn-ghost' : 'btn-primary'} btn-block" data-act="learn" data-id="${id}">${learned ? `${I.check} ${L('Imparato', 'Learned')}` : L('Segna come imparato', 'Mark as learned')}</button></div>`;
  }

  function pageGlossary() {
    return `<div class="subnav"><button class="circle" data-act="back">${I.back}</button></div>
      ${header(L('Glossario', 'Glossary'), L('Abbreviazioni negli schemi', 'Pattern abbreviations'))}
      <div class="table"><div class="tr th">${L('<span>IT</span><span>Significato</span><span>🇺🇸</span><span>🇬🇧</span>', '<span>🇺🇸</span><span>Meaning</span><span>🇬🇧</span><span>🇮🇹</span>')}</div>
      ${Object.entries(D.abbr).map(([k, v]) => `<a class="tr" href="#/punto/${v.id}"><span><b>${k}</b></span><span>${esc(v.n)}</span><span>${L(v.us, v.uk)}</span><span>${L(v.uk, v.it)}</span></a>`).join('')}</div>
      <div class="tip-card"><span>⚠️</span><div><b>${L('Attenzione a USA e UK', 'Watch out: US vs UK')}</b><p>${L('La «double crochet» americana è la nostra maglia alta, quella inglese è la maglia bassa. Controlla sempre da dove viene lo schema!', 'A US “double crochet” is a UK “treble”, and a UK “double crochet” is a US single crochet. Always check where a pattern comes from!')}</p></div></div>
      <div class="table"><div class="tr th two"><span>${L('Simbolo', 'Symbol')}</span><span>${L('Significato', 'Meaning')}</span></div>
      <div class="tr two"><span><b>*  *</b></span><span>${L('Ripeti la parte tra gli asterischi', 'Repeat the part between asterisks')}</span></div>
      <div class="tr two"><span><b>( ) × 6</b></span><span>${L('Ripeti il contenuto delle parentesi 6 volte', 'Repeat what’s in parentheses 6 times')}</span></div>
      <div class="tr two"><span><b>(24)</b></span><span>${L('Numero di maglie alla fine del giro', 'Stitch count at the end of the round')}</span></div>
      <div class="tr two"><span><b>${L('G / R', 'Rnd / Row')}</b></span><span>${L('Giro (in tondo) / Riga (avanti e indietro)', 'Round (worked in the round) / Row (worked back and forth)')}</span></div></div>`;
  }

  let TOOL = 'contagiri';
  function pageTools(tab) {
    if (tab) TOOL = tab;
    const tabs = [['contagiri', L('Contagiri', 'Counter')], ['uncinetti', L('Uncinetti', 'Hooks')], ['campione', L('Campione', 'Gauge')], ['filati', L('Filati', 'Yarn')]];
    let body = '';
    if (TOOL === 'contagiri') {
      body = `<div class="counters">${S.counters.map((c) => `
        <div class="ccard" data-cid="${c.id}">
          <div class="ccard-h"><input class="cname" data-act="cname" data-cid="${c.id}" value="${esc(c.name)}" aria-label="${L('Nome contatore', 'Counter name')}">
          <button class="icon-btn" data-act="cdel" data-cid="${c.id}" aria-label="${L('Elimina', 'Delete')}">${I.trash}</button></div>
          <button class="cbig" data-act="cinc" data-cid="${c.id}" data-d="1"><b>${c.n}</b><small>${L('tocca per +1', 'tap for +1')}</small></button>
          <div class="ccard-f"><button class="cbtn" data-act="cinc" data-cid="${c.id}" data-d="-1">${I.minus}</button>
          <button class="btn btn-ghost btn-sm" data-act="creset" data-cid="${c.id}">${I.reset} ${L('Azzera', 'Reset')}</button>
          <button class="cbtn plus" data-act="cinc" data-cid="${c.id}" data-d="1">${I.plus}</button></div>
        </div>`).join('')}</div>
        <button class="btn btn-ghost btn-block" data-act="cadd">${I.plus} ${L('Aggiungi contatore', 'Add counter')}</button>`;
    } else if (TOOL === 'uncinetti') {
      body = `<div class="conv"><div class="conv-v"><b id="hmm">4</b><span>mm</span></div>
        <input type="range" id="hrange" min="0" max="${D.hooks.length - 1}" value="8" step="1" aria-label="${L('Misura uncinetto', 'Hook size')}">
        <div class="conv-r"><div><small>🇺🇸 USA</small><b id="hus">G-6</b></div><div><small>🇬🇧 UK</small><b id="huk">8</b></div><div><small>${L('Filato', 'Yarn')}</small><b id="hy">DK</b></div></div></div>
        <div class="table"><div class="tr th"><span>mm</span><span>US</span><span>UK</span><span>${L('Filato', 'Yarn')}</span></div>
        ${D.hooks.map((h) => `<div class="tr"><span><b>${h[0]}</b></span><span>${h[1]}</span><span>${h[2]}</span><span>${h[3]}</span></div>`).join('')}</div>`;
    } else if (TOOL === 'campione') {
      body = `<div class="tip-card"><span>📏</span><div><b>${L('Calcolatore del campione', 'Gauge calculator')}</b><p>${L('Lavora un quadrato di prova, conta le maglie e le righe in 10 cm e scopri quante te ne servono.', 'Crochet a test swatch, count stitches and rows over 10 cm (4 in) and find out how many you need.')}</p></div></div>
        <div class="form">
          <label>${L('Maglie in 10 cm', 'Stitches in 10 cm')}<input type="number" inputmode="decimal" id="g-st" value="16"></label>
          <label>${L('Righe in 10 cm', 'Rows in 10 cm')}<input type="number" inputmode="decimal" id="g-rw" value="12"></label>
          <label>${L('Larghezza desiderata (cm)', 'Target width (cm)')}<input type="number" inputmode="decimal" id="g-w" value="50"></label>
          <label>${L('Altezza desiderata (cm)', 'Target height (cm)')}<input type="number" inputmode="decimal" id="g-h" value="30"></label>
        </div>
        <div class="result" id="g-res"></div>`;
    } else {
      body = `<div class="weights">${D.weights.map((w) => `<div class="wcard"><span class="wn">${w.n}</span><div><b>${w.it}</b><small>${w.name} · ${L('uncinetto', 'hook')} ${w.hook}</small><p>${w.st} in 10 cm · ${w.use}</p></div></div>`).join('')}</div>`;
    }
    return `${header(L('Strumenti', 'Tools'), L('Tutto quello che ti serve al lavoro', 'Everything you need while you hook'))}
      <div class="seg">${tabs.map(([k, n]) => `<button class="${TOOL === k ? 'on' : ''}" data-act="tool" data-t="${k}">${n}</button>`).join('')}</div>
      <div class="tool-body">${body}</div>`;
  }

  function pageMe() {
    const favs = S.fav.map(getAny).filter(Boolean);
    const done = S.done.map(getAny).filter(Boolean);
    const wip = Object.keys(S.prog).filter((id) => !S.done.includes(id) && S.prog[id].checked.length).map(getPattern).filter(Boolean)
      .concat(Object.keys(S.wprog).filter((id) => !S.done.includes(id) && S.wprog[id].n > 0).map(getWeb).filter(Boolean));
    const badges = [
      ['🧶', L('Primo punto', 'First stitch'), S.learned.length >= 1], ['🎓', L('5 punti', '5 stitches'), S.learned.length >= 5], ['🏆', L('Tutti i punti', 'All stitches'), S.learned.length >= D.stitches.length],
      ['✅', L('Primo progetto', 'First project'), done.length >= 1], ['🌈', L('5 progetti', '5 projects'), done.length >= 5], ['🔥', L('7 giorni di fila', '7-day streak'), S.streak.count >= 7]
    ];
    const list = (arr, empty) => arr.length ? `<div class="grid">${arr.map((p) => anyCard(p)).join('')}</div>` : `<p class="muted pad">${empty}</p>`;
    return `${header(L('Il mio gomitolo', 'My yarn ball'), L('Progressi e preferiti', 'Progress & favorites'))}
      <div class="profile"><div class="avatar">${A.draw({ k: 'yarn', c: ['#FF7A6B'] })}</div>
        <input class="name-in" data-act="name" value="${esc(S.name)}" placeholder="${L('Come ti chiami?', 'What’s your name?')}" aria-label="${L('Nome', 'Name')}"></div>
      <div class="stats">
        <div><b>${done.length}</b><small>${L('completati', 'finished')}</small></div><div><b>${wip.length}</b><small>${L('in corso', 'in progress')}</small></div>
        <div><b>${S.learned.length}</b><small>${L('punti imparati', 'stitches learned')}</small></div><div><b>${S.streak.count}</b><small>${L('giorni di fila', 'day streak')}</small></div></div>
      ${section(L('Traguardi', 'Achievements'))}
      <div class="badges">${badges.map(([e, n, on]) => `<div class="bdg ${on ? 'on' : ''}"><span>${e}</span><small>${n}</small></div>`).join('')}</div>
      ${section(L('In corso', 'In progress'))}${list(wip, L('Nessun progetto in corso. Scegline uno da «Oggi»!', 'No projects in progress. Pick one from “Today”!'))}
      ${section(L('Preferiti', 'Favorites'))}${list(favs, L('Tocca il ♥ su un progetto per salvarlo qui.', 'Tap the ♥ on a project to save it here.'))}
      ${section(L('Completati', 'Finished'))}${list(done, L('I tuoi capolavori appariranno qui.', 'Your masterpieces will show up here.'))}
      ${section(L('Impostazioni', 'Settings'))}
      <div class="settings">
        <div class="set-row"><span>${L('Tema', 'Theme')}</span><div class="seg small">${[['auto', 'Auto'], ['light', L('Chiaro', 'Light')], ['dark', L('Scuro', 'Dark')]].map(([k, n]) => `<button class="${S.theme === k ? 'on' : ''}" data-act="theme" data-t="${k}">${n}</button>`).join('')}</div></div>
        <div class="set-row"><span>${L('Lingua', 'Language')}</span><div class="seg small">${[['it', '🇮🇹 Italiano'], ['en', '🇬🇧 English']].map(([k, n]) => `<button class="${LANG === k ? 'on' : ''}" data-act="lang" data-l="${k}">${n}</button>`).join('')}</div></div>
        <button class="set-row danger" data-act="wipe"><span>${L('Azzera tutti i dati', 'Reset all data')}</span>${I.trash}</button>
      </div>
      ${WEB.updated ? `<p class="foot"><small>${L('Schemi dal web aggiornati il', 'Web patterns updated on')} ${new Date(WEB.updated).toLocaleDateString(LOC, { day: 'numeric', month: 'long' })} · ${WEB.items.length} ${L('schemi da', 'patterns from')} ${WEB.sources.filter((s) => s.count).length} ${L('siti', 'sites')}</small></p>` : ''}
      <p class="foot">${L('Gomitolo · fatto con ♥ e tanto filo', 'Gomitolo · made with ♥ and lots of yarn')}<br><small>${L('Installa l’app: in Safari tocca Condividi → «Aggiungi alla schermata Home»', 'Install the app: in Safari tap Share → “Add to Home Screen”')}</small></p>`;
  }

  const pageNotFound = () => `${header(L('Ops!', 'Oops!'), L('Pagina non trovata', 'Page not found'))}<div class="empty">${A.draw({ k: 'yarn', c: ['#B7A2F5'] })}<p>${L('Il gomitolo è rotolato via…', 'The yarn ball rolled away…')}</p><a class="btn btn-primary" href="#/">${L('Torna a Oggi', 'Back to Today')}</a></div>`;

  /* ---------------- router ---------------- */
  const routes = [
    [/^#?\/?(oggi)?$/, pageHome, 'oggi'], [/^#\/esplora$/, pageExplore, 'esplora'], [/^#\/p\/([\w-]+)$/, pageProject, ''],
    [/^#\/fai\/([\w-]+)$/, pageMake, 'immersive'], [/^#\/impara$/, pageLearn, 'impara'], [/^#\/punto\/([\w-]+)$/, pageStitch, ''],
    [/^#\/glossario$/, pageGlossary, 'impara'], [/^#\/strumenti(?:\/(\w+))?$/, pageTools, 'strumenti'], [/^#\/io$/, pageMe, 'io'],
    [/^#\/w\/(w[0-9a-f]{10})$/, pageWeb, ''], [/^#\/wfai\/(w[0-9a-f]{10})$/, pageWebMake, 'immersive']
  ];
  let lastHash = null;
  function render(keepScroll) {
    const h = location.hash || '#/';
    let html = null, tab = '';
    for (const [re, fn, t] of routes) { const m = re.exec(h); if (m) { html = fn(m[1]); tab = t; break; } }
    if (html === null) html = pageNotFound();
    const immersive = tab === 'immersive';
    document.body.classList.toggle('immersive', immersive); keepAwake(immersive);
    $$('.tabbar a').forEach((a) => a.classList.toggle('on', a.dataset.tab === tab));
    view.innerHTML = html;
    if (!keepScroll && h !== lastHash) { window.scrollTo(0, 0); view.classList.remove('enter'); void view.offsetWidth; view.classList.add('enter'); }
    lastHash = h;
    after(h);
  }
  function after(h) {
    if (h === '#/esplora') {
      renderResults();
      const q = $('#q'); q.addEventListener('input', () => { EX.q = q.value; renderResults(); });
      q.addEventListener('keydown', (e) => { if (e.key === 'Enter') q.blur(); });
    }
    if (h.startsWith('#/strumenti')) {
      if (TOOL === 'uncinetti') {
        const r = $('#hrange'); const upd = () => { const x = D.hooks[+r.value]; $('#hmm').textContent = x[0]; $('#hus').textContent = x[1]; $('#huk').textContent = x[2]; $('#hy').textContent = x[3]; };
        r.addEventListener('input', upd); upd();
      }
      if (TOOL === 'campione') {
        const calc = () => {
          const v = (id) => parseFloat($(id).value.replace(',', '.')) || 0;
          const st = v('#g-st'), rw = v('#g-rw'), w = v('#g-w'), h2 = v('#g-h');
          const ns = Math.round((st / 10) * w), nr = Math.round((rw / 10) * h2);
          $('#g-res').innerHTML = `<div><small>${L('Maglie da avviare', 'Stitches to start')}</small><b>${ns}</b><span>${L('+ catenelle per girare', '+ turning chains')}</span></div><div><small>${L('Righe totali', 'Total rows')}</small><b>${nr}</b><span>${L('circa', 'approx.')}</span></div>`;
        };
        $$('.form input').forEach((i) => i.addEventListener('input', calc)); calc();
      }
      $$('.cname').forEach((inp) => inp.addEventListener('change', () => { const c = S.counters.find((x) => x.id === +inp.dataset.cid); if (c) { c.name = inp.value.trim() || L('Contatore', 'Counter'); save(); } }));
    }
    if (h === '#/io') { const n = $('.name-in'); n.addEventListener('change', () => { S.name = n.value.trim().slice(0, 24); save(); toast(L('Ciao ', 'Hi ') + (S.name || L('a te', 'there')) + '! 👋'); }); }
    if (h.startsWith('#/fai/')) bindSwipe(h.slice(6));
    if (h.startsWith('#/wfai/')) {
      const t = $('#wnotes'); if (t) t.addEventListener('input', () => { const pr = wprog(h.slice(7)); pr.notes = t.value.slice(0, 2000); pr.t = Date.now(); save(); });
    }
  }

  function bindSwipe(id) {
    const el = $('#mcard'); if (!el) return; let x0 = null, y0 = 0;
    el.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener('touchend', (e) => {
      if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) act[dx < 0 ? 'next' : 'prev']({ dataset: { id } });
    });
  }

  /* ---------------- UI helper ---------------- */
  const haptic = (ms = 8) => { if (navigator.vibrate) navigator.vibrate(ms); };
  function toast(msg) {
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('in')); setTimeout(() => { t.classList.remove('in'); setTimeout(() => t.remove(), 300); }, 1900);
  }
  function sheet(html) {
    closeSheet();
    const w = document.createElement('div'); w.className = 'sheet-wrap'; w.innerHTML = `<div class="sheet-bg" data-act="closesheet"></div><div class="sheet"><div class="grab"></div>${html}</div>`;
    $('#sheet-root').appendChild(w); requestAnimationFrame(() => w.classList.add('in'));
  }
  function closeSheet() { const w = $('.sheet-wrap'); if (w) { w.classList.remove('in'); setTimeout(() => w.remove(), 250); } }
  function confetti() {
    const cols = ['#FF7A6B', '#FFD66B', '#7FD6BE', '#8EC5FF', '#B7A2F5', '#FF9EC2'];
    const box = document.createElement('div'); box.className = 'confetti';
    for (let i = 0; i < 70; i++) { const s = document.createElement('i'); s.style.cssText = `left:${Math.random() * 100}%;background:${cols[i % cols.length]};animation-delay:${Math.random() * 0.4}s;animation-duration:${1.6 + Math.random() * 1.4}s;transform:rotate(${Math.random() * 360}deg)`; box.appendChild(s); }
    document.body.appendChild(box); setTimeout(() => box.remove(), 3400);
  }
  function applyTheme() {
    if (S.theme === 'auto') delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = S.theme;
  }

  /* ---------------- azioni ---------------- */
  const act = {
    back() { if (history.length > 1) history.back(); else location.hash = '#/'; },
    abbr(el) {
      const a = D.abbr[el.dataset.a]; if (!a) return; const s = getStitch(a.id);
      sheet(`<div class="abbr-sheet"><span class="ltile xl" style="--bg:${s ? s.color : '#eee'}">${A.sym(a.id)}</span>
        <h3>${esc(el.dataset.a)} = ${esc(a.n)}</h3><p class="muted">${L(`🇺🇸 ${a.us} · 🇬🇧 ${a.uk}`, `🇬🇧 UK ${a.uk} · 🇮🇹 ${a.it}`)}</p>
        ${s ? `<ol class="mini-how">${s.steps.map((t) => `<li>${esc(t)}</li>`).join('')}</ol><a class="btn btn-primary btn-block" href="#/punto/${s.id}" data-act="closesheet">${L('Apri il tutorial', 'Open the tutorial')}</a>` : ''}</div>`);
      haptic();
    },
    closesheet: closeSheet,
    setcat(el) { EX.cat = el.dataset.c; },
    setsrc(el) { EX.src = el.dataset.s; },
    src(el) { EX.src = el.dataset.s; render(true); haptic(); },
    more() { EX.lim += 40; renderResults(true); },
    cat(el) { EX.cat = el.dataset.c; $$('#catchips .chip').forEach((c) => c.classList.toggle('on', c === el)); renderResults(); haptic(); },
    lvl(el) { EX.lvl = +el.dataset.l; $$('#lvlseg button').forEach((c) => c.classList.toggle('on', c === el)); renderResults(); haptic(); },
    gen(el) { const seed = Math.floor(Math.random() * 1e6); haptic(15); location.hash = `#/p/gen-${el.dataset.t}-${seed}`; },
    fav(el) {
      const id = el.dataset.id; const i = S.fav.indexOf(id);
      if (i >= 0) S.fav.splice(i, 1); else { S.fav.push(id); const w = WEB.byId[id]; if (w) remember(w); }
      save(); el.classList.toggle('fav', i < 0); el.classList.add('pop'); setTimeout(() => el.classList.remove('pop'), 300);
      toast(i < 0 ? L('Aggiunto ai preferiti ♥', 'Added to favorites ♥') : L('Rimosso dai preferiti', 'Removed from favorites')); haptic();
    },
    async share() {
      const data = { title: document.title, text: L('Guarda questo progetto all’uncinetto!', 'Check out this crochet project!'), url: location.href };
      try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(location.href); toast(L('Link copiato!', 'Link copied!')); } } catch (e) { /* annullato */ }
    },
    mat(el) { const pr = prog(el.dataset.id); const i = +el.dataset.i; const k = pr.mat.indexOf(i); if (k >= 0) pr.mat.splice(k, 1); else pr.mat.push(i); save(); el.classList.toggle('on'); haptic(); },
    stepchk(el) {
      const pr = prog(el.dataset.id); const i = +el.dataset.i; const k = pr.checked.indexOf(i);
      if (k >= 0) pr.checked.splice(k, 1); else pr.checked.push(i); pr.t = Date.now(); save(); render(true); haptic();
    },
    start(el) {
      const id = el.dataset.id; const p = getPattern(id);
      if (S.done.includes(id)) { S.done.splice(S.done.indexOf(id), 1); S.prog[id] = null; delete S.prog[id]; }
      const pr = prog(id); pr.t = Date.now();
      if (p) { const firstOpen = p.steps.findIndex((_, i) => !pr.checked.includes(i)); if (firstOpen >= 0 && pr.checked.length) pr.step = firstOpen; }
      save(); location.hash = `#/fai/${id}`;
    },
    exitmake(el) { location.hash = `#/p/${el.dataset.id}`; },
    goto(el) { const pr = prog(el.dataset.id); pr.step = +el.dataset.i; save(); render(true); haptic(); },
    prev(el) { const pr = prog(el.dataset.id); if (pr.step > 0) { pr.step--; save(); render(true); slide('r'); haptic(); } },
    next(el) {
      const id = el.dataset.id; const p = getPattern(id); const pr = prog(id);
      if (!pr.checked.includes(pr.step)) pr.checked.push(pr.step);
      pr.t = Date.now();
      if (pr.step < p.steps.length - 1) { pr.step++; save(); render(true); slide('l'); haptic(); return; }
      if (!S.done.includes(id)) S.done.push(id); save(); confetti(); haptic(40);
      sheet(`<div class="done-sheet">${A.draw(p.art, 'float')}<h3>${L('Complimenti! 🎉', 'Congratulations! 🎉')}</h3><p>${L('Hai completato', 'You finished')} <b>${esc(p.title)}</b>. ${L('Scatta una foto al tuo capolavoro!', 'Snap a photo of your masterpiece!')}</p>
        <a class="btn btn-primary btn-block" href="#/" data-act="closesheet">${L('Torna a Oggi', 'Back to Today')}</a>
        <a class="btn btn-ghost btn-block" href="#/p/${id}" data-act="closesheet">${L('Rivedi lo schema', 'Review the pattern')}</a></div>`);
    },
    cnt(el) {
      const pr = prog(el.dataset.id); const d = +el.dataset.d; const v = Math.max(0, (pr.cnt[pr.step] || 0) + d); pr.cnt[pr.step] = v; save();
      const b = $('#cval'); if (b) { b.textContent = v; b.parentElement.classList.remove('bump'); void b.offsetWidth; b.parentElement.classList.add('bump'); }
      const p = getPattern(el.dataset.id); const goal = p.steps[pr.step].rows;
      const c = $('.cnum'); if (c) c.classList.toggle('goal', !!goal && v >= goal);
      if (goal && v === goal && d > 0) { toast(L('Obiettivo raggiunto! 🎯', 'Goal reached! 🎯')); haptic(30); } else haptic();
    },
    learn(el) {
      const id = el.dataset.id; const i = S.learned.indexOf(id);
      if (i >= 0) S.learned.splice(i, 1); else { S.learned.push(id); confetti(); toast(L('Nuovo punto imparato! 🧶', 'New stitch learned! 🧶')); }
      save(); render(true); haptic(20);
    },
    tool(el) { TOOL = el.dataset.t; history.replaceState(null, '', `#/strumenti/${TOOL}`); render(true); haptic(); },
    cinc(el) {
      const c = S.counters.find((x) => x.id === +el.dataset.cid); if (!c) return; c.n = Math.max(0, c.n + +el.dataset.d); save();
      const card = el.closest('.ccard'); const b = $('.cbig b', card); b.textContent = c.n; const big = $('.cbig', card); big.classList.remove('bump'); void big.offsetWidth; big.classList.add('bump'); haptic();
    },
    creset(el) { const c = S.counters.find((x) => x.id === +el.dataset.cid); if (c) { c.n = 0; save(); render(true); } },
    cadd() { const id = Date.now(); S.counters.push({ id, name: L('Contatore ', 'Counter ') + (S.counters.length + 1), n: 0 }); save(); render(true); },
    cdel(el) { if (S.counters.length <= 1) { toast(L('Serve almeno un contatore', 'You need at least one counter')); return; } S.counters = S.counters.filter((x) => x.id !== +el.dataset.cid); save(); render(true); },
    theme(el) { S.theme = el.dataset.t; save(); applyTheme(); render(true); },
    lang(el) { if (el.dataset.l === LANG) return; try { localStorage.setItem('gomitolo-lang', el.dataset.l); } catch (e) { /* privato */ } location.reload(); },
    wstart(el) {
      const id = el.dataset.id; const w = getWeb(id); if (w) remember(w);
      if (S.done.includes(id)) { S.done.splice(S.done.indexOf(id), 1); delete S.wprog[id]; }
      wprog(id).t = Date.now(); save(); location.hash = `#/wfai/${id}`;
    },
    wexit(el) { location.hash = `#/w/${el.dataset.id}`; },
    wcnt(el) {
      const pr = wprog(el.dataset.id); pr.n = Math.max(0, pr.n + +el.dataset.d); pr.t = Date.now(); save();
      const b = $('#cval'); if (b) { b.textContent = pr.n; b.parentElement.classList.remove('bump'); void b.offsetWidth; b.parentElement.classList.add('bump'); }
      haptic();
    },
    wreset(el) { const pr = wprog(el.dataset.id); pr.n = 0; save(); render(true); },
    wdone(el) {
      const id = el.dataset.id; const w = getWeb(id); if (w) remember(w);
      if (!S.done.includes(id)) S.done.push(id); save(); confetti(); haptic(40);
      sheet(`<div class="done-sheet"><h3>${L('Complimenti! 🎉', 'Congratulations! 🎉')}</h3><p>${L('Hai completato', 'You finished')} <b>${esc(w ? w.title : '')}</b>. ${L('Scatta una foto al tuo capolavoro!', 'Snap a photo of your masterpiece!')}</p>
        <a class="btn btn-primary btn-block" href="#/" data-act="closesheet">${L('Torna a Oggi', 'Back to Today')}</a>
        <a class="btn btn-ghost btn-block" href="#/w/${id}" data-act="closesheet">${L('Rivedi lo schema', 'Review the pattern')}</a></div>`);
    },
    wipe() {
      sheet(`<div class="done-sheet"><h3>${L('Azzerare tutto?', 'Reset everything?')}</h3><p>${L('Progressi, preferiti e contatori verranno cancellati da questo dispositivo.', 'Progress, favorites and counters will be erased from this device.')}</p>
        <button class="btn btn-danger btn-block" data-act="wipeok">${L('Sì, azzera', 'Yes, reset')}</button><button class="btn btn-ghost btn-block" data-act="closesheet">${L('Annulla', 'Cancel')}</button></div>`);
    },
    wipeok() { localStorage.removeItem(KEY); location.hash = '#/'; location.reload(); }
  };
  function slide(dir) { const c = $('#mcard'); if (c) c.classList.add('slide-' + dir); }

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act]'); if (!el) return;
    const fn = act[el.dataset.act]; if (!fn) return;
    if (el.tagName === 'INPUT') return;
    if (el.tagName !== 'A') e.preventDefault();
    fn(el);
  });
  window.addEventListener('hashchange', () => { closeSheet(); render(); });

  if (LANG === 'en') {
    const tl = { oggi: 'Today', esplora: 'Explore', impara: 'Learn', strumenti: 'Tools', io: 'Me' };
    $$('.tabbar a').forEach((a) => { const s = $('span', a); if (s) s.textContent = tl[a.dataset.tab]; });
    $('.tabbar').setAttribute('aria-label', 'Main navigation');
    document.title = 'Gomitolo · Pocket crochet';
  }
  applyTheme();
  render();
  loadWeb();
  if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => {});
})();
