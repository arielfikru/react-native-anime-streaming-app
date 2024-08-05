import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, Platform, Animated } from 'react-native';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import StatusBarManager from './StatusBarManager';
import VideoControls from './VideoControls';
import BottomControls from './BottomControls';
import VideoSlider from './VideoSlider';

const VideoPlayer = ({ videoUrl }) => {
  const [isLandscape, setIsLandscape] = useState(false);
  const [status, setStatus] = useState({});
  const [showControls, setShowControls] = useState(true);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const videoRef = useRef(null);
  const controlsTimeout = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
      setIsLandscape(window.width > window.height);
    });

    return () => subscription?.remove();
  }, []);

  const toggleOrientation = async () => {
    if (isLandscape) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    setIsLandscape(!isLandscape);
  };

  const togglePlayPause = async () => {
    if (videoRef.current) {
      if (status.isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
    }
    showControlsTemporarily();
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    setIsUserInteracting(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    controlsTimeout.current = setTimeout(() => {
      if (!isUserInteracting) {
        hideControls();
      }
    }, 3000);
  };

  const hideControls = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowControls(false);
    });
  };

  const toggleControls = () => {
    if (showControls) {
      hideControls();
    } else {
      showControlsTemporarily();
    }
  };

  const seek = async (time) => {
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(time);
    }
  };

  const toggleMute = async () => {
    if (videoRef.current) {
      await videoRef.current.setIsMutedAsync(!isMuted);
      setIsMuted(!isMuted);
    }
    showControlsTemporarily();
  };

  const changeSpeed = async (newSpeed) => {
    if (videoRef.current) {
      await videoRef.current.setRateAsync(newSpeed, true);
      setPlaybackSpeed(newSpeed);
    }
    showControlsTemporarily();
  };

  const getVideoStyle = () => {
    return {
      width: dimensions.width,
      height: isLandscape ? dimensions.height : dimensions.width * (9 / 16),
    };
  };

  return (
    <View style={[styles.container, isLandscape && styles.landscapeContainer]}>
      <StatusBarManager isLandscape={isLandscape} />
      <TouchableWithoutFeedback onPress={toggleControls}>
        <View>
          <Video
            ref={videoRef}
            style={getVideoStyle()}
            source={{ uri: videoUrl }}
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={setStatus}
            useNativeControls={false}
            isMuted={isMuted}
            rate={playbackSpeed}
          />
          {showControls && (
            <Animated.View 
              style={[styles.controlsOverlay, { opacity: fadeAnim }]}
              onTouchStart={() => setIsUserInteracting(true)}
              onTouchEnd={() => {
                setIsUserInteracting(false);
                showControlsTemporarily();
              }}
            >
              <VideoControls
                isPlaying={status.isPlaying}
                onPlayPause={togglePlayPause}
                onSeekBackward={() => seek(status.positionMillis - 10000)}
                onSeekForward={() => seek(status.positionMillis + 10000)}
              />
              <View style={styles.bottomControlsContainer}>
                <VideoSlider
                  currentTime={status.positionMillis || 0}
                  duration={status.durationMillis || 0}
                  onSeek={seek}
                />
                <BottomControls
                  isMuted={isMuted}
                  isLandscape={isLandscape}
                  playbackSpeed={playbackSpeed}
                  onToggleMute={toggleMute}
                  onToggleOrientation={toggleOrientation}
                  onChangeSpeed={changeSpeed}
                />
              </View>
            </Animated.View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  landscapeContainer: {
    ...Platform.select({
      ios: {
        paddingTop: 0,
      },
    }),
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  bottomControlsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default VideoPlayer;