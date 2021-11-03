# Track Shipping Labels with ShipEngine

**Author**: ShipEngine (**[https://shipengine.com](https://shipengine.com)**)

**Description**: Queries for label tracking data based on the contents of a document written to a specified Cloud Firestore collection.

**Details**: Use this extension to retrieve up-to-date tracking data for any shipment from any carrier using a valid tracking number and a [supported carrier code](https://www.shipengine.com/docs/tracking/#supported-carriers).

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

**Configuration Parameters:**

- Cloud Functions location: Where do you want to deploy the functions created for this extension? You usually want a location close to your database. For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations).

- ShipEngine Api Key: Api key found on the api dashboard.

- Firestore path: What is the path to the collection that contains the documents with label data?

- Tracking Result Key: The document key to store the tracking result in.

- Input Schema: A schema object mapping the collection's data to the required ShipEngine API structure.

**Cloud Functions:**

- **trackLabel:** Processes label data in the specified Cloud Firestore collection, fetches tracking data, and updates the document with tracking information.

**Access Required**:

This extension will operate with the following project IAM roles:

- datastore.user (Reason: Allows this extension to access Cloud Firestore to read and process added documents.)
