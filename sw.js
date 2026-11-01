// ========================================================
// Yulduzlar Platformasi - Service Worker (Offline PWA)
// ========================================================

const CACHE_NAME = "yulduzlar-cache-v2";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./css/main.css",
  "./data/pedagogy-data.js",
  "./js/storage.js",
  "./js/gamification.js",
  "./js/lesson-planner.js",
  "./js/cases-sim.js",
  "./js/ai-mentor.js",
  "./js/internship.js",
  "./js/quiz.js",
  "./js/portfolio.js",
  "./js/app.js",
  "./manifest.json"
];

// O'rnatish bosqichi
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("[Service Worker] Resurslar keshlanmoqda...");
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Faollashtirish va eski keshlarni tozalash
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

// Tarmoq so'rovlarini ushlash (Cache-first yoki Network-first)
self.addEventListener("fetch", event => {
  // Faqat GET so'rovlarni keshdan berish
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then(networkResponse => {
        // Yangi resurslarni ham keshga olish
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Internet yo'q bo'lsa
        if (event.request.headers.get("accept").includes("text/html")) {
          return caches.match("./index.html");
        }
      });
    })
  );
});
