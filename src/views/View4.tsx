import React from 'react';

import { ContentComponentProps } from '../types';

type Props = ContentComponentProps;

const View4: React.FC<Props> = () => {
  return (
    <div style={{ width: '100%', height: '400px', backgroundColor: 'red' }} />
  );
};

export default View4;
