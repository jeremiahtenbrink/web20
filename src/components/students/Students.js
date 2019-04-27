import React from "react";
import Student from "./Student";
import PropTypes from "prop-types";

const Students = props => {
    return ( <>
        <h1>Students</h1>
        { props.students.map( student => {
            return ( <Student
                id={ student.id }
                removeStudent={ props.removeStudent }
                firstName={ student.firstName }
                lastName={ student.lastName }
                github={ student.github }/> );
        } ) }
    </> );
};

Students.propTypes = {
    students: PropTypes.arrayOf( {
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        id: PropTypes.string
    } ), removeStudent: PropTypes.func,
};

export default Students;