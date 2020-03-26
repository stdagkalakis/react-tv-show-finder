import React, { Fragment, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const Episode = ({
  episode: {
    episodeName,
    contentRating,
    firstAired,
    directors,
    overview,
    poster
  }
}) => {
  // Modal handlers.
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <div className='grid-2 text-center'>
        {/* Title and image */}
        <div>
          <i src='' alt='' />
          <h4>{episodeName}</h4>
        </div>
        {/* First aired, rating, details  */}
        <div className='grid-2'>
          <ul>
            {firstAired && (
              <li>
                <Fragment>
                  <strong>First aired: </strong> {firstAired}
                </Fragment>
              </li>
            )}
            {contentRating && (
              <li>
                <Fragment>
                  <strong>Rating: </strong> {contentRating}
                </Fragment>
              </li>
            )}
          </ul>
          <Button variant='secondary' onClick={handleShow}>
            Details
          </Button>
        </div>
      </div>
      {/* Details modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Fragment>
            {directors.length > 0 && <h5>Director: {directors[0]}</h5>}
            <strong>Overview: </strong>
            {overview && <p>{overview}</p>}
            {poster && (
              <img
                src={'https://www.thetvdb.com/banners/' + poster}
                alt='Poaster'
              />
            )}
          </Fragment>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Episode;
