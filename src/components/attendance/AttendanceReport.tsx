import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Row, Col, Button, Table, Form, Input } from "antd";
import { Link } from "react-router-dom";
import {
    subscribe, unsubscribe, subscribeToStudents
} from "../../actions/index";
import { IStudent } from "../../types/StudentInterface";
import { IUser } from "../../types/UserInterface";
import MakeInput from '../MakeInput';

interface IState {
    students: { [ id: string ]: IStudent },
    loaded: boolean,
    notes: string,
    subscribedToStudents: boolean,
}

class AttendanceReport extends Component<IProps, IState> {
    state = {
        students: this.props.students,
        loaded: false,
        notes: "",
        subscribedToStudents: false,
    };
    
    componentDidMount() {
        
        if ( this.props.uid ) {
            this.props.subscribe( 'Students',
                this.props.subscribeToStudents( this.props.uid ) );
            this.setState( { subscribedToStudents: true } );
        }
        if ( this.props.students &&
            Object.values( this.props.students ).length >
            0 && !this.state.loaded ) {
            let keys = Object.keys( this.props.students );
            for ( let i = 0; i < keys.length; i++ ) {
                this.props.students[ keys[ i ] ].isPresent = false;
            }
            this.setState( {
                students: this.props.students, loaded: true,
            } );
        }
    }
    
    componentWillUnmount() {
        this.props.unsubscribe( "Students" );
    }
    
    componentDidUpdate( prevProps, prevState, snapshot ) {
        
        if ( this.props.uid && !this.state.subscribedToStudents ) {
            this.props.subscribe( 'Students',
                this.props.subscribeToStudents( this.props.uid ) );
            this.setState( { subscribedToStudents: true } );
        }
        
        if ( this.props.students &&
            Object.values( this.props.students ).length >
            0 && !this.state.loaded ) {
            let keys = Object.keys( this.props.students );
            
            for ( let i = 0; i < keys.length; i++ ) {
                this.props.students[ keys[ i ] ].isPresent = false;
            }
            this.setState( {
                students: this.props.students, loaded: true,
            } );
        }
    }
    
    notesChange = e => {
        this.setState( { notes: e.target.value } );
    };
    
    onChange = id => {
        
        this.setState( state => {
            state.students[ id ].isPresent = !state.students[ id ].isPresent;
            return { students: { ...state.students } };
        } );
    };
    
    getAttendanceLink = () => {
        if ( this.props.user ) {
            let url = `https://airtable.com/shrEawWXvMldYbm5Q?prefill_Project+Manager=${ this.props.user.firstName.trim() }+${ this.props.user.lastName.trim() }+(${ this.props.user.cohort })&prefill_Section=${ this.props.user.cohort }&prefill_Present+Students=`;
            if ( this.state.students ) {
                let keys = Object.keys( this.state.students );
                let notPresentString = "&prefill_Absent+Students=";
                if ( keys.length > 0 ) {
                    let afterFirstIsPresent = false;
                    let afterFirstNotPresent = false;
                    for ( let i = 0; i < keys.length; i++ ) {
                        if ( this.state.students[ keys[ i ] ].isPresent ) {
                            if ( afterFirstIsPresent ) {
                                url += ",";
                            }
                            url +=
                                `${ this.state.students[ keys[ i ] ].firstName.trim() }+${ this.state.students[ keys[ i ] ].lastName.trim() }`;
                            if ( !afterFirstIsPresent ) {
                                afterFirstIsPresent = true;
                            }
                        } else {
                            if ( afterFirstNotPresent ) {
                                notPresentString += ",";
                            }
                            notPresentString +=
                                `${ this.state.students[ keys[ i ] ].firstName.trim() }+${ this.state.students[ keys[ i ] ].lastName.trim() }`;
                            if ( !afterFirstNotPresent ) {
                                afterFirstNotPresent = true;
                            }
                        }
                    }
                    
                    if ( notPresentString !== "&prefill_Absent+Students=" ) {
                        url += notPresentString;
                    }
                }
            }
            
            if ( this.state.notes !== "" ) {
                let notes = encodeURI( this.state.notes );
                url += `&prefill_Notes=${ notes }`;
            }
            
            return url;
        }
    };
    
    render() {
        
        return ( <div style={ { maxWidth: "800px", margin: "20px auto" } }>
            <Card>
                <Row>
                    <Col span={ 24 }>
                        <h1>Attendance Report</h1>
                        <Link to={ "/" }>
                            <Button>Back</Button>
                        </Link>
                        <Table
                            dataSource={ Object.values( this.state.students ) }
                            style={ { marginTop: "30px" } }
                            bordered
                            rowKey={ "id" }
                            pagination={ false }>
                            <Table.Column
                                title="First Name"
                                dataIndex="firstName"
                                key="firstName"
                            />
                            <Table.Column
                                title="Last Name"
                                dataIndex="lastName"
                                key="lastName"
                            />
                            <Table.Column title="Attendance"
                                          key="attendance"
                                          render={ ( text: string,
                                                     record: IStudent ) => {
                                
                                              return ( <Button.Group
                                                  size={ "large" }>
                                                  <Button
                                                      onClick={ () => this.onChange(
                                                          record.id ) }
                                                      style={ record.isPresent ?
                                                          { backgroundColor: "#91d5ff" } :
                                                          {} }>
                                                      Present
                                                  </Button>
                                                  <Button
                                                      onClick={ () => this.onChange(
                                                          record.id ) }
                                                      type={ "default" }
                                                      style={ !record.isPresent ?
                                                          { backgroundColor: "#fffb8f" } :
                                                          {} }>
                                                      Not Present
                                                  </Button>
                                              </Button.Group> );
                                          } }/>
                        </Table>
                        <Form>
                            <MakeInput title={ "Notes" }
                                       onChange={ this.notesChange }
                                       name={ "notes" } type={ "textarea" }
                                       required={ false }
                                       value={ this.state.notes }
                                       isLoading={ false }
                            />
                        </Form>
                        <Button className="btn btn-success mt-3"
                                target="_blank"
                                type={ "primary" }
                                href={ this.getAttendanceLink() }>
                            Submit Attendance
                        </Button>
                    </Col>
                </Row>
            </Card>
        </div> );
    }
}

const mpts = state => ( {
    students: state.students.students,
    uid: state.auth.uid,
    user: state.auth.user,
} );

interface IProps {
    students: { [ id: string ]: IStudent };
    uid: string;
    user: IUser;
    subscribe: typeof subscribe;
    unsubscribe: typeof unsubscribe;
    subscribeToStudents: typeof subscribeToStudents;
}

export default connect( mpts,
    { subscribe, unsubscribe, subscribeToStudents }
)(
    AttendanceReport );
