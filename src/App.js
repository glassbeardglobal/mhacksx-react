import React from 'react';
import { Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Navbar from './components/Navbar';
import Edit from './scenes/Edit';
import CardContainer from './components/CardContainer';

const App = () => (
  <div className="container">
    <Navbar />
    <Route exact path="/" component={CardContainer} />
    <Route path="/write" component={Edit} />
  </div>
);

export default App;
