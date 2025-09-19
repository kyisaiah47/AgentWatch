import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import { Alert } from '../types/Agent';

interface AlertsListProps {
  alerts: Alert[];
}

const AlertsList: React.FC<AlertsListProps> = ({ alerts }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '#F44336';
      case 'high':
        return '#FF5722';
      case 'medium':
        return '#FF9800';
      case 'low':
        return '#4CAF50';
      default:
        return '#9E9E9E';
    }
  };

  const getSeverityEmoji = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '🚨';
      case 'high':
        return '⚠️';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return 'ℹ️';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'performance':
        return '📈';
      case 'error':
        return '❌';
      case 'policy':
        return '📋';
      case 'security':
        return '🔒';
      default:
        return '📢';
    }
  };

  const formatTime = (date: Date | string) => {
    const now = new Date();
    const alertDate = typeof date === 'string' ? new Date(date) : date;
    const diffMs = now.getTime() - alertDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return alertDate.toLocaleDateString();
  };

  const styles = getStyles(isDarkMode);

  if (alerts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>✅</Text>
        <Text style={styles.emptyText}>No active alerts</Text>
        <Text style={styles.emptySubtext}>All systems are running smoothly</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {alerts.map((alert) => (
        <TouchableOpacity key={alert.id} style={styles.alertCard}>
          <View style={styles.alertHeader}>
            <View style={styles.alertIcons}>
              <Text style={styles.typeIcon}>{getTypeIcon(alert.type)}</Text>
              <Text style={styles.severityEmoji}>{getSeverityEmoji(alert.severity)}</Text>
            </View>
            <View style={styles.alertInfo}>
              <Text style={styles.alertMessage} numberOfLines={2}>
                {alert.message}
              </Text>
              <Text style={styles.alertMeta}>
                {alert.type.toUpperCase()} • {formatTime(alert.timestamp)}
              </Text>
            </View>
            <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(alert.severity) }]}>
              <Text style={styles.severityText}>{alert.severity.toUpperCase()}</Text>
            </View>
          </View>

          {!alert.acknowledged && (
            <View style={styles.unacknowledgedIndicator}>
              <Text style={styles.unacknowledgedText}>• Needs attention</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    emptyContainer: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      borderRadius: 12,
      padding: 20,
      alignItems: 'center',
      marginBottom: 10,
    },
    emptyEmoji: {
      fontSize: 32,
      marginBottom: 8,
    },
    emptyText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 4,
    },
    emptySubtext: {
      fontSize: 14,
      color: isDarkMode ? '#cccccc' : '#666666',
      textAlign: 'center',
    },
    alertCard: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    alertHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    alertIcons: {
      flexDirection: 'column',
      alignItems: 'center',
      marginRight: 12,
    },
    typeIcon: {
      fontSize: 16,
      marginBottom: 2,
    },
    severityEmoji: {
      fontSize: 12,
    },
    alertInfo: {
      flex: 1,
      marginRight: 8,
    },
    alertMessage: {
      fontSize: 14,
      fontWeight: '500',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 4,
      lineHeight: 18,
    },
    alertMeta: {
      fontSize: 11,
      color: isDarkMode ? '#cccccc' : '#666666',
    },
    severityBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 10,
      alignSelf: 'flex-start',
    },
    severityText: {
      color: '#ffffff',
      fontSize: 9,
      fontWeight: 'bold',
    },
    unacknowledgedIndicator: {
      marginTop: 8,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#333333' : '#eeeeee',
    },
    unacknowledgedText: {
      fontSize: 11,
      color: '#FF9800',
      fontWeight: '500',
    },
  });

export default AlertsList;