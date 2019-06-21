import React from "react";
import firebase from "../firebase/firebase";
import { GOOGLE_PROVIDER, GITHUB_PROVIDER } from "../actions";
import { signIn, createUser } from "../actions";
import { Row, Col, Button, Form, Input, Select } from "antd";
import { connect } from "react-redux";
import LoginImage from "../assets/login.svg";
import "../assets/Login.scss";
import { history } from "history";
import { IUser } from "../types/UserInterface";

interface IState {
    isLoading: boolean;
    inputs: {
        firstName: string; lastName: string; cohort: string;
    },
}

class Login extends React.Component<IProps, IState> {
    state = {
        isLoading: false, inputs: {
            firstName: "", lastName: "", cohort: "",
        },
    };
    
    componentDidMount() {
        
        firebase.auth().onAuthStateChanged( user => {
        
        } );
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
        } );
    };
    
    initLogin = type => {
        this.setState( {
            isLoading: true,
        } );
        this.props.signIn( type );
    };
    
    render() {
        return ( <>
            <Row
                type="flex"
                gutter={ 24 }
                style={ {
                    height: "100vh",
                    margin: "0 30px",
                    alignItems: "center",
                    textAlign: "center",
                } }>
                <Col xs={ 24 } md={ 12 }>
                    <img src={ LoginImage } style={ { width: "100%" } }
                         alt="Login"/>
                </Col>
                <Col xs={ 24 } md={ 12 }>
                    { this.props.newUser ?
                        ( <div style={ { textAlign: "left" } }>
                            <Row type="flex" gutter={ 24 }>
                                <Col xs={ 24 } md={ 12 }>
                                    <h3>
                                                <span
                                                    style={ { color: "#f5222d" } }>*</span> First
                                        Name
                                    </h3>
                                    <Form.Item>
                                        <Input
                                            style={ { width: "100%" } }
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
                                                    style={ { color: "#f5222d" } }>*</span> Last
                                        Name
                                    </h3>
                                    <Form.Item>
                                        <Input
                                            style={ { width: "100%" } }
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
                                                    style={ { color: "#f5222d" } }>*</span> Cohort
                                        ---> Example: WEB20 iOS6 CS3 <span
                                        className={ "note" }>Must match airtable exactly.</span>
                                    </h3>
                                    <Input.Group compact>
                                        <Input
                                            style={ { width: "65%" } }
                                            value={ this.state.inputs.cohort }
                                            onChange={ this.updateHandler }
                                            name="cohort"
                                            placeholder="Section"
                                            required
                                        />
                                    </Input.Group>
                                </Col>
                                <Col xs={ 24 }
                                     style={ { textAlign: "center" } }>
                                    <Button
                                        style={ { marginTop: "20px" } }
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
                            <h1 style={ { fontSize: "2rem" } }>PM
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

const mapStateToProps = ( { auth } ) => ( {
    isLoading: auth.isLoading, newUser: auth.newUser, uid: auth.uid,
    user: auth.user,
} );

interface IProps {
    isLoading: boolean;
    newUser: boolean;
    uid: string;
    signIn: typeof signIn;
    createUser: typeof createUser;
    history: history;
    user: IUser;
}

export default connect( mapStateToProps, { signIn, createUser }, )( Login );
