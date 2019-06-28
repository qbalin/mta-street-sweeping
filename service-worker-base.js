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
    new RegExp('.*/get-sweeping-info.*'),
    new workbox.strategies.NetworkOnly()
  );

  // In case ANY fetch goes wrong
  workbox.routing.setCatchHandler(({url, event, params}) => {
    console.log('The internet is dead!');
  });
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}