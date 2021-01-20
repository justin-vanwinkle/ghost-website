#!/bin/bash

# adds lines to current/index.js to set up app insights logging.
# https://docs.microsoft.com/en-us/azure/azure-monitor/app/nodejs

instrumentation_key="475eb047-5629-446e-9981-fd8f0f07309f"

# add lines to index.js
sed -i '1s/^/const appInsights = require("applicationinsights");\n /' current/index.js
sed -i "2s/^/appInsights.setup(\"$instrumentation_key\");\n /" current/index.js
sed -i '3s/^/appInsights.start();\n /' current/index.js
