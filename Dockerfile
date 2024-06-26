FROM ghost:5.86.2-alpine

COPY config.production.json .

COPY ads.txt /var/lib/ghost/current/content/themes/casper
COPY page-templates/* /var/lib/ghost/current/content/themes/casper

COPY routes.yaml /var/lib/ghost/current/content/settings

COPY styles/* /var/lib/ghost/current/content/themes/casper/assets/css

