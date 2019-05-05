import React, { Component } from "react";
import {
    Row, Col, Form, Input, FormGroup, Label, Container, Button
} from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { connect } from "react-redux";

class SprintForm extends Component{
    
    state = {
        sprintChallenge: "",
        student: "",
        threeWords: "",
        sprintChallengeRating: 2,
        reAttempt: false,
        great: "",
        improvements: "",
        questions: "",
        notes: "",
        sprintRating: 2,
        generalRating: 2,
        completedOneOnOne: false,
        postReviewSprintRating: "Select a number or leave blank",
        technicalAbility: 5,
        collaborationAbility: 5,
        drive: 5,
        teachability: 5,
        other: "",
    };
    
    onChange = e => {
        this.setState( { [ e.target.name ]: e.target.value } );
    };
    
    getSubmissionUrl = () => {
        debugger;
        let url = "";
        if( this.props.user ){
            url = `https://airtable.com/shr6wexWV3RM4ITJP?prefill_Project+Manager=${ this.props.user.firstName }+${ this.props.user.lastName }+(${ this.props.user.cohort })`;
        }
        
        if( this.state.student && this.state.sprintChallenge ){
            url += `&prefill_Student+Submission=${ this.state.student[ 0 ].firstName.trim() }+${ this.state.student[ 0 ].lastName.trim() }+(${ this.state.sprintChallenge[ 0 ].trim() })`;
        }
        
        if( this.state.threeWords ){
            url += `&prefill_3+Words+by+PM=${ encodeURI( this.state.threeWords ) }`;
        }
        
        if( this.state.sprintChallengeRating ){
            url += `&prefill_Sprint+Challenge+Rating=${ this.state.sprintChallengeRating }`;
        }
        
        if( this.state.reAttempt ){
            url += `&prefill_Will+Re-Attempt?=true`;
        }else{
            url += `&prefill_Will+Re-Attempt?=false`;
        }
        
        if( this.state.great ){
            url += `&prefill_Great=${ encodeURI( this.state.great ) }`;
        }
        
        if( this.state.improvements ){
            url += `&prefill_Requested+Improvements=${ encodeURI( this.state.improvements ) }`;
        }
        
        if( this.state.questions ){
            url += `&prefill_Questions=${ encodeURI( this.state.questions ) }`;
        }
        
        if( this.state.notes ){
            url += `&prefill_General+Notes=${ encodeURI( this.state.notes ) }`;
        }
        
        if( this.state.sprintRating ){
            url += `&prefill_Sprint+Rating=${ this.state.sprintRating }`;
        }
        
        if( this.state.generalRating ){
            url += `&prefill_General+Rating=${ this.state.generalRating }`;
        }
        
        if( this.state.completedOneOnOne ){
            url += `&prefill_Completed+1:1=true`;
        }else{
            url += `&prefill_Completed+1:1=false`;
        }
        
        if( this.state.postReviewSprintRating !==
            "Select a number or leave blank" ){
            url += `&prefill_Post+Review+Student+Sprint+Rating=${ this.state.postReviewSprintRating }`;
        }
        
        if( this.state.technicalAbility ){
            url += `&prefill_Technical+NPS=${ this.state.technicalAbility }`;
        }
        
        if( this.state.collaborationAbility ){
            url += `&prefill_Collaboration+NPS=${ this.state.collaborationAbility }`;
        }
        
        if( this.state.drive ){
            url += `&prefill_Drive+NPS=${ this.state.drive }`;
        }
        
        if( this.state.teachability ){
            url += `&prefill_Teachability+NPS=${ this.state.teachability }`;
        }
        
        if( this.state.other ){
            url += `&prefill_Other+(Internal)=${ encodeURI( this.state.other ) }`;
        }
        
        return url;
    };
    
    render(){
        return ( <Container fluid>
            <Row>
                <Col className="cover cover-3 stay" md={ 6 }/>
                
                <Col md={ 6 } className="overflow-scroll">
                    <h1 className={ "mb-5 mt-5 text-center" }>Sprint
                        Challenge Report</h1>
                    <Form>
                        <FormGroup>
                            <Label>Sprint</Label>
                            <Typeahead
                                id="sprint"
                                onChange={ selected => {
                                    this.setState( {
                                        sprintChallenge: selected,
                                    } );
                                } }
                                placeholder="Sprint?"
                                selected={ this.state.sprintChallenge }
                                options={ this.props.sprints }
                                highlightOnlyResult={ false }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Student</Label>
                            <Typeahead
                                id="student-submission"
                                onChange={ selected => {
                                    this.setState( {
                                        student: selected,
                                    } );
                                } }
                                placeholder="Student..."
                                selected={ this.state.student }
                                options={ this.props.students }
                                highlightOnlyResult={ false }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Explain the student in 3 words.</Label>
                            <Input type={ "text" }
                                   value={ this.state.threeWords }
                                   onChange={ this.onChange }
                                   name={ "threeWords" }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Sprint challenge rating.
                                <Input type={ "select" }
                                       name={ "sprintChallengeRating" }
                                       value={ this.state.sprintChallengeRating }
                                       onChange={ this.onChange }
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </Input>
                            </Label>
                        </FormGroup>
                        <FormGroup check className={ "mb-3" }>
                            <Label check>
                                <Input
                                    type={ "checkbox" }
                                    checked={ this.state.reAttempt }
                                    onChange={ () => this.setState(
                                        state => ( { reAttempt: !state.reAttempt } ) ) }
                                />{ " " }
                                Student Will Reattempt?
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>What did the student do well?</Label>
                            <Input type={ "textarea" }
                                   rows={ 4 }
                                   placeholder={ "Did well..." }
                                   value={ this.state.great }
                                   onChange={ this.onChange }
                                   name={ "great" }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>What would you like the student to
                                improve?</Label>
                            <Input type={ "textarea" }
                                   rows={ 4 }
                                   placeholder={ "Improve..." }
                                   value={ this.state.improvements }
                                   onChange={ this.onChange }
                                   name={ "improvements" }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>What questions do you have for the
                                student?
                            </Label>
                            <Input type={ "textarea" }
                                   placeholder={ "Questions..." }
                                   value={ this.state.questions }
                                   onChange={ this.onChange }
                                   name={ "questions" }
                                   rows={ 4 }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Anything else you want the student to know?
                            </Label>
                            <Input type={ "textarea" }
                                   placeholder={ "..." }
                                   value={ this.state.notes }
                                   onChange={ this.onChange }
                                   name={ "notes" }
                                   rows={ 4 }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Week long sprint rating?
                                <Input type={ "select" }
                                       value={ this.state.sprintRating }
                                       onChange={ this.onChange }
                                       name={ "sprintRating" }
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </Input>
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>Overall performance and general standing in
                                the class
                                <Input type={ "select" }
                                       value={ this.state.generalRating }
                                       onChange={ this.onChange }
                                       name={ "generalRating" }
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </Input>
                            </Label>
                        </FormGroup>
                        <FormGroup check className={ "mb-3" }>
                            <Label check>
                                <Input
                                    type={ "checkbox" }
                                    checked={ this.state.completedOneOnOne }
                                    onChange={ () => this.setState(
                                        state => ( { completedOneOnOne: !state.completedOneOnOne } ) ) }
                                />{ " " }
                                Completed one on one?
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                Post review sprint rating
                            </Label>
                            <Input type={ "select" }
                                   value={ this.state.postReviewSprintRating }
                                   onChange={ this.onChange }
                                   name={ "postReviewSprintRating" }
                            >
                                <option>Select a number or leave blank</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                Students Technical Ability
                            </Label>
                            <Input type={ "select" }
                                   value={ this.state.technicalAbility }
                                   onChange={ this.onChange }
                                   name={ "technicalAbility" }
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Students Ability to
                                Collaborate{ " " }</Label>
                            <Input type={ "select" }
                                   value={ this.state.collaborationAbility }
                                   onChange={ this.onChange }
                                   name={ "collaborationAbility" }
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            Students Drive{ " " }
                            <Input type={ "select" }
                                   value={ this.state.drive }
                                   onChange={ this.onChange }
                                   name={ "drive" }
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            Students Teachability{ " " }
                            <Input type={ "select" }
                                   value={ this.state.teachability }
                                   onChange={ this.onChange }
                                   name={ "teachability" }
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Internal Notes</Label>
                            <Input type={ "textarea" }
                                   rows={ 4 }
                                   placeholder={ "..." }
                                   value={ this.state.other }
                                   onChange={ this.onChange }
                                   name={ "other" }
                            />
                        </FormGroup>
                    </Form>
                    <div className="d-flex justify-content-center">
                        <a className="btn btn-success mb-5 mt-4"
                           target="_blank"
                           href={ this.getSubmissionUrl() }
                        ><h4>Submit Sprint Retrospect</h4></a>
                    </div>
                
                </Col>
            </Row>
        </Container> );
    }
}

const mstp = state => {
    
    return {
        students: state.students.students,
        user: state.auth.user,
        sprints: state.autoFill.sprints,
    };
};

export default connect( mstp )( SprintForm );