import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Icon, Row, Checkbox } from "antd";
import { getLessons, completeStudentLesson } from "../../actions";
import { connect } from "react-redux";
import "./sprint.scss";
import Lesson from "./Lesson";
import { ISprint } from "../../types/SprintInterface";
import { ILesson } from "../../types/LessonInterface";
import { IStudent } from "../../types/StudentInterface";
import { IStudentLesson } from "../../types/StudentLessonsInterface";

interface IState {
    sprint: ISprint;
    open: boolean;
}

class Sprint extends Component<IProps, IState> {
    constructor( props ) {
        super( props );
        this.state = {
            sprint: this.props.sprint, open: false,
        };
    }
    
    swapOpen = () => {
        
        this.setState( state => ( {
            open: !state.open
        } ) );
    };
    
    completeLesson = ( lesson: ISprint | IStudentLesson = this.state.sprint ) => {
        
        lesson.completed = true;
        if ( this.props.selectedStudentLessons &&
            this.props.selectedStudentLessons[ lesson.id ] &&
            this.props.selectedStudentLessons[ lesson.id ].completed ) {
            lesson = this.props.selectedStudentLessons[ lesson.id ];
            lesson.completed = !lesson.completed;
        }
        this.props.completeStudentLesson( this.props.selectedStudent, lesson );
    };
    
    render() {
        let className = "student__sprint inline center-vert mg-top-sm";
        if ( this.props.selectedStudentLessons &&
            this.props.selectedStudentLessons[ this.state.sprint.id ] &&
            this.props.selectedStudentLessons[ this.state.sprint.id ].completed ) {
            className += " background-light-green";
        }
        return ( <>
            <div
                className={ className }
                key={ this.state.sprint.id }>
                { this.state.open ? <Icon type={ "caret-down" }
                                          onClick={ this.swapOpen }/> :
                    <Icon type={ "caret-right" }
                          onClick={ this.swapOpen }/> }
                <h2 className={ "mg-left-md" }>{ this.props.sprint.name }</h2>
            
            </div>
            { this.state.open && <Row className={ "inline" }>
                <Row className={ "mg-left-lg" }>
                    <Checkbox onClick={ e => this.completeLesson() }
                              checked={ this.props.selectedStudentLessons[ this.state.sprint.id ] &&
                              this.props.selectedStudentLessons[ this.state.sprint.id ].completed }>Sprint
                        Complete</Checkbox>
                </Row>
                
                <Col sm={ 24 } md={ 1 } offset={ 2 }>
                    <h4>Complete</h4>
                </Col>
                <Col sm={ 24 } md={ 18 } offset={ 1 }>
                    <h4 className={ "mg-left-lg" }>Lesson Name</h4>
                </Col>
            </Row> }
            { this.state.open && this.props.lessons[ this.state.sprint.id ] &&
            Object.values( this.props.lessons[ this.state.sprint.id ] )
                .sort( ( a, b ) => a.order - b.order )
                .map( lesson => {
                    return <Lesson lesson={ lesson } key={ lesson.id }
                                   completedLesson={ this.completeLesson }/>;
                } ) }
        </> );
    }
}

const mstp = state => ( {
    lessons: state.sprints.lessons,
    selectedStudent: state.students.selectedStudent,
    selectedStudentLessons: state.students.selectedStudentLessons,
} );

interface IProps {
    lessons: { [ id: string ]: ILesson };
    selectedStudent: IStudent;
    selectedStudentLessons: { [ id: string ]: ISprint | IStudentLesson };
    sprint: ISprint;
    getLessons: typeof getLessons;
    completeStudentLesson: typeof completeStudentLesson;
}

export default connect( mstp, { getLessons, completeStudentLesson } )( Sprint );