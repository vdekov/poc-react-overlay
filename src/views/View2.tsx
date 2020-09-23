import React from 'react';

import { ContentComponentProps } from '../types';
import View3 from './View3';

type Props = ContentComponentProps;

const View2: React.FC<Props> = ({ pushState }) => {
  return (
    <div>
      <span>(NEW) Hello from View #2</span>
      <br />
      <button
        onClick={() => {
          pushState({ content: View3, title: 'View #3' });
        }}
      >
        Go to View #3
      </button>
      <div>
        Suspendisse dictum orci nisi, a dictum nibh rhoncus at. Fusce sodales
        urna quam, rhoncus nec. Praesent volutpat faucibus blandit. Donec tempor
        dapibus libero et commodo.
      </div>
      <div>
        Suspendisse dictum orci nisi, a dictum nibh rhoncus at. Fusce faucibus
        blandit. Donec tempor dapibus libero et.
      </div>
      {/* <div>
        Suspendisse dictum orci nisi, a dictum nibh rhoncus at. Fusce sodales
        urna quam, rhoncus pellentesque enim pulvinar nec. Praesent volutpat
        faucibus blandit. Donec tempor dapibus libero et commodo.
      </div>
      <div>
        Suspendisse dictum orci nisi, a dictum nibh rhoncus at. Fusce sodales
        urna quam, rhoncus pellentesque enim pulvinar nec. Praesent volutpat
        faucibus blandit. Donec tempor dapibus libero et commodo.
      </div> */}
    </div>
  );
};

export default View2;
