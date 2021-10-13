### See it in action

You can test out this extension right away!

1.  Go to your [Cloud Firestore dashboard](https://console.firebase.google.com/project/${param:PROJECT_ID}/firestore/data) in the Firebase console.

1.  If it doesn't already exist, create the collection you specified during installation: `${param:COLLECTION_PATH}`.

1.  You can now use the [Firebase Admin SDK][admin_sdk] to add a document:

```js
admin
  .firestore()
  .collection('shipments')
  .add({
    label: {
      carrierCode: 'stamps_com',
      trackingNumber: '9405511899223197428490',
    },
  });
```

#### Input Schema

By default, this extension maps data from elements in your selected collection using the following schema:

```json
{
  "trackingNumber": "label.trackingNumber",
  "carrierCode": "label.carrierCode"
}
```

### Using this extension

After its installation, this extension monitors all document writes to the `${param:COLLECTION_PATH}` collection. Tracking data is fetched based on the contents of the document's fields. The `label` field specifies the `carrier_code` and `tracking_number` params.

### Monitoring

As a best practice, you can [monitor the activity](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) of your installed extension, including checks on its health, usage, and logs.

[shipment_collection]: https://console.firebase.google.com/project/_/firestore/data~2F${param:COLLECTION_PATH}
[admin_sdk]: https://firebase.google.com/docs/admin/setup
