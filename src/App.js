import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';

// Layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/Homepagelayout';

// Pages

import Homepage from './pages/homePage/index';
import Registration from './pages/Registration';
import Recovery from './pages/Recovery';
import './default.scss';

import Login from './pages/Login';

const initialState = {
  currentUser: null
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
      // console.log
    };
  }

  authListener = null;

  componentDidMount() {
    // this adds event listener and signin the user as well as signout
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }

      this.setState({
        ...initialState
      });
    });
  }

  componentWillUnount() {
    this.authListener(); 
  }

  render() {

    const { currentUser } = this.state;
 

    return (
      <div className="App"> 
        <Switch>
          <Route exact path="/" render={() => (
            <HomepageLayout currentUser={currentUser}>
              <Homepage />
            </HomepageLayout>
          )} />

          <Route path="/registration"render={() => currentUser ? <Redirect to="/" /> : (
            <MainLayout currentUser={currentUser}>
              <Registration />
            </MainLayout>
          )} />

          <Route path="/login"
            render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout currentUser={currentUser}>
                <Login />
              </MainLayout>
            )} />

            <Route path="/recovery" render={() => (
              <MainLayout>
                <Recovery />
              </MainLayout>
            )} />
        </Switch>
      </div>
    );
  }
}

export default App;  
