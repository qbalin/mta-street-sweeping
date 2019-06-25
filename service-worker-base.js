importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  // Temporarily force workbox logs to show on prod
  workbox.setConfig({ debug: true });

  workbox.core.setCacheNameDetails({
    prefix: 'mta-street-sweeping'
  });

  workbox.precaching.precacheAndRoute([]);

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