import { TrackUsingCarrierCodeAndTrackingNumberTypes } from 'shipengine/esm/track-using-carrier-code-and-tracking-number';

export type RequestPayload = TrackUsingCarrierCodeAndTrackingNumberTypes.Params;
export type ResponsePayload =
  TrackUsingCarrierCodeAndTrackingNumberTypes.Result;

export type InputPayload = Record<string, Record<string, string>>;
export type UpdatePayload = Record<string, ResponsePayload>;
