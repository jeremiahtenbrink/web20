import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";

const Student = props => {
    return ( <div>
        <Col md={ 6 } className={ "student" }>
            <h5 className={ "student-link" }>
                <Link
                    to={ `/student/${ props.id }` }>
                    { ` ${ props.firstName } ${ props.lastName } ` }
                </Link>
            </h5>
            <h5>{ props.github }</h5>
            <h5 className={ "remove-student" }
                onClick={ props.removeStudent }>del</h5>
        </Col>
    </div> );
};

Student.propTypes = {
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    removeStudent: PropTypes.func,
    github: PropTypes.string,
};

export default Student;