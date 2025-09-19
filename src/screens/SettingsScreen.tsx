import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  useColorScheme,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [notifications, setNotifications] = useState(true);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const showAbout = () => {
    Alert.alert(
      'About AgentWatch',
      'AgentWatch v1.0\n\nAI Agent Governance Dashboard\nBuilt for Open Mobile Hub Competition 2025\n\nMonitor, control, and audit your AI agents from anywhere.',
      [{ text: 'OK' }]
    );
  };

  const exportData = () => {
    Alert.alert(
      'Export Data',
      'Export functionality will be available in the next version.',
      [{ text: 'OK' }]
    );
  };

  const styles = getStyles(isDarkMode);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={notifications ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Real-time Updates</Text>
            <Switch
              value={realTimeUpdates}
              onValueChange={setRealTimeUpdates}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={realTimeUpdates ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Auto Refresh Dashboard</Text>
            <Switch
              value={autoRefresh}
              onValueChange={setAutoRefresh}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={autoRefresh ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>

          <TouchableOpacity style={styles.settingButton} onPress={exportData}>
            <Text style={styles.settingButtonText}>Export Agent Data</Text>
            <Text style={styles.settingButtonSubtext}>📊</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>

          <TouchableOpacity style={styles.settingButton} onPress={showAbout}>
            <Text style={styles.settingButtonText}>About AgentWatch</Text>
            <Text style={styles.settingButtonSubtext}>ℹ️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Built for Open Mobile Hub AI Agent Competition 2025
          </Text>
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
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
    },
    settingLabel: {
      fontSize: 16,
      color: isDarkMode ? '#ffffff' : '#000000',
      flex: 1,
    },
    settingButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
    },
    settingButtonText: {
      fontSize: 16,
      color: isDarkMode ? '#ffffff' : '#000000',
      flex: 1,
    },
    settingButtonSubtext: {
      fontSize: 20,
    },
    footer: {
      padding: 20,
      alignItems: 'center',
      marginTop: 40,
    },
    footerText: {
      fontSize: 12,
      color: isDarkMode ? '#666666' : '#999999',
      textAlign: 'center',
    },
  });

export default SettingsScreen;