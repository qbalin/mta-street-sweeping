importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([
  {
    "url": "google_api_key.js",
    "revision": "754a6e2bd737a0aaea7b911b5940bab2"
  },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "1b34f3214ee561f4c981270b93ab95bc"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "e148b24d11c02f2b7cf8f8d95a5a4ca4"
  },
  {
    "url": "images/icons/icon-310x310.png",
    "revision": "8687db335f07d2f0e66bdf5b782b7541"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "7944f111bdefd1d6aedfaceeb21ccf06"
  },
  {
    "url": "index.html",
    "revision": "0be8b1f312792a25f59d5ada9e550b87"
  },
  {
    "url": "manifest.json",
    "revision": "a253e78b24b8c85991bd9090c8ec4135"
  },
  {
    "url": "page_controller.js",
    "revision": "4cfe57ce1f1f00404abea596484e17e8"
  },
  {
    "url": "utils.js",
    "revision": "d16d5aaf8982cd639f060cd161737494"
  }
]);

  workbox.routing.registerRoute(
    /\.js$/,
    new workbox.strategies.NetworkFirst({cacheName: 'js'})
  );
  workbox.routing.registerRoute(
    /\.css$/,
    new workbox.strategies.NetworkFirst({cacheName: 'css'})
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}