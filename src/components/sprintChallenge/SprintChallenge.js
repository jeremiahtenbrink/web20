import React, { Component } from "react";
import AttendanceStudent from "../attendanceReport/AttendanceStudent";
import { Form, Input } from "reactstrap";

class AttendanceReport extends Component{
    
    state = {
        students: [],
        studentSubmission: "",
        threeWordsByPm: "",
        sprintRating: 2,
        great: "",
        requestedImprovements: "",
        questions: "",
        generalNotes: "",
        technical: null,
        collaboration: null,
        drive: null,
        teachability: null,
        other: ""
    };
    
    componentDidMount(){
        this.setState( {
            students: JSON.parse( localStorage.getItem( "web20_students" ) )
        } );
    }
    
    getReportLink = () => {
        
        let url = "https://airtable.com/shr6wexWV3RM4ITJP?prefill_Project+Manager=Jeremiah%20Tenbrink%20(WEB20)";
        
        if( this.state.studentSubmission !== "" ){
            url += `&prefill_Student+Submission=${ encodeURI( this.state.studentSubmission ) }%20(Introduction to User Interface and Git)`;
        }
        
        if( this.state.threeWordsByPm !== "" ){
            url += `&prefill_3+Words+by+PM=${ encodeURI( this.state.threeWordsByPm ) }`;
        }
        
        if( this.state.sprintRating !== "" ){
            url += `&prefill_Sprint+Challenge+Rating=${ encodeURI( this.state.sprintRating ) }`;
        }
        
        return url;
        
    };
    
    onChange = e => {
        debugger;
        this.setState( { [ e.target.name ]: e.target.value } );
    };
    
    render(){
        return ( <div className={ "attendance-report" }>
            <h1>Sprint Challenge</h1>
            <Form>
                <Input type={ "select" } value={ this.state.studentSubmission }
                       placeHolder={ "Select your student." }
                       onChange={ this.onChange }
                       name={ "studentSubmission" }
                >
                    { this.state.students.map( student => {
                        return (
                            <option>{ `${ student.firstName } ${ student.lastName }` }</option> );
                    } ) }
                </Input>
                <Input type={ "text" } value={ this.state.threeWordsByPm }
                       placeHolder={ "Describe the student in three words." }
                       onChange={ this.onChange }
                       name={ "threeWordsByPm" }
                />
                <Input type={ "select" }
                       placeHolder={ "Sprint Rating" }
                       onChange={ this.onChange }
                       name={ "sprintRating" }
                       value={ this.state.sprintRating }
                >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </Input>
            </Form>
            <a className={ "attendance-link" }
               href={ this.getReportLink() }>{ this.getReportLink() }</a>
        </div> );
    }
}

export default AttendanceReport;