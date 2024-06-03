FROM ghost:5.83.0-alpine

COPY config.production.json .

COPY ads.txt /var/lib/ghost/current/content/themes/casper
