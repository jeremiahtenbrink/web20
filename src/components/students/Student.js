import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import "./student.scss";
import { delStudent } from "../../actions";
import { connect } from "react-redux";

const Student = ({student, index}) => {
  return (
    <tr key={student.id}>
      <th scope="row">{index + 1}</th>
      <td>{student.firstName}</td>
      <td>{student.lastName}</td>
      <td>{student.github}</td>
    </tr>
  );
};

Student.propTypes = {
  id: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  removeStudent: PropTypes.func,
  github: PropTypes.string
};

export default Student;
