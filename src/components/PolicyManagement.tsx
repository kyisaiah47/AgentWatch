import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  useColorScheme,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { Policy } from '../types/Agent';

interface PolicyManagementProps {
  policies: Policy[];
  onPolicyUpdate: (policyId: string, enabled: boolean) => void;
  onPolicyCreate: (policy: Omit<Policy, 'id'>) => void;
}

const PolicyManagement: React.FC<PolicyManagementProps> = ({
  policies,
  onPolicyUpdate,
  onPolicyCreate,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPolicy, setNewPolicy] = useState({
    name: '',
    type: 'rate_limit' as Policy['type'],
    enabled: true,
  });

  const handleTogglePolicy = (policyId: string, currentEnabled: boolean) => {
    Alert.alert(
      'Update Policy',
      `Are you sure you want to ${currentEnabled ? 'disable' : 'enable'} this policy?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => onPolicyUpdate(policyId, !currentEnabled),
        },
      ]
    );
  };

  const handleCreatePolicy = () => {
    if (!newPolicy.name.trim()) {
      Alert.alert('Error', 'Policy name is required');
      return;
    }

    const policy: Omit<Policy, 'id'> = {
      name: newPolicy.name.trim(),
      type: newPolicy.type,
      enabled: newPolicy.enabled,
      configuration: {},
      lastUpdated: new Date(),
    };

    onPolicyCreate(policy);
    setNewPolicy({ name: '', type: 'rate_limit', enabled: true });
    setShowCreateModal(false);
  };

  const getPolicyTypeDescription = (type: Policy['type']) => {
    switch (type) {
      case 'rate_limit':
        return 'Controls request frequency limits';
      case 'content_filter':
        return 'Filters inappropriate content';
      case 'access_control':
        return 'Manages user permissions';
      case 'data_retention':
        return 'Controls data storage duration';
      default:
        return 'Custom policy configuration';
    }
  };

  const getPolicyIcon = (type: Policy['type']) => {
    switch (type) {
      case 'rate_limit':
        return '⚡';
      case 'content_filter':
        return '🛡️';
      case 'access_control':
        return '🔐';
      case 'data_retention':
        return '📦';
      default:
        return '📋';
    }
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Policy Management</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Text style={styles.addButtonText}>+ Add Policy</Text>
        </TouchableOpacity>
      </View>

      {policies.map((policy) => (
        <View key={policy.id} style={styles.policyCard}>
          <View style={styles.policyHeader}>
            <View style={styles.policyInfo}>
              <Text style={styles.policyIcon}>{getPolicyIcon(policy.type)}</Text>
              <View style={styles.policyDetails}>
                <Text style={styles.policyName}>{policy.name}</Text>
                <Text style={styles.policyDescription}>
                  {getPolicyTypeDescription(policy.type)}
                </Text>
                <Text style={styles.policyMeta}>
                  Updated: {policy.lastUpdated.toLocaleDateString()}
                </Text>
              </View>
            </View>
            <Switch
              value={policy.enabled}
              onValueChange={() => handleTogglePolicy(policy.id, policy.enabled)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={policy.enabled ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
        </View>
      ))}

      <Modal
        visible={showCreateModal}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Policy</Text>

            <Text style={styles.inputLabel}>Policy Name</Text>
            <TextInput
              style={styles.textInput}
              value={newPolicy.name}
              onChangeText={(text) => setNewPolicy({ ...newPolicy, name: text })}
              placeholder="Enter policy name"
              placeholderTextColor={isDarkMode ? '#666666' : '#999999'}
            />

            <Text style={styles.inputLabel}>Policy Type</Text>
            <View style={styles.typeSelector}>
              {(['rate_limit', 'content_filter', 'access_control', 'data_retention'] as Policy['type'][]).map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeOption,
                    newPolicy.type === type && styles.selectedTypeOption,
                  ]}
                  onPress={() => setNewPolicy({ ...newPolicy, type })}
                >
                  <Text style={styles.typeIcon}>{getPolicyIcon(type)}</Text>
                  <Text style={[
                    styles.typeText,
                    newPolicy.type === type && styles.selectedTypeText,
                  ]}>
                    {type.replace('_', ' ').toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.enabledRow}>
              <Text style={styles.inputLabel}>Enabled by default</Text>
              <Switch
                value={newPolicy.enabled}
                onValueChange={(enabled) => setNewPolicy({ ...newPolicy, enabled })}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={newPolicy.enabled ? '#f5dd4b' : '#f4f3f4'}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowCreateModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.createButton]}
                onPress={handleCreatePolicy}
              >
                <Text style={styles.createButtonText}>Create Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    addButton: {
      backgroundColor: '#2196F3',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    },
    addButtonText: {
      color: '#ffffff',
      fontSize: 14,
      fontWeight: 'bold',
    },
    policyCard: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    },
    policyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    policyInfo: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
    },
    policyIcon: {
      fontSize: 24,
      marginRight: 12,
    },
    policyDetails: {
      flex: 1,
    },
    policyName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 4,
    },
    policyDescription: {
      fontSize: 14,
      color: isDarkMode ? '#cccccc' : '#666666',
      marginBottom: 4,
    },
    policyMeta: {
      fontSize: 12,
      color: isDarkMode ? '#999999' : '#888888',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      borderRadius: 12,
      padding: 20,
      width: '90%',
      maxWidth: 400,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 20,
      textAlign: 'center',
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 8,
      marginTop: 12,
    },
    textInput: {
      backgroundColor: isDarkMode ? '#333333' : '#f5f5f5',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 12,
    },
    typeSelector: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 12,
    },
    typeOption: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#333333' : '#f5f5f5',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    selectedTypeOption: {
      borderColor: '#2196F3',
      backgroundColor: isDarkMode ? '#1a3d5c' : '#e3f2fd',
    },
    typeIcon: {
      fontSize: 16,
      marginRight: 6,
    },
    typeText: {
      fontSize: 12,
      color: isDarkMode ? '#cccccc' : '#666666',
    },
    selectedTypeText: {
      color: '#2196F3',
      fontWeight: 'bold',
    },
    enabledRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12,
      marginBottom: 20,
    },
    modalActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
    modalButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: isDarkMode ? '#333333' : '#f5f5f5',
    },
    createButton: {
      backgroundColor: '#2196F3',
    },
    cancelButtonText: {
      color: isDarkMode ? '#ffffff' : '#000000',
      fontSize: 16,
      fontWeight: 'bold',
    },
    createButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default PolicyManagement;