#!/bin/bash

# Usage: "./script/update_storage_adapter.sh"

# This script will update the storage adapter with Jessica Deen's adapter 
# https://www.npmjs.com/package/ghost-storage-azure
# https://github.com/jldeen/ghost-azurestorage

npm install ghost-storage-azure@1.1.1-0
cp -vR node_modules/ghost-storage-azure content/adapters/storage
rm -rf node_modules package-lock.json