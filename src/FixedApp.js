import React, { useState } from 'react';
import styled from 'styled-components';
import './styles.css';

import useDeviceMode from './hooks/useDeviceMode';
import Overlay from './components/Overlay';
import InlineOverlay from './components/InlineOverlay';
import View1 from './views/View1';
import View3 from './views/View3';
import GiftCatalog from './views/GiftCatalog';

const Viewport = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  border: 1px solid #000;
  background-color: #eee;
  overflow: hidden;
`;

const FixedContainer = styled.div`
  width: 464px;
  height: 384px;
`;

export default function App() {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [isOverlayVisible2, setIsOverlayVisible2] = useState(false);
  const showOverlay = () => {
    setIsOverlayVisible(true);
  };
  const hideOverlay = () => {
    setIsOverlayVisible(false);
  };
  return (
    <>
      {/* <button
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
      /> */}
      <button onClick={showOverlay}>Show overlay</button>
      {/* <Overlay
        visible={isOverlayVisible}
        hide={hideOverlay}
        view={{
          title: 'Gifts',
          subtitle: '132 Gifts',
          content: View1,
          preventClose: false,
          width: { tablet: 440 },
          height: { mobile: 300, tablet: 536 }
        }}
      /> */}
      {/* <Overlay
        visible={isOverlayVisible}
        hide={hideOverlay}
        view={{
          title: 'Send a Gift',
          subtitle: 'Show appreciation',
          content: GiftCatalog
          // width: { tablet: 440 },
          // height: { mobile: 300, tablet: 536 }
        }}
      /> */}

      {/* Static Overlay in desktop version */}

      <FixedContainer>
        <InlineOverlay
          visible={isOverlayVisible}
          hide={hideOverlay}
          view={{
            title: 'Gifts',
            subtitle: '132 Gifts',
            content: View1,
            preventClose: false,
            width: { tablet: 440 },
            height: { mobile: 300, tablet: 536 }
          }}
        />
      </FixedContainer>
    </>
  );
}
