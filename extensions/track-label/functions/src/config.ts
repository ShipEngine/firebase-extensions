export default {
  location: process.env.LOCATION!,
  databaseInstance: process.env.SELECTED_DATABASE_INSTANCE!,
  shipEngineApiKey: process.env.SHIPENGINE_API_KEY!,
  collectionPath: process.env.COLLECTION_PATH!,
  trackingNumberKey: process.env.TRACKING_NUMBER_KEY!,
  carrierCodeKey: process.env.CARRIER_CODE_KEY!,
  labelIdKey: process.env.LABEL_ID_KEY!,
  labelKey: process.env.LABEL_KEY!,
  trackingResultKey: process.env.TRACKING_RESULT_KEY!,
  inputSchema: process.env.INPUT_SCHEMA!,
  outputSchema: process.env.OUTPUT_SCHEMA!,
};
