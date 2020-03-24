import React from 'react';
import ShowItem from './ShowItem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Shows = ({ shows, loading }) => {
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={showStyle}>
        {shows.map(s => (
          <ShowItem key={s.id} show={s} />
        ))}
      </div>
    );
  }
};

Shows.propTypes = {
  shows: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const showStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gridGap: '1rem'
};

export default Shows;
