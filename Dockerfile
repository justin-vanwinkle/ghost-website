FROM ghost:5.13.2-alpine

# COPY content content
COPY config.production.json .
