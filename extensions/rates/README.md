# Rates

**Author**: ShipEngine (**[https://shipengine.com](https://shipengine.com)**)

**Description**: Queries for rates based on the contents of a document written to a specified Cloud Firestore collection.



**Details**: Use this extension to fetch rates for shipments from documents added to a specified Cloud Firestore collection.

Here's a basic example document write that would trigger this extension:

```js
admin
  .firestore()
  .collection('shipments')
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

When you configure this extension, you'll need to supply your **ShipEngine API Key**.

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


* Firestore path: What is the path to the collection that contains the documents with shipment info for validation?


* Shipment Key: The document key where the shipment information is located.


* Shipping Rates Key: The document key to store the rates result in.


* ShipEngine Carrier IDs: A comma separated list of Carrier IDs from your ShipEngine account.


* Enable Verbose Logging: Do you want to log payload data.



**Cloud Functions:**

* **getRates:** Processes shipment data in the specified Cloud Firestore collection, fetches rates, and updates the document with rate information.



**Access Required**:



This extension will operate with the following project IAM roles:

* datastore.user (Reason: Allows this extension to access Cloud Firestore to read and process added documents.)
