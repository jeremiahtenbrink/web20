import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    Card, Icon, Skeleton, Avatar, Table, Col, Popover
} from "antd";
import axios from "axios";
import {
    subscribeToStudents, logout, subscribe, unsubscribe
} from "../actions";
import LambdaLogo from "../assets/logo.png";

class Dashboard extends React.Component{
    state = {
        joke: "",
    };
    
    componentDidMount(){
        
        if( !this.props.uid ){
            return this.props.history.push( "/start" );
        }
        this.getJoke();
        this.props.subscribe( "Students",
            this.props.subscribeToStudents( this.props.uid ) );
    }
    
    componentWillUnmount(){
        
        this.props.unsubscribe( "Students" );
    }
    
    getJoke = () => {
        axios.get( "https://icanhazdadjoke.com/", {
            headers: { Accept: "application/json" },
        } ).then( joke => this.setState( { joke: joke.data.joke } ) ).catch();
    };
    
    logout = () => {
        if( this.props.subscriptions ){
            Object.values( this.props.subscriptions )
                .forEach( unsubscribe => unsubscribe() );
        }
        this.props.logout();
    };
    
    render(){
        
        const actions = [
            <Popover content={ <p>Reload Joke</p> }>
                <Icon type="reload" onClick={ this.getJoke }/>
            </Popover>, <Popover content={ <p>Manage Students</p> }>
                <Icon type="usergroup-add"
                      onClick={ () => this.props.history.push(
                          "/manage-students" ) }/>
            </Popover>, <Popover content={ <p>Logout</p> }>
                <Icon type="logout" onClick={ this.props.logout }/>
            </Popover>,
        ];
        
        if( this.props.user && this.props.user.isAdmin ){
            actions.push( <Popover content={ <p>Admin</p> }><Icon
                onClick={ () => this.props.history.push( "/admin-dashboard" ) }
                type="setting"/></Popover> );
        }
        
        return ( <div style={ { maxWidth: "800px", margin: "20px auto" } }>
            <Card
                actions={ actions }>
                <Skeleton loading={ this.props.isLoading } avatar active>
                    <Card.Meta
                        avatar={ <Avatar src={ LambdaLogo }/> }
                        title={ `Welcome ${ this.props.displayName }` }
                        description={ `${ this.state.joke }` }
                    />
                </Skeleton>
            </Card>
            
            <Card>
                <Popover content={ <p>Attendance</p> }>
                    <Col span={ 8 } align={ "center" }
                         className={ "color-grey hover-blue" }
                         onClick={ () => this.props.history.push( "/attendance" ) }
                    >
                        <Icon type="schedule"
                              className={ "font-32" }
                        
                        />
                    </Col>
                </Popover>
                <Popover content={ <p>Daily Standup</p> }>
                    <Col span={ 8 } align={ "center" }
                         className={ "color-grey hover-blue" }
                         onClick={ () => this.props.history.push( "/standup" ) }
                    >
                        <Icon type="profile"
                              className={ "font-32" }
                        />
                    </Col>
                </Popover>
                <Popover content={ <p>Sprint Retro</p> }>
                    <Col span={ 8 } align={ "center" }
                         className={ "color-grey hover-blue" }
                         onClick={ () => this.props.history.push( "/sprint" ) }
                    >
                        <Icon type="project"
                        
                              className={ "font-32" }
                        />
                    </Col>
                </Popover>
            </Card>
            
            <div style={ { backgroundColor: "white" } }>
                <Table
                    dataSource={ Object.values( this.props.students ) }
                    style={ { marginTop: "30px" } }
                    bordered
                    loading={ this.props.isLoading }
                    rowKey={ "id" }
                    pagination={ false }>
                    <Table.Column
                        title="First Name"
                        dataIndex="firstName"
                        key="firstName"
                    />
                    <Table.Column
                        title="Last Name"
                        dataIndex="lastName"
                        key="lastName"
                    />
                    <Table.Column title="Github" dataIndex="github"
                                  key="github" render={ ( text, record ) => (
                        <a href={ `https://github.com/${ text }` }
                           target="_blank">{ text }</a> ) }
                    />
                    <Table.Column
                        title="Action"
                        key="action"
                        render={ student => (
                            <Link to={ `/student/${ student.id }` }>
                                <div className={ "inline pointer center" }>
                                    <Icon type={ "user" }/>
                                    <h3 className={ "mg-left-md" }>
                                        Student Dashboard
                                    </h3>
                                </div>
                            </Link> ) }
                    />
                
                </Table>
            </div>
        </div> );
    }
}

const mapStateToProps = ( { students, auth, subscriptions } ) => ( {
    students: students.students,
    uid: auth.uid,
    user: auth.user,
    isLoading: students.isLoading,
    displayName: auth.displayName,
    subscriptions: subscriptions.subscriptions,
} );

export default connect( mapStateToProps,
    { subscribeToStudents, logout, subscribe, unsubscribe },
)(
    Dashboard );
