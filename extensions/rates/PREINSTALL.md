Use this extension to calculate real-time shipping rates across 50+ global carriers from documents added to a specified Cloud Firestore collection. [ShipEngine](https://www.shipengine.com/) retrieves all possible rates to help brands, ecommerce platforms, and 3PLs to make the best choice for every shipment, whether shipping cost, time to delivery, carrier capabilities or other factors are most important.

Here's a basic example document write that would trigger this extension:

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

When you configure this extension, you'll need to supply your **ShipEngine API Key** from the [ShipEngine API Management page](https://app.shipengine.com/#/portal/apimanagement).

#### Additional setup

Before installing this extension, make sure that you've [set up a Cloud Firestore database](https://firebase.google.com/docs/firestore/quickstart) in your Firebase project.

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

#### Billing

To install an extension, your project must be on the [Blaze (pay as you go) plan](https://firebase.google.com/pricing)

- You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).
- This extension uses other Firebase and Google Cloud Platform services, which have associated charges if you exceed the service’s free tier:
  - Cloud Firestore
  - Cloud Functions (Node.js 15+ runtime. [See FAQs](https://firebase.google.com/support/faq#extensions-pricing))

Usage of this extension also requires you to have a ShipEngine account. You are responsible for any associated costs with your usage of your ShipEngine account.
