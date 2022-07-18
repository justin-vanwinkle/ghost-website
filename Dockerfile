FROM ghost:5.3.1-alpine

COPY content content
COPY config.production.json .
COPY scripts/addons.js .

RUN npm install applicationinsights lightship \
    && cat addons.js current/index.js >> index.js \
    && mv index.js current/index.js
