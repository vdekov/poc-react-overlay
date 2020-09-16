import React from 'react';

import { ContentComponentProps } from '../types';

type Props = ContentComponentProps;

const View3: React.FC<Props> = () => {
  return (
    <div>
      <p>Hello from View #3</p>
      <div>
        Suspendisse dictum orci nisi, a dictum nibh rhoncus at. Fusce sodales
        urna quam, rhoncus pellentesque enim pulvinar nec. Praesent volutpat
        faucibus blandit. Donec tempor dapibus libero et commodo.
      </div>
    </div>
  );
};

export default View3;
