import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Agent, Policy } from '../types/Agent';
import PolicyManagement from '../components/PolicyManagement';
import ApiService from '../services/ApiService';

interface AgentDetailScreenProps {
  route: {
    params: {
      agent: Agent;
    };
  };
}

const AgentDetailScreen: React.FC<AgentDetailScreenProps> = ({ route }) => {
  const { agent } = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const [agentData, setAgentData] = useState<Agent>(agent);

  const toggleAgentStatus = async () => {
    const newStatus = agentData.status === 'active' ? 'inactive' : 'active';
    Alert.alert(
      'Confirm Action',
      `Are you sure you want to ${newStatus === 'active' ? 'activate' : 'deactivate'} this agent?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              const updatedAgent = await ApiService.updateAgentStatus(agentData.id, newStatus);
              setAgentData(updatedAgent);
            } catch (error) {
              Alert.alert('Error', 'Failed to update agent status');
            }
          },
        },
      ]
    );
  };

  const handlePolicyUpdate = (policyId: string, enabled: boolean) => {
    const updatedPolicies = agentData.policies.map(policy =>
      policy.id === policyId ? { ...policy, enabled, lastUpdated: new Date() } : policy
    );
    setAgentData({ ...agentData, policies: updatedPolicies });
  };

  const handlePolicyCreate = (newPolicyData: Omit<Policy, 'id'>) => {
    const newPolicy: Policy = {
      ...newPolicyData,
      id: `p${Date.now()}`,
    };
    setAgentData({
      ...agentData,
      policies: [...agentData.policies, newPolicy],
    });
  };

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

  const styles = getStyles(isDarkMode);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.agentInfo}>
            <Text style={styles.agentName}>{agentData.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(agentData.status) }]}>
              <Text style={styles.statusText}>{agentData.status.toUpperCase()}</Text>
            </View>
          </View>
          <Text style={styles.agentType}>{agentData.type}</Text>
          <Text style={styles.environment}>{agentData.environment}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Metrics</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{agentData.requestsToday.toLocaleString()}</Text>
              <Text style={styles.metricLabel}>Requests Today</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{(agentData.errorRate * 100).toFixed(1)}%</Text>
              <Text style={styles.metricLabel}>Error Rate</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{agentData.responseTime}ms</Text>
              <Text style={styles.metricLabel}>Avg Response</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>${agentData.metrics.costToday.toFixed(2)}</Text>
              <Text style={styles.metricLabel}>Cost Today</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <PolicyManagement
            policies={agentData.policies}
            onPolicyUpdate={handlePolicyUpdate}
            onPolicyCreate={handlePolicyCreate}
          />
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.toggleButton]}
            onPress={toggleAgentStatus}
          >
            <Text style={styles.actionButtonText}>
              {agentData.status === 'active' ? 'Deactivate Agent' : 'Activate Agent'}
            </Text>
          </TouchableOpacity>
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
      padding: 20,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      marginBottom: 10,
    },
    agentInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    agentName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      flex: 1,
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    statusText: {
      color: '#ffffff',
      fontSize: 12,
      fontWeight: 'bold',
    },
    agentType: {
      fontSize: 16,
      color: isDarkMode ? '#cccccc' : '#666666',
      marginBottom: 5,
    },
    environment: {
      fontSize: 14,
      color: isDarkMode ? '#999999' : '#888888',
    },
    section: {
      margin: 20,
      marginTop: 10,
    },
    sectionTitle: {
      fontSize: 18,
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
      padding: 15,
      borderRadius: 8,
      width: '48%',
      marginBottom: 10,
      alignItems: 'center',
    },
    metricValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    metricLabel: {
      fontSize: 12,
      color: isDarkMode ? '#cccccc' : '#666666',
      marginTop: 5,
    },
    policyCard: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
    },
    policyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },
    policyName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      flex: 1,
    },
    policyStatus: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 10,
    },
    policyStatusText: {
      color: '#ffffff',
      fontSize: 10,
      fontWeight: 'bold',
    },
    policyType: {
      fontSize: 12,
      color: isDarkMode ? '#cccccc' : '#666666',
    },
    actions: {
      padding: 20,
    },
    actionButton: {
      backgroundColor: '#2196F3',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 10,
    },
    toggleButton: {
      backgroundColor: '#FF9800',
    },
    actionButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default AgentDetailScreen;