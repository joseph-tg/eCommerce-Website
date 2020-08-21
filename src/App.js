import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { setCurrentUser } from './redux/User/user.actions';

// Layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/Homepagelayout';

// Pages

import Homepage from './pages/homePage/index';
import Registration from './pages/Registration';
import Recovery from './pages/Recovery';
import './default.scss';

import Login from './pages/Login';

// we need to update the store since we are using a middleware
class App extends Component {
  // constructor updates state
  
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
      //

  authListener = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    // this adds event listener and signin the user as well as signout
    this.authListener = auth.onAuthStateChanged(async userAuth => {
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
  }

  componentWillUnount() {
    this.authListener(); 
  }

  render() {

    const { currentUser } = this.props;
 

    return (
      <div className="App"> 
        <Switch>
          <Route exact path="/" render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )} />

          <Route path="/registration"render={() => currentUser ? <Redirect to="/" /> : (
            <MainLayout>
              <Registration />
            </MainLayout>
          )} />

          <Route path="/login"
            render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout>
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


const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);  
