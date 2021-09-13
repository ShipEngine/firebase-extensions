
import { CreateLabelFromShipmentDetailsTypes } from 'shipengine/esm/create-label-from-shipment-details';

export type RequestPayload = CreateLabelFromShipmentDetailsTypes.Params;
export type ResponsePayload = CreateLabelFromShipmentDetailsTypes.Result;
export type InputPayload = { [key: string]: RequestPayload['shipment'] } & { [key: string]: any };
export type UpdatePayload = { [key: string]: ResponsePayload };