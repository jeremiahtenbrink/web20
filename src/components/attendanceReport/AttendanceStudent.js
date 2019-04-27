import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Row, Col, Label, Input } from "reactstrap";

const AttendanceStudent = props => {
    return ( <Row>
        <Col md={ 4 }>
            <div className={ "attendance-student-names" }>
                <h5>{ props.firstName }</h5>
                <h5>{ props.lastName }</h5>
            </div>
        </Col>
        <Col md={ 2 } className={ "flex-start" }>
            <FormGroup check>
                <Label check/>
                <Input checked={ props.present }
                       type={ "checkbox" }
                       onClick={ () => props.onChange( props.id ) }
                />
                Present
            </FormGroup>
        </Col>
        <Col md={ 2 }>
            <FormGroup check>
                <Label check/>
                <Input
                    checked={ !props.present }
                    type={ "checkbox" }
                    onClick={ () => props.onChange( props.id ) }
                />{ " " }
                Not Present
            </FormGroup>
        </Col>
    </Row> );
};

AttendanceStudent.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    present: PropTypes.bool
};

export default AttendanceStudent;