import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logInput: '',
      redirect: false
    };

    this.login = this.login.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      logInput: e.target.value
    });
  }

  login() {
    const payload = {
      username: this.state.logInput
    };

    fetch('/api/user/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(payload)
    })
      .then(results => results.json())
      .then((data) => {
        localStorage.setItem('currentUserId', data._id);
        localStorage.setItem('currentUsername', data.username);
        localStorage.setItem('currentUserPublicationCount', data.stories.length);
      });
  }

  render() {
    return (
      <div className="login-wrapper">
        {this.state.redirect && <Redirect to="/profile" />}
        <input
          type="text"
          placeholder="Username"
          value={this.state.logInput}
          onChange={this.handleInputChange}
        />
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

export default Login;
