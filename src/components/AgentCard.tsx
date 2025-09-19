import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { Agent } from '../types/Agent';

interface AgentCardProps {
  agent: Agent;
  onPress: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onPress }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#4CAF50';
      case 'inactive':
        return '#9E9E9E';
      case 'error':
        return '#F44336';
      case 'warning':
        return '#FF9800';
      default:
        return '#9E9E9E';
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'active':
        return '🟢';
      case 'inactive':
        return '⚫';
      case 'error':
        return '🔴';
      case 'warning':
        return '🟡';
      default:
        return '⚫';
    }
  };

  const styles = getStyles(isDarkMode);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{agent.name}</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.statusEmoji}>{getStatusEmoji(agent.status)}</Text>
            <Text style={[styles.status, { color: getStatusColor(agent.status) }]}>
              {agent.status.toUpperCase()}
            </Text>
          </View>
        </View>
        <Text style={styles.type}>{agent.type} • {agent.environment}</Text>
      </View>

      <View style={styles.metrics}>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{agent.requestsToday.toLocaleString()}</Text>
          <Text style={styles.metricLabel}>Requests</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{(agent.errorRate * 100).toFixed(1)}%</Text>
          <Text style={styles.metricLabel}>Error Rate</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{agent.responseTime}ms</Text>
          <Text style={styles.metricLabel}>Response</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.owner}>Owner: {agent.owner}</Text>
        <Text style={styles.lastActivity}>
          Last activity: {typeof agent.lastActivity === 'string'
            ? new Date(agent.lastActivity).toLocaleTimeString()
            : agent.lastActivity.toLocaleTimeString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    header: {
      marginBottom: 12,
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 4,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      flex: 1,
      marginRight: 8,
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statusEmoji: {
      fontSize: 12,
      marginRight: 4,
    },
    status: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    type: {
      fontSize: 14,
      color: isDarkMode ? '#cccccc' : '#666666',
    },
    metrics: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 12,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: isDarkMode ? '#333333' : '#eeeeee',
      marginBottom: 12,
    },
    metric: {
      alignItems: 'center',
    },
    metricValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    metricLabel: {
      fontSize: 11,
      color: isDarkMode ? '#cccccc' : '#666666',
      marginTop: 2,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    owner: {
      fontSize: 12,
      color: isDarkMode ? '#cccccc' : '#666666',
    },
    lastActivity: {
      fontSize: 12,
      color: isDarkMode ? '#cccccc' : '#666666',
    },
  });

export default AgentCard;