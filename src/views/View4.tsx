import React from 'react';

import { ContentComponentProps } from '../types';

type Props = ContentComponentProps;

const View4: React.FC<Props> = ({ back }) => {
  return (
    <div style={{ width: '100%', height: '400px', backgroundColor: 'red' }}>
      <button onClick={back}>Go back</button>
    </div>
  );
};

export default View4;
