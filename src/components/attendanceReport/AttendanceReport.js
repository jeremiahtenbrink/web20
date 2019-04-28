import React, { Component } from "react";
import AttendanceStudent from "./AttendanceStudent";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Form,
  Col,
  Input,
  Button,
  Table,
  Spinner
} from "reactstrap";

import { Link } from "react-router-dom";


class AttendanceReport extends Component {
  state = {
    students: this.props.students,
    loaded: false,
    notes: ""
  };

  componentDidMount() {
    if (this.props.students && !this.state.loaded) {
      let keys = Object.keys(this.props.students);
      for (let i = 0; i < keys.length; i++) {
        this.props.students[keys[i]].isPresent = true;
      }
      this.setState({
        students: this.props.students,
        loaded: true
      });
    }
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    
    if (nextProps.students && !nextState.loaded) {
      let keys = Object.keys(nextProps.students);
      for (let i = 0; i < keys.length; i++) {
        nextProps.students[keys[i]].isPresent = true;
      }
      this.setState({
        students: nextProps.students,
        loaded: true
      });
    }
  }

  notesChange = e => {
    this.setState({ notes: e.target.value });
  };

  onChange = id => {
    this.setState(state => {
      let student = { ...state.students[id] };
      student.isPresent = !state.students[id].isPresent;
      state.students[id] = student;
      return { students: { ...state.students } };
    });
  };

  getAttendanceLink = () => {
    if (this.props.user) {
      let url = `https://airtable.com/shrEawWXvMldYbm5Q?prefill_Project+Manager=${this.props.user.firstName.trim()}+${this.props.user.lastName.trim()}+(${
        this.props.user.cohort
      })&prefill_Section=WEB20&prefill_Present+Students=`;
      if (this.state.students) {
        let keys = Object.keys(this.state.students);
        let notPresentString = "&prefill_Absent+Students=";
        if (keys.length > 0) {
          let afterFirstIsPresent = false;
          let afterFirstNotPresent = false;
          for (let i = 0; i < keys.length; i++) {
            if (this.state.students[keys[i]].isPresent) {
              if (afterFirstIsPresent) {
                url += ",";
              }
              url += `${this.state.students[
                keys[i]
              ].firstName.trim()}+${this.state.students[
                keys[i]
              ].lastName.trim()}`;
              if (!afterFirstIsPresent) {
                afterFirstIsPresent = true;
              }
            } else {
              if (afterFirstNotPresent) {
                notPresentString += ",";
              }
              notPresentString += `${this.state.students[
                keys[i]
              ].firstName.trim()}+${this.state.students[
                keys[i]
              ].lastName.trim()}`;
              if (!afterFirstNotPresent) {
                afterFirstNotPresent = true;
              }
            }
          }

          if (notPresentString !== "&prefill_Absent+Students=") {
            url += notPresentString;
          }
        }
      }

      if (this.state.notes !== "") {
        let notes = encodeURI(this.state.notes);
        url += `&prefill_Notes=${notes}`;
      }

      return url;
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col md={6} className="text-center overflow-scroll">
            <Link to="/" ><Button className="my-3">Back</Button></Link>
            <Table bordered>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              {this.state.students &&
                Object.values(this.state.students).map(student => {
                  return (
                    <AttendanceStudent
                      student={student}
                      onChange={this.onChange}
                      present={student.isPresent}
                    />
                  );
                })}
            </Table>
            <Form>
              <Input
                type="text"
                placeholder="Notes"
                name="notes"
                onChange={this.notesChange}
              />
            </Form>
            <a
              className="btn btn-success mt-3"
              target="_blank"
              href={this.getAttendanceLink()}
            >
              Submit Attendance
            </a>
          </Col>
          <Col className="cover cover-3 stay" md={6} />
        </Row>
      </Container>
    );
  }
}

const mpts = state => ({
  students: state.students.students,
  uid: state.auth.uid,
  user: state.auth.user
});

export default connect(
  mpts,
  {}
)(AttendanceReport);
