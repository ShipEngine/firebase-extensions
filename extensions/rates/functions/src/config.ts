export default {
  location: process.env.LOCATION!,
  databaseInstance: process.env.SELECTED_DATABASE_INSTANCE!,
  shipEngineApiKey: process.env.SHIPENGINE_API_KEY!,
  collectionPath: process.env.COLLECTION_PATH!,
  carrierIds: process.env.CARRIER_IDS!.split(',').map((id) => id.trim()),
  shipmentKey: process.env.SHIPMENT_KEY!,
  ratesKey: process.env.RATES_KEY!,
  inputSchema: process.env.INPUT_SCHEMA!,
};
