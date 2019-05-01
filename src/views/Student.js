import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Form, Input, Button, Row, Col, Container,
} from "reactstrap";
import { editStudent, generateStudentLink } from "../actions";
import { Link } from "react-router-dom";

import Skeleton from "react-loading-skeleton";

class Student extends Component{
    state = {
        loaded: false,
        studentId: "",
        firstName: "",
        lastName: "",
        github: "",
        link: "",
    };
    
    componentWillUpdate( nextProps, nextState, nextContext ){
        if( nextProps.students && !nextState.loaded && nextState.studentId ){
            const { firstName, lastName, github } = nextProps.students[ nextState.studentId ];
            this.setState( { firstName, lastName, github, loaded: true } );
        }
    }
    
    componentDidMount(){
        this.setState( { studentId: this.props.match.params.id } );
    }
    
    onChange = e => {
        this.setState( { [ e.target.name ]: e.target.value } );
    };
    
    onSubmit = e => {
        e.preventDefault();
        let student = {};
        
        if( this.state.firstName !==
            this.props.students[ this.state.studentId ].firstName ){
            student.firstName = this.state.firstName;
        }
        
        if( this.state.lastName !==
            this.props.students[ this.state.studentId ].lastName ){
            student.lastName = this.state.lastName;
        }
        
        if( this.state.github !==
            this.props.students[ this.state.studentId ].github ){
            student.github = this.state.github;
        }
        student.id = this.state.studentId;
        this.props.editStudent( student, this.props.uid );
        this.props.history.push( "/" );
    };
    
    generateLink = () => {
        this.props.generateStudentLink( this.state.studentId, this.props.uid );
    };
    
    render(){
        return ( <Container fluid>
            <Row>
                <Col className="cover cover-3 stay" md={ 6 }/>
                <Col md={ 6 } className="text-center align-self-center">
                    { this.state.loaded ? ( <>
                        <Link to="/">
                            <Button className="my-3">Back</Button>
                        </Link>
                        <Form onSubmit={ this.onSubmit }>
                            <Input
                                id={ "firstName" }
                                name={ "firstName" }
                                value={ this.state.firstName }
                                type={ "text" }
                                placeholder={ "First Name" }
                                onChange={ this.onChange }
                                className="mb-2"
                            />
                            <Input
                                id={ "lastName" }
                                name={ "lastName" }
                                value={ this.state.lastName }
                                type={ "text" }
                                placeholder={ "Last Name" }
                                onChange={ this.onChange }
                                className="mb-2"
                            />
                            <Input
                                id={ "github" }
                                name={ "github" }
                                value={ this.state.github }
                                type={ "text" }
                                placeholder={ "Github" }
                                onChange={ this.onChange }
                                className="mb-2"
                            />
                            { }
                            { this.props.students[ this.state.studentId ].link &&
                            <Link
                                to={ `/student/reports/${ this.props.students[ this.state.studentId ].link }` }>
                                <h6>Link: { this.props.students[ this.state.studentId ].link }</h6>
                            </Link> }
                            <Button onClick={ this.generateLink }>Generate
                                Link</Button>
                            <Button type={ "submit" } color="primary"
                                    outline>
                                Submit
                            </Button>
                        </Form>
                    </> ) : ( <>
                        <Link to="/">
                            <Button className="my-3">Back</Button>
                        </Link>
                        <Form onSubmit={ this.submitForm }>
                            <Skeleton count={ 3 } height={ 38 }/>
                            <Skeleton height={ 38 } width={ 75 }/>
                        </Form>
                    </> ) }
                </Col>
            </Row>
        </Container> );
    }
}

const mpts = state => ( {
    students: state.students.students, uid: state.auth.uid,
} );

export default connect( mpts,
    { editStudent, generateStudentLink },
)(
    Student );
