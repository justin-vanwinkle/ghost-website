FROM ghost:5.87.1-alpine

COPY config.production.json .

COPY ads.txt /var/lib/ghost/current/content/themes/casper
COPY page-templates/* /var/lib/ghost/current/content/themes/casper
COPY static/* /var/lib/ghost/current/content/themes/casper

COPY routes.yaml /var/lib/ghost/current/content/settings
COPY redirects.yaml /var/lib/ghost/current/content/settings

COPY styles/* /var/lib/ghost/current/content/themes/casper/assets/css

