import React from "react";
import "./App.css";
import { Route, Switch, NavLink } from "react-router-dom";

import { checkAuth, getStudents, getUser } from "./actions";

import firebase from "./firebase/firebase";

import { connect } from "react-redux";

import GetStarted from "./views/GetStarted";
import AddStudents from "./views/AddStudents";
import Dashboard from "./views/Dashboard";
import Attendance from "./views/Attendance";

class App extends React.Component{
    state = {
        students: [],
        firstName: "",
        lastName: "",
        isGettingStudents: false,
        attemptedLoad: false,
    };
    
    componentDidMount(){
        this.unregisterAuthObserver = firebase.auth().
            onAuthStateChanged( () => this.props.checkAuth() );
    }
    
    componentWillUnmount(){
        this.unregisterAuthObserver();
    }
    
    componentWillUpdate( nextProps, nextState, nextContext ){
        if( nextProps.uid && !nextState.isGettingStudents &&
            !nextProps.students && !nextState.attemptedLoad ){
            this.props.getStudents( nextProps.uid );
            this.props.getUser( nextProps.uid );
            this.setState( { isGettingStudents: true, attemptedLoad: true } );
        }else if( nextProps.students && nextState.isGettingStudents ){
            this.setState( {
                isGettingStudents: false
            } );
        }
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
                path="/attendance"
                render={ props => <Attendance { ...props } /> }
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
    uid: auth.uid
} );

export default connect( mapStateToProps,
    { checkAuth, getStudents, getUser }
)(
    App );
