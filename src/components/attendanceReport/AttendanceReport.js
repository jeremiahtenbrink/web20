import React, { Component } from "react";
import AttendanceStudent from "./AttendanceStudent";
import { Form, Input } from "reactstrap";
import { connect } from "react-redux";

class AttendanceReport extends Component{
    
    state = {
        students: this.props.students, loaded: false, notes: ""
    };
    
    componentWillUpdate( nextProps, nextState, nextContext ){
        
        if( nextProps.students && !nextState.loaded ){
            
            let keys = Object.keys( nextProps.students );
            for( let i = 0; i < keys.length; i++ ){
                nextProps.students[ keys[ i ] ].isPresent = true;
            }
            this.setState( {
                students: nextProps.students, loaded: true,
            } );
        }
    }
    
    notesChange = e => {
        this.setState( { notes: e.target.value } );
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
        if( this.props.user ){
            let url = `https://airtable.com/shrEawWXvMldYbm5Q?prefill_Project+Manager=${ this.props.user.firstName }+${ this.props.user.lastName }+(${ this.props.user.cohort })&prefill_Section=WEB20&prefill_Present+Students=`;
            if( this.state.students ){
                let keys = Object.keys( this.state.students );
                let notPresentString = "&prefill_Absent+Students";
                if( keys.length > 0 ){
                    let afterFirstIsPresent = false;
                    let afterFirstNotPresent = false;
                    for( let i = 0; i < keys.length; i++ ){
                        if( this.state.students[ keys[ i ] ].isPresent ){
                            if( afterFirstIsPresent ){
                                url += ",";
                            }
                            url += `${ this.state.students[ keys[ i ] ].firstName }+${ this.state.students[ keys[ i ] ].lastName }`;
                            if( !afterFirstIsPresent ){
                                afterFirstIsPresent = true;
                            }
                        }else{
                            if( afterFirstNotPresent ){
                                notPresentString += ",";
                            }
                            notPresentString += `${ this.state.students[ keys[ i ] ].firstName }+${ this.state.students[ keys[ i ] ].lastName }`;
                            if( !afterFirstNotPresent ){
                                afterFirstNotPresent = true;
                            }
                        }
                    }
                    
                    if( notPresentString !== "&prefill_Absent+Students" ){
                        url += notPresentString;
                    }
                }
            }
            
            if( this.state.notes !== "" ){
                let notes = encodeURI( this.state.notes );
                url += `&prefill_Notes=${ notes }`;
            }
            
            return url;
        }
        
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
    students: state.students.students,
    uid: state.auth.uid,
    user: state.auth.user,
} );

export default connect( mpts, {} )( AttendanceReport );