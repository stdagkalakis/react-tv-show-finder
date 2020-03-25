import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ShowItem = ({
  show: {
    id,
    aliases,
    image,
    firstAired,
    network,
    overview,
    seriesName,
    slug,
    status
  }
}) => {
  return (
    <div className='card text-center'>
      {image && <img src={'https://www.thetvdb.com' + image} alt='Try' />}
      <h2>{seriesName}</h2>
      <ul>
        <li>
          <h4>{firstAired}</h4>
        </li>
        <li>{network}</li>
      </ul>
      <p>{overview}</p>
      <div>
        <Link to={`/series/${id}`} className=' btn ten-dark btn-sm my-1'>
          More
        </Link>
      </div>
    </div>
  );
};

ShowItem.propTypes = {
  show: PropTypes.object.isRequired
};

export default ShowItem;
