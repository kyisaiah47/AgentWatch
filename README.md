# AgentWatch 🤖📱

**AI Agent Governance Dashboard - Mobile-First Enterprise Solution**

> Submitted to Open Mobile Hub AI Agent Competition 2025

## 🎥 **Demo Video**
**[📹 Watch Live Demo on YouTube](https://www.youtube.com/watch?v=YOUR_VIDEO_ID_HERE)**
*Full walkthrough of AgentWatch running on iOS with real-time features*

---

AgentWatch is a comprehensive mobile application designed to monitor, control, and audit AI agents in enterprise environments. Built with React Native and real-time capabilities, it addresses the critical gap in AI agent governance tools.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- React Native development environment
- iOS/Android simulator or device

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/kyisaiah47/AgentWatch.git
cd AgentWatch
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the backend server**
```bash
cd backend
npm install
npm start
```

4. **Start the React Native app**
```bash
# In the root directory
npm start
```

5. **Run on device/simulator**
```bash
# iOS
npx react-native run-ios

# Android
npx react-native run-android
```

## 📱 Features

### Core Functionality
- **Real-time Dashboard**: Live monitoring of AI agent performance
- **Agent Management**: Control agent status and configuration
- **Policy Governance**: Create and enforce organizational policies
- **Alert System**: Proactive notifications for issues and anomalies
- **Audit Trail**: Comprehensive logging and compliance tracking

### Technical Highlights
- **Mobile-First Design**: Optimized for iOS and Android
- **Real-time Updates**: WebSocket-based live data streaming
- **Dark/Light Theme**: Automatic theme switching
- **Offline Capable**: Graceful handling of network interruptions
- **Enterprise Security**: Role-based access and audit logging

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│                 │    │                  │    │                 │
│  React Native   │◄───┤   Express.js     │◄───┤   AI Agents     │
│  Mobile App     │    │   Backend API    │    │   (External)    │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐             │
         │              │                 │             │
         └──────────────┤   WebSocket     │─────────────┘
                        │   Real-time     │
                        │   Updates       │
                        └─────────────────┘
```

### Technology Stack

**Frontend (React Native)**
- React Native 0.81+ with TypeScript
- React Navigation for screen management
- WebSocket client for real-time updates
- Axios for HTTP API calls
- Custom UI components with theme support

**Backend (Node.js)**
- Express.js REST API server
- WebSocket server for real-time communication
- Mock data simulation for demonstration
- CORS-enabled for development

## 📊 Demo Data

The application includes comprehensive mock data showcasing:

- **5 Sample AI Agents** across different types and environments
- **Real-time Metrics** including requests, error rates, and response times
- **Policy Examples** for rate limiting, content filtering, and access control
- **Alert Scenarios** with various severity levels
- **Audit Logs** demonstrating compliance tracking

## 🔧 API Reference

### Agent Management
```bash
GET    /api/agents              # List all agents
GET    /api/agents/:id          # Get agent details
PUT    /api/agents/:id/status   # Update agent status
```

### Monitoring & Alerts
```bash
GET    /api/alerts              # List alerts
PUT    /api/alerts/:id/acknowledge  # Acknowledge alert
GET    /api/metrics/overview    # System overview metrics
```

### WebSocket Events
```javascript
// Real-time updates
{ type: 'metrics_updated', data: { agents: [...] } }
{ type: 'agent_status_changed', data: { agentId: '1', status: 'active' } }
{ type: 'alert_triggered', data: { alert: {...} } }
```

## 🎯 Competition Entry

### Categories
- **Production Ready App**: Fully functional mobile application
- **Technical Specification**: Comprehensive documentation and architecture

### Innovation Highlights
1. **First mobile-focused AI agent governance platform**
2. **Real-time monitoring with WebSocket integration**
3. **Policy-driven governance framework**
4. **Enterprise-ready security and scalability**
5. **Intuitive mobile UX for complex technical operations**

## 📈 Market Opportunity

**Target Market**: Enterprise AI teams managing multiple AI agents

**Market Size**:
- $47B+ AI agents market growing at 44.8% CAGR
- 82% of organizations plan AI agent integration by 2026
- Critical governance gap in current market offerings

**Competitive Advantage**:
- Mobile-first approach
- Real-time capabilities
- Purpose-built for AI agent governance
- Enterprise-grade security and compliance

## 🛣️ Roadmap

### MVP (Current - Competition Entry)
- ✅ React Native mobile app
- ✅ Real-time dashboard and monitoring
- ✅ Agent status management
- ✅ Policy governance framework
- ✅ Alert system with severity levels
- ✅ WebSocket real-time updates

### Phase 2 (Post-Competition)
- [ ] Multi-tenant support
- [ ] Advanced analytics and reporting
- [ ] Push notifications
- [ ] Offline mode with sync
- [ ] Integration with major AI platforms

### Phase 3 (Future)
- [ ] ML-powered anomaly detection
- [ ] Compliance automation
- [ ] Third-party integrations
- [ ] Advanced user management
- [ ] Custom dashboard widgets

## 📄 Documentation

- **[Technical Specification](./TECHNICAL_SPECIFICATION.md)**: Comprehensive technical documentation
- **[Pitch Deck](./PITCH_DECK.md)**: Business case and market analysis
- **Source Code**: Fully commented and documented codebase

## 🏆 Competition Submission

**Event**: Open Mobile Hub AI Agent Competition 2025
**Deadline**: October 11, 2025
**Submission Email**: showcase@openmobilehub.com

**Deliverables**:
- ✅ Working React Native mobile application
- ✅ Complete source code with documentation
- ✅ Technical specification document
- ✅ Business pitch and market analysis
- ✅ Demo-ready with sample data

## 🤝 Contributing

This project was built for the Open Mobile Hub AI Agent Competition 2025. While the primary focus is the competition entry, we welcome feedback and suggestions for future development.

## 📧 Contact

For questions about this competition entry or potential collaboration:

**Email**: showcase@openmobilehub.com
**Competition**: Open Mobile Hub AI Agent Competition 2025

---

## 🎯 Why AgentWatch?

In a world where AI agents are becoming ubiquitous in enterprise environments, organizations need robust governance tools to maintain control, ensure compliance, and optimize performance. AgentWatch bridges this critical gap with a mobile-first approach that enables real-time monitoring and management from anywhere.

**AgentWatch - Because AI agents need watching too.** 🤖👁️

---

*Built for the Open Mobile Hub AI Agent Competition 2025*
*Governance for the AI-powered future*