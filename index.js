const express = require('express')
const app = express()
const port = process.env.PORT || 3000

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
