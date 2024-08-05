import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SpeedSelector from './SpeedSelector';

const BottomControls = ({
  isMuted,
  isLandscape,
  playbackSpeed,
  onToggleMute,
  onToggleOrientation,
  onChangeSpeed,
}) => {
  const [showSpeedSelector, setShowSpeedSelector] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const toggleSpeedSelector = () => {
    setShowSpeedSelector(!showSpeedSelector);
  };

  return (
    <Animated.View style={[
      styles.container,
      {
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }
    ]}>
      <View style={styles.row}>
        <View style={styles.controls}>
          <TouchableOpacity onPress={onToggleMute} style={styles.iconButton}>
            <Ionicons name={isMuted ? "volume-mute" : "volume-medium"} size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleSpeedSelector} style={styles.iconButton}>
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onToggleOrientation} style={styles.iconButton}>
            <Ionicons name={isLandscape ? "phone-portrait" : "phone-landscape"} size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {showSpeedSelector && (
        <Animated.View style={[
          styles.speedSelectorContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}>
          <SpeedSelector currentSpeed={playbackSpeed} onSpeedChange={(speed) => {
            onChangeSpeed(speed);
            setShowSpeedSelector(false);
          }} />
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 5,
    marginLeft: 10,
  },
  speedSelectorContainer: {
    position: 'absolute',
    bottom: '100%',
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 5,
    padding: 10,
  },
});

export default BottomControls;