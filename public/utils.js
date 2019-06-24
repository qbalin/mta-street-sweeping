export function getLocation(cb) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(cb);
  } else {
    throw new Error("Geolocation is not supported by this browser.");
  }
}
