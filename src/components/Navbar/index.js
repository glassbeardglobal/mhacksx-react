import React from 'react';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar navbar-default navbar-fixed-top">
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
      <a className="navbar-brand" href="#">
        Twig
      </a>
    </div>
    <div id="navbar" className="navbar-collapse collapse">
      <ul className="nav navbar-nav">
        <li>
          <a href="#">
            New
          </a>
        </li>
      </ul>
      <div className="col-sm-3 col-md-3">
        <form className="navbar-form" role="search">
          <div className="input-group">
            <div className="input-group-btn">
              <button className="btn btn-default" type="submit">
                <i className="glyphicon glyphicon-search" />
              </button>
            </div>
            <input type="text" className="form-control" placeholder="Search" name="q" />
          </div>
        </form>
      </div>
    </div>
  </nav>
);

export default Navbar;
