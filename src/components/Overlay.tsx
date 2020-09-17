import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { tablet, desktop } from '../utils/style_breakpoints';
import useDelayedUnmount from '../hooks/useDelayedUnmount';
import { ViewProps, ContentComponentProps } from '../types';
import { Chevron, Close } from './Icons';

const Container = styled.div``;
const Backdrop = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #bbb;
  opacity: ${(props) => (props.visible ? 0.8 : 0)};
  transition: opacity 0.5s;

  ${desktop} {
    display: none;
  }
`;
const OverlayWrapper = styled.div<{
  width: DimensionProps;
  height: DimensionProps;
  visible: boolean;
}>`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  // height: ${(props) => (props.visible ? 'auto' : '0%')};
  height: auto;
  max-height: ${(props) => (props.visible ? 'calc(100% - 50px)' : 0)};
  border-radius: 8px 8px 0px 0px;
  background-color: #fff;
  box-shadow: 0px 1px 2px rgba(31, 32, 33, 0.1),
    0px 2px 2px rgba(31, 32, 33, 0.05), 0px 4px 12px rgba(31, 32, 33, 0.3);
  transition: max-height 0.5s, height 0.5s;

  /* Tablet */
  ${tablet} {
    top: 50%;
    left: 50%;
    max-width: ${(props) => props.width.tablet}px;
    height: 100%;
    max-height: ${(props) => props.height.tablet}px;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    opacity: ${(props) => (props.visible ? 1 : 0)};
    transition: opacity 0.5s;
  }

  ${desktop} {
    position: static;
    max-height: ${(props) => props.height.desktop}px;
    border-radius: 8px;
    transition: height 0.01s;
  }
`;
const OverlayHeader = styled.div`
  display: flex;
  align-items: center;
  height: 54px;
  border-bottom: 2px solid rgba(45, 40, 103, 0.1);
`;
const BackButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 16px;
  cursor: pointer;
`;
const HeaderTexts = styled.div<{ leftOffset: number }>`
  flex: 1;
  min-width: 0;
  padding-left: ${(props) => props.leftOffset}px;
`;
const Title = styled.div`
  max-height: 20px;
  color: #2d2867;
  font-size: 17px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const Subtitle = styled.div`
  max-height: 18px;
  color: #728ca6;
  font-size: 14px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const CloseButton = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
`;
const OverlayContentView = styled.div`
  position: relative;
  display: flex;
  transition: height 0.5s;

  overflow: hidden;

  ${desktop} {
    /* height: 99999px; */
  }
`;
const OverlayContent = styled.div<{ visible?: boolean }>`
  flex: ${(props) => (props.visible ? 1 : 0)};
  width: 100%;
  max-height: ${(props) => !props.visible && '0'};
  opacity: ${(props) => (props.visible ? 1 : 0)};

  background-color: #fff;
  text-align: center;
  overflow: auto;
  transition: opacity 0.5s;
`;
const OverlayContentContainer = styled.div`
  max-height: 100%;
`;

interface DimensionProps {
  tablet?: number;
  desktop?: number;
}
interface OwnProps {
  visible: boolean;
  hide: () => void;
  width?: DimensionProps;
  height?: DimensionProps;
  view: ViewProps;
}
type Props = OwnProps;

const Overlay: React.FC<Props> = (props) => {
  const createHistoryObject = (view) => {
    return {
      title: view.title,
      subtitle: view.subtitle,
      renderedView: React.createElement<ContentComponentProps>(view.content, {
        ...contentProps
      })
    };
  };

  const pushState = (view: ViewProps) => {
    const currrentHeight = overlayContentViewEl.current.getBoundingClientRect()
      .height;
    overlayContentViewEl.current.style.height = currrentHeight + 'px';
    console.log(
      '>>> Current view height =',
      overlayContentViewEl.current.style.height
    );
    // contentHeights.current = [...contentHeights.current, currrentHeight];
    const nextHistory = [...ref.current, createHistoryObject(view)];
    ref.current = nextHistory;
    setHistory(nextHistory);
  };

  const contentProps = {
    pushState
  };

  const initialHistory = [createHistoryObject(props.view)];
  const [history, setHistory] = useState(initialHistory);
  const [currentViewIdx, setCurrentViewIdx] = useState(0);
  const ref = useRef(initialHistory);
  const contentHeights = useRef([]);
  const overlayContentViewEl = useRef<HTMLDivElement>(null);
  const overlayContentEl = useRef<HTMLDivElement>(null);
  const overlayContentContainerEl = useRef<HTMLDivElement>(null);
  const { visibility, triggerHide, unmount } = useDelayedUnmount(
    props.visible,
    props.hide
  );

  useEffect(() => {
    const previousViewIdx = currentViewIdx;
    const nextViewIdx = history.length - 1;
    setCurrentViewIdx(nextViewIdx);

    // Go back
    if (nextViewIdx < previousViewIdx && overlayContentViewEl.current) {
      requestAnimationFrame(() => {
        console.log('>>> go back transition', overlayContentViewEl.current);
        overlayContentViewEl.current.style.height =
          contentHeights.current[contentHeights.current.length - 1] + 'px';
      });
      return;
    }

    // Go forward
    requestAnimationFrame(() => {
      if (overlayContentContainerEl.current) {
        const nextHeight = overlayContentContainerEl.current.getBoundingClientRect()
          .height;
        if (nextHeight === 0) {
          return;
        }
        // console.log(
        //   '>>> Next view height =',
        //   overlayContentContainerEl.current.getBoundingClientRect().height
        // );
        overlayContentViewEl.current.style.height = nextHeight + 'px';
        contentHeights.current.push(nextHeight);
      }
    });
  }, [history]);

  const goBack = () => {
    overlayContentViewEl.current.style.height =
      contentHeights.current[contentHeights.current.length - 1] + 'px';
    contentHeights.current.splice(contentHeights.current.length - 1, 1);

    const nextHistory = [...ref.current];
    nextHistory.splice(nextHistory.length - 1, 1);
    ref.current = nextHistory;
    setHistory(nextHistory);
  };

  const destroy = (event) => {
    console.log('destroy');
    unmount();
    // Make sure to reset the overlay state to the initial view.
    const initialHistory = ref.current.slice(0, 1);
    ref.current = initialHistory;
    setHistory(initialHistory);

    contentHeights.current = [];
  };

  if (!props.visible) {
    return null;
  }

  return (
    <Container>
      <Backdrop
        onClick={triggerHide}
        visible={visibility}
        onTransitionEnd={destroy}
      />
      <OverlayWrapper
        width={props.width}
        height={props.height}
        visible={visibility}
      >
        <OverlayHeader>
          {history.length > 1 && (
            <BackButton onClick={goBack}>
              <Chevron />
            </BackButton>
          )}
          <HeaderTexts leftOffset={history.length === 1 ? 16 : 0}>
            <Title>{history[history.length - 1].title}</Title>
            <Subtitle>{history[history.length - 1].subtitle}</Subtitle>
          </HeaderTexts>
          <CloseButton onClick={triggerHide}>
            <Close />
          </CloseButton>
        </OverlayHeader>
        <OverlayContentView
          ref={overlayContentViewEl}
          onTransitionEnd={() => {
            overlayContentViewEl.current.style.height = '';
          }}
        >
          {history.map((item, index) => (
            <OverlayContent
              key={index}
              data-index={index}
              ref={overlayContentEl}
              visible={currentViewIdx === index}
            >
              <OverlayContentContainer
                ref={overlayContentContainerEl}
                className="overlay-content-container"
              >
                {item.renderedView}
              </OverlayContentContainer>
            </OverlayContent>
          ))}
        </OverlayContentView>
      </OverlayWrapper>
    </Container>
  );
};

export default Overlay;
