import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VideoControls = ({ isPlaying, onPlayPause, onSeekBackward, onSeekForward }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSeekBackward} style={styles.seekButton}>
        <View style={styles.seekIconContainer}>
          <Ionicons name="play-back" size={24} color="white" />
          <View style={styles.seekTextContainer}>
            <Ionicons name="caret-back" size={12} color="white" />
            <Ionicons name="caret-back" size={12} color="white" style={styles.overlapIcon} />
          </View>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={onPlayPause} style={styles.playPauseButton}>
        <Ionicons 
          name={isPlaying ? "pause" : "play"} 
          size={50} 
          color="white" 
        />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={onSeekForward} style={styles.seekButton}>
        <View style={styles.seekIconContainer}>
          <Ionicons name="play-forward" size={24} color="white" />
          <View style={styles.seekTextContainer}>
            <Ionicons name="caret-forward" size={12} color="white" />
            <Ionicons name="caret-forward" size={12} color="white" style={styles.overlapIcon} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    padding: 20,
  },
  seekButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 40,
    padding: 15,
    marginHorizontal: 20,
  },
  seekIconContainer: {
    alignItems: 'center',
  },
  seekTextContainer: {
    flexDirection: 'row',
    marginTop: -5,
  },
  overlapIcon: {
    marginLeft: -8,
  },
});

export default VideoControls;