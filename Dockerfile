FROM ghost:alpine

# set url-hostname for Ghost with build arg
ENV url ""
ENV AZURE_STORAGE_CONNECTION_STRING ""

COPY . .

# copy redirects
# COPY redirects.json content/data

# Install Azure Storage
RUN npm install ghost-storage-azure
# RUN cp -vR node_modules/ghost-storage-azure current/core/server/adapters/storage/ghost-storage-azure
# RUN cp -vR node_modules/ghost-storage-azure content/adapters/storage/ghost-storage-azure

# Install cloudinary module (OPTIONAL - MUST COMMENT OUT Azure Storage Section)
# RUN npm install ghost-cloudinary-store
# RUN cp -r node_modules/ghost-cloudinary-store current/core/server/adapters/storage

CMD [ "./bootstrap.sh" ]