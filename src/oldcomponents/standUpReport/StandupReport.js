import React, { Component } from "react";
import { Form, Input } from "reactstrap";

class AttendanceReport extends Component{
    state = {
        present: [],
        notHere: [],
        module: "",
        wentWell: "",
        concerns: "",
        instructor: "",
        instructorFeedback: "",
        flexTa: "",
        flexTaFeedback: "",
        other: ""
    };
    
    componentDidMount(){
        this.setState( {
            present: JSON.parse( localStorage.getItem( "web20_students" ) )
        } );
    }
    
    onChangePresent = id => {
        this.setState( state => {
            let studentToChange = {};
            const notHere = state.notHere.filter( student => {
                if( student.id === id ){
                    studentToChange = { ...student };
                    return false;
                }
                return true;
            } );
            const present = [ ...state.present, studentToChange ];
            return { present, notHere };
        } );
    };
    
    onChangeNotPresent = id => {
        this.setState( state => {
            let studentToChange = {};
            const present = state.present.filter( student => {
                if( student.id === id ){
                    studentToChange = student;
                    return false;
                }
                return true;
            } );
            const notHere = [ ...state.notHere, studentToChange ];
            return {
                present, notHere
            };
        } );
    };
    
    getReportLink = () => {
        let url = "https://airtable.com/shripCmauVlvxNrAT?prefill_Project+Manager=Jeremiah%20Tenbrink%20(WEB20)&prefill_Sections=WEB20";
        
        if( this.state.module !== "" ){
            url += `&prefill_Module=${ encodeURI( this.state.module ) }`;
        }
        
        if( this.state.notHere.length > 0 ){
            url += "&prefill_Students%20(Absent)=";
            for( let j = 0; j < this.state.notHere.length; j++ ){
                if( j > 0 ){
                    url += ",";
                }
                url += `${ this.state.notHere[ j ].firstName }%20${ this.state.notHere[ j ].lastName }`;
            }
        }
        
        if( this.state.wentWell !== "" ){
            url += `&prefill_What+went+well=${ encodeURI( this.state.wentWell ) }`;
        }
        
        if( this.state.concerns !== "" ){
            url += `&prefill_Concerns=${ encodeURI( this.state.concerns ) }`;
        }
        
        if( this.state.instructor !== "" ){
            url += `&prefill_Instructor=${ encodeURI( this.state.instructor ) }`;
        }
        
        if( this.state.instructorFeedback !== "" ){
            url += `&prefill_Instruction+Feedback=${ encodeURI( this.state.instructorFeedback ) }`;
        }
        
        if( this.state.flexTa !== "" ){
            url += `&prefill_Who+was+the+Flex+TA?=${ encodeURI( this.state.flexTa ) }`;
        }
        
        if( this.state.flexTaFeedback !== "" ){
            url += `&prefill_Flex+TA+Feedback=${ encodeURI( this.state.flexTaFeedback ) }`;
        }
        
        if( this.state.other !== "" ){
            url += `&prefill_Other=${ encodeURI( this.state.other ) }`;
        }
        
        return url;
    };
    
    onChange = e => {
        this.setState( { [ e.target.name ]: e.target.value } );
    };
    
    render(){
        return ( <div className={ "attendance-report" }>
            <Form>
                <Input
                    type={ "text" }
                    value={ this.state.module }
                    placeHolder={ "What did your students study today?" }
                    onChange={ this.onChange }
                    name={ "module" }
                />
                <Input
                    type={ "textarea" }
                    value={ this.state.wentWell }
                    placeHolder={ "What went well today?" }
                    onChange={ this.onChange }
                    name={ "wentWell" }
                />
                <Input
                    type={ "textarea" }
                    value={ this.state.concerns }
                    placeHolder={ "What could have gone better and how will you help?" }
                    onChange={ this.onChange }
                    name={ "concerns" }
                />
                <Input
                    type={ "text" }
                    value={ this.state.instructor }
                    placeHolder={ "Who taught today?" }
                    onChange={ this.onChange }
                    name={ "instructor" }
                />
                <Input
                    type={ "textarea" }
                    value={ this.state.instructorFeedback }
                    placeHolder={ "Any feedback for the instructor?" }
                    onChange={ this.onChange }
                    name={ "instructorFeedback" }
                />
                <Input
                    type={ "text" }
                    value={ this.state.flexTa }
                    placeHolder={ "Who was the flex TA?" }
                    onChange={ this.onChange }
                    name={ "flexTa" }
                />
                <Input
                    type={ "text" }
                    value={ this.state.flexTaFeedback }
                    placeHolder={ "Feedback for the Flex TA?" }
                    onChange={ this.onChange }
                    name={ "flexTaFeedback" }
                />
                <Input
                    type={ "textArea" }
                    value={ this.state.other }
                    placeHolder={ "Anything else we should know about?" }
                    onChange={ this.onChange }
                    name={ "other" }
                />
            </Form>
            <a className={ "attendance-link" }
               href={ this.getReportLink() }>
                { this.getReportLink() }
            </a>
        </div> );
    }
}

export default AttendanceReport;
