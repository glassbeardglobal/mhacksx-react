import React from 'react';
import { Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Landing from './scenes/Landing';
import Navbar from './components/Navbar';
import CardContainer from './components/CardContainer';

const App = () => (
  <div className="container">
    <Route exact path="/" component={CardContainer} />
  </div>
);

export default App;
