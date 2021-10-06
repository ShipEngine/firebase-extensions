Use this extension to validate addresses using the ShipEngine API.

Here's a basic example document write that would trigger this extension:

```js
admin
  .firestore()
  .collection('addresses')
  .add({
    address: {
      name: 'John Smith',
      addressLine1: '200 Sunrise Mall',
      cityLocality: 'Massapequa',
      stateProvince: 'NY',
      postalCode: '11758',
      countryCode: 'US',
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
  "name": "address.name",
  "phone": "address.phone",
  "companyName": "address.companyName",
  "addressLine1": "address.addressLine1",
  "addressLine2": "address.addressLine2",
  "addressLine3": "address.addressLine3",
  "cityLocality": "address.cityLocality",
  "stateProvince": "address.stateProvince",
  "postalCode": "address.postalCode",
  "countryCode": "address.countryCode",
  "addressResidentialIndicator": "address.addressResidentialIndicator"
}
```

#### Billing

To install an extension, your project must be on the [Blaze (pay as you go) plan](https://firebase.google.com/pricing)

- You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).
- This extension uses other Firebase and Google Cloud Platform services, which have associated charges if you exceed the service’s free tier:
  - Cloud Firestore
  - Cloud Functions (Node.js 15+ runtime. [See FAQs](https://firebase.google.com/support/faq#extensions-pricing))

Usage of this extension also requires you to have a ShipEngine account. You are responsible for any associated costs with your usage of your ShipEngine account.
