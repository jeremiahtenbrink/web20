import React from "react";
import "./App.css";
import { Route, Switch, NavLink } from "react-router-dom";

import { checkAuth } from "./actions";

import firebase from "./firebase/firebase";

import { connect } from "react-redux";

import GetStarted from "./views/GetStarted";
import AddStudents from "./views/AddStudents";
import Dashboard from "./views/Dashboard";

class App extends React.Component{
    state = {
        students: [], firstName: "", lastName: ""
    };
    
    componentDidMount(){
        this.unregisterAuthObserver = firebase.auth().
            onAuthStateChanged( () => this.props.checkAuth() );
    }
    
    componentWillUnmount(){
        this.unregisterAuthObserver();
    }
    
    render(){
        return ( <Switch>
            <Route
                exact
                path="/start"
                render={ props => <GetStarted { ...props } /> }
            />
            <Route
                exact
                path="/students"
                render={ props => <AddStudents { ...props } /> }
            />
            <Route
                exact
                path="/"
                render={ props => <Dashboard { ...props } /> }
            />
        </Switch> );
    }
}

const mapStateToProps = ( { auth } ) => ( {
    user: auth.user
} );

export default connect( mapStateToProps, { checkAuth } )( App );
