import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Navbar from './components/Navbar';
import Edit from './scenes/Edit';
import Login from './scenes/Login';
import CardContainer from './components/CardContainer';

const App = () => (
  <div className="container">
    <Navbar />
    <div className="routes" style={{ marginTop: '76px' }}>
      <Route exact path="/" component={CardContainer} />
      <Route path="/write" component={Edit} />
      <Route
        path="/profile"
        render={() =>
          (localStorage.getItem('currentUserId') !== null ? <Redirect to="/profile" /> : <Login />)}
      />
    </div>
  </div>
);

export default App;
