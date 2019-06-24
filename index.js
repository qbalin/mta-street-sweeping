const express = require('express')
var fs = require('fs');
const app = express()
const port = process.env.PORT || 3000

// Crappy way to set the API_KEY on the client
fs.writeFile('public/google_api_key.js', `export default '${process.env.GOOGLE_MAPS_API_KEY}';`, function (err) {
  if (err) throw err;
  console.log('Saved!');
});

// Force https on prod
if (port !== 3000) {
  app.use(function(req, res, next) {
    if ((req.get('X-Forwarded-Proto') !== 'https')) {
      res.redirect('https://' + req.get('Host') + req.url);
    } else {
      next();
    }
  });
}

app.use(express.static('public'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
