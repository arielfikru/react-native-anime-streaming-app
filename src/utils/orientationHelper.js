import * as ScreenOrientation from 'expo-screen-orientation';

export const setOrientation = async (orientation) => {
  try {
    if (orientation === 'LANDSCAPE') {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }
  } catch (error) {
    console.error('Failed to change screen orientation:', error);
  }
};