import React from "react";

import { addStudent} from '../actions'

import { Container, Row, Col, Input, Button, Spinner } from "reactstrap";

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
    return (
      <Container fluid>
        <Row className="cover">
          <Col xs="6" className="cover-img-2" />
          <Col xs="6" className="text-center align-self-center">
            <form action={this.addHandler}>
              <Input type="text" placeholder="Student Full Name" name="name" value={this.state.addStudent.name} onChange={this.inputHandler} /><br/>
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
  uid: auth.user
});

export default connect(
  mapStateToProps,
  { addStudent }
)(AddStudents);
