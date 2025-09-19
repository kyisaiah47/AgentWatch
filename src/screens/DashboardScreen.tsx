import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Agent, Alert } from '../types/Agent';
import ApiService from '../services/ApiService';
import AgentCard from '../components/AgentCard';
import MetricsOverview from '../components/MetricsOverview';
import AlertsList from '../components/AlertsList';

interface DashboardScreenProps {
  navigation: any;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [agents, setAgents] = useState<Agent[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  useEffect(() => {
    loadData();
    setupWebSocket();

    return () => {
      ApiService.disconnectWebSocket();
    };
  }, []);

  const loadData = async () => {
    try {
      const [agentsData, alertsData] = await Promise.all([
        ApiService.getAgents(),
        ApiService.getAlerts(),
      ]);
      setAgents(agentsData);
      setAlerts(alertsData.slice(0, 5));
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const setupWebSocket = () => {
    ApiService.connectWebSocket();

    ApiService.on('connected', () => {
      setConnectionStatus('connected');
    });

    ApiService.on('disconnected', () => {
      setConnectionStatus('disconnected');
    });

    ApiService.on('metrics_updated', (data: any) => {
      if (data.agents) {
        setAgents(data.agents);
      }
    });

    ApiService.on('agent_status_changed', () => {
      loadData();
    });

    ApiService.on('alert_acknowledged', () => {
      loadData();
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const navigateToAgent = (agent: Agent) => {
    navigation.navigate('AgentDetail', { agent });
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  const styles = getStyles(isDarkMode);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>AgentWatch</Text>
            <View style={styles.connectionIndicator}>
              <Text style={[styles.connectionDot, { color: connectionStatus === 'connected' ? '#4CAF50' : '#F44336' }]}>
                ●
              </Text>
              <Text style={styles.connectionText}>
                {connectionStatus === 'connected' ? 'Live' : 'Offline'}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={navigateToSettings} style={styles.settingsButton}>
            <Text style={styles.settingsButtonText}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <MetricsOverview agents={agents} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Alerts</Text>
          <AlertsList alerts={alerts} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Agents</Text>
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onPress={() => navigateToAgent(agent)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000000' : '#f5f5f5',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      paddingBottom: 10,
    },
    titleRow: {
      flex: 1,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 4,
    },
    connectionIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    connectionDot: {
      fontSize: 12,
      marginRight: 4,
    },
    connectionText: {
      fontSize: 12,
      color: isDarkMode ? '#cccccc' : '#666666',
    },
    settingsButton: {
      padding: 8,
    },
    settingsButtonText: {
      fontSize: 24,
    },
    section: {
      margin: 20,
      marginTop: 10,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 15,
    },
  });

export default DashboardScreen;