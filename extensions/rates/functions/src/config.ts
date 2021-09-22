const splitAndTrimString = (value: string): string[] =>
  value.split(',').map((id) => id.trim());

export default {
  location: process.env.LOCATION!,
  databaseInstance: process.env.SELECTED_DATABASE_INSTANCE!,
  shipEngineApiKey: process.env.SHIPENGINE_API_KEY!,
  collectionPath: process.env.COLLECTION_PATH!,
  carrierIds: splitAndTrimString(process.env.CARRIER_IDS!),
  shipmentKey: process.env.SHIPMENT_KEY!,
  ratesKey: process.env.RATES_KEY!,
};
