import React from "react";
import { connect } from "react-redux";
import { getStudents } from "../actions";
import Header from "../components/Header";
import {
  Col,
  Container,
  Row,
  Spinner,
  Card,
  Button,
  CardTitle,
  CardText
} from "reactstrap";
import StudentInfo from "../components/students/StudentInfo";
import Students from "../components/students/Students";
import "./dashboard.scss";

class Dashboard extends React.Component {
  state = {
    isGettingStudents: false,
    attemptedLoad: false
  };

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (
      nextProps.uid &&
      !nextState.isGettingStudents &&
      !nextProps.students &&
      !nextState.attemptedLoad
    ) {
      this.props.getStudents(nextProps.uid);
      this.setState({ isGettingStudents: true, attemptedLoad: true });
    } else if (nextProps.students && nextState.isGettingStudents) {
      this.setState({ isGettingStudents: false });
    }
  }

  render() {
    return (
      <div>
        {this.state.isGettingStudents ? (
          <Container fluid>
            <Row className="cover">
              <Col xs="6" className="text-center align-self-center">
                <Spinner type="grow" color="primary" />
                <h6>Loading...</h6>
              </Col>
              <Col xs="6" className="cover-img" />
            </Row>
          </Container>
        ) : (
          <Container fluid>
            <Row>
              <Col className="cover cover-3 stay" md={6} />
              <Col md={6} className="text-center overflow-scroll">
                <Header />
                <Row className="mb-3">
                  <Col>
                    <Card
                      body
                      inverse
                      style={{ backgroundColor: "#333", borderColor: "#333" }}
                    >
                      <CardTitle>Special Title Treatment</CardTitle>
                      <CardText>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </CardText>
                    </Card>
                  </Col>
                  <Col>
                    <Card body inverse color="primary">
                      <CardTitle>Special Title Treatment</CardTitle>
                      <CardText>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </CardText>
                    </Card>
                  </Col>
                </Row>
                <Students students={this.props.students} />
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  students: state.students.students,
  uid: state.auth.user
});

export default connect(
  mapStateToProps,
  { getStudents }
)(Dashboard);
