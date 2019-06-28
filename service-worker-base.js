importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  // Temporarily force workbox logs to show on prod
  workbox.setConfig({ debug: true });

  workbox.core.setCacheNameDetails({
    prefix: 'mta-street-sweeping'
  });

  workbox.precaching.precacheAndRoute([]);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}