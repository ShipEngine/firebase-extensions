export default {
  location: process.env.LOCATION!,
  databaseInstance: process.env.SELECTED_DATABASE_INSTANCE!,
  shipEngineApiKey: process.env.SHIPENGINE_API_KEY!,
  collectionPath: process.env.COLLECTION_PATH!,
  shipmentKey: process.env.SHIPMENT_KEY!,
  readyToShipKey: process.env.READY_TO_SHIP_KEY!,
  shippingLabelKey: process.env.SHIPPING_LABEL_KEY!,
};
