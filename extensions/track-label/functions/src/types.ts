import { TrackUsingCarrierCodeAndTrackingNumberTypes } from 'shipengine/esm/track-using-carrier-code-and-tracking-number';

export type RequestPayload = TrackUsingCarrierCodeAndTrackingNumberTypes.Params;
export type ResponsePayload =
  TrackUsingCarrierCodeAndTrackingNumberTypes.Result;

export type InputPayload = Record<string, Record<string, string>>;
export type UpdatePayload = Record<string, ResponsePayload>;
export type ParamSchema = { [key: string]: any };

export type WebhookEvent =
  | 'batch'
  | 'carrier_connected'
  | 'order_source_refresh_complete'
  | 'rate'
  | 'report_complete'
  | 'sales_orders_imported'
  | 'track';
type Url = string;

export interface CreateWebhookParams {
  event: WebhookEvent;
  url: Url;
}

export interface CreateWebhookResponse {
  webhook_id: string;
  url: Url;
  event: WebhookEvent;
}

export interface Webhook {
  webhookId: string;
  url: Url;
  event: WebhookEvent;
}

export type ListWebhooksResponse = Array<{
  webhook_id: string;
  url: Url;
  event: WebhookEvent;
}>;
