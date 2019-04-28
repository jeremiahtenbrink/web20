import React from "react";
import Student from "./Student";
import PropTypes from "prop-types";

const Students = props => {
    return ( <>
        <h1>Students</h1>
        { props.students && Object.values( props.students ).map( student => {
            return ( <Student
                key={ student.id }
                id={ student.id }
                removeStudent={ props.removeStudent }
                firstName={ student.firstName }
                lastName={ student.lastName }
                github={ student.github }
            /> );
        } ) }
    </> );
};

export default Students;
