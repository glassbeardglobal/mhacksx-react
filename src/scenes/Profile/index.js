import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CardContainer from '../../components/CardContainer';

import './profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('currentUsername'),
      publications: localStorage.getItem('currentUserPublicationCount'),
      redirect: false
    };
    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('currentUsername');
    localStorage.removeItem('currentUserPublicationCount');
    this.setState({ redirect: true });
  }

  render() {
    return (
      <div className="profile-wrapper">
        {this.state.redirect && <Redirect to="/login" />}
        <div className="profile-header">
          <div className="profile-info">
            <h3 className="profile-name">{this.state.username}</h3>
            <h3 className="profile-publications">{this.state.publications} publications</h3>
          </div>
          <button className="logout-button" onClick={this.logout}>
            Log out
          </button>
        </div>
        <CardContainer source="user" />
      </div>
    );
  }
}

export default Profile;
