import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const logo = require('../../images/logo.svg');

const Navbar = () => (
  <nav className="navbar navbar-default navbar-fixed-top">
    <div className="navbar-left">
      <img style={{ maxWidth: 84, marginLeft: 30 }} className="logo" src={logo} alt="" />
    </div>
    <div className="navbar-header">
      <button
        type="button"
        className="navbar-toggle collapsed"
        data-toggle="collapse"
        data-target="#navbar"
        aria-expanded="false"
        aria-controls="navbar"
      >
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
      </button>
      <Link className="navbar-brand" to="/">
        TRIDENT
      </Link>
    </div>
    <div id="navbar" className="navbar-collapse collapse">
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/write">Write a Story</Link>
        </li>
        <li id="profile-button">
          <Link to="/profile">
            <i id="profile-button" className="fa fa-user" aria-hidden="true" />
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
