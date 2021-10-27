import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import ShipEngine from 'shipengine';
import { camelizeKeys } from 'humps';

// import config from './config';
import {
  CreateWebhookParams,
  CreateWebhookResponse,
  ListWebhooksResponse,
  Webhook,
} from './types';
interface TrackLabelParams {
  carrierCode: string;
  trackingNumber: string;
}
export class ShipEngineSDK extends ShipEngine {
  private client: AxiosInstance;
  constructor(
    apiKey: string,
    clientConfig: AxiosRequestConfig = {
      baseURL: 'https://api.shipengine.com',
      headers: {
        Host: 'api.shipengine.com',
        'API-Key': apiKey,
        'Content-Type': 'application/json',
      },
    }
  ) {
    super(apiKey);
    this.client = axios.create(clientConfig);
  }

  public async startTrackingLabel(params: TrackLabelParams): Promise<void> {
    try {
      await this.client.post('/v1/tracking/start');
    } catch (error) {
      throw error;
    }
  }

  public async stopTrackingLabel(params: TrackLabelParams): Promise<void> {
    try {
      await this.client.post('/v1/tracking/stop');
    } catch (error) {
      throw error;
    }
  }

  public async listWebhooks(): Promise<Webhook[]> {
    try {
      const result = await this.client.get<ListWebhooksResponse>(
        '/v1/environment/webhooks'
      );

      return camelizeKeys(result.data) as Webhook[];
    } catch (err) {
      throw err;
    }
  }

  public async createWebhook(params: CreateWebhookParams): Promise<Webhook> {
    try {
      const result = await this.client.post<CreateWebhookResponse>(
        '/v1/environment/webhooks',
        params
      );

      return camelizeKeys(result.data) as Webhook;
    } catch (err) {
      throw err;
    }
  }

  public async deleteWebhook(webhookId: string): Promise<boolean> {
    try {
      await this.client.delete(`/v1/environment/webhooks/${webhookId}`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}