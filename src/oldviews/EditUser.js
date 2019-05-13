import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Container,
} from 'reactstrap';
import {editUser} from '../actions';
import {Link} from 'react-router-dom';

import Skeleton from 'react-loading-skeleton';

class EditUser extends Component {
  state = {
    firstName: '',
    lastName: '',
    cohort: '',
    loaded: false,
  };

  componentDidMount() {
    
    if (this.props.user) {
      this.setState({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        cohort: this.props.user.cohort,
        loaded: true,
      });
    }
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (nextProps.user && !nextState.loaded) {
      this.setState({
        firstName: nextProps.user.firstName,
        lastName: nextProps.user.lastName,
        cohort: nextProps.user.cohort,
        loaded: true,
      });
    }
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  submitForm = e => {
    e.preventDefault();
    let user = {};
    if (this.state.firstName !== this.props.user.firstName) {
      user.firstName = this.state.firstName;
    }

    if (this.state.lastName !== this.props.user.lastName) {
      user.lastName = this.state.lastName;
    }

    if (this.state.cohort !== this.props.user.cohort) {
      user.cohort = this.state.cohort;
    }
    user.id = this.props.uid;
    this.props.editUser(user);
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col className="cover cover-3 stay" md={6} />
          <Col md={6} className="text-center align-self-center">
            {this.state.loaded ? (
              <>
                <Link to="/">
                  <Button className="my-3">Back</Button>
                </Link>
                <Form onSubmit={this.submitForm}>
                  <Input
                    id={'firstName'}
                    name={'firstName'}
                    value={this.state.firstName}
                    type={'text'}
                    placeholder={'First Name'}
                    onChange={this.onChange}
                    className="mb-2"
                  />
                  <Input
                    id={'lastName'}
                    name={'lastName'}
                    value={this.state.lastName}
                    type={'text'}
                    placeholder={'Last Name'}
                    onChange={this.onChange}
                    className="mb-2"
                  />
                  <Input
                    id={'cohort'}
                    name={'cohort'}
                    value={this.state.cohort}
                    type={'text'}
                    placeholder={'cohort'}
                    onChange={this.onChange}
                    className="mb-2"
                  />
                  <Button type={'submit'} color="primary" outline>
                    Submit
                  </Button>
                </Form>
              </>
            ) : (
              <>
                <Link to="/">
                  <Button className="my-3">Back</Button>
                </Link>
                <Form onSubmit={this.submitForm}>
                <Skeleton count={3} height={38} />
                <Skeleton height={38} width={75} />
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mpts = state => ({
  user: state.auth.user,
  uid: state.auth.uid,
});

export default connect(
  mpts,
  {editUser},
)(EditUser);
