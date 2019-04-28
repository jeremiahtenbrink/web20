import React, { Component } from "react";
import AttendanceStudent from "./AttendanceStudent";
import { Form, Input } from "reactstrap";
import { connect } from "react-redux";
import { getStudents } from "../../actions";

class AttendanceReport extends Component{
    
    state = {
        students: this.props.students, isGettingStudents: false
    };
    
    componentWillUpdate( nextProps, nextState, nextContext ){
        if( nextProps.uid && !nextState.isGettingStudents &&
            !nextProps.students && !nextState.attemptedLoad ){
            this.props.getStudents( nextProps.uid );
            this.setState( { isGettingStudents: true, attemptedLoad: true } );
        }else if( nextProps.students && nextState.isGettingStudents ){
            
            let keys = Object.keys( nextProps.students );
            for( let i = 0; i < keys.length; i++ ){
                nextProps.students[ keys[ i ] ].isPresent = true;
            }
            this.setState( {
                students: nextProps.students, isGettingStudents: false
            } );
        }
    }
    
    notesChange = e => {
        this.setState( { notes: e.target.value.trim() } );
    };
    
    onChange = id => {
        this.setState( state => {
            
            let student = { ...state.students[ id ] };
            student.isPresent = !state.students[ id ].isPresent;
            state.students[ id ] = student;
            return { students: { ...state.students } };
        } );
    };
    
    getAttendanceLink = () => {
        
        let url = "https://airtable.com/shrEawWXvMldYbm5Q?prefill_Project+Manager=Jeremiah%20Tenbrink%20(WEB20)&prefill_Section=WEB20&prefill_Present+Students=";
        if( this.state.present ){
            let keys = Object.keys( this.state.present );
            for( let i = 0; i < keys.length; i++ ){
                if( i > 0 ){
                    url += ",";
                }
                url += `${ this.state.present[ keys[ i ] ].firstName }%20${ this.state.present[ keys[ i ] ].lastName }`;
            }
        }
        
        if( typeof ( this.state.notHere ) === "object" ){
            let notHereKeys = Object.keys( this.state.notHere );
            if( notHereKeys.length > 0 ){
                url += "&prefill_Absent+Students=";
                for( let j = 0; j < this.state.notHere.keys().length; j++ ){
                    if( j > 0 ){
                        url += ",";
                    }
                    url += `${ this.state.notHere[ notHereKeys[ j ] ].firstName }%20${ this.state.notHere[ notHereKeys[ j ] ].lastName }`;
                }
            }
        }
        
        if( this.state.notes !== "" ){
            let notes = encodeURI( this.state.notes );
            url += `&prefill_Notes=${ notes }`;
        }
        
        return url;
        
    };
    
    render(){
        
        console.log( this.state.notHere );
        return ( <div className={ "attendance-report" }>
            
            { this.state.students &&
            Object.values( this.state.students ).map( student => {
                return <AttendanceStudent lastName={ student.lastName }
                                          firstName={ student.firstName }
                                          id={ student.id }
                                          onChange={ this.onChange }
                                          present={ student.isPresent }/>;
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

const mpts = state => ( {
    students: state.students.students, uid: state.auth.user
} );

export default connect( mpts, { getStudents } )( AttendanceReport );