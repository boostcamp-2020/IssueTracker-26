import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import LabelPage from '../pages/LabelPage';
import MilestonePage from '../pages/MilestonePage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/label" component={LabelPage} />
      <Route exact path="/milestone" component={MilestonePage} />
      <Route />
    </Switch>
  );
}

export default App;
