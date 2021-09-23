import { GetRatesWithShipmentDetailsTypes } from 'shipengine/esm/get-rates-with-shipment-details';

export type RequestPayload = GetRatesWithShipmentDetailsTypes.Params;
export type ResponsePayload = GetRatesWithShipmentDetailsTypes.Result;
export type InputPayload = {
  [key: string]: RequestPayload['shipment'];
};
export type ParamSchema = { [key: string]: any };
export type UpdatePayload = {
  [key: string]: ResponsePayload['rateResponse']['rates'];
};
