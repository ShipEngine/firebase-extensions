import { CreateLabelFromShipmentDetailsTypes } from 'shipengine/esm/create-label-from-shipment-details';

export type RequestPayload = CreateLabelFromShipmentDetailsTypes.Params;
export type ResponsePayload = CreateLabelFromShipmentDetailsTypes.Result;
export type UpdatePayload = { [key: string]: ResponsePayload };
export type ParamSchema = { [key: string]: any };
