import React from 'react';
import { Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Landing from './scenes/Landing';

const App = () => (
  <div className="container">
    <Route exact path="/" component={Landing} />
  </div>);

export default App;
