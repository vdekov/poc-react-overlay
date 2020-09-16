import { useState, useEffect } from 'react';

const useDelayedUnmount = (visible, hide) => {
  const [visibility, setVisibility] = useState(false);

  // When the overlay is being requested by the parent
  // start the entering transtion animation internally.
  useEffect(() => {
    if (visible) {
      setVisibility(true);
    }
  }, [visible]);

  // When click on either the close button or the backdrop
  // start the leaving transition animation.
  const triggerHide = () => {
    setVisibility(false);
  };

  // When the leave transition finishes notify the parent
  // component in order to unmount the child.
  const unmount = () => {
    if (!visibility) {
      hide();
    }
  };

  return { visibility, triggerHide, unmount };
};

export default useDelayedUnmount;
