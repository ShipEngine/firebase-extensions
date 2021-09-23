import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import ShipEngine from 'shipengine';
import { camelizeKeys } from 'humps';

import config from './config';
import {
  CreateWebhookParams,
  CreateWebhookResponse,
  ListWebhooksResponse,
  Webhook,
} from './types';

class ShipEngineSDK extends ShipEngine {
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

const se = new ShipEngineSDK(config.shipEngineApiKey);

// Subscribe to Webhook
// Unsubscribe to Webhook
