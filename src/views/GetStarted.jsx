import React from "react";

import { Container, Row, Col, Input, Button, Spinner } from "reactstrap";

import "./getstarted.css";

import { signIn, createUser } from "../actions";

import { connect } from "react-redux";

class GetStart extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    webNumber: ""
  };

  updateHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = () => {
    this.props.createUser({
      uid: this.props.user.uid,
      firstName: this.state.firstName,
      lastName: this.state.webNumber,
      webNumber: "WEB" + this.state.webNumber
    });
  };

  render() {
    if(this.props.user){
      this.props.history.push('/')
    }
    if (this.props.isLoading) {
      return (
        <Container fluid>
          <Row className="cover">
            <Col xs="6" className="text-center align-self-center">
              <Spinner type="grow" color="primary" />
              <h6>Loading...</h6>
            </Col>
            <Col xs="6" className="cover-img" />
          </Row>
        </Container>
      );
    }
    return (
      <Container fluid>
        <Row className="cover">
          <Col xs="6" className="text-center align-self-center">
            {this.props.newUser ? (
              <div className="form">
                <h3>We need more...</h3>
                <p className="text-danger">
                  Use same name as on Airtable including casing
                </p>
                <Input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.updateHandler}
                />
                <br />
                <Input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.updateHandler}
                />
                <br />
                <Row>
                  <Col>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      value="WEB"
                      disabled
                    />
                  </Col>
                  <Col>
                    <Input
                      type="number"
                      placeholder="##"
                      name="webNumber"
                      value={this.state.webNumber}
                      onChange={this.updateHandler}
                    />
                  </Col>
                </Row>
                <br />
                <Button onClick={this.submitHandler}>Get Started</Button>
              </div>
            ) : (
              <>
                <h1>Welcome PM</h1>
                <h6>Login or Signup</h6>
                <Button onClick={this.props.signIn}>Google</Button>
              </>
            )}
          </Col>
          <Col xs="6" className="cover-img" />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  isLoading: auth.isLoading,
  newUser: auth.newUser,
  user: auth.user
});

export default connect(
  mapStateToProps,
  { signIn, createUser }
)(GetStart);
