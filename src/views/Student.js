import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  Container,
} from 'reactstrap';
import {editStudent} from '../actions';
import {Link} from 'react-router-dom';

class Student extends Component {
  state = {
    loaded: false,
    studentId: '',
    firstName: '',
    lastName: '',
    github: '',
  };

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (nextProps.students && !nextState.loaded && nextState.studentId) {
      const {firstName, lastName, github} = nextProps.students[
        nextState.studentId
      ];
      this.setState({firstName, lastName, github, loaded: true});
    }
  }

  componentDidMount() {
    this.setState({studentId: this.props.match.params.id});
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  onSubmit = e => {
    e.preventDefault();
    let student = {};

    if (
      this.state.firstName !==
      this.props.students[this.state.studentId].firstName
    ) {
      student.firstName = this.state.firstName;
    }

    if (
      this.state.lastName !== this.props.students[this.state.studentId].lastName
    ) {
      student.lastName = this.state.lastName;
    }

    if (
      this.state.github !== this.props.students[this.state.studentId].github
    ) {
      student.github = this.state.github;
    }
    student.id = this.state.studentId;
    this.props.editStudent(student, this.props.uid);
    this.props.history.push('/');
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col className="cover cover-3 stay" md={6} />
          <Col md={6} className="text-center align-self-center">
            <Link to="/">
              <Button className="my-3">Back</Button>
            </Link>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for={'firstName'}>First Name</Label>
                <Input
                  id={'firstName'}
                  value={this.state.firstName}
                  name={'firstName'}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for={'lastName'}>Last Name</Label>
                <Input
                  id={'lastName'}
                  value={this.state.lastName}
                  name={'lastName'}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for={'github'}>Github</Label>
                <Input
                  id={'github'}
                  value={this.state.github}
                  name={'github'}
                  onChange={this.onChange}
                />
              </FormGroup>
              <Button color="primary">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mpts = state => ({
  students: state.students.students,
  uid: state.auth.uid,
});

export default connect(
  mpts,
  {editStudent},
)(Student);
