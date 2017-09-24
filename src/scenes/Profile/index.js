import React, { Component } from 'react';
import CardContainer from '../../components/CardContainer';

import './profile.css';

class Profile extends Component {
  render() {
    return (
      <div className="profile-wrapper">
        <div className="profile-header">
          <h3 className="profile-name">Name</h3>
          <h3 className="profile-publications">0 publications</h3>
        </div>
        <CardContainer />
      </div>
    );
  }
}

export default Profile;
