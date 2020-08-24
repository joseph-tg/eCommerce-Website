import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { checkUserSession } from './redux/User/user.actions';

// hoc
import WithAuth from './hoc/withAuth';

// Layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/Homepagelayout';

// Pages

import Homepage from './pages/homePage/index';
import Registration from './pages/Registration';
import Recovery from './pages/Recovery';
import './default.scss';
import Dashboard from './pages/Dashboard';

import Login from './pages/Login';

// we need to update the store since we are using a middleware
const App = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());

  }, []);
 

  return (
    <div className="App"> 
      <Switch>
        <Route exact path="/" render={() => (
          <HomepageLayout>
            <Homepage />
          </HomepageLayout>
        )} />

        <Route path="/registration"render={() => (
          <MainLayout>
            <Registration />
          </MainLayout>
        )} />
        <Route path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )} />

          <Route path="/recovery" render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )} />

          <Route path="/dashboard" render={() => (
           <WithAuth>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </WithAuth>
          )} />
      </Switch>
    </div>
  );

}


export default App;  


