import React, { Component } from 'react';
import Episode from './Episode';
import PropTypes from 'prop-types';
import axios from 'axios';

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
    // if (this.props.seasonNum !== null && this.props.id !== null) {
    //   console.log('get Episodes ' + this.props.current);
    // }

    this.getSeasonEpisodes(this.props.id, this.props.seasonNum);

    this.setState({ current: this.props.current });
  }
  // Get show seasons.
  getSeasonEpisodes = async (id, seasonNum) => {
    this.setState({ loading: true });
    const res = await axios
      .get(`/series/${id}/episodes/query?airedSeason=${seasonNum}`, {
        headers: {
          Authorization: 'Bearer ' + process.env.REACT_APP_TVDB_JWT,
          crossdomain: true
        }
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({ episodes: res.data.data });
    this.setState({ loading: false });
  };

  render() {
    const { loading, episodes } = this.state;
    const { seasonNum, id } = this.props;

    // this.getSeasonEpisodes(id, seasonNum);
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

export default Season;
