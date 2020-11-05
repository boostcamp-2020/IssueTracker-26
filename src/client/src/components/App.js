import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import LabelPage from '../pages/LabelPage';
import MilestonePage from '../pages/MilestonePage';
import UserContext from './Context/UserContext';

function App() {
  const [state, setState] = useState({
    token: localStorage.getItem('jwt'),
    isLoggedIn: !!localStorage.getItem('jwt'),
  });
  const { isLoggedIn } = state;
  return (
    <UserContext.Provider
      value={{
        state: { ...state },
        setState,
      }}
    >
      {isLoggedIn ? <PrivateRoute /> : <PublicRoute />}
    </UserContext.Provider>
  );
}

function PublicRoute() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}

function PrivateRoute() {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/label" component={LabelPage} />
      <Route exact path="/milestone" component={MilestonePage} />
      <Route exact path="/login">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
