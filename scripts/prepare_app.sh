#!/bin/bash

# Use API_KEY from ENV to generate a file containing it on the frontend
node ./scripts/generate_api_key_file.js

# Regenerate cache
workbox injectManifest workbox-config.js

# Start the app
node index.js