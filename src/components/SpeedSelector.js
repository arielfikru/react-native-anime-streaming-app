import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SPEEDS = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

const SpeedSelector = ({ currentSpeed, onSpeedChange }) => {
  return (
    <View style={styles.container}>
      {SPEEDS.map((speed) => (
        <TouchableOpacity
          key={speed}
          style={[
            styles.speedButton,
            currentSpeed === speed && styles.selectedSpeedButton,
          ]}
          onPress={() => onSpeedChange(speed)}
        >
          <Text
            style={[
              styles.speedText,
              currentSpeed === speed && styles.selectedSpeedText,
            ]}
          >
            {speed}x
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  speedButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 2,
    borderRadius: 4,
  },
  selectedSpeedButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  speedText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  selectedSpeedText: {
    fontWeight: 'bold',
  },
});

export default SpeedSelector;