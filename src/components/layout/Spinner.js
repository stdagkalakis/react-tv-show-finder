import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export const Spinner = () => (
  // This is a default spinner for loading use
  <Fragment>
    <img
      src={spinner}
      alt='Loading...'
      style={{ width: '200px', margin: 'auto', display: 'block' }}
    />
  </Fragment>
);

export default Spinner;
