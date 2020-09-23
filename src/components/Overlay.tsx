import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { tablet } from '../utils/style_breakpoints';
import useDelayedUnmount from '../hooks/useDelayedUnmount';
import { ViewProps, ContentComponentProps } from '../types';
import { Chevron, Close } from './Icons';

const OVERLAY_TOP_OFFSET = 80;
const TRANSITION_DURATION = '0.5s';

const Container = styled.div``;
const Backdrop = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #bbb;
  opacity: ${(props) => (props.visible ? 0.8 : 0)};
  transition: opacity 0.5s;
`;
const OverlayWrapper = styled.div<{
  width: DimensionProps;
  height: DimensionProps;
  visible: boolean;
}>`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  max-height: ${(props) =>
    props.visible ? `calc(100% - ${OVERLAY_TOP_OFFSET}px)` : 0};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 0px 1px 2px rgba(31, 32, 33, 0.1),
    0px 2px 2px rgba(31, 32, 33, 0.05), 0px 4px 12px rgba(31, 32, 33, 0.3);
  transition: max-height ${TRANSITION_DURATION};

  /* Tablet */
  ${tablet} {
    top: 50%;
    right: auto;
    bottom: auto;
    left: 50%;
    max-width: ${(props) => props.width.tablet}px;
    max-height: ${(props) => props.height.tablet}px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    transform: translate(-50%, -50%);
    opacity: ${(props) => (props.visible ? 1 : 0)};
    transition: opacity ${TRANSITION_DURATION};
  }

  &:before {
    content: '';
    display: block;
    width: calc(100% + 30px);
    height: calc(100% + 30px);
    transform: translate(-15px, -15px);
    position: absolute;
    z-index: -1;
  }
`;
const OverlayHeader = styled.div`
  display: flex;
  align-items: center;
  min-height: 54px;
  border-bottom: 2px solid rgba(45, 40, 103, 0.1);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #fff;
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
  overflow: hidden;
  transition: height ${TRANSITION_DURATION};

  ${tablet} {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;
const OverlayContent = styled.div<{
  visible: boolean;
  isInTransition: boolean;
}>`
  flex: ${(props) => (props.visible ? 1 : 0)};
  width: 100%;
  max-height: ${(props) => !props.isInTransition && !props.visible && '0'};
  background-color: #fff;
  text-align: center;
  overflow: auto;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity ${TRANSITION_DURATION};
`;
const OverlayContentContainer = styled.div`
  max-height: 100%;
`;

interface DimensionProps {
  tablet?: number;
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
      }),
      preventClose: view.preventClose || false
    };
  };

  const createDummyContentView = (view) => {
    // Create absolutely positioned helper element and
    // use it to calculate the height of the next view.
    const dummyViewContainer = document.createElement('div');
    dummyViewContainer.classList.add('dummy-view-container');
    dummyViewContainer.style.position = 'absolute';
    dummyViewContainer.style.top = '-9999px';
    dummyViewContainer.style.zIndex = '-1';
    dummyViewContainer.style.display = 'flex';
    dummyViewContainer.style.alignItems = 'flex-start';
    dummyViewContainer.style.justifyContent = 'center';
    dummyViewContainer.style.maxHeight = `calc(100vh - ${OVERLAY_TOP_OFFSET} - ${Math.round(
      overlayHeaderEl.current.getBoundingClientRect().height
    )})`;
    dummyViewContainer.style.overflow = 'auto';
    dummyViewContainer.style.visibility = 'hidden';
    document.body.appendChild(dummyViewContainer);

    const contentCopy = view.cloneNode(true);
    dummyViewContainer.appendChild(contentCopy);

    nextViewHeight.current = dummyViewContainer.getBoundingClientRect().height;
    dummyViewContainer.remove();
  };

  const pushState = (view: ViewProps) => {
    initTransitionState();
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
  const [isInTransition, setIsInTransition] = useState(false);
  const overlayContentRefs = [];
  const ref = useRef(initialHistory);
  const nextViewHeight = useRef(0);
  const overlayHeaderEl = useRef<HTMLDivElement>(null);
  const overlayContentViewEl = useRef<HTMLDivElement>(null);
  const { visibility, triggerHide, unmount } = useDelayedUnmount(
    props.visible,
    props.hide
  );

  useEffect(() => {
    const previousViewIdx = currentViewIdx;
    const nextViewIdx = history.length - 1;

    if (
      previousViewIdx === nextViewIdx ||
      !overlayContentRefs[nextViewIdx] ||
      !overlayContentViewEl.current
    ) {
      return;
    }

    createDummyContentView(overlayContentRefs[nextViewIdx]);
    overlayContentViewEl.current.style.height = nextViewHeight.current + 'px';
    setCurrentViewIdx(nextViewIdx);
  }, [history]);

  const closeOverlay = () => {
    // Do not allow the user to close the overlay if there is a blocker flag.
    if (history[history.length - 1].preventClose) {
      return;
    }
    triggerHide();
  };

  const goBack = () => {
    if (isInTransition) {
      return;
    }
    initTransitionState();
    const nextHistory = [...ref.current];
    nextHistory.splice(nextHistory.length - 1, 1);
    ref.current = nextHistory;
    setHistory(nextHistory);
  };

  const initTransitionState = () => {
    // Set fixed height based on the current view
    const currentViewHeight = overlayContentViewEl.current.getBoundingClientRect()
      .height;
    overlayContentViewEl.current.style.height = currentViewHeight + 'px';
    setIsInTransition(true);
  };

  const resetTransitionState = () => {
    overlayContentViewEl.current.style.height = '';
    nextViewHeight.current = 0;
    setIsInTransition(false);
  };

  const destroy = () => {
    unmount();
    // Make sure to reset the overlay state to the initial view.
    ref.current = initialHistory;
    setHistory(initialHistory);
    setCurrentViewIdx(0);
  };

  if (!props.visible) {
    return null;
  }

  return (
    <Container>
      <Backdrop
        onClick={closeOverlay}
        visible={visibility}
        onTransitionEnd={destroy}
      />
      <OverlayWrapper
        width={props.width}
        height={props.height}
        visible={visibility}
      >
        <OverlayHeader ref={overlayHeaderEl}>
          {history.length > 1 && (
            <BackButton onClick={goBack}>
              <Chevron />
            </BackButton>
          )}
          <HeaderTexts leftOffset={history.length === 1 ? 16 : 0}>
            <Title>{history[history.length - 1].title}</Title>
            <Subtitle>{history[history.length - 1].subtitle}</Subtitle>
          </HeaderTexts>
          <CloseButton onClick={closeOverlay}>
            <Close />
          </CloseButton>
        </OverlayHeader>
        <OverlayContentView
          ref={overlayContentViewEl}
          onTransitionEnd={resetTransitionState}
        >
          {history.map((item, index) => (
            <OverlayContent
              key={index}
              data-index={index}
              visible={currentViewIdx === index}
              isInTransition={isInTransition}
            >
              <OverlayContentContainer
                ref={(overlayContentContainerEl) =>
                  (overlayContentRefs[index] = overlayContentContainerEl)
                }
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
