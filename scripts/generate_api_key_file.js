var fs = require('fs');
// Crappy way to set the API_KEY on the client
fs.writeFile('public/google_api_key.js', `export default '${process.env.GOOGLE_MAPS_API_KEY}';`, function (err) {
  if (err) throw err;
  console.log('Saved!');
});