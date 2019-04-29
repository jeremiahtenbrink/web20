import React from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Jumbotron,
  Container,
} from 'reactstrap';
import Button from 'reactstrap/es/Button';
import {connect} from 'react-redux';
import {logout} from '../actions';
import {Link} from 'react-router-dom';

class Header extends React.Component {
  state = {
    isOpen: false,
  };

  render() {
    return (
      <div className="mt-3 mx-3">
        <Jumbotron>
          <h1 className="display-3">PM Dashboard</h1>
          <p className="lead">Welcome to the Lambda PM Dashboard</p>
          <hr className="my-2" />
          <p className="text-danger">
            Remember to always use the full name of students as they appear on
            Airtable.
          </p>
          <p className="lead">
            <Link to={'/students'} className="mr-3">
              <Button color="warning">Manage Students</Button>
            </Link>
            <Link to={'/user'} className="mr-3">
              <Button color="info">Profile</Button>
            </Link>
            <Button color="danger" onClick={this.props.logout}>
              Logout
            </Button>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

Header.propTypes = {};

export default connect(
  undefined,
  {logout},
)(Header);
