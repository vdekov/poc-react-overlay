import React from 'react';

import { ContentComponentProps } from '../types';

import View2 from './View2';

type Props = ContentComponentProps;

const View3: React.FC<Props> = ({ pushState }) => {
  return (
    <div>
      <div>Hello from View #3</div>
      <button
        onClick={() => {
          pushState({ content: View2, title: 'View #2' });
        }}
      >
        Go to View #2
      </button>
      <div>
        Suspendisse dictum orci nisi, a dictum nibh rhoncus at. Fusce sodales
        urna quam, rhoncus pellentesque enim pulvinar nec. Praesent volutpat
        faucibus blandit. Donec tempor dapibus libero et commodo.blandit. Donec
        tempor dapibus libero et commodo.blandit. Donec tempor dapibus libero et
        commodo.blandit. Donec tempor dapibus libero et commodo.blandit. Donec
        tempor dapibus libero et commodo.
      </div>
    </div>
  );
};

export default View3;
