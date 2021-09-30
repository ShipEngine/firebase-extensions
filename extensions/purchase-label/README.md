# Purchase Shipping Label with ShipEngine

**Author**: ShipEngine (**[https://shipengine.com](https://shipengine.com)**)

**Description**: Purchases a shipping label based on the contents of a document written to a specified Cloud Firestore collection.



**Details**: Use this extension to validate addresses.

Here's a basic example document write that would trigger this extension:

```js
admin
  .firestore()
  .collection('shipments')
  .add({
    shipment: {
      carrierId: 'se-423887',
      serviceCode: 'usps_media_mail',
      shipDate: '2021-09-21',
      validateAddress: 'no_validation',
      shipTo: {
        name: 'Amanda Miller',
        addressLine1: '525 S Winchester Blvd',
        cityLocality: 'San Jose',
        stateProvince: 'CA',
        postalCode: '95128',
        countryCode: 'US',
      },
      shipFrom: {
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

#### Billing

To install an extension, your project must be on the [Blaze (pay as you go) plan](https://firebase.google.com/pricing)

- You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).
- This extension uses other Firebase and Google Cloud Platform services, which have associated charges if you exceed the service’s free tier:
  - Cloud Firestore
  - Cloud Functions (Node.js 15+ runtime. [See FAQs](https://firebase.google.com/support/faq#extensions-pricing))

Usage of this extension also requires you to have a ShipEngine account. You are responsible for any associated costs with your usage of your ShipEngine account.




**Configuration Parameters:**

* Cloud Functions location: Where do you want to deploy the functions created for this extension? You usually want a location close to your database. For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations).

* ShipEngine Api Key: Api key found on the api dashboard.


* Firestore path: What is the path to the collection that contains the documents with orders to be shipped?


* Input Schema: A schema object mapping the collection's data to the required ShipEngine API structure.


* Shipping Label Key: The document key to store the purchased label in.




**Cloud Functions:**

* **purchaseLabel:** Processes document changes in the specified Cloud Firestore collection, purchases labels, and updates the document with label URL.



**Access Required**:



This extension will operate with the following project IAM roles:

* datastore.user (Reason: Allows this extension to access Cloud Firestore to read and process added documents.)
