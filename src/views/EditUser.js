import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { editUser } from "../actions";

class EditUser extends Component {
  state = {
    firstName: "",
    lastName: "",
    cohort: "",
    loaded: false
  };

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (nextProps.user && !nextState.loaded) {
      this.setState({
        firstName: nextProps.user.firstName,
        lastName: nextProps.user.lastName,
        cohort: nextProps.user.cohort,
        loaded: true
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
      <div>
        <Form onSubmit={this.submitForm}>
          <FormGroup>
            <Label for={"firstName"}>First Name</Label>
            <Input
              id={"firstName"}
              name={"firstName"}
              value={this.state.firstName}
              type={"text"}
              placeHolder={"..."}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for={"lastName"}>Last Name</Label>
            <Input
              id={"lastName"}
              name={"lastName"}
              value={this.state.lastName}
              type={"text"}
              placeHolder={"..."}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for={"cohort"}>Cohort</Label>
            <Input
              id={"cohort"}
              name={"cohort"}
              value={this.state.cohort}
              type={"text"}
              placeHolder={"..."}
              onChange={this.onChange}
            />
          </FormGroup>
          <Button type={"submit"}>Submit</Button>
        </Form>
      </div>
    );
  }
}

const mpts = state => ({
  user: state.auth.user,
  uid: state.auth.uid
});

export default connect(
  mpts,
  { editUser }
)(EditUser);
