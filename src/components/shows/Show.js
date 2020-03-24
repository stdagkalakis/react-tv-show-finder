import React, { Component, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Episodes from './Episodes';

export class Show extends Component {
  componentDidMount() {
    this.props.getShow(this.props.match.params.id);
    this.props.getShowEpisodes(this.props.match.params.id);
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    show: PropTypes.object.isRequired,
    getShow: PropTypes.func.isRequired,
    getShowEpisodes: PropTypes.func.isRequired
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

    const { loading, episodes } = this.props;
    if (loading) return <Spinner />;
    else {
      return (
        <Fragment>
          <Link to='/' className='btn btn-light'>
            Back to search
          </Link>
          {/* Card Show with details  */}
          <div className='card grid-2'>
            <div>
              <Fragment>
                {poster && <i src={poster} alt=''></i>}
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
              </Fragment>
            </div>
            <div>
              <ul
                className='grid-2'
                style={{
                  borderBottom: ' 1px dotted lightgrey',
                  paddingBottom: '10px'
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
          <Episodes episodes={episodes} loading={loading} />
        </Fragment>
      );
    }
  }
}

export default Show;
