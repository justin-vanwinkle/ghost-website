FROM ghost:4.48.4-alpine

COPY content content
COPY config.production.json .
