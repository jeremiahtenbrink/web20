import React from 'react';
import {Switch, Route} from 'react-router-dom';

import ManageStudents from './Views/ManageStudents';
import Dashboard from './Views/Dashboard';
import Attendance from './Views/Attendence';
import DailyStandup from './oldviews/DailyStandup';
import EditUser from './oldviews/EditUser';
import Student from './oldviews/Student';
import SprintForm from './oldviews/SprintForm';

class AuthRoutes extends React.Component {
  
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/students"
          render={props => <ManageStudents {...props} />}
        />
        <Route
          exact
          path="/attendance"
          render={props => <Attendance {...props} />}
        />
        {/* 
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
            <Route
              exact
              path="/sprint"
              render={props => <SprintForm {...props} />}
            /> */}
        <Route exact path="/" render={props => <Dashboard {...props} />} />
      </Switch>
    );
  }
}

export default AuthRoutes;
