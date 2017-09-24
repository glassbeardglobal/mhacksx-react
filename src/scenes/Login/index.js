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
    fetch(`/api/user/${this.state.logInput}`)
      .then(results => results.json())
      .then((data) => {
        localStorage.setItem('currentUserId', data._id);
        localStorage.set('currentUsername', data.username);
        this.setState({ redirect: true });
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
