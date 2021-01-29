#!/bin/bash

# adds lines to current/index.js to set up app insights logging.
# https://docs.microsoft.com/en-us/azure/azure-monitor/app/nodejs

instrumentation_key="0b720de0-dd90-4ddb-bc87-2488414552be"

# add lines to index.js
sed -i '1s/^/const appInsights = require("applicationinsights");\n /' current/index.js
sed -i "2s/^/appInsights.setup(\"$instrumentation_key\");\n /" current/index.js
sed -i '3s/^/appInsights.start();\n /' current/index.js
