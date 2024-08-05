import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

const StatusBarManager = ({ isLandscape }) => {
  useEffect(() => {
    StatusBar.setHidden(isLandscape);
    return () => {
      StatusBar.setHidden(false);
    };
  }, [isLandscape]);

  return null;
};

export default StatusBarManager;