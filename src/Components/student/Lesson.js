import React from "react";
import PropTypes from "prop-types";
import { Checkbox, Col } from "antd";
import { connect } from "react-redux";

const Lesson = props => {
    debugger;
    
    let checked = false;
    if( props.studentLessons[ props.lesson.id ] &&
        props.studentLessons[ props.lesson.id ].completed ){
        checked = true;
    }
    
    return ( <div className={ "inline" }>
        
        <Col sm={ 24 } md={ 1 } offset={ 2 }>
            <div className={ "inline align-right" }>
                <Checkbox
                    checked={ checked }
                    onChange={ () => props.completedLesson( props.lesson ) }
                />
            </div>
        </Col>
        <Col sm={ 24 } md={ 21 }>
            <h3 className={ "mg-left-md" }>{ props.lesson.name }</h3>
        </Col>
    
    </div> );
};

Lesson.propTypes = {};

const mstp = state => ( {
    studentLessons: state.students.selectedStudentLessons,
} );

export default connect( mstp )( Lesson );