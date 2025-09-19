export interface Agent {
  id: string;
  name: string;
  type: 'chatbot' | 'assistant' | 'workflow' | 'analysis';
  status: 'active' | 'inactive' | 'error' | 'warning';
  lastActivity: Date;
  requestsToday: number;
  errorRate: number;
  responseTime: number;
  owner: string;
  environment: 'production' | 'staging' | 'development';
  policies: Policy[];
  metrics: AgentMetrics;
}

export interface Policy {
  id: string;
  name: string;
  type: 'rate_limit' | 'content_filter' | 'access_control' | 'data_retention';
  enabled: boolean;
  configuration: Record<string, any>;
  lastUpdated: Date;
}

export interface AgentMetrics {
  totalRequests: number;
  successRate: number;
  averageResponseTime: number;
  tokensUsed: number;
  costToday: number;
  alertsTriggered: number;
}

export interface AuditLog {
  id: string;
  agentId: string;
  timestamp: Date;
  action: string;
  userId: string;
  details: Record<string, any>;
  severity: 'info' | 'warning' | 'error' | 'critical';
}

export interface Alert {
  id: string;
  agentId: string;
  type: 'performance' | 'error' | 'policy' | 'security';
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  acknowledged: boolean;
}