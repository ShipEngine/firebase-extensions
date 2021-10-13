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
    shipment: {
      shipTo: {
        name: 'Amanda Miller',
        addressLine1: '525 S Winchester Blvd',
        cityLocality: 'San Jose',
        stateProvince: 'CA',
        postalCode: '95128',
        countryCode: 'US',
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

#### Input Schema

By default, this extension maps data from elements in your selected collection using the following schema:

```json
{
  "shipmentId": "shipmentId",
  "rateOptions": {
    "carrierIds": "rateOptions.carrierIds",
    "packageTypes": "rateOptions.packageTypes",
    "serviceCodes": "rateOptions.serviceCodes",
    "calculateTaxAmount": "rateOptions.calculateTaxAmount",
    "preferredCurrency": "rateOptions.preferredCurrency"
  },
  "shipment": {
    "shipTo": {
      "name": "shipment.shipTo.name",
      "phone": "shipment.shipTo.phone",
      "addressLine1": "shipment.shipTo.addressLine1",
      "addressLine2": "shipment.shipTo.addressLine2",
      "cityLocality": "shipment.shipTo.cityLocality",
      "stateProvince": "shipment.shipTo.stateProvince",
      "postalCode": "shipment.shipTo.postalCode",
      "countryCode": "shipment.shipTo.countryCode",
      "addressResidentialIndicator": "shipment.shipTo.addressResidentialIndicator"
    },
    "shipFrom": {
      "companyName": "shipment.shipFrom.companyName",
      "name": "shipment.shipFrom.name",
      "phone": "shipment.shipFrom.phone",
      "addressLine1": "shipment.shipTo.addressLine1",
      "addressLine2": "shipment.shipTo.addressLine2",
      "cityLocality": "shipment.shipTo.cityLocality",
      "stateProvince": "shipment.shipTo.stateProvince",
      "postalCode": "shipment.shipTo.postalCode",
      "countryCode": "shipment.shipTo.countryCode",
      "addressResidentialIndicator": "shipment.shipFrom.addressResidentialIndicator"
    },
    "packages": {
      "_root": "shipment.packages",
      "weight": {
        "value": "weight.value",
        "unit": "weight.unit"
      }
    }
  }
}
```

### Using this extension

After its installation, this extension monitors all document writes to the `${param:COLLECTION_PATH}` collection. Rates are fetched based on the contents of the document's fields. The `shipment` field specifies the `ship-to`, `ship-from`, `validateAddress`, and `packages` params.

### Monitoring

As a best practice, you can [monitor the activity](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) of your installed extension, including checks on its health, usage, and logs.

[shipment_collection]: https://console.firebase.google.com/project/_/firestore/data~2F${param:COLLECTION_PATH}
[admin_sdk]: https://firebase.google.com/docs/admin/setup
