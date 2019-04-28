import React from "react";

import { addStudent, getStudents } from "../actions";

import { Container, Row, Col, Input, Button, Table, Spinner } from "reactstrap";

import { connect } from "react-redux";

import Skeleton from "react-loading-skeleton";

import "./getstarted.css";

class AddStudents extends React.Component {
  state = {
    students: {},
    addStudent: {
      firstName: '',
      lastName: "",
      githubUsername: "",
      notes: ""
    }
  };

  componentDidMount() {
    //this.props.getStudents(this.props.uid);
    //console.log(this.props.uid);
  }

  componentDidUpdate() {
    if(this.props.uid && this.props.isLoading){
      this.props.getStudents(this.props.uid)
      console.log(this.props.uid)
    }
  }

  addHandler = e => {};

  inputHandler = e => {
    this.setState({
      addStudent: {
        ...this.state.addStudent,
        [e.target.name]: e.target.value
      }
    });
  };

  render() {
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
    return (
      <Container fluid>
        <Row className="cover">
          <Col xs="6" className="cover-img-2" />
          <Col xs="6" className="text-center align-self-center ">
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
                    </tr>
                  </>
                ) : (
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <hr />
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
              <br/>
              <Input
                type="text"
                placeholder="Github"
                name="github"
                value={this.state.addStudent.name}
                onChange={this.inputHandler}
              />
              <br />
              <Button color="primary">Add Student</Button>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ students, auth }) => ({
  isLoading: students.isLoading,
  uid: auth.user,
  students: students.students,
});

export default connect(
  mapStateToProps,
  { addStudent, getStudents }
)(AddStudents);
