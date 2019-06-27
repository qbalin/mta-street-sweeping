### Setup

Create a Google Maps API key ([Maps Embed API](https://console.cloud.google.com/google/maps-apis))
and add it as a secret (replace YOUR GOOGLE MAPS API KEY by the proper value):

```
printf '#!/bin/bash\nexport GOOGLE_MAPS_API_KEY=YOUR GOOGLE MAPS API KEY\n./scripts/prepare_app.sh' > scripts/setup_env.sh
chmod u+x scripts/setup_env.sh
chmod u+x scripts/prepare_app.sh
```

Install the npm packages and load the app:
```
npm install
npm run dev-start
# Go to http://localhost:3000
```

### Install PostgreSQL

Follow the instructions [here](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup) to install PostgreSQL locally.

Using Postico, create a table named `street-sweeping`, and issue the following statement to enable spatial queries:
```
CREATE EXTENSION postgis;
```

### Deploy
Install the [heroku client](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up).

Create the app on Heroku:
```
heroku create
heroku apps:rename my-new-app-name
```

Set the Google Maps API key as an env variable on Heroku (you may need to login):
```
heroku config:set GOOGLE_MAPS_API_KEY=YOUR GOOGLE MAPS API KEY
```

Deploy committed code:
```
git push heroku master
```

Open the app:
```
heroku open
```

Tail the logs:
```
heroku logs --tail
```