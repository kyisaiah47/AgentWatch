const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const mockAgents = [
  {
    id: '1',
    name: 'Customer Support Bot',
    type: 'chatbot',
    status: 'active',
    lastActivity: new Date(),
    requestsToday: 1247,
    errorRate: 0.023,
    responseTime: 156,
    owner: 'support-team@company.com',
    environment: 'production',
    metrics: {
      totalRequests: 15000,
      successRate: 0.977,
      averageResponseTime: 156,
      tokensUsed: 450000,
      costToday: 12.50,
      alertsTriggered: 1,
    },
  },
  {
    id: '2',
    name: 'Sales Assistant',
    type: 'assistant',
    status: 'active',
    lastActivity: new Date(Date.now() - 120000),
    requestsToday: 856,
    errorRate: 0.012,
    responseTime: 89,
    owner: 'sales@company.com',
    environment: 'production',
    metrics: {
      totalRequests: 12000,
      successRate: 0.988,
      averageResponseTime: 89,
      tokensUsed: 320000,
      costToday: 8.75,
      alertsTriggered: 0,
    },
  },
  {
    id: '3',
    name: 'Code Review Agent',
    type: 'analysis',
    status: 'warning',
    lastActivity: new Date(Date.now() - 900000),
    requestsToday: 234,
    errorRate: 0.078,
    responseTime: 1234,
    owner: 'dev-team@company.com',
    environment: 'staging',
    metrics: {
      totalRequests: 3000,
      successRate: 0.922,
      averageResponseTime: 1234,
      tokensUsed: 180000,
      costToday: 15.20,
      alertsTriggered: 2,
    },
  },
];

const mockAlerts = [
  {
    id: 'a1',
    agentId: '3',
    type: 'performance',
    message: 'Code Review Agent response time exceeded threshold',
    severity: 'medium',
    timestamp: new Date(Date.now() - 900000),
    acknowledged: false,
  },
  {
    id: 'a2',
    agentId: '1',
    type: 'policy',
    message: 'Rate limiting policy triggered multiple times',
    severity: 'low',
    timestamp: new Date(Date.now() - 3600000),
    acknowledged: true,
  },
];

app.get('/api/agents', (req, res) => {
  res.json(mockAgents);
});

app.get('/api/agents/:id', (req, res) => {
  const agent = mockAgents.find(a => a.id === req.params.id);
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  res.json(agent);
});

app.put('/api/agents/:id/status', (req, res) => {
  const agent = mockAgents.find(a => a.id === req.params.id);
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }

  const { status } = req.body;
  if (!['active', 'inactive', 'error', 'warning'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  agent.status = status;
  agent.lastActivity = new Date();

  broadcastUpdate('agent_status_changed', { agentId: agent.id, status, timestamp: new Date() });

  res.json(agent);
});

app.get('/api/alerts', (req, res) => {
  res.json(mockAlerts);
});

app.put('/api/alerts/:id/acknowledge', (req, res) => {
  const alert = mockAlerts.find(a => a.id === req.params.id);
  if (!alert) {
    return res.status(404).json({ error: 'Alert not found' });
  }

  alert.acknowledged = true;
  broadcastUpdate('alert_acknowledged', { alertId: alert.id, timestamp: new Date() });

  res.json(alert);
});

app.get('/api/metrics/overview', (req, res) => {
  const totalAgents = mockAgents.length;
  const activeAgents = mockAgents.filter(a => a.status === 'active').length;
  const totalRequests = mockAgents.reduce((sum, a) => sum + a.requestsToday, 0);
  const avgErrorRate = mockAgents.reduce((sum, a) => sum + a.errorRate, 0) / mockAgents.length;
  const totalCost = mockAgents.reduce((sum, a) => sum + a.metrics.costToday, 0);
  const unacknowledgedAlerts = mockAlerts.filter(a => !a.acknowledged).length;

  res.json({
    totalAgents,
    activeAgents,
    totalRequests,
    avgErrorRate,
    totalCost,
    unacknowledgedAlerts,
    timestamp: new Date(),
  });
});

function broadcastUpdate(type, data) {
  const message = JSON.stringify({ type, data, timestamp: new Date() });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

function simulateRealTimeUpdates() {
  setInterval(() => {
    mockAgents.forEach(agent => {
      const oldRequests = agent.requestsToday;
      agent.requestsToday += Math.floor(Math.random() * 10);

      if (agent.requestsToday > oldRequests) {
        agent.lastActivity = new Date();

        const randomEvent = Math.random();
        if (randomEvent < 0.1) {
          agent.errorRate = Math.max(0, agent.errorRate + (Math.random() - 0.5) * 0.01);
        }

        if (randomEvent < 0.05) {
          agent.responseTime += Math.floor((Math.random() - 0.5) * 100);
          agent.responseTime = Math.max(50, agent.responseTime);
        }
      }
    });

    broadcastUpdate('metrics_updated', {
      agents: mockAgents,
      timestamp: new Date(),
    });
  }, 5000);
}

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');

  ws.send(JSON.stringify({
    type: 'connected',
    data: { message: 'Connected to AgentWatch real-time updates' },
    timestamp: new Date(),
  }));

  ws.on('close', () => {
    console.log('Client disconnected from WebSocket');
  });
});

simulateRealTimeUpdates();

server.listen(PORT, () => {
  console.log(`AgentWatch API server running on port ${PORT}`);
  console.log(`WebSocket server ready for real-time updates`);
});

module.exports = app;