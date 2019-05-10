import React from 'react';
//import './App.css';
import {Route, Switch, NavLink} from 'react-router-dom';

import {checkAuth, getStudents, getUser, getSections} from './actions';

import firebase from './firebase/firebase';

import {connect} from 'react-redux';

import {Layout} from 'antd'


import Login from './Views/Login';
import ManageStudents from './Views/ManageStudents';
import Dashboard from './oldviews/Dashboard';
import Attendance from './oldviews/Attendance';
import DailyStandup from './oldviews/DailyStandup';
import EditUser from './oldviews/EditUser';
import Student from './oldviews/Student';
import SprintForm from './oldviews/SprintForm';

class App extends React.Component {
  state = {
    students: [],
    firstName: '',
    lastName: '',
    isGettingStudents: false,
    attemptedLoad: false,
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(() => this.props.checkAuth());
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (
      nextProps.uid &&
      !nextState.isGettingStudents &&
      !nextProps.students &&
      !nextState.attemptedLoad
    ) {
      this.props.getStudents(nextProps.uid);
      this.props.getUser(nextProps.uid);
      this.props.getSections();
      this.setState({isGettingStudents: true, attemptedLoad: true});
    } else if (
      !nextProps.uid &&
      (nextState.isGettingStudents || nextState.attemptedLoad)
    ) {
      this.setState({isGettingStudents: false, attemptedLoad: false});
    }
  }

  render() {
    return (
      <Layout>
        <Layout.Content style={{minHeight: '100vh', padding: "20px 10px"}}>
          <Switch>
            <Route exact path="/start" render={props => <Login {...props} />} />
            <Route
              exact
              path="/students"
              render={props => <ManageStudents {...props} />}
            /> 
            {/* <Route
              exact
              path="/attendance"
              render={props => <Attendance {...props} />}
            />
            <Route
              exact
              path="/standup"
              render={props => <DailyStandup {...props} />}
            />
            <Route
              exact
              path="/user"
              render={props => <EditUser {...props} />}
            />
            <Route
              exact
              path="/student/:id"
              render={props => <Student {...props} />}
            />
            <Route exact path="/" render={props => <Dashboard {...props} />} />
            <Route
              exact
              path="/sprint"
              render={props => <SprintForm {...props} />}
            /> */}
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}

const mapStateToProps = ({auth}) => ({
  uid: auth.uid,
  user: auth.user,
});

export default connect(
  mapStateToProps,
  {checkAuth, getStudents, getUser, getSections},
)(App);
