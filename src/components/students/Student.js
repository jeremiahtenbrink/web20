import React from "react";
import PropTypes from "prop-types";
import "./student.scss";
import { Link } from "react-router-dom";

const Student = ( { student, index } ) => {
    return ( <tr key={ student.id }>
        <th scope="row">{ index + 1 }</th>
        <td><Link
            to={ `/student/${ student.id }` }>{ student.firstName }</Link>
        </td>
        <td><Link
            to={ `/student/${ student.id }` }>{ student.lastName }</Link>
        </td>
        <td>{ student.github }</td>
    </tr> );
};

Student.propTypes = {
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    removeStudent: PropTypes.func,
    github: PropTypes.string
};

export default Student;
