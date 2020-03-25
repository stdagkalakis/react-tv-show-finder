import React, { Component, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Episodes from './Episodes';

export class Show extends Component {
  componentDidMount() {
    this.props.getShow(this.props.match.params.id);
    this.props.getShowSeasons(this.props.match.params.id);
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    show: PropTypes.object.isRequired,
    getShow: PropTypes.func.isRequired,
    getShowSeasons: PropTypes.func.isRequired
  };

  render() {
    const {
      seriesName,
      poster,
      status,
      firstAired,
      airsDayOfWeek,
      airsTime,
      genre,
      rating,
      overview
    } = this.props.show;
    const { id } = this.props.match.params;
    const { loading, seasons } = this.props;

    if (loading) return <Spinner />;
    else {
      console.log(poster);
      return (
        <Fragment>
          <Link to='/' className='btn btn-light'>
            Back to search
          </Link>
          {/* Card Show with details  */}
          <div className='card grid-2'>
            <Fragment>
              {poster && (
                <img
                  src={'https://www.thetvdb.com/banners/' + poster}
                  alt='Try'
                />
              )}
            </Fragment>

            <div>
              <h2>{seriesName}</h2>
              {genre && (
                <Fragment>
                  {genre.map((g, i) => (
                    <div key={i} className='badge'>
                      {g}
                    </div>
                  ))}
                </Fragment>
              )}
              <ul
                className='grid-2'
                style={{
                  borderBottom: ' 1px dotted lightgrey',
                  padding: '10px'
                }}
              >
                {status && (
                  <li>
                    <Fragment>
                      <strong>Status: </strong> {status}
                    </Fragment>
                  </li>
                )}

                {firstAired && (
                  <li>
                    <Fragment>
                      <strong>First aired: </strong>
                      {firstAired}
                    </Fragment>
                  </li>
                )}

                {airsDayOfWeek && (
                  <li>
                    <Fragment>
                      <strong>Airs on: </strong>
                      {airsDayOfWeek}
                    </Fragment>
                  </li>
                )}

                {airsTime && (
                  <li>
                    <Fragment>
                      <strong>Air time: </strong>
                      {airsTime} <i className='fas fa-clock' />
                    </Fragment>
                  </li>
                )}

                {firstAired && (
                  <li>
                    <Fragment>
                      <strong>First aired: </strong>
                      {firstAired}
                    </Fragment>
                  </li>
                )}

                {rating && (
                  <li>
                    <Fragment>
                      <strong>Rating: </strong>
                      {rating}
                    </Fragment>
                  </li>
                )}
              </ul>

              {overview && (
                <Fragment>
                  <h3>Overview</h3>

                  <p
                    style={{
                      marginTop: '10px',
                      paddignTop: '10px'
                    }}
                  >
                    {overview}
                  </p>
                </Fragment>
              )}
            </div>
          </div>
          {/* Card with Seasons/ Episodes */}
          {seasons.airedSeasons && (
            <Episodes id={id} airedSeasons={seasons.airedSeasons} />
          )}
        </Fragment>
      );
    }
  }
}

export default Show;
