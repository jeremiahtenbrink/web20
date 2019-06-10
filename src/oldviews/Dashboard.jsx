import React from "react";
import { connect } from "react-redux";
import { subscribeToStudents } from "../actions";
import Header from "../oldcomponents/Header";
import {
    Col, Container, Row, Spinner, Card, Button, CardTitle, CardText,
} from "reactstrap";
import Students from "../oldcomponents/students/Students";
import { Link } from "react-router-dom";

class Dashboard extends React.Component{
    state = {
        isGettingStudents: false, attemptedLoad: false,
    };
    
    componentWillUpdate( nextProps, nextState, nextContext ){
        if( nextProps.uid && !nextState.isGettingStudents &&
            !nextProps.students && !nextState.attemptedLoad ){
            this.props.getStudents( nextProps.uid );
            this.setState( { isGettingStudents: true, attemptedLoad: true } );
        }else if( nextProps.students && nextState.isGettingStudents ){
            this.setState( { isGettingStudents: false } );
        }
    }
    
    render(){
        return ( <>
            { this.state.isGettingStudents ? ( <Container fluid>
                <Row className="cover">
                    <Col xs="6" className="cover-img"/>
                    <Col xs="6"
                         className="text-center align-self-center">
                        <Spinner type="grow" color="primary"/>
                        <h6>Loading...</h6>
                    </Col>
                </Row>
            </Container> ) : ( <Container fluid>
                <Row>
                    <Col className="cover cover-3 stay" md={ 6 }/>
                    <Col md={ 6 }
                         className="text-center overflow-scroll">
                        <Header/>
                        <Row className="mb-3">
                            <Col>
                                <Card
                                    body
                                    inverse
                                    style={ {
                                        backgroundColor: "#333",
                                        borderColor: "#333"
                                    } }>
                                    <CardTitle>Attendance
                                        Report</CardTitle>
                                    <CardText>
                                        Please make sure to take
                                        attendance every class day at
                                        the start of class, including
                                        Sprint Challenge days, and
                                        for PT "A" week Mondays.
                                    </CardText>
                                    <Link to="/attendance">
                                        <Button>Take Attendance</Button>
                                    </Link>
                                </Card>
                            </Col>
                            <Col>
                                <Card body inverse color="primary">
                                    <CardTitle>Daily Standup</CardTitle>
                                    <CardText>
                                        Please make sure to take
                                        attendance every class day at
                                        the end of class. Make sure to
                                        leave feedback for the
                                        instructor.
                                    </CardText>
                                    <Link to="/standup">
                                        <Button>Standup Report</Button>
                                    </Link>
                                </Card>
                            </Col>
                            <Col>
                                <Card body inverse color="success">
                                    <CardTitle>Weekly Sprint Review</CardTitle>
                                    <CardText>
                                        At the end of the week please submit a
                                        sprint review
                                        for each one of your students. Each
                                        student must have
                                        a sprint retrospective submitted via
                                        airtable.
                                    </CardText>
                                    <Link to="/sprint">
                                        <Button>Sprint Review</Button>
                                    </Link>
                                </Card>
                            </Col>
                        </Row>
                        <Students students={ this.props.students }/>
                    </Col>
                </Row>
            </Container> ) }
        </> );
    }
}

const mapStateToProps = state => ( {
    students: state.students.students, uid: state.auth.uid,
} );

export default connect( mapStateToProps, { getStudents: subscribeToStudents }, )( Dashboard );
