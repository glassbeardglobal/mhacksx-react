import React, { Component } from 'react';
import CardContainer from '../../components/CardContainer';

import './profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('currentUsername')
    };
  }

  render() {
    return (
      <div className="profile-wrapper">
        <div className="profile-header">
          <div className="profile-info">
            <h3 className="profile-name">Username</h3>
            <h3 className="profile-publications">0 publications</h3>
          </div>
          <button className="logout-button">Log out</button>
        </div>
        <CardContainer source="user" />
      </div>
    );
  }
}

export default Profile;
