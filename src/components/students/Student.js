import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import "./student.scss";
import { delStudent } from "../../actions";
import { connect } from "react-redux";

const Student = props => {
    return ( <div>
        <Col md={ 6 } className={ "student" }>
            <h5 className={ "student-link" }>
                <Link to={ `/student/${ props.id }` }>
                    { ` ${ props.firstName } ${ props.lastName } ` }
                </Link>
            </h5>
            <h5>{ props.github }</h5>
            <h5 className={ "remove-student" }
                onClick={ () => props.delStudent( props.id, props.uid ) }>
                del
            </h5>
        </Col>
    </div> );
};

const mapPropsToState = state => ( {
    uid: state.auth.user,
} );
export default connect( mapPropsToState, { delStudent } )( Student );
