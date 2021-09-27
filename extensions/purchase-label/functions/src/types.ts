import { CreateLabelFromRateTypes } from 'shipengine/esm/create-label-from-rate';
import { CreateLabelFromShipmentDetailsTypes } from 'shipengine/esm/create-label-from-shipment-details';

export type RequestPayload = CreateLabelFromRateTypes.Params &
  CreateLabelFromShipmentDetailsTypes.Params;
export type ResponsePayload = CreateLabelFromRateTypes.Result &
  CreateLabelFromShipmentDetailsTypes.Result;
export type UpdatePayload = { [key: string]: ResponsePayload };
export type ParamSchema = { [key: string]: any };
