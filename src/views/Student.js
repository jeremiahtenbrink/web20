import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { editStudent } from "../actions";

class Student extends Component{
    state = {
        loaded: false, studentId: "", firstName: "", lastName: "", github: "",
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
    
    render(){
        return ( <div>
            <Form onSubmit={ this.onSubmit }>
                <FormGroup>
                    <Label for={ "firstName" }>First Name</Label>
                    <Input id={ "firstName" } value={ this.state.firstName }
                           name={ "firstName" } onChange={ this.onChange }/>
                </FormGroup>
                <FormGroup>
                    <Label for={ "lastName" }>Last Name</Label>
                    <Input id={ "lastName" } value={ this.state.lastName }
                           name={ "lastName" } onChange={ this.onChange }/>
                </FormGroup>
                <FormGroup>
                    <Label for={ "github" }>Github</Label>
                    <Input id={ "github" } value={ this.state.github }
                           name={ "github" } onChange={ this.onChange }/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div> );
    }
}

const mpts = state => ( {
    students: state.students.students, uid: state.auth.uid
} );

export default connect( mpts, { editStudent } )( Student );