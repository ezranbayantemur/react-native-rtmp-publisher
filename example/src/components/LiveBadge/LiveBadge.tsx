import React from 'react';
import { View, Text } from 'react-native';

import styles from './LiveBadge.styles';

const LiveBadge = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dot} />
      <Text style={styles.title}>LIVE</Text>
    </View>
  );
};

export default LiveBadge;
