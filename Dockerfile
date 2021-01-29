FROM ghost:3.41.2-alpine

COPY content content
COPY config.production.json .
COPY scripts/insights.js .

RUN npm install applicationinsights lightship \ 
    && cat insights.js current/index.js > current/index.js