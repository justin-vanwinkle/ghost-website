FROM ghost:5.85.2-alpine

COPY config.production.json .

COPY ads.txt /var/lib/ghost/current/content/themes/casper
