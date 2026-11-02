const VERSION = 'gomitolo-v3';
const ASSETS = ['./', './index.html', './styles.css', './data.js', './data.en.js', './art.js', './app.js', './manifest.webmanifest',
  './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// stale-while-revalidate: risposta immediata dalla cache, aggiornamento in background
self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  // schemi dal web: prima la rete (dati freschi), poi la cache se offline
  if (url.pathname.endsWith('/data/web.json')) {
    e.respondWith(caches.open(VERSION).then((cache) => fetch(req).then((res) => { if (res && res.ok) cache.put(req, res.clone()); return res; })
      .catch(() => cache.match(req, { ignoreSearch: true }))));
    return;
  }
  e.respondWith(caches.open(VERSION).then(async (cache) => {
    const cached = await cache.match(req, { ignoreSearch: true });
    const fresh = fetch(req).then((res) => { if (res && res.ok) cache.put(req, res.clone()); return res; }).catch(() => cached);
    return cached || fresh;
  }));
});
