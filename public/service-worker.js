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
    "revision": "feeba7606e60618777c43256ede7089c"
  },
  {
    "url": "manifest.json",
    "revision": "a253e78b24b8c85991bd9090c8ec4135"
  },
  {
    "url": "page_controller.js",
    "revision": "378fea411dcc64ddcc5cd7ffaf36746e"
  },
  {
    "url": "utils.js",
    "revision": "a0be2808277522967ef7cdbab3fdb42d"
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