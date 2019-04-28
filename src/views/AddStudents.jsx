import React from "react";

import { addStudent, getStudents, delStudent } from "../actions";

import { Container, Row, Col, Input, Button, Table, Spinner } from "reactstrap";

import { connect } from "react-redux";

import Skeleton from "react-loading-skeleton";

import "./getstarted.css";
import { Link } from "react-router-dom";


class AddStudents extends React.Component {
  state = {
    addStudent: {
      firstName: "",
      lastName: "",
      github: '',
    }
  };

  addHandler = e => {
    e.preventDefault();
    this.props.addStudent({
      student: this.state.addStudent,
      id: this.props.uid
    });
    this.setState({
      addStudent: {
        firstName: "",
        lastName: "",
        github: '',
      }
    });
  };

  inputHandler = e => {
    this.setState({
      addStudent: {
        ...this.state.addStudent,
        [e.target.name]: e.target.value
      }
    });
  };

  render() {
    return (
      <Container fluid>
        <Row className="cover">
          <Col xs="6" className="cover-img-2" />
          <Col xs="6" className="text-center overflow-scroll">
          <Link to="/"><Button color="secondary" className="mt-3">Back</Button></Link>
            <h2>Students</h2>
            <Table bordered className="form">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Github</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.props.isLoading ? (
                  <>
                    <tr>
                      <th scope="row">
                        <Skeleton />
                      </th>
                      <td>
                        <Skeleton />
                      </td>
                      <td>
                        <Skeleton />
                      </td>
                      <td>
                        <Skeleton />
                      </td>
                      <td>
                        <Skeleton />
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    {Object.values(this.props.students).map(
                      (student, index) => (
                        <tr key={student.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{student.firstName}</td>
                          <td>{student.lastName}</td>
                          <td>{student.github}</td>
                          <td><Button color='danger' onClick={() => this.props.delStudent(student.id, this.props.uid)}>Delete</Button></td>
                        </tr>
                      )
                    )}
                  </>
                )}
              </tbody>
            </Table>
            <hr />
            {this.props.isAdding ? (
              <>
                <Row>
                  <Col>
                    <Skeleton />
                  </Col>
                  <Col>
                    <Skeleton />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Skeleton />
                  </Col>
                </Row>
              </>
            ) : (
              <form onSubmit={this.addHandler}>
                <Row>
                  <Col>
                    <Input
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={this.state.addStudent.name}
                      onChange={this.inputHandler}
                    />
                  </Col>
                  <Col>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={this.state.addStudent.name}
                      onChange={this.inputHandler}
                    />
                  </Col>
                </Row>
                <br />
                <Input
                  type="text"
                  placeholder="Github"
                  name="github"
                  value={this.state.addStudent.name}
                  onChange={this.inputHandler}
                />
                <br />
                <Button color="primary" className="mb-5" type="submit">
                  Add Student
                </Button>
              </form>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ students, auth }) => ({
  isLoading: students.isLoading,
  uid: auth.uid,
  students: students.students,
  isAdding: students.isAdding
});

export default connect(
  mapStateToProps,
  { addStudent, getStudents, delStudent }
)(AddStudents);
