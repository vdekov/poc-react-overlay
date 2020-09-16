import { useState, useEffect } from 'react';

import {
  mobileQuery,
  tabletQuery,
  desktopQuery
} from '../utils/style_breakpoints';

const Breakpoints = {
  mobile: 600,
  tablet: 960
};

const useDeviceMode = () => {
  const mobileQueryList = window.matchMedia(mobileQuery);
  const tabletQueryList = window.matchMedia(tabletQuery);
  const desktopQueryList = window.matchMedia(desktopQuery);

  const mobileScreenTest = (event) => {
    if (event.matches) {
      setMode('mobile');
    }
  };
  const tabletScreenTest = (event) => {
    if (event.matches) {
      setMode('tablet');
    }
  };
  const desktopScreenTest = (event) => {
    if (event.matches) {
      setMode('desktop');
    }
  };

  const initialMode = mobileQueryList.matches
    ? 'mobile'
    : tabletQueryList.matches
    ? 'tablet'
    : 'desktop';
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    mobileQueryList.addEventListener('change', mobileScreenTest);
    tabletQueryList.addEventListener('change', tabletScreenTest);
    desktopQueryList.addEventListener('change', desktopScreenTest);

    return () => {
      mobileQueryList.removeEventListener('change', mobileScreenTest);
      tabletQueryList.removeEventListener('change', tabletScreenTest);
      desktopQueryList.removeEventListener('change', desktopScreenTest);
    };
  }, []);

  return mode;
};

export default useDeviceMode;
