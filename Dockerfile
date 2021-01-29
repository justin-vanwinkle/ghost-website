FROM ghost:3.41.2-alpine

COPY content content
COPY config.production.json .
COPY scripts/addons.js .

RUN npm install applicationinsights lightship \ 
    && cat addons.js current/index.js > current/index.js