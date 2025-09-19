import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Agent } from '../types/Agent';

interface MetricsOverviewProps {
  agents: Agent[];
}

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ agents }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const totalAgents = agents.length;
  const activeAgents = agents.filter(agent => agent.status === 'active').length;
  const totalRequests = agents.reduce((sum, agent) => sum + agent.requestsToday, 0);
  const avgErrorRate = agents.length > 0
    ? agents.reduce((sum, agent) => sum + agent.errorRate, 0) / agents.length
    : 0;
  const totalCost = agents.reduce((sum, agent) => sum + agent.metrics.costToday, 0);
  const totalAlerts = agents.reduce((sum, agent) => sum + agent.metrics.alertsTriggered, 0);

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>System Overview</Text>

      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{activeAgents}/{totalAgents}</Text>
          <Text style={styles.metricLabel}>Active Agents</Text>
          <Text style={styles.metricEmoji}>🤖</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{totalRequests.toLocaleString()}</Text>
          <Text style={styles.metricLabel}>Total Requests</Text>
          <Text style={styles.metricEmoji}>📊</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={[styles.metricValue, { color: avgErrorRate > 0.05 ? '#F44336' : '#4CAF50' }]}>
            {(avgErrorRate * 100).toFixed(1)}%
          </Text>
          <Text style={styles.metricLabel}>Avg Error Rate</Text>
          <Text style={styles.metricEmoji}>{avgErrorRate > 0.05 ? '⚠️' : '✅'}</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>${totalCost.toFixed(2)}</Text>
          <Text style={styles.metricLabel}>Daily Cost</Text>
          <Text style={styles.metricEmoji}>💰</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={[styles.metricValue, { color: totalAlerts > 0 ? '#FF9800' : '#4CAF50' }]}>
            {totalAlerts}
          </Text>
          <Text style={styles.metricLabel}>Active Alerts</Text>
          <Text style={styles.metricEmoji}>{totalAlerts > 0 ? '🔔' : '🔕'}</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>
            {agents.length > 0
              ? Math.round(agents.reduce((sum, agent) => sum + agent.responseTime, 0) / agents.length)
              : 0}ms
          </Text>
          <Text style={styles.metricLabel}>Avg Response</Text>
          <Text style={styles.metricEmoji}>⚡</Text>
        </View>
      </View>
    </View>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      margin: 20,
      marginTop: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 15,
    },
    metricsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    metricCard: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      borderRadius: 12,
      padding: 16,
      width: '48%',
      marginBottom: 10,
      alignItems: 'center',
      position: 'relative',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    metricValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 4,
    },
    metricLabel: {
      fontSize: 12,
      color: isDarkMode ? '#cccccc' : '#666666',
      textAlign: 'center',
      marginBottom: 8,
    },
    metricEmoji: {
      fontSize: 16,
      position: 'absolute',
      top: 12,
      right: 12,
    },
  });

export default MetricsOverview;