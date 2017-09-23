import React from 'react';
import { Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Landing from './scenes/Landing';
import Edit from './scenes/Edit';

const App = () => (
  <div className="container">
    <Route exact path="/" component={Landing} />
    <Route path="/write" component={Edit} />
  </div>);

export default App;
