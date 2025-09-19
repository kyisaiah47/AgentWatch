import { Agent, Alert, Policy, AgentMetrics } from '../types/Agent';

const createMockPolicy = (
  id: string,
  name: string,
  type: 'rate_limit' | 'content_filter' | 'access_control' | 'data_retention',
  enabled: boolean = true
): Policy => ({
  id,
  name,
  type,
  enabled,
  configuration: {},
  lastUpdated: new Date(Date.now() - Math.random() * 86400000),
});

const createMockMetrics = (): AgentMetrics => ({
  totalRequests: Math.floor(Math.random() * 50000) + 10000,
  successRate: 0.95 + Math.random() * 0.04,
  averageResponseTime: Math.floor(Math.random() * 200) + 50,
  tokensUsed: Math.floor(Math.random() * 1000000) + 100000,
  costToday: Math.random() * 50 + 5,
  alertsTriggered: Math.floor(Math.random() * 5),
});

export const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Customer Support Bot',
    type: 'chatbot',
    status: 'active',
    lastActivity: new Date(Date.now() - 300000), // 5 minutes ago
    requestsToday: 1247,
    errorRate: 0.023,
    responseTime: 156,
    owner: 'support-team@company.com',
    environment: 'production',
    policies: [
      createMockPolicy('p1', 'Rate Limiting', 'rate_limit'),
      createMockPolicy('p2', 'Content Filter', 'content_filter'),
      createMockPolicy('p3', 'Access Control', 'access_control'),
    ],
    metrics: createMockMetrics(),
  },
  {
    id: '2',
    name: 'Sales Assistant',
    type: 'assistant',
    status: 'active',
    lastActivity: new Date(Date.now() - 120000), // 2 minutes ago
    requestsToday: 856,
    errorRate: 0.012,
    responseTime: 89,
    owner: 'sales@company.com',
    environment: 'production',
    policies: [
      createMockPolicy('p4', 'Lead Qualification', 'content_filter'),
      createMockPolicy('p5', 'Data Retention', 'data_retention'),
    ],
    metrics: createMockMetrics(),
  },
  {
    id: '3',
    name: 'Code Review Agent',
    type: 'analysis',
    status: 'warning',
    lastActivity: new Date(Date.now() - 900000), // 15 minutes ago
    requestsToday: 234,
    errorRate: 0.078,
    responseTime: 1234,
    owner: 'dev-team@company.com',
    environment: 'staging',
    policies: [
      createMockPolicy('p6', 'Code Quality Rules', 'content_filter'),
      createMockPolicy('p7', 'Repository Access', 'access_control'),
    ],
    metrics: createMockMetrics(),
  },
  {
    id: '4',
    name: 'Data Processor',
    type: 'workflow',
    status: 'inactive',
    lastActivity: new Date(Date.now() - 3600000), // 1 hour ago
    requestsToday: 45,
    errorRate: 0.001,
    responseTime: 2156,
    owner: 'data-team@company.com',
    environment: 'development',
    policies: [
      createMockPolicy('p8', 'Data Privacy', 'data_retention', true),
      createMockPolicy('p9', 'Processing Limits', 'rate_limit', false),
    ],
    metrics: createMockMetrics(),
  },
  {
    id: '5',
    name: 'HR Onboarding Bot',
    type: 'chatbot',
    status: 'error',
    lastActivity: new Date(Date.now() - 7200000), // 2 hours ago
    requestsToday: 12,
    errorRate: 0.156,
    responseTime: 5678,
    owner: 'hr@company.com',
    environment: 'production',
    policies: [
      createMockPolicy('p10', 'Employee Data Protection', 'data_retention'),
      createMockPolicy('p11', 'HR Policy Compliance', 'content_filter'),
    ],
    metrics: createMockMetrics(),
  },
];

export const mockAlerts: Alert[] = [
  {
    id: 'a1',
    agentId: '5',
    type: 'error',
    message: 'HR Onboarding Bot experiencing high error rate (15.6%). Authentication service may be down.',
    severity: 'critical',
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    acknowledged: false,
  },
  {
    id: 'a2',
    agentId: '3',
    type: 'performance',
    message: 'Code Review Agent response time exceeded threshold (1.2s vs 500ms target).',
    severity: 'medium',
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    acknowledged: false,
  },
  {
    id: 'a3',
    agentId: '1',
    type: 'policy',
    message: 'Rate limiting policy triggered 23 times in the last hour for Customer Support Bot.',
    severity: 'low',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    acknowledged: true,
  },
  {
    id: 'a4',
    agentId: '2',
    type: 'security',
    message: 'Unusual access pattern detected for Sales Assistant from IP range 192.168.1.0/24.',
    severity: 'high',
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    acknowledged: false,
  },
  {
    id: 'a5',
    agentId: '4',
    type: 'performance',
    message: 'Data Processor has been inactive for over 1 hour. Scheduled tasks may be affected.',
    severity: 'medium',
    timestamp: new Date(Date.now() - 3900000), // 65 minutes ago
    acknowledged: true,
  },
  {
    id: 'a6',
    agentId: '1',
    type: 'policy',
    message: 'Content filter updated successfully. New profanity detection rules are now active.',
    severity: 'low',
    timestamp: new Date(Date.now() - 14400000), // 4 hours ago
    acknowledged: true,
  },
];