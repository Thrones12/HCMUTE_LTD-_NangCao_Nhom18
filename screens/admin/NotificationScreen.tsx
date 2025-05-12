import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GStyles } from '@/constants';

const NotificationScreen = () => {
  return (
    <View style={GStyles.container}>
      <Text style={styles.text}>Admin Notification Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default NotificationScreen;
