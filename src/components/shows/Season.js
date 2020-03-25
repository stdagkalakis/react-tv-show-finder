import React, { Component } from 'react';
import Episode from './Episode';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

export class Season extends Component {
  state = {
    loading: false,
    episodes: []
  };
  static propTypes = {
    id: PropTypes.string.isRequired,
    seasonNum: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.setState({ current: this.props.current });
    this.getSeasonEpisodes(this.props.id, this.props.seasonNum);
  }
  // Get show seasons.
  getSeasonEpisodes = async (id, seasonNum) => {
    this.setState({ loading: true });
    axios
      .get(`/series/${id}/episodes/query?airedSeason=${seasonNum}`, {
        headers: {
          Authorization: 'Bearer ' + process.env.REACT_APP_TVDB_JWT,
          crossdomain: true
        }
      })
      .then(response => {
        this.setState({ episodes: response.data.data });
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { loading, episodes } = this.state;
    const { seasonNum } = this.props;

    if (loading) {
      return <Spinner />;
    } else {
      return (
        <div className='card'>
          {seasonNum === '0' ? <h3>Spesials</h3> : <h3>Season {seasonNum} </h3>}
          <ul className='list-group'>
            {episodes.map((e, i) => (
              <li key={i} className='list-group-item'>
                <Episode episode={e} />
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default Season;
