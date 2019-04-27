import React from "react";

import { addStudent, getStudents } from "../actions";

import { Container, Row, Col, Input, Button, Table, Spinner } from "reactstrap";

import { connect } from "react-redux";

import "./getstarted.css";

class AddStudents extends React.Component {
  state = {
    students: {},
    addStudent: {
      name: "",
      githubUsername: "",
      notes: ""
    }
  };

  componentDidMount() {
    // this.props.getStudents(this.props.uid);
    console.log(this.props.uid);
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
    if (this.props.user) {
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
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </Table>
              <hr />
              <form onSubmit={this.addHandler}>
                <Input
                  type="text"
                  placeholder="Student Full Name"
                  name="name"
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
    } else {
      this.props.history.push("/start");
    }
  }
}

const mapStateToProps = ({ students, auth }) => ({
  isLoading: students.isLoading,
  user: auth.user,
});

export default connect(
  mapStateToProps,
  { addStudent, getStudents }
)(AddStudents);
