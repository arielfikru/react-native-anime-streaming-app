import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ASPECT_RATIOS = [
  { id: 'DEFAULT', label: '16:9' },
  { id: 'FIT', label: 'Fit' },
  { id: '4:3', label: '4:3' },
  { id: '1:1', label: '1:1' },
];

const AspectRatioSelector = ({ currentRatio, onRatioChange }) => {
  const handlePress = () => {
    const currentIndex = ASPECT_RATIOS.findIndex(ratio => ratio.id === currentRatio);
    const nextIndex = (currentIndex + 1) % ASPECT_RATIOS.length;
    onRatioChange(ASPECT_RATIOS[nextIndex].id);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Text style={styles.buttonText}>{ASPECT_RATIOS.find(ratio => ratio.id === currentRatio).label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AspectRatioSelector;