import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    Card, Icon, Skeleton, Avatar, Table, Col, Popover, Row, Modal, Form,
    Popconfirm, Button, Select
} from "antd";
import axios from "axios";
import {
    subscribeToStudents, logout, subscribe, unsubscribe, editUser, delStudent,
    checkAuth, subscribeToCourses
} from "../actions/index";
import LambdaLogo from "../assets/logo.png";
import { IStudent } from "../types/StudentInterface";
import { IUser } from "../types/UserInterface";
import { ISubscriptions } from "../types/SubscriptionsInterface";
import { history } from 'history';
import MakeInput from '../components/MakeInput';
import EditStudentModal from "../components/student/EditStudentModal";
import { ICourse } from "../types/CourseInterface";
import Logger from "../utils/logger";

const Log = Logger( "Dashboard" );

interface IState {
    joke?: string;
    firstName?: string,
    lastName?: string,
    cohort?: string,
    modalOpen?: boolean,
    student?: null | IStudent;
    subscribed?: boolean;
    course?: string;
}

class Dashboard extends React.Component<IProps, IState> {
    state = {
        joke: "",
        firstName: '',
        lastName: '',
        cohort: '',
        course: '',
        modalOpen: false,
        student: null,
        subscribed: false,
    };
    
    
    onSubmit = e => {
        e.preventDefault();
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            cohort: this.state.cohort,
            id: this.props.uid,
            isAdmin: false,
            course: this.state.course,
        };
        
        this.props.editUser( user );
    };
    
    componentDidUpdate( prevProps: Readonly<IProps>,
                        prevState: Readonly<IState> ): void {
        
        if ( this.props.getUserFailed ) {
            Log.error( "Get user Failed", null, );
            this.setState( state => ( { ...state, modalOpen: true } ) );
        }
        
        if ( !this.state.subscribed && this.props.uid ) {
            
            this.setState( { subscribed: true } );
            this.props.subscribe( "Students",
                this.props.subscribeToStudents( this.props.uid ) );
            this.props.subscribe( "courses", this.props.subscribeToCourses() )
        }
    }
    
    componentDidMount() {
        
        this.getJoke();
        
    }
    
    componentWillUnmount() {
        
        this.props.unsubscribe( "Students" );
        this.props.unsubscribe( "courses" );
    }
    
    getJoke = () => {
        axios.get( "https://icanhazdadjoke.com/", {
            headers: { Accept: "application/json" },
        } ).then( joke => this.setState( { joke: joke.data.joke } ) ).catch();
    };
    
    logout = () => {
        if ( this.props.subscriptions ) {
            Object.values( this.props.subscriptions )
                .forEach( unsubscribe => unsubscribe() );
        }
        this.props.logout();
    };
    
    onChange = e => {
        this.setState( { [ e.target.name ]: e.target.value } )
    };
    
    onChangeSelect = ( value, name ) => {
        this.setState( { [ name ]: value } );
    };
    
    setUserInfo = () => {
        Log.info( "Setting user info", this.state );
        this.setState( {
            modalOpen: true,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            cohort: this.props.user.cohort,
            course: this.props.user.course,
        } );
    };
    
    render() {
        const newStudent = {
            id: null,
            firstName: '',
            lastName: '',
            course: '',
            pm: this.props.uid,
            github: '',
        };
        
        const actions = [
            <Popover content={ <p>Reload Joke</p> }>
                <Icon type="reload" onClick={ this.getJoke }/>
            </Popover>, <Popover content={ <p>Create New Student</p> }>
                <Icon type="usergroup-add"
                      onClick={ () => this.setState(
                          { student: newStudent } ) }/>
            </Popover>, <Popover content={ <p>Logout</p> }>
                <Icon type="logout" onClick={ this.props.logout }/>
            </Popover>,
        ];
        
        if ( this.props.user && this.props.user.isAdmin ) {
            actions.push( <Popover content={ <p>Admin</p> }><Icon
                onClick={ () => this.props.history.push( "/admin-dashboard" ) }
                type="setting"/></Popover> );
        }
        
        const { Option } = Select;
        Log.info( "rendering in dashboard", this.props, "Props" );
        Log.info( "rendering in dashboard", this.state, "State" );
        return ( <div style={ { maxWidth: "800px", margin: "20px auto" } }>
            <Card
                actions={ actions }>
                <Skeleton loading={ this.props.isLoading } avatar active>
                    
                    <div className={ "inline space-between" }>
                        <Card.Meta
                            avatar={ <Avatar src={ LambdaLogo }/> }
                            title={ `Welcome ${ this.props.displayName }` }
                            description={ `${ this.state.joke }` }
                            className={ "mg-right-md" }
                        />
                        <Button
                            icon={ "edit" }
                            className={ "color-blue" }
                            onClick={ this.setUserInfo }>Edit Project
                            Manager</Button>
                    </div>
                
                </Skeleton>
            </Card>
            
            <Card>
                <Popover content={ <p>Attendance</p> }>
                    {/*
                    //@ts-ignore */ }
                    <Col span={ 8 } align={ "center" }
                         className={ "color-grey hover-blue pointer" }
                         onClick={ () => this.props.history.push(
                             "/attendance" ) }
                    >
                        <Icon type="schedule"
                              className={ "font-32" }
                        
                        />
                    </Col>
                </Popover>
                <Popover content={ <p>Daily Standup</p> }>
                    {/*
                    //@ts-ignore */ }
                    <Col span={ 8 } align={ "center" }
                         className={ "color-grey hover-blue pointer" }
                         onClick={ () => this.props.history.push( "/standup" ) }
                    >
                        <Icon type="profile"
                              className={ "font-32" }
                        />
                    </Col>
                </Popover>
                <Popover content={ <p>Sprint Retro</p> }>
                    {/*
                    //@ts-ignore */ }
                    <Col span={ 8 } align={ "center" }
                         className={ "color-grey hover-blue pointer" }
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
                    />
                    <Table.Column
                        title="Last Name"
                        dataIndex="lastName"
                    />
                    <Table.Column title="Github" dataIndex="github"
                                  render={ ( text, record ) => (
                                      <a href={ `https://github.com/${ text }` }
                                         target="_blank">{ text }</a> ) }
                    />
                    <Table.Column
                        title="Action"
                        render={ student => (
                            <div className={ "inline center-vert" +
                            " space-around" }>
                                <Link to={ `/student/${ student.id }` }>
                                    <Popover
                                        content={ "User Dashboard" }>
                                        <Icon type={ "user" }
                                              style={ { fontSize: "20px" } }
                                        />
                                    </Popover>
                                </Link>
                                <span className={ "color-blue" }>
                                    <Popover content={ <p>Edit Student</p> }>
                                        <Icon type={ "form" }
                                              className={ "mg-left-md" }
                                              style={ { fontSize: "20px" } }
                                              onClick={ () => this.setState(
                                                  { student: student } ) }/>
                                    </Popover>
                                    
                                </span>
                                <span className={ "color-red" }>
                                    <Popconfirm title={ "Delete Student" }
                                                cancelText={ "Cancel" }
                                                okText={ "Delete" }
                                                onConfirm={ () => this.props.delStudent(
                                                    student.id ) }

                                    >
                                    <Popover content={ <p>Delete Student</p> }>
                                        <Icon type={ "delete" }
                                              className={ "mg-left-md" }
                                              style={ { fontSize: "20px" } }
                                        />
                                    </Popover>
                                    </Popconfirm>
                                    
                                </span>
                            
                            </div>
                        ) }
                    />
                
                </Table>
            </div>
            { this.state.student &&
            <EditStudentModal student={ this.state.student }
                              closeModal={ () => this.setState(
                                  { student: null } ) }/> }
            <Modal
                title={ "Required User Information" }
                visible={ this.state.modalOpen }
                okText={ 'Submit' }
                onOk={ ( e ) => this.onSubmit( e ) }
                onCancel={ () => this.setState(
                    state => ( { ...state, modalOpen: false } ) ) }>
                <Row type="flex" gutter={ 24 }>
                    <Col xs={ 24 } md={ 12 }>
                        <MakeInput onChange={ e => this.onChange( e ) }
                                   required={ true }
                                   value={ this.state.firstName }
                                   name={ "firstName" }
                                   isLoading={ false }
                                   type={ "input" }
                                   title={ "First Name" }
                        />
                    </Col>
                    
                    <Col xs={ 24 } md={ 12 }>
                        <MakeInput onChange={ e => this.onChange( e ) }
                                   required={ true }
                                   value={ this.state.lastName }
                                   name={ "lastName" }
                                   isLoading={ false }
                                   type={ "input" }
                                   title={ "Last Name" }
                        />
                    </Col>
                    <Col xs={ 24 }>
                        <MakeInput onChange={ e => this.onChange( e ) }
                                   required={ true }
                                   value={ this.state.cohort }
                                   name={ "cohort" }
                                   isLoading={ false }
                                   type={ "input" }
                                   title={ "Cohort" }
                        />
                    </Col>
                    <Col xs={ 24 }>
                        <Form.Item label={ "Course" }>
                            <Select
                                showSearch
                                style={ { width: 200 } }
                                placeholder="Instructor"
                                optionFilterProp="children"
                                onChange={ ( value ) => {
                                    this.onChangeSelect( value, "course" );
                                } }
                                value={ this.state.course }
                                filterOption={ ( input,
                                                 option ) => typeof option.props.children ===
                                "string" ? option.props.children.toLowerCase()
                                    .indexOf( input.toLowerCase() ) >= 0 : '' }
                            >
                                { this.props.courses &&
                                Object.values( this.props.courses )
                                    .map( ( course: ICourse ) => {
                                        return <Option key={ course.id }
                                                       value={ course.id }>{ `${ course.courseName }` }</Option>;
                                    } ) }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Modal>
        </div> );
    }
}

const mapStateToProps = ( state ) => {
    Log.info( "Reducers", state, "Map State To Props" );
    
    return {
        students: state.students.students,
        uid: state.auth.uid,
        user: state.auth.user,
        isLoading: state.students.isLoading,
        displayName: state.auth.displayName,
        subscriptions: state.subscriptions.subscriptions,
        getUserFailed: state.auth.getUserFailed,
        courses: state.autoFill.courses,
    }
};

interface IProps {
    students: { [ id: string ]: IStudent };
    courses: { [ id: string ]: ICourse };
    uid: string;
    user: IUser;
    isLoading: boolean;
    displayName: string;
    subscriptions: ISubscriptions;
    subscribeToStudents: typeof subscribeToStudents;
    logout: () => void;
    subscribe: typeof subscribe;
    unsubscribe: typeof unsubscribe;
    history: history;
    editUser: typeof editUser;
    delStudent: typeof delStudent;
    checkAuth: typeof checkAuth;
    getUserFailed: boolean;
    subscribeToCourses: typeof subscribeToCourses;
}

export default connect( mapStateToProps,
    {
        subscribeToStudents, logout, subscribe, unsubscribe, editUser,
        delStudent, checkAuth, subscribeToCourses
    },
)(
    Dashboard );
