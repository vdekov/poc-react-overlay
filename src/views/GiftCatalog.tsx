import React from 'react';
import styled from 'styled-components';

import { ContentComponentProps } from '../types';

import SendGift from './SendGift';

const Container = styled.div`
  width: 100%;
  height: 328px;
  background: url('./gift-catalog.png') no-repeat top center / cover;
`;

type Props = ContentComponentProps;

const GiftCatalog: React.FC<Props> = ({ pushState }) => {
  return (
    <Container
      onClick={() => {
        pushState({ content: SendGift });
      }}
    />
  );
};

export default GiftCatalog;
