import React, {Component} from 'react';
import {connect} from 'react-redux';
import AttendanceStudent from '../oldcomponents/attendanceReport/AttendanceStudent';
import {Typeahead} from 'react-bootstrap-typeahead';
import {
  Container,
  Row,
  Form,
  Col,
  Input,
  Button,
  Table,
  Label,
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {getSections, getInstructors} from '../actions';

class DailyStandup extends Component {
  state = {
    students: null,
    loaded: false,
    module: [],
    wentWell: '',
    concerns: '',
    instructor: '',
    instructionRating: 3,
    instructorFeedback: '',
    flexTa: '',
    flexTaRating: 3,
    flexTaFeedback: '',
    other: '',
  };

  componentDidMount() {
    if (this.props.students && !this.state.loaded) {
      let keys = Object.keys(this.props.students);
      for (let i = 0; i < keys.length; i++) {
        this.props.students[keys[i]].isPresent = true;
      }
      this.setState({
        students: this.props.students,
        loaded: true,
      });
    }

    this.props.getSections();
    this.props.getInstructors();
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (nextProps.students && !nextState.loaded) {
      let keys = Object.keys(nextProps.students);
      for (let i = 0; i < keys.length; i++) {
        nextProps.students[keys[i]].isPresent = true;
      }
      this.setState({
        students: nextProps.students,
        loaded: true,
      });
    }
  }

  changePresent = id => {
    this.setState(state => {
      let student = {...state.students[id]};
      student.isPresent = !state.students[id].isPresent;
      state.students[id] = student;
      return {students: {...state.students}};
    });
  };

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  getReportLink = () => {
    if (this.props.user) {
      let url = `https://airtable.com/shripCmauVlvxNrAT?prefill_Project+Manager=${
        this.props.user.firstName
      }+${this.props.user.lastName}+(${
        this.props.user.cohort
      })&prefill_Sections=${this.props.user.cohort}`;

      if (this.state.module !== '') {
        url += `&prefill_Module=${encodeURI(this.state.module[0])}`;
      }

      if (this.state.students) {
        let afterFirst = false;
        let keys = Object.keys(this.state.students);
        let absentString = '&prefill_Students+(Absent)=';
        for (let i = 0; i < keys.length; i++) {
          if (!this.state.students[keys[i]].isPresent) {
            if (afterFirst) {
              absentString += ',';
            }
            absentString += `${this.state.students[
              keys[i]
            ].firstName.trim()}+${this.state.students[
              keys[i]
            ].lastName.trim()}`;
            if (!afterFirst) {
              afterFirst = true;
            }
          }
        }

        if (absentString !== '&prefill_Absent+Students=') {
          url += absentString;
        }
      }

      if (this.state.wentWell !== '') {
        url += `&prefill_What+went+well=${encodeURI(this.state.wentWell)}`;
      }

      if (this.state.concerns !== '') {
        url += `&prefill_Concerns=${encodeURI(this.state.concerns)}`;
      }

      if (this.state.instructor !== '') {
        url += `&prefill_Instructor=${encodeURI(this.state.instructor)}`;
      }

      if (this.state.instructionRating) {
        url += `&prefill_Instruction+Rating=${this.state.instructionRating}`;
      }

      if (this.state.instructorFeedback !== '') {
        url += `&prefill_Instruction+Feedback=${encodeURI(
          this.state.instructorFeedback,
        )}`;
      }

      if (this.state.flexTa !== '') {
        url += `&prefill_Who+was+the+Flex+TA?=${encodeURI(this.state.flexTa)}`;
      }

      if (this.state.flexTaRating) {
        url += `&prefill_Flex+TA+Rating=${this.state.flexTaRating}`;
      }

      if (this.state.flexTaFeedback !== '') {
        url += `&prefill_Flex+TA+Feedback=${encodeURI(
          this.state.flexTaFeedback,
        )}`;
      }

      if (this.state.other !== '') {
        url += `&prefill_Other=${encodeURI(this.state.other)}`;
      }

      return url;
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col className="cover cover-3 stay" md={6} />
          <Col md={6} className="text-center overflow-scroll">
            <Link to="/">
              <Button className="my-3">Back</Button>
            </Link>
            <Table bordered>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {this.state.students &&
                  Object.values(this.state.students).map(student => {
                    return (
                      <AttendanceStudent
                        student={student}
                        onChange={this.changePresent}
                        present={student.isPresent}
                        key={student.id}
                      />
                    );
                  })}
              </tbody>
            </Table>
            <Form>
              <Typeahead
                id="what-did-your-students-study"
                onChange={selected => {
                  this.setState({
                    module: selected,
                  });
                }}
                placeholder="What did your students study today?"
                selected={this.state.module}
                options={this.props.lessons}
                highlightOnlyResult={false}
              />
              <br />
              <Input
                type={'textarea'}
                value={this.state.wentWell}
                placeholder={'What went well today?'}
                onChange={this.onChange}
                name={'wentWell'}
              />
              <br />
              <Input
                type={'textarea'}
                value={this.state.concerns}
                placeholder={
                  'What could have gone better and how will you help?'
                }
                onChange={this.onChange}
                name={'concerns'}
              />
              <br />
              <Typeahead
                id={'instructor-name'}
                onChange={instructor => {
                  this.setState({
                    instructor: instructor,
                  });
                }}
                placeholder="Who was your instructor?"
                selected={this.state.instructor}
                options={this.props.instructors}
                highlightOnlyResult={false}
              />
              <br />
              <Label for={'instructionRating'}>
                How would you rate the instructor?
              </Label>
              <Input
                id={'instructionRating'}
                type={'select'}
                name={'instructionRating'}
                value={this.state.instructionRating}
                onChange={this.onChange}>
                <option value={1}>1 - Did not meet expectations</option>
                <option value={2}>2 - Met expectations</option>
                <option value={3}>3 - Exceeded expectations</option>
              </Input>
              <br />
              <Input
                type={'textarea'}
                value={this.state.instructorFeedback}
                placeholder={'Any feedback for the instructor?'}
                onChange={this.onChange}
                name={'instructorFeedback'}
              />
              <br />
              {/* <Input
                         type={'text'}
                         value={this.state.flexTa}
                         placeholder={'Who was the flex TA?'}
                         onChange={this.onChange}
                         name={'flexTa'}
                         />
                         <br /> */}
              {/* <Label for={"flexTaRating"}>Flex Ta Guided Project Rating</Label>
                         <p>
                         <ul>
                         <li>1 - Did not meet expectations</li>
                         <li>2 - Met expectations</li>
                         <li>3 - Exceeded expectations</li>
                         </ul>
                         </p>
                         <Input
                         id={"flexTaRating"}
                         type={"select"}
                         value={this.state.flexTaRating}
                         name={"flexTaRating"}
                         onChange={this.onChange}
                         >
                         <option>1</option>
                         <option>2</option>
                         <option>3</option>
                         </Input><br />
                         <Input
                         type={"text"}
                         value={this.state.flexTaFeedback}
                         placeHolder={"Feedback for the Flex TA?"}
                         onChange={this.onChange}
                         name={"flexTaFeedback"}
                         /><br />
                         <Input
                         type={"textArea"}
                         value={this.state.other}
                         placeHolder={"Anything else we should know about?"}
                         onChange={this.onChange}
                         name={"other"}
                         /> */}
            </Form>
            <a
              className="btn btn-success mb-3"
              target="_blank"
              href={this.getReportLink()}>
              Submit Standup
            </a>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mpts = state => ({
  students: state.students.students,
  user: state.auth.user,
  lessons: state.autoFill.lessons,
  instructors: state.autoFill.instructors,
});

export default connect(
  mpts,
  {getSections, getInstructors},
)(DailyStandup);
