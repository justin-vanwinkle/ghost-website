FROM ghost:2.18.1-alpine

# set url-hostname for Ghost with build arg
ARG mode
ENV devMode ${mode}
ENV url ""

# copy config.production.json with db
COPY config.${devMode}.json config.production.json

# copy themes/images to container
COPY content content

# copy redirects
COPY redirects.json content/data

# Install Azure Storage (OPTIONAL - MUST COMMENT OUT Cloudinary Section)
#RUN npm install ghost-storage-azure
#RUN cp -vR node_modules/ghost-storage-azure current/core/server/adapters/storage/ghost-storage-azure

# Install cloudinary module (OPTIONAL - MUST COMMENT OUT Azure Storage Section)
RUN npm install ghost-cloudinary-store
RUN cp -r node_modules/ghost-cloudinary-store current/core/server/adapters/storage