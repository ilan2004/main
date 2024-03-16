import React from 'react';
import Lines from 'react-preloaders/lib/Lines/Lines';

const Preloader =() => {
  return (
    <React.Fragment>
      <Lines time={2800} />
    </React.Fragment>
  );
}
export default Preloader;