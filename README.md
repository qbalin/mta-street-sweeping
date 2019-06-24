### Setup

Create a Google Maps API key ([Maps Embed API](https://console.cloud.google.com/google/maps-apis))
and add it as a secret:

```
printf '#!/bin/bash\nexport GOOGLE_MAPS_API_KEY=YOUR GOOGLE MAPS API KEY' > set_env.sh
chmod u+x set_env.sh
```

Install the npm packages and load the app:
```
npm install
node index.js
# Go to http://localhost:3000
```

### Deploy
Install the [heroku client](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up).

Set the Google Maps API key as an env variable on Heroku (you may need to login):
```
heroku config:set GOOGLE_MAPS_API_KEY=YOUR GOOGLE MAPS API KEY
```