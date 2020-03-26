import React, { useState, useEffect } from 'react';
import ShowItem from './ShowItem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import axios from 'axios';

const Shows = ({ match, loading }) => {
  const [shows, setShows] = useState([]);
  //search shows via text

  useEffect(() => {
    if (match.params.text) searchShows(match.params.text);
  }, [match.params.text]);
  const searchShows = async text => {
    // this.setState({ loading: true, seasons: [] });
    axios
      .get(`/search/series?name=${text}`, {
        headers: {
          Authorization: 'Bearer ' + process.env.REACT_APP_TVDB_JWT,
          crossdomain: true
        }
      })
      .then(response => {
        setShows(response.data.data);
      })
      .catch(error => {
        // console.log(error);
        // this.setState({ loading: false });
        // this.setAlert(error.message, 'dark');
      });
  };
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
  loading: PropTypes.bool.isRequired
};

const showStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gridGap: '1rem'
};

export default Shows;
