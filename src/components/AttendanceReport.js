import React, { Component } from "react";
import AttendanceStudent from "./AttendanceStudent";
import { Form, Input } from "reactstrap";

class AttendanceReport extends Component{
    
    state = {
        present: [], notHere: [], notes: "",
    };
    
    componentDidMount(){
        this.setState( {
            present: JSON.parse( localStorage.getItem( "web20_students" ) )
        } );
    }
    
    notesChange = e => {
        this.setState( { notes: e.target.value.trim() } );
    };
    
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
    
    getAttendanceLink = () => {
        
        let url = "https://airtable.com/shrEawWXvMldYbm5Q?prefill_Project+Manager=Jeremiah%20Tenbrink%20(WEB20)&prefill_Section=WEB20&prefill_Present+Students=";
        for( let i = 0; i < this.state.present.length; i++ ){
            if( i > 0 ){
                url += ",";
            }
            url += `${ this.state.present[ i ].firstName }%20${ this.state.present[ i ].lastName }`;
        }
        
        if( this.state.notHere.length > 0 ){
            url += "&prefill_Absent+Students=";
            for( let j = 0; j < this.state.notHere.length; j++ ){
                if( j > 0 ){
                    url += ",";
                }
                url += `${ this.state.notHere[ j ].firstName }%20${ this.state.notHere[ j ].lastName }`;
            }
        }
        
        if( this.state.notes !== "" ){
            let notes = encodeURI( this.state.notes );
            url += `&prefill_Notes=${ notes }`;
        }
        
        return url;
        
    };
    
    render(){
        return ( <div className={ "attendance-report" }>
            { this.state.notHere.map( student => {
                return <AttendanceStudent lastName={ student.lastName }
                                          firstName={ student.firstName }
                                          onChange={ this.onChangePresent }
                                          id={ student.id }
                                          present={ false }/>;
            } ) }
            { this.state.present.map( student => {
                return <AttendanceStudent lastName={ student.lastName }
                                          firstName={ student.firstName }
                                          id={ student.id }
                                          onChange={ this.onChangeNotPresent }
                                          present={ true }/>;
            } ) }
            
            <Form>
                <Input type={ "textarea" } name={ "notes" }
                       onChange={ this.notesChange }/>
            </Form>
            
            <a className={ "attendance-link" }
               href={ this.getAttendanceLink() }>{ this.getAttendanceLink() }</a>
        </div> );
    }
}

export default AttendanceReport;