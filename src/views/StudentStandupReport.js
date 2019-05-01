import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import { getStudentsInfo } from "../actions/studentFormActions";

class StudentStandupReport extends Component{
    state = {
        student: "",
        module: "",
        pairProgramming: false,
        projectLink: "",
        prRating: 2,
        selfRating: 2,
        finished: "",
        needToFinish: "",
        blockers: "",
        other: "",
    };
    
    componentDidMount(){
        let id = this.props.match.params.id;
        this.props.getStudentsInfo( id );
    }
    
    onChange = e => {
        this.setState( { [ e.target.name ]: e.target.value } );
    };
    
    onCheckChange = e => {
        this.setState( { [ e.target.name ]: e.target.checked } );
    };
    
    render(){
        return ( <div>
            <Form>
                <FormGroup>
                    <Label>Student</Label>
                    <Input type={ "text" } name={ "student" }
                           value={ this.state.student }
                           onChange={ this.onChange }/>
                </FormGroup>
                <FormGroup>
                    <Label>Today Lesson</Label>
                    <Input type={ "text" } name={ "module" }
                           value={ this.state.module }
                           onChange={ this.onChange }/>
                </FormGroup>
                <FormGroup>
                    <Label>Did you pair program?</Label>
                    <Input type={ "checkbox" } name={ "pairProgramming" }
                           checked={ this.state.pairProgramming }
                           onChange={ this.onCheckChange }/>
                </FormGroup>
                <FormGroup>
                    <Label>Project link</Label>
                    <Input type={ "text" } name={ "projectLink" }
                           value={ this.state.projectLink }
                           onChange={ this.onChange }/>
                </FormGroup>
                <FormGroup>
                    <Label>PR rating</Label>
                    <Input type={ "selection" } name={ "prRating" }
                           value={ this.state.prRating }
                           onChange={ this.onChange }>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Self Rating</Label>
                    <Input type={ "selection" } name={ "selfRating" }
                           value={ this.state.selfRating }
                           onChange={ this.onChange }>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>What did you finish today?</Label>
                    <Input type={ "textarea" } name={ "finished" }
                           value={ this.state.finished }
                           onChange={ this.onChange }/>
                </FormGroup>
                <FormGroup>
                    <Label>What do you need to finish before tomorrow?</Label>
                    <Input type={ "textarea" } name={ "needToFinish" }
                           value={ this.state.needToFinish }
                           onChange={ this.onChange }/>
                </FormGroup>
                <FormGroup>
                    <Label>What blockers do you have?</Label>
                    <Input type={ "textarea" } name={ "blockers" }
                           value={ this.state.blockers }
                           onChange={ this.onChange }/>
                </FormGroup>
                <FormGroup>
                    <Label>Any thing else we should know about?</Label>
                    <Input type={ "textarea" } name={ "other" }
                           value={ this.state.other }
                           onChange={ this.onChange }/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div> );
    }
}

const mpts = state => ( {
    student: state.studentForm.student,
} );

export default connect( mpts, { getStudentsInfo } )( StudentStandupReport );