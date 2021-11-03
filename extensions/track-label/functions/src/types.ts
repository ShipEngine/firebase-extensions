import { TrackUsingCarrierCodeAndTrackingNumberTypes } from 'shipengine/esm/track-using-carrier-code-and-tracking-number';
import { TrackUsingLabelIdTypes } from 'shipengine/esm/track-using-label-id';

type Optional<T> = { [P in keyof T]?: T[P] };

export type RequestPayload = Optional<
  TrackUsingCarrierCodeAndTrackingNumberTypes.Params & { labelId?: string }
>;
export type ResponsePayload =
  TrackUsingCarrierCodeAndTrackingNumberTypes.Result &
    TrackUsingLabelIdTypes.Response;

export type InputPayload = Record<string, Record<string, string>>;
export type UpdatePayload = ResponsePayload & { labelId?: string };
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
