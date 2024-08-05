import React from 'react';
import { View, StyleSheet, PanResponder, Text } from 'react-native';

const VideoSlider = ({ currentTime, duration, onSeek }) => {
  const [sliderPosition, setSliderPosition] = React.useState(0);
  const sliderWidth = React.useRef(0);

  const formatTime = (millis) => {
    const totalSeconds = millis / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newPosition = Math.max(0, Math.min(gestureState.moveX, sliderWidth.current));
      setSliderPosition(newPosition);
    },
    onPanResponderRelease: () => {
      const newTime = (sliderPosition / sliderWidth.current) * duration;
      onSeek(newTime);
    },
  });

  React.useEffect(() => {
    if (duration > 0) {
      const position = (currentTime / duration) * sliderWidth.current;
      setSliderPosition(position);
    }
  }, [currentTime, duration]);

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
      <View 
        style={styles.sliderContainer}
        onLayout={(event) => {sliderWidth.current = event.nativeEvent.layout.width;
        }}
        {...panResponder.panHandlers}
      >
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${(currentTime / duration) * 100}%` }]} />
        </View>
        <View style={[styles.sliderThumb, { left: sliderPosition - 8 }]} />
      </View>
      <Text style={styles.timeText}>{formatTime(duration)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sliderContainer: {
    flex: 1,
    height: 20,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 165, 0, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#FFA500',
  },
  sliderThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFA500',
    position: 'absolute',
    top: 2,
    marginTop: -6,
    borderWidth: 2,
    borderColor: 'white',
  },
  timeText: {
    color: 'white',
    fontSize: 12,
  },
});

export default VideoSlider;