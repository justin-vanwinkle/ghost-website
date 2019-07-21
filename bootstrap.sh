#!/bin/sh

# place storage adapter
mv node_modules/ghost-storage-azure /var/lib/ghost/content/adapters/storage/

# place config files
mv configs/azure-storage/config.json content/adapters/storage/ghost-storage-azure/config.json
mv configs/ghost .

# replace config tokens
sed -i -e "s/{password}/$dbPassword/g" config.production.json

# start ghost
node current/index.js