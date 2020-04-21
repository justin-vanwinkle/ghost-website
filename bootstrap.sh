#!/bin/sh

# place storage adapter
mv node_modules/ghost-storage-azure /var/lib/ghost/content/adapters/storage/

# replace config tokens
sed -i -e "s/{password}/$dbPassword/g" config.production.json

# start ghost
node current/index.js