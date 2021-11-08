# Validate Addresses with ShipEngine

**Author**: ShipEngine (**[https://shipengine.com](https://shipengine.com)**)

**Description**: Validates an address based on the contents of a document written to a specified Cloud Firestore collection.

**Details**: Use this extension to ensure valid mailing addresses around the world with [ShipEngine](https://www.shipengine.com/signup/?ref=firebase). ShipEngine cross references multiple databases to validate addresses and identify potential deliverability issues with shipments. This helps brands, ecommerce platforms, 3PLs avoid unnecessary returns and additional carrier fees.

Virtually every country in the world is supported, including the United States, Canada, United Kingdom, Australia, Germany, France, Norway, Spain, Sweden, Israel, Italy, and more than 160 others. Varying levels of validation are available in different countries. For example, one country may validate as precise as a suite/unit number, and another country may only validate as precise as the city. [See the full list of countries and their level of validation](https://www.shipengine.com/docs/addresses/validation/countries/)

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

- Firestore path: What is the path to the collection that contains the documents with addresses for validation?

- Validation Result Key: The document key to store the address validation results in.

- Input Schema: A schema object mapping the collection's data to the required ShipEngine API structure.

**Cloud Functions:**

- **validateAddress:** Processes document changes in the specified Cloud Firestore collection, validates emails, and updates the document with delivery status information.

- **validateAddressHttps:** undefined

**Access Required**:

This extension will operate with the following project IAM roles:

- datastore.user (Reason: Allows this extension to access Cloud Firestore to read and process added documents.)
