Use this extension to retrieve up-to-date tracking data for any shipment from any carrier using a valid tracking number and a [supported carrier code](https://www.shipengine.com/docs/tracking/#supported-carriers).

Here's a basic example document write that would trigger this extension:

```js
admin
  .firestore()
  .collection('labels')
  .add({
    label: {
      carrierCode: 'stamps_com',
      trackingNumber: '9405511899223197428490',
    },
  });
```

#### Additional setup

Before installing this extension, make sure that you've [set up a Cloud Firestore database](https://firebase.google.com/docs/firestore/quickstart) in your Firebase project.

You must also create a [ShipEngine account](https://www.shipengine.com/signup/?ref=firebase) or use your existing account and supply your **ShipEngine API Key** from the [ShipEngine API Management page](https://app.shipengine.com/#/portal/apimanagement) when you configure this extension.

#### Billing

To install an extension, your project must be on the [Blaze (pay as you go) plan](https://firebase.google.com/pricing)

- You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).
- This extension uses other Firebase and Google Cloud Platform services, which have associated charges if you exceed the service’s free tier:
  - Cloud Firestore
  - Cloud Functions (Node.js 15+ runtime. [See FAQs](https://firebase.google.com/support/faq#extensions-pricing))
  - Cloud Secret Manager

Usage of this extension also requires you to have a ShipEngine account. You are responsible for any associated costs with your usage of your ShipEngine account.
