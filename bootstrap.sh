#!/bin/sh

# place storage adapter
mv node_modules/ghost-storage-azure /var/lib/ghost/content/adapters/storage/

# start ghost
node current/index.js