FROM ghost:alpine

# set url-hostname for Ghost with build arg
ENV url ""
ENV AZURE_STORAGE_CONNECTION_STRING ""

# copy ghost configs
COPY configs/ghost .

# copy bootstrap script
COPY bootstrap.sh .

# copy themes/images to container
COPY content content

# copy redirects
# COPY redirects.json content/data

# Install Azure Storage (OPTIONAL - MUST COMMENT OUT Cloudinary Section)
RUN npm install ghost-storage-azure && \
    cp -vR node_modules/ghost-storage-azure content/adapters/storage/ghost-storage-azure

COPY configs/azure-storage content/adapters/storage/ghost-storage-azure

# RUN cp -vR node_modules/ghost-storage-azure current/core/server/adapters/storage/ghost-storage-azure
# COPY configs/azure-storage current/core/server/adapters/storage/ghost-storage-azure

# Install cloudinary module (OPTIONAL - MUST COMMENT OUT Azure Storage Section)
# RUN npm install ghost-cloudinary-store
# RUN cp -r node_modules/ghost-cloudinary-store current/core/server/adapters/storage

CMD [ "./bootstrap.sh" ]