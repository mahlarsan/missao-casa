// Missão Casa: funciona offline depois da primeira visita.
const VERSAO = "missao-casa-v1";
const ARQUIVOS = ["./", "./index.html", "./manifest.json", "./firebase-config.js",
  "./icones-app/icone-192.png", "./icones-app/icone-512.png", "./icones-app/apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Firebase e dados ao vivo nunca vêm do cache
  if (/firestore|googleapis\.com\/(identitytoolkit|securetoken)|firebaseio/.test(url.href)) return;
  // página: rede primeiro (pega a versão nova), cache se estiver sem internet
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(VERSAO).then(x => x.put("./index.html", c)); return r; })
      .catch(() => caches.match("./index.html")));
    return;
  }
  // resto (fontes, ícones, SDK): cache primeiro, atualiza por trás
  e.respondWith(caches.match(req).then(hit => {
    const rede = fetch(req).then(r => { if (r.ok || r.type === "opaque") { const c = r.clone(); caches.open(VERSAO).then(x => x.put(req, c)); } return r; }).catch(() => hit);
    return hit || rede;
  }));
});
