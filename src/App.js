import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { setCurrentUser } from './redux/User/user.actions';

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
  const { setCurrentUser, currentUser } = props;
  // constructor updates state ... useEffect Life sycle hook
  useEffect(() => {
    // this adds event listener and signin the user as well as signout
    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        })
      }

      setCurrentUser(userAuth);
    });
  

  return () => {
    authListener(); 
  };

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


const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);  
