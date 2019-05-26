import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    Card, Icon, Skeleton, Avatar, Table, Button, Col, Divider, Popconfirm
} from "antd";
import axios from "axios";
import { getStudents, logout } from "../actions";
import LambdaLogo from "../assets/logo.png";

class Dashboard extends React.Component{
    state = {
        joke: "",
    };
    
    componentDidMount(){
        this.getJoke();
    }
    
    getJoke = () => {
        axios.get( "https://icanhazdadjoke.com/", {
            headers: { Accept: "application/json" },
        } ).then( joke => this.setState( { joke: joke.data.joke } ) ).catch();
    };
    
    render(){
        return ( <div style={ { maxWidth: "800px", margin: "20px auto" } }>
            <Card
                actions={ [
                    <Icon type="reload" onClick={ this.getJoke }/>,
                    <Icon type="usergroup-add"
                          onClick={ () => this.props.history.push(
                              "/manage-students" ) }
                    />, <Icon type="logout" onClick={ this.props.logout }/>,
                ] }>
                <Skeleton loading={ this.props.isLoading } avatar active>
                    <Card.Meta
                        avatar={ <Avatar src={ LambdaLogo }/> }
                        title={ `Welcome ${ this.props.displayName }` }
                        description={ `${ this.state.joke }` }
                    />
                </Skeleton>
            </Card>
            
            <Card>
                <Col span={ 8 } align={ "center" }>
                    <Link to={ "/attendance" }>
                        <Icon type="schedule" onClick={ this.getJoke }/>
                        <p>Attendance</p>
                    </Link>
                </Col>
                <Col span={ 8 } align={ "center" }>
                    <Link to={ "/standup" }>
                        <Icon type="profile"
                              onClick={ () => this.props.history.push(
                                  "/students" ) }
                        />
                        <p>Daily Standup</p>
                    </Link>
                </Col>
                <Col span={ 8 } align={ "center" }>
                    <Link to={ "/sprint" }>
                        <Icon type="project" onClick={ this.props.logout }/>
                        <p>Sprint</p>
                    </Link>
                </Col>
            </Card>
            
            <div style={ { backgroundColor: "white" } }>
                <Table
                    dataSource={ this.props.students }
                    style={ { marginTop: "30px" } }
                    bordered
                    loading={ this.props.isLoading }
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

const mapStateToProps = ( { students, auth } ) => ( {
    students: students.students,
    uid: auth.uid,
    user: auth.user,
    isLoading: students.isLoading,
    displayName: auth.displayName
} );

export default connect( mapStateToProps,
    { getStudents, logout },
)(
    Dashboard );
