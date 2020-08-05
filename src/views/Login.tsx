import React from 'react';
import firebase from '../firebase/firebase';
import {GOOGLE_PROVIDER, GITHUB_PROVIDER} from '../actions';
import {
    signIn, createUser, subscribeToCourses, subscribe, unsubscribe,
} from '../actions/index';
import {Row, Col, Button, Form, Input, Select} from 'antd';
import {connect} from 'react-redux';
import LoginImage from '../assets/login.svg';
import '../assets/Login.scss';
import {history} from 'history';
import {IUser} from '../types/UserInterface';
import {ICourse} from '../types/CourseInterface';

interface IState {
    isLoading: boolean;
    inputs: {
        firstName: string; lastName: string; cohort: string; course: string
    },
}

class Login extends React.Component<IProps, IState> {
    state = {
        isLoading: false, inputs: {
            firstName: '', lastName: '', cohort: '', course: '',
        },
    };
    
    componentDidMount() {
        
        firebase.auth().onAuthStateChanged( user => {
        
        } );
        this.props.subscribe( 'courses', this.props.subscribeToCourses() );
    }
    
    componentWillUnmount(): void {
        this.props.unsubscribe( 'courses' );
    }
    
    componentDidUpdate( prevProps: Readonly<IProps>,
                        prevState: Readonly<IState>, snapshot?: any ): void {
        if ( this.props.user ) {
            this.props.history.push( '/' );
        }
    }
    
    updateHandler = e => {
        e.persist();
        this.setState( state => ( {
            ...state,
            inputs: {
                ...this.state.inputs, [ e.target.name ]: e.target.value,
            },
        } ) );
    };
    
    submitHandler = () => {
        this.props.createUser( {
            id: this.props.uid,
            firstName: this.state.inputs.firstName,
            lastName: this.state.inputs.lastName,
            cohort: this.state.inputs.cohort,
            isAdmin: false,
            course: this.state.inputs.course,
        } );
    };
    
    initLogin = type => {
        this.setState( {
            isLoading: true,
        } );
        this.props.signIn( type );
    };
    
    onChangeSelect = ( value: any, name: string ) => {
        this.setState(
            state => ( {inputs: {...state.inputs, [ name ]: value}} ) );
    };
    
    render() {
        const {Option} = Select;
        return ( <>
            <Row
                type="flex"
                gutter={ 24 }
                style={ {
                    height: '100vh',
                    margin: '0 30px',
                    alignItems: 'center',
                    textAlign: 'center',
                } }>
                <Col xs={ 24 } md={ 12 }>
                    <img src={ LoginImage } style={ {width: '100%'} }
                         alt="Login"/>
                </Col>
                <Col xs={ 24 } md={ 12 }>
                    { this.props.newUser ?
                        ( <div style={ {textAlign: 'left'} }>
                            <Row type="flex" gutter={ 24 }>
                                <Col xs={ 24 } md={ 12 }>
                                    <h3>
                                                <span
                                                    style={ {color: '#f5222d'} }>*</span> First
                                        Name
                                    </h3>
                                    <Form.Item>
                                        <Input
                                            style={ {width: '100%'} }
                                            value={ this.state.inputs.firstName }
                                            onChange={ this.updateHandler }
                                            name="firstName"
                                            required
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={ 24 } md={ 12 }>
                                    <h3>
                                                <span
                                                    style={ {color: '#f5222d'} }>*</span> Last
                                        Name
                                    </h3>
                                    <Form.Item>
                                        <Input
                                            style={ {width: '100%'} }
                                            value={ this.state.inputs.lastName }
                                            onChange={ this.updateHandler }
                                            name="lastName"
                                            required
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={ 24 }>
                                    <h3>
                                                <span
                                                    style={ {color: '#f5222d'} }>*</span> Cohort
                                        --- Example: WEB20 iOS6 CS3 <span
                                        className={ 'note' }>Must match airtable exactly.</span>
                                    </h3>
                                    <Input.Group compact>
                                        <Input
                                            style={ {width: '65%'} }
                                            value={ this.state.inputs.cohort }
                                            onChange={ this.updateHandler }
                                            name="cohort"
                                            placeholder="Section"
                                            required
                                        />
                                    </Input.Group>
                                </Col>
                                <Form.Item label={ 'Course' }>
                                    <Select
                                        showSearch
                                        style={ {width: 200} }
                                        placeholder="Instructor"
                                        optionFilterProp="children"
                                        onChange={ ( value ) => {
                                            this.onChangeSelect( value,
                                                'course' );
                                        } }
                                        value={ this.state.inputs.course }
                                        //@ts-ignore
                                        filterOption={ ( input,
                                                         option ) => typeof option.props.children ===
                                        'string' ?
                                            option.props.children.toLowerCase()
                                                .indexOf(
                                                    input.toLowerCase() ) >= 0 :
                                            '' }
                                    >
                                        { this.props.courses &&
                                        Object.values( this.props.courses )
                                            .map( ( course: ICourse ) => {
                                                return <Option key={ course.id }
                                                               value={ course.id }>{ `${ course.courseName }` }</Option>;
                                            } ) }
                                    </Select>
                                </Form.Item>
                                <Col xs={ 24 }
                                     style={ {textAlign: 'center'} }>
                                    <Button
                                        style={ {marginTop: '20px'} }
                                        type="primary"
                                        shape="round"
                                        icon="check"
                                        loading={ this.props.isLoading }
                                        onClick={ () => this.submitHandler() }
                                        size="large">
                                        Finish
                                    </Button>
                                </Col>
                            </Row>
                        </div> ) : ( <>
                            <h1 style={ {fontSize: '2rem'} }>PM
                                Dashboard</h1>
                            <h3>Welcome to the lambda school (unoffical)
                                pm dashboard.</h3>
                            <h6>Login with either google or github</h6>
                            <Button
                                className="google-btn"
                                shape="round"
                                icon="google"
                                loading={ this.props.isLoading }
                                onClick={ () => this.initLogin(
                                    GOOGLE_PROVIDER ) }
                                size="large">
                                Google
                            </Button>
                            <Button
                                className="github-btn"
                                loading={ this.props.isLoading }
                                onClick={ () => this.initLogin(
                                    GITHUB_PROVIDER ) }
                                shape="round"
                                icon="github"
                                size="large">
                                Github
                            </Button>
                        </> ) }
                </Col>
            </Row>
        </> );
    }
}

const mapStateToProps = ( state ) => ( {
    isLoading: state.auth.isLoading, newUser: state.auth.newUser,
    uid: state.auth.uid,
    user: state.auth.user,
    courses: state.autoFill.courses,
} );

interface IProps {
    isLoading: boolean;
    newUser: boolean;
    uid: string;
    signIn: typeof signIn;
    createUser: typeof createUser;
    history: history;
    user: IUser;
    courses: {[ id: string ]: ICourse};
    subscribeToCourses: typeof subscribeToCourses;
    subscribe: typeof subscribe;
    unsubscribe: typeof unsubscribe;
}

export default connect( mapStateToProps,
    {signIn, createUser, subscribeToCourses, subscribe, unsubscribe} )(
    Login );
