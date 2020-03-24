import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

export class Episodes extends Component {
  static propTypes = {
    episodes: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  };
  render() {
    const { episodes, loading } = this.props;
    console.log(episodes.length);
    if (loading) {
      return <Spinner />;
    } else {
      return (
        <div className='card'>
          <ul>
            {episodes.map((s, i) => (
              <li key={s.id}>{s.episodeName}</li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default Episodes;
