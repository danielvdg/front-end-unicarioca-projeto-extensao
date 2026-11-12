const CACHE_NAME = "carrinho-facil-cache-v2";

const LOCAL_URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./main.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./img/caderno.jpg",
  "./img/estojo.jpg",
  "./img/marca-texto.jpg",
];

const EXTERNAL_URLS_TO_CACHE = [
  "https://cdn.tailwindcss.com",
  "https://unpkg.com/vue@3/dist/vue.global.prod.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Armazena todos os recursos locais
      await cache.addAll(LOCAL_URLS_TO_CACHE);

      // Recursos externos são opcionais.
      // Se um CDN estiver indisponível, a instalação continua normalmente.
      await Promise.all(
        EXTERNAL_URLS_TO_CACHE.map(async (url) => {
          try {
            const response = await fetch(url, {
              mode: "no-cors",
            });

            await cache.put(url, response);
          } catch (error) {
            console.warn(
              "Recurso externo não entrou no cache:",
              url,
              error
            );
          }
        })
      );
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});