FROM ghost:5.14.1-alpine

# COPY content content
COPY config.production.json .
