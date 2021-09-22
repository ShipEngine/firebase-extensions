### See it in action

You can test out this extension right away!

1.  Go to your [Cloud Firestore dashboard](https://console.firebase.google.com/project/${param:PROJECT_ID}/firestore/data) in the Firebase console.

1.  If it doesn't already exist, create the collection you specified during installation: `${param:COLLECTION_PATH}`.

1.  You can now use the [Firebase Admin SDK][admin_sdk] to add a document:

```js
admin
  .firestore()
  .collection('${param:COLLECTION_PATH}')
  .add({
    shipment: {
      validateAddress: 'no_validation',
      shipTo: {
        name: 'Amanda Miller',
        phone: '555-555-5555',
        addressLine1: '525 S Winchester Blvd',
        cityLocality: 'San Jose',
        stateProvince: 'CA',
        postalCode: '95128',
        countryCode: 'US',
        addressResidentialIndicator: 'yes',
      },
      shipFrom: {
        companyName: 'Example Corp.',
        name: 'John Doe',
        phone: '111-111-1111',
        addressLine1: '4009 Marathon Blvd',
        addressLine2: 'Suite 300',
        cityLocality: 'Austin',
        stateProvince: 'TX',
        postalCode: '78756',
        countryCode: 'US',
        addressResidentialIndicator: 'no',
      },
      packages: [
        {
          weight: {
            value: 1.0,
            unit: 'ounce',
          },
        },
      ],
    },
  });
```

### Using this extension

After its installation, this extension monitors all document writes to the `${param:COLLECTION_PATH}` collection. Rates are fetched based on the contents of the document's fields. The `shipment` field specifies the `ship-to`, `ship-from`, `validateAddress`, and `packages` params.

### Monitoring

As a best practice, you can [monitor the activity](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) of your installed extension, including checks on its health, usage, and logs.

[shipment_collection]: https://console.firebase.google.com/project/_/firestore/data~2F${param:COLLECTION_PATH}
[admin_sdk]: https://firebase.google.com/docs/admin/setup
