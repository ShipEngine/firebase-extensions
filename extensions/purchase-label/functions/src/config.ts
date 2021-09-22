export default {
  location: process.env.LOCATION!,
  databaseInstance: process.env.SELECTED_DATABASE_INSTANCE!,
  shipEngineApiKey: process.env.SHIPENGINE_API_KEY!,
  collectionPath: process.env.COLLECTION_PATH!,
  inputSchema: process.env.INPUT_SCHEMA!,
  shippingLabelKey: process.env.SHIPPING_LABEL_KEY!,
};
