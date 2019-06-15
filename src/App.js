import React from "react";
import { Route, Switch } from "react-router-dom";
import { checkAuth } from "./actions";
import firebase from "./firebase/firebase";
import { connect } from "react-redux";
import { Layout } from "antd";
import Login from "./views/Login";
import ManageStudents from "./views/ManageStudents";
import Dashboard from "./views/Dashboard";
import Attendance from "./views/Attendance.jsx";
import DailyStandup from "./views/DailyStandup.tsx";
import Student from "./views/Student.tsx";
import SprintForm from "./views/SprintForm.tsx";
import AdminDashboard from "./views/AdminDashboard";
import "./App.scss";

class App extends React.Component{
    
    componentDidMount(){
        
        this.unregisterAuthObserver = firebase.auth()
            .onAuthStateChanged( () => this.props.checkAuth() );
    }
    
    componentWillUnmount(){
        this.unregisterAuthObserver();
    }
    
    render(){
        return ( <Layout>
            <Layout.Content
                style={ { minHeight: "100vh", padding: "20px 10px" } }>
                <Switch>
                    <Route exact path="/start"
                           render={ props => <Login { ...props } /> }/>
                    <Route
                        exact
                        path="/manage-students"
                        render={ props => <ManageStudents { ...props } /> }
                    />
                    <Route
                        exactgit
                        path="/attendance"
                        render={ props => <Attendance { ...props } /> }
                    />
                    <Route
                        exact
                        path="/standup"
                        render={ props => <DailyStandup { ...props } /> }
                    />
                    {/*<Route*/ }
                    {/*exact*/ }
                    {/*path="/user"*/ }
                    {/*render={ props => <EditUser { ...props } /> }*/ }
                    />
                    <Route
                        exact
                        path="/student/:id"
                        render={ props => <Student { ...props } /> }
                    />
                    <Route
                        exact
                        path="/sprint"
                        render={ props => <SprintForm { ...props } /> }
                    />
                    <Route
                        exact
                        path="/admin-dashboard"
                        render={ props => <AdminDashboard { ...props } /> }
                    />
                    
                    
                    <Route exact path="/"
                           render={ props => <Dashboard { ...props } /> }/>
                
                </Switch>
            </Layout.Content>
        </Layout> );
    }
}

const mapStateToProps = () => ( {} );

export default connect( mapStateToProps, { checkAuth } )( App );
