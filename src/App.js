import React from 'react';
import { Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Navbar from './components/Navbar';
import Edit from './scenes/Edit';
import CardContainer from './components/CardContainer';
import View from './scenes/View';

const App = () => (
  <div className="container">
    <Navbar />

    <div className="routes" style={{ marginTop: '76px' }}>
      <Route exact path="/" component={CardContainer} />
      <Route path="/write" component={Edit} />
      <Route path="/read/:id" component={View} />
    </div>
  </div>
);

export default App;
