import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {checkAuth, getStudents, getUser, getSections} from './actions';

import firebase from './firebase/firebase';

import {connect} from 'react-redux';

import {Layout, Spin} from 'antd';

import Login from './Views/Login';

import AuthRoute from './AuthRoute';

const Protected = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => <Component {...props} />} />
);

class App extends React.Component {
  state = {
    students: [],
    firstName: '',
    lastName: '',
    isGettingStudents: false,
    attemptedLoad: false,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(() => this.props.checkAuth());
  }

  render() {
    if (this.props.authLoading) {
      return (
        <Layout>
          <Layout.Content style={{minHeight: '100vh',}}>
            <div style={{height: '100vh', width: '100%', verticalAlign: 'center', margin: '0 auto'}}>
              <Spin size="large" description="Checking Authentication" />
            </div>
          </Layout.Content>
        </Layout>
      );
    }
    return (
      <Layout>
        <Layout.Content style={{minHeight: '100vh', padding: '20px 10px'}}>
          <Switch>
            <Route exact path="/start" render={props => <Login {...props} />} />
            <Protected path="/" component={props => <AuthRoute {...props} />} />
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}

const mapStateToProps = ({auth}) => ({
  authLoading: true,
  uid: auth.uid,
  user: auth.user,
});

export default connect(
  mapStateToProps,
  {checkAuth, getStudents, getUser, getSections},
)(App);
