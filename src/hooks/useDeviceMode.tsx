import { useState, useEffect } from 'react';

import { mobileQuery, tabletQuery } from '../utils/style_breakpoints';

const Breakpoints = {
  mobile: 600,
  tablet: 960
};

const useDeviceMode = () => {
  const mobileQueryList = window.matchMedia(mobileQuery);
  const tabletQueryList = window.matchMedia(tabletQuery);

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

  const initialMode = mobileQueryList.matches ? 'mobile' : 'tablet';
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    mobileQueryList.addEventListener('change', mobileScreenTest);
    tabletQueryList.addEventListener('change', tabletScreenTest);

    return () => {
      mobileQueryList.removeEventListener('change', mobileScreenTest);
      tabletQueryList.removeEventListener('change', tabletScreenTest);
    };
  }, []);

  return mode;
};

export default useDeviceMode;
