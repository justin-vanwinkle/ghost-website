const appInsights = require('applicationinsights');
appInsights.setup('0b720de0-dd90-4ddb-bc87-2488414552be');
appInsights.start();

// function removeProbes(envelope, context) {
//     let data = envelope.data.baseData;
//     if (data.url && (data.url.includes("/ready") || data.url.includes("/live") || data.url.includes("/health"))) {
//         return false;
//     }
// };
// appInsights.defaultClient.addTelemetryProcessor(removeProbes);
