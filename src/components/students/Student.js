import React from "react";
import PropTypes from "prop-types";
import "./student.scss";

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
