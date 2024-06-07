FROM ghost:5.84.1-alpine

COPY config.production.json .

COPY ads.txt /var/lib/ghost/current/content/themes/casper
