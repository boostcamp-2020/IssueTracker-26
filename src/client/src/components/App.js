import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import LabelPage from '../pages/LabelPage';
import MilestonePage from '../pages/MilestonePage';
import UserContext from './Context/UserContext';
import IssueCreatePage from '../pages/IssueCreatePage';
import Header from './header/Header';
import Http from '../util/http-common';
import GitHubLogin from './login/GitHubLogin';

function App() {
  const [state, setState] = useState({
    token: localStorage.getItem('jwt'),
    isLoggedIn: !!localStorage.getItem('jwt'),
  });
  const { isLoggedIn } = state;
  useEffect(() => {
    if (isLoggedIn) {
      fetch(`${Http}api/user`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
        .then((res) => {
          if (res.status === 401) {
            localStorage.removeItem('jwt');
            setState({
              ...state,
              isLoggedIn: false,
              userName: undefined,
              profile: undefined,
              token: null,
            });
            return {};
          }
          return res.json();
        })
        .then(({ userName, userId, profile }) => {
          setState({ ...state, isLoggedIn: true, userName, userId, profile });
        });
    }
  }, []);
  return (
    <UserContext.Provider
      value={{
        state,
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
      <Route path="/github" component={GitHubLogin} />
      <Route path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}

function PrivateRoute() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/label" component={LabelPage} />
        <Route exact path="/milestone" component={MilestonePage} />
        <Route exact path="/login">
          <Redirect to="/" />
        </Route>
        <Route exact path="/issue-create" component={IssueCreatePage} />
      </Switch>
    </>
  );
}

export default App;
