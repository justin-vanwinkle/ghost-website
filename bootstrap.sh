#!/bin/sh

# place dev config if dev env
if [ "$environment" == "development" ]
then
  rm config.production.json
  mv config.development.json config.production.json
fi

# replace tokens
sed -i -e "s/{password}/$dbPassword/g" config.production.json

# start ghost
node current/index.js