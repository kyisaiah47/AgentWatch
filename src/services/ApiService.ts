import axios from 'axios';
import { Agent, Alert } from '../types/Agent';

const API_BASE_URL = 'http://localhost:3001/api';

export class ApiService {
  private static instance: ApiService;
  private ws: WebSocket | null = null;
  private listeners: Map<string, Function[]> = new Map();

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  async getAgents(): Promise<Agent[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/agents`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch agents:', error);
      throw error;
    }
  }

  async getAgent(id: string): Promise<Agent> {
    try {
      const response = await axios.get(`${API_BASE_URL}/agents/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch agent ${id}:`, error);
      throw error;
    }
  }

  async updateAgentStatus(id: string, status: string): Promise<Agent> {
    try {
      const response = await axios.put(`${API_BASE_URL}/agents/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Failed to update agent ${id} status:`, error);
      throw error;
    }
  }

  async getAlerts(): Promise<Alert[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/alerts`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
      throw error;
    }
  }

  async acknowledgeAlert(id: string): Promise<Alert> {
    try {
      const response = await axios.put(`${API_BASE_URL}/alerts/${id}/acknowledge`);
      return response.data;
    } catch (error) {
      console.error(`Failed to acknowledge alert ${id}:`, error);
      throw error;
    }
  }

  async getMetricsOverview(): Promise<any> {
    try {
      const response = await axios.get(`${API_BASE_URL}/metrics/overview`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch metrics overview:', error);
      throw error;
    }
  }

  connectWebSocket(): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      this.ws = new WebSocket('ws://localhost:3001');

      this.ws.onopen = () => {
        console.log('Connected to AgentWatch WebSocket');
        this.emit('connected', { connected: true });
      };

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          this.emit(message.type, message.data);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('Disconnected from AgentWatch WebSocket');
        this.emit('disconnected', { connected: false });

        setTimeout(() => {
          if (this.ws?.readyState === WebSocket.CLOSED) {
            this.connectWebSocket();
          }
        }, 5000);
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.emit('error', { error });
      };
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
    }
  }

  disconnectWebSocket(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  off(event: string, callback: Function): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(callback);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data));
    }
  }
}

export default ApiService.getInstance();