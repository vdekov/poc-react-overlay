import React, { useState } from 'react';

import { ContentComponentProps } from '../types';
import View2 from './View2';
import View3 from './View3';
import View4 from './View4';

type Props = ContentComponentProps;

const View1: React.FC<Props> = (props) => {
  const [counter, setCounter] = useState(0);
  const goToView2 = () => {
    props.pushState({ content: View2, title: 'Send a Gift' });
  };
  const goToView3 = () => {
    props.pushState({ content: View3 });
  };
  const goToView4 = () => {
    props.pushState({ content: View4, preventClose: true });
  };

  const increment = () => {
    setCounter(counter + 1);
  };
  const decrement = () => {
    setCounter(counter - 1);
  };

  return (
    <div>
      <b>{counter}</b>
      <br />
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      Lorem ipsum dolor sit amet,{' '}
      <a href="#" onClick={goToView2}>
        consectetur
      </a>{' '}
      adipiscing elit. Praesent ut efficitur orci. Nulla facilisi. Donec a
      mattis dui. Integer vulputate nunc vitae maximus dictum. Suspendisse
      dictum orci nisi, a dictum nibh rhoncus at. Fusce sodales urna quam,
      rhoncus pellentesque enim pulvinar nec. Praesent volutpat faucibus
      blandit. Donec tempor dapibus libero et commodo. Nunc viverra ex non justo
      pharetra, a gravida sem tristique. Vivamus placerat placerat risus at
      mollis. Mauris id neque{' '}
      <a href="#" onClick={goToView4}>
        consectetur
      </a>
      hendrerit, fringilla erat eu, posuere dolor. Praesent feugiat ipsum
      mauris, sit amet porta est porta a. Morbi vehicula erat ut ligula tempor
      iaculis. Etiam vehicula ultricies mi. Fusce non sapien ac massa placerat
      congue non ac lorem. Pellentesque vitae ultricies ex. Phasellus vel
      aliquet turpis. Praesent scelerisque viverra dignissim. Maecenas pretium
      sem et orci tincidunt, eu scelerisque felis ultrices. Integer sodales
      lacus ac mauris ullamcorper vulputate. Duis gravida urna in massa ornare
      convallis. Nunc posuere, erat et vehicula interdum, risus lectus varius
      dui, vitae accumsan dui neque vitae quam. Donec mattis nulla fringilla
      consectetur consequat. Praesent augue diam, facilisis et ante ac, accumsan
      fermentum sem. Curabitur semper et erat vitae feugiat. Nam sit amet nunc
      volutpat, dignissim est sit amet, placerat elit. Nulla sed lacus
      ultricies, faucibus purus in, malesuada lorem. Aliquam erat volutpat.
      Etiam velit odio, cursus vel tincidunt in, scelerisque vitae elit. Quisque
      consectetur justo tortor, ac fringilla dui venenatis eu. Curabitur lacinia
      leo ac tempor hendrerit. Cras eu nulla porta, maximus ex eu, condimentum
      nunc. Praesent quis commodo mi, a gravida turpis. Sed efficitur placerat
      odio, ut tincidunt nisi imperdiet id. Quisque lobortis at augue a blandit.
      Cras purus lacus, commodo ut pharetra ac, laoreet in orci. Cras quis
      scelerisque tortor. Nulla pulvinar at velit a gravida. Sed tristique
      consectetur tellus. Nullam molestie euismod nunc, eget molestie est
      condimentum eget.{' '}
      <a href="#" onClick={goToView3}>
        tincidunt dui et
      </a>
      Proin aliquam augue vel diam laoreet venenatis. Morbi pellentesque commodo
      dui, non malesuada lacus ullamcorper eget. Proin eros lectus, accumsan ac
      ligula eget, iaculis cursus ligula. Pellentesque eget est tortor.
      Suspendisse mollis, ante quis convallis rhoncus, nulla ante lobortis elit,
      sed finibus neque mi nec nibh. Vestibulum purus tellus, lobortis vitae sem
      eget, fermentum euismod turpis. Pellentesque lacus ipsum, lobortis vitae
      leo nec, accumsan auctor ex. Donec sagittis euismod mollis. Donec porta
      condimentum elit eget suscipit. Vestibulum ac porta augue. Fusce accumsan
      tortor est, ac interdum mi commodo vitae. Nam scelerisque gravida. Etiam
      blandit, sapien ut ullamcorper ultrices, nisi lectus pretium felis, in
      pellentesque ipsum felis vitae erat.
    </div>
  );
};

export default View1;
