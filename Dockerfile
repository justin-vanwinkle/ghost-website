FROM ghost:3.41.2-alpine

COPY content content
COPY config.production.json .
COPY scripts/addAppInsights.sh .

RUN npm install applicationinsights lightship \ 
    && bash ./addAppInsights.sh

# this version must match what's installed by scripts/install_storage_adapter.sh
# RUN npm install ghost-storage-azure@1.1.1-0 applicationinsights && \
#     cp -vR node_modules/ghost-storage-azure current/core/server/adapters/storage/ghost-storage-azure && \
#     bash ./addAppInsights.sh
