import React from "react";

import { addStudent, getStudents } from "../actions";

import { Container, Row, Col, Input, Button, Table, Spinner } from "reactstrap";

import { connect } from "react-redux";

import Skeleton from "react-loading-skeleton";

import "./getstarted.css";
import Header from "../components/Header";

class AddStudents extends React.Component{
    state = {
        addStudent: {
            firstName: "", lastName: "", githubUsername: "", notes: ""
        }
    };
    
    addHandler = e => {
        e.preventDefault();
        this.props.addStudent( {
            student: this.state.addStudent, id: this.props.uid
        } );
        this.setState( {
            addStudent: {
                firstName: "", lastName: "", githubUsername: "", notes: ""
            }
        } );
    };
    
    inputHandler = e => {
        this.setState( {
            addStudent: {
                ...this.state.addStudent, [ e.target.name ]: e.target.value
            }
        } );
    };
    
    render(){
        // if (false) {
        //   return (
        //     <Container fluid>
        //       <Row className="cover">
        //         <Col xs="6" className="cover-img-2" />
        //         <Col xs="6" className="text-center align-self-center">
        //           <Spinner type="grow" color="primary" />
        //           <h6>Loading...</h6>
        //         </Col>
        //       </Row>
        //     </Container>
        //   );
        // }
        // if(this.props.uid && !this.props.students && this.props.isLoading) {
        //   //this.props.getStudents(this.props.uid)
        //   console.log(this.props.uid)
        // }
        return ( <Container fluid>
            <Row className="cover">
                <Col xs="6" className="cover-img-2"/>
                <Col xs="6" className="text-center overflow-scroll">
                    <Header/>
                    <h2>Students</h2>
                    <Table bordered className="form">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Github</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.props.isLoading ? ( <>
                            <tr>
                                <th scope="row">
                                    <Skeleton/>
                                </th>
                                <td>
                                    <Skeleton/>
                                </td>
                                <td>
                                    <Skeleton/>
                                </td>
                                <td>
                                    <Skeleton/>
                                </td>
                            </tr>
                        </> ) : ( <>
                            { Object.values( this.props.students ).
                                map( ( student, index ) => (
                                    <tr key={ student.id }>
                                        <th scope="row">{ index + 1 }</th>
                                        <td>{ student.firstName }</td>
                                        <td>{ student.lastName }</td>
                                        <td>{ student.github }</td>
                                    </tr> ) ) }
                        </> ) }
                        </tbody>
                    </Table>
                    <hr/>
                    { this.props.isAdding ? ( <>
                        <Row>
                            <Col>
                                <Skeleton/>
                            </Col>
                            <Col>
                                <Skeleton/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Skeleton/>
                            </Col>
                        </Row>
                    </> ) : ( <form onSubmit={ this.addHandler }>
                        <Row>
                            <Col>
                                <Input
                                    type="text"
                                    placeholder="First Name"
                                    name="firstName"
                                    value={ this.state.addStudent.name }
                                    onChange={ this.inputHandler }
                                />
                            </Col>
                            <Col>
                                <Input
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastName"
                                    value={ this.state.addStudent.name }
                                    onChange={ this.inputHandler }
                                />
                            </Col>
                        </Row>
                        <br/>
                        <Input
                            type="text"
                            placeholder="Github"
                            name="github"
                            value={ this.state.addStudent.name }
                            onChange={ this.inputHandler }
                        />
                        <br/>
                        <Button color="primary" type="submit">
                            Add Student
                        </Button>
                    </form> ) }
                </Col>
            </Row>
        </Container> );
    }
}

const mapStateToProps = ( { students, auth } ) => ( {
    isLoading: students.isLoading,
    uid: auth.uid,
    students: students.students,
    isAdding: students.isAdding
} );

export default connect( mapStateToProps,
    { addStudent, getStudents }
)(
    AddStudents );
