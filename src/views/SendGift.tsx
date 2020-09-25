import React from 'react';
import styled from 'styled-components';

import { ContentComponentProps } from '../types';

const Container = styled.div`
  width: 100%;
  height: 472px;
  background: url('./send-gift.png') no-repeat top center / cover;
`;

type Props = ContentComponentProps;

const SendGift: React.FC<Props> = ({ back }) => {
  return <Container />;
};

export default SendGift;
