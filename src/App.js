import React, { useState } from 'react';
import styled from 'styled-components';
import './styles.css';

import useDeviceMode from './hooks/useDeviceMode';
import Overlay from './components/Overlay';
import View1 from './views/View1';
import View3 from './views/View3';

const Viewport = styled.div`
  position: relative;
  width: 100%;
  height: 580px;
  border: 1px solid #000;
  background-color: #eee;
  overflow: hidden;
`;

export default function App() {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [isOverlayVisible2, setIsOverlayVisible2] = useState(true);
  const deviceMode = useDeviceMode();
  const showOverlay = () => {
    setIsOverlayVisible(true);
  };
  const hideOverlay = () => {
    setIsOverlayVisible(false);
  };
  return (
    <>
      <div className="App">
        <h4>Device mode: {deviceMode}</h4>
      </div>
      <Viewport>
        <button
          onClick={() => {
            setIsOverlayVisible2(true);
          }}
        >
          Show overlay
        </button>
        <Overlay
          visible={isOverlayVisible2}
          hide={() => {
            setIsOverlayVisible2(false);
          }}
          width={{ tablet: 440 }}
          height={{ desktop: 328 }}
          view={{
            title: 'Gifts',
            subtitle: '132 Gifts',
            content: View3
          }}
        />
      </Viewport>
      <br />
      {/* <Viewport>
        <button onClick={showOverlay}>Show overlay</button>
        <Overlay
          visible={isOverlayVisible}
          hide={hideOverlay}
          width={{ tablet: 440 }}
          height={{ tablet: 536, desktop: 328 }}
          view={{
            title: 'Gifts',
            subtitle: '132 Gifts',
            content: View1
          }}
        />
      </Viewport> */}
    </>
  );
}
