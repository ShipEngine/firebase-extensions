import { get } from 'lodash';
import { DocumentData } from '@google-cloud/firestore';
import { ParamSchema, RequestPayload } from './types';

export const mapDataToSchema = (
  data: DocumentData,
  schema: ParamSchema
): RequestPayload => {
  return {
    shipment: {
      carrierId: get(data, schema.shipment.carrierId),
      serviceCode: get(data, schema.shipment.serviceCode),
      externalOrderId: get(data, schema.shipment.externalOrderId),
      items: mapCollectionOrObject(
        get(data, schema.shipment.items._root),
        (item: any) => ({
          name: get(item, schema.shipment.items.name),
          salesOrderId: get(item, schema.shipment.items.salesOrderId),
          salesOrderItemId: get(item, schema.shipment.items.salesOrderItemId),
          quantity: get(item, schema.shipment.items.quantity),
          sku: get(item, schema.shipment.items.sku),
          externalOrderId: get(item, schema.shipment.items.externalOrderId),
          externalOrderItemId: get(
            item,
            schema.shipment.items.externalOrderItemId
          ),
          asin: get(item, schema.shipment.items.asin),
          orderSourceCode: get(item, schema.shipment.items.orderSourceCode),
        })
      ) as RequestPayload['shipment']['items'],
      taxIdentifiers: mapCollectionOrObject(
        get(data, schema.shipment.taxIdentifiers._root),
        (item: any) => ({
          taxableEntityType: get(
            item,
            schema.shipment.taxIdentifiers.taxableEntityType
          ),
          identifierType: get(
            item,
            schema.shipment.taxIdentifiers.identifierType
          ),
          issuingAuthority: get(
            item,
            schema.shipment.taxIdentifiers.issuingAuthority
          ),
          value: get(item, schema.shipment.taxIdentifiers.value),
        })
      ) as RequestPayload['shipment']['taxIdentifiers'],
      externalShipmentId: get(data, schema.shipment.externalShipmentId),
      shipDate: get(data, schema.shipment.shipDate),
      shipTo: {
        name: get(data, schema.shipment.shipTo.name),
        phone: get(data, schema.shipment.shipTo.phone),
        companyName: get(data, schema.shipment.shipTo.companyName),
        addressLine1: get(data, schema.shipment.shipTo.addressLine1),
        addressLine2: get(data, schema.shipment.shipTo.addressLine2),
        addressLine3: get(data, schema.shipment.shipTo.addressLine3),
        cityLocality: get(data, schema.shipment.shipTo.cityLocality),
        stateProvince: get(data, schema.shipment.shipTo.stateProvince),
        postalCode: get(data, schema.shipment.shipTo.postalCode),
        countryCode: get(data, schema.shipment.shipTo.countryCode),
        addressResidentialIndicator: get(
          data,
          schema.shipment.shipTo.addressResidentialIndicator
        ),
      },
      shipFrom: {
        name: get(data, schema.shipment.shipFrom.name),
        phone: get(data, schema.shipment.shipFrom.phone),
        companyName: get(data, schema.shipment.shipFrom.companyName),
        addressLine1: get(data, schema.shipment.shipFrom.addressLine1),
        addressLine2: get(data, schema.shipment.shipFrom.addressLine2),
        addressLine3: get(data, schema.shipment.shipFrom.addressLine3),
        cityLocality: get(data, schema.shipment.shipFrom.cityLocality),
        stateProvince: get(data, schema.shipment.shipFrom.stateProvince),
        postalCode: get(data, schema.shipment.shipFrom.postalCode),
        countryCode: get(data, schema.shipment.shipFrom.countryCode),
        addressResidentialIndicator: get(
          data,
          schema.shipment.shipFrom.addressResidentialIndicator
        ),
      },
      warehouseId: get(data, schema.shipment.warehouseId),
      returnTo: get(data, schema.shipment.returnTo),
      confirmation: get(data, schema.shipment.confirmation),
      customs: {
        contents: get(data, schema.shipment.customs.contents),
        nonDelivery: get(data, schema.shipment.customs.nonDelivery),
        customsItems: mapCollectionOrObject(
          get(data, schema.shipment.customs.customsItems._root),
          (item: any) => ({
            quantity: get(item, schema.shipment.customs.customsItems.quantity),
            value: {
              currency: get(
                item,
                schema.shipment.customs.customsItems.value.currency
              ),
              amount: get(
                item,
                schema.shipment.customs.customsItems.value.amount
              ),
            },
            harmonizedTariffCode: get(
              item,
              schema.shipment.customs.customsItems.harmonizedTariffCode
            ),
            countryOfOrigin: get(
              item,
              schema.shipment.customs.customsItems.countryOfOrigin
            ),
            unitOfMeasure: get(
              item,
              schema.shipment.customs.customsItems.unitOfMeasure
            ),
            sku: get(item, schema.shipment.customs.customsItems.sku),
            skuDescription: get(
              item,
              schema.shipment.customs.customsItems.skuDescription
            ),
          })
        ),
      },
      advancedOptions: {
        billToAccount: get(data, schema.shipment.advancedOptions.billToAccount),
        billToCountryCode: get(
          data,
          schema.shipment.advancedOptions.billToCountryCode
        ),
        billToParty: get(data, schema.shipment.advancedOptions.billToParty),
        billToPostalCode: get(
          data,
          schema.shipment.advancedOptions.billToPostalCode
        ),
        containsAlcohol: get(
          data,
          schema.shipment.advancedOptions.containsAlcohol
        ),
        deliveredDutyPaid: get(
          data,
          schema.shipment.advancedOptions.deliveredDutyPaid
        ),
        dryIce: get(data, schema.shipment.advancedOptions.dryIce),
        dryIceWeight: get(data, schema.shipment.advancedOptions.dryIceWeight),
        nonMachinable: get(data, schema.shipment.advancedOptions.nonMachinable),
        saturdayDelivery: get(
          data,
          schema.shipment.advancedOptions.saturdayDelivery
        ),
        useUpsGroundFreightPricing: get(
          data,
          schema.shipment.advancedOptions.useUpsGroundFreightPricing
        ),
        freightClass: get(data, schema.shipment.advancedOptions.freightClass),
        customField1: get(data, schema.shipment.advancedOptions.customField1),
        customField2: get(data, schema.shipment.advancedOptions.customField2),
        customField3: get(data, schema.shipment.advancedOptions.customField3),
        originType: get(data, schema.shipment.advancedOptions.originType),
        shipperRelease: get(
          data,
          schema.shipment.advancedOptions.shipperRelease
        ),
        collectOnDelivery: {
          paymentType: get(
            data,
            schema.shipment.advancedOptions.collectOnDelivery.paymentType
          ),
          paymentAmount: get(
            data,
            schema.shipment.advancedOptions.collectOnDelivery.paymentAmount
          ),
        },
      },
      originType: get(data, schema.shipment.originType),
      insuranceProvider: get(data, schema.shipment.insuranceProvider),
      orderSourceCode: get(data, schema.shipment.orderSourceCode),
      packages: mapCollectionOrObject(
        get(data, schema.shipment.packages._root),
        (item: any) => ({
          packageCode: get(item, schema.shipment.packages.packageCode),
          weight: {
            value: get(item, schema.shipment.packages.weight.value),
            unit: get(item, schema.shipment.packages.weight.unit),
          },
          dimensions: {
            unit: get(item, schema.shipment.packages.dimensions.unit),
            length: get(item, schema.shipment.packages.dimensions.length),
            width: get(item, schema.shipment.packages.dimensions.width),
            height: get(item, schema.shipment.packages.dimensions.height),
          },
          insuredValue: {
            currency: get(item, schema.shipment.packages.insuredValue.currency),
            amount: get(item, schema.shipment.packages.insuredValue.amount),
          },
          labelMessages: {
            reference1: get(
              item,
              schema.shipment.packages.labelMessages.reference1
            ),
            reference2: get(
              item,
              schema.shipment.packages.labelMessages.reference2
            ),
            reference3: get(
              item,
              schema.shipment.packages.labelMessages.reference3
            ),
          },
          externalPackageId: get(
            item,
            schema.shipment.packages.externalPackageId
          ),
        })
      ) as RequestPayload['shipment']['packages'],
    },
    isReturnLabel: get(data, schema.isReturnLabel),
    rmaNumber: get(data, schema.rmaNumber),
    chargeEvent: get(data, schema.chargeEvent),
    outboundLabelId: get(data, schema.outboundLabelId),
    validateAddress: get(data, schema.validateAddress),
    labelDownloadType: get(data, schema.labelDownloadType),
    labelFormat: get(data, schema.labelFormat),
    displayScheme: get(data, schema.displayScheme),
    labelLayout: get(data, schema.labelLayout),
    labelImageId: get(data, schema.labelImageId),
  };
};

function mapCollectionOrObject(
  data: Array<object> | object,
  map_fn: (item: any) => object
): Array<object> {
  if (Array.isArray(data)) data.map(map_fn);
  return [data].map(map_fn);
}
