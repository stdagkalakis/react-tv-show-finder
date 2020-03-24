import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import Season from './Season';

class Episodes extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    airedSeasons: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.airedSeasons.sort((a, b) =>
      parseInt(a) < parseInt(b) ? -1 : 1
    );
  }
  render() {
    const loading = false;
    const { airedSeasons, id } = this.props;

    if (loading) {
      return <Spinner />;
    } else {
      return (
        <Fragment>
          {airedSeasons &&
            airedSeasons.map((seasonNum, i) => (
              <Season key={i} id={id} seasonNum={seasonNum} />
            ))}
        </Fragment>
      );
    }
  }
}

export default Episodes;
