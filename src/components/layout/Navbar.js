import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ icon, title }) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <i className={icon} />
      <div className='navbar-brand'> {title}</div>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div
        className='collapse navbar-collapse flex-grow-0'
        id='navbarSupportedContent'
      >
        <ul className='navbar-nav text-right'>
          <li className='nav-item active'>
            <Link className='nav-item nav-link active' to='/'>
              Home
            </Link>
          </li>
          <li className='nav-item active'>
            <Link className='nav-item nav-link active' to='/about'>
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  title: 'TV-show finder',
  icon: 'fas fa-film'
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
