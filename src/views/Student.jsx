import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Row, Modal, Icon, Table, Select } from "antd";
import {
    editStudent, getStudentLessons, completeStudentLesson, changeSelectedSprint,
    changeSelectedStudent, subscribe, unsubscribe, subscribeToPms,
    subscribeToSprints, subscribeToStudents, subscribeToCourses
} from "../actions";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Sprint from "../components/student/Sprint";

class Student extends Component{
    state = {
        changingSelectedStudent: false,
        populatedLessonsWithStudentLessons: false,
        populatingLessonsInit: false,
        subscribedToStudents: false,
        lessons: [],
        loaded: false,
        course: "",
        id: "",
        firstName: "",
        lastName: "",
        github: "",
        link: "",
        pm: "",
        modalOpen: false,
    };
    
    componentDidMount(){
        if( this.props.uid ){
            this.props.subscribe( "Students",
                this.props.subscribeToStudents( this.props.uid )
            );
            
            this.setState( { subscribedToStudents: true } );
        }
        this.props.subscribe( "Sprints", this.props.subscribeToSprints() );
        this.props.subscribe( "Pms", this.props.subscribeToPms() );
        this.props.subscribe( "Courses", this.props.subscribeToCourses() );
        if( Object.values( this.props.students ).length > 0 ){
            this.setState( { changingSelectedStudent: true } );
            this.props.changeSelectedStudent( this.props.match.params.id );
        }
    }
    
    componentWillUnmount(){
        this.props.unsubscribe( "Students" );
        this.props.unsubscribe( "Pms" );
        this.props.unsubscribe( "Sprints" );
        this.props.unsubscribe( "Courses" );
    }
    
    componentDidUpdate( prevProps, prevState, snapshot ){
        if( this.props.uid && !this.state.subscribedToStudents ){
            this.props.subscribe( "Students",
                this.props.subscribeToStudents( this.props.uid )
            );
        }
        // check if selected student is there and if not then change the
        // selected student to the correct student by id.
        if( !this.state.changingSelectedStudent &&
            Object.values( this.props.students ).length > 0 &&
            !this.props.selectedStudent ){
            this.setState( { changingSelectedStudent: true } );
            this.props.changeSelectedStudent( this.props.match.params.id );
        }
        
        // check if we have a selected student and if so change the
        // changingSelectedStudent state back to false and get the students
        // lessons from db.
        if( this.state.changingSelectedStudent && this.props.selectedStudent ){
            this.setStudentInfo( this.props.selectedStudent );
            this.props.getStudentLessons( this.props.selectedStudent,
                this.props.uid
            );
        }
    }
    
    setStudentInfo = ( student = this.props.selectedStudent ) => {
        debugger;
        this.setState( {
            modalOpen: false,
            changingSelectedStudent: false,
            firstName: student.firstName,
            lastName: student.lastName,
            github: student.github,
            loaded: true,
            pm: student.pm,
            course: student.course,
            id: student.id,
        } );
    };
    
    onChange = e => {
        this.setState( { [ e.target.name ]: e.target.value } );
    };
    
    cancelEdit = () => {
        this.setStudentInfo();
    };
    
    updateStudentSubmit = e => {
        debugger;
        let student = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            link: this.state.link,
            github: this.state.github,
            id: this.state.id,
            course: this.state.course,
            pm: this.state.pm,
        };
        this.props.editStudent( student );
        this.setState( { modalOpen: false } );
    };
    
    changeSelect = ( value, name ) => {
        this.setState( { [ name ]: value } );
    };
    
    completeLesson = lesson => {
        let studentLesson = {
            id: lesson.id, completed: true, completedDate: new Date(),
        };
        let student = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            id: this.state.studentId,
            github: this.state.github,
            link: this.state.link,
        };
        this.props.completeStudentLesson( student,
            this.props.uid,
            studentLesson
        );
    };
    
    render(){
        return (
            
            <div style={ { maxWidth: "800px", margin: "30px auto" } }>
                { this.state.loaded ?
                    
                    /// ------------------------------------------------------
                    // Display this when loaded. ------------------------------
                    /// ------------------------------------------------------
                    
                    ( <>
                        <div className={ "inline" }>
                            <Link to="/">
                                <Button type={ "primary" } size={ "large" }>
                                    Back
                                </Button>
                            </Link>
                            
                            {   /// ------------------------------------------------------
                                // EditUser Button.----------------------------
                                // ------------------------------------------------------
                            }
                            
                            <Button
                                size={ "large" }
                                className={ "mg-left-sm" }
                                onClick={ () => this.setState( { modalOpen: true } ) }>
                                Edit User
                            </Button>
                            <h1 className={ "mg-left-lg" }>
                                { this.props.selectedStudent.firstName }{ " " }
                                { this.props.selectedStudent.lastName }
                            </h1>
                        </div>
                        <h3>PM: <span
                            className={ "mg-left-sm" }>{ this.state.pm &&
                        this.props.pms[ this.state.pm ] &&
                        `${ this.props.pms[ this.state.pm ].firstName } ${ this.props.pms[ this.state.pm ].lastName }` }</span>
                        </h3>
                        <div className={ "mg-top-lg" }>
                            <h3>
                                Github Handle:{ " " }
                                { this.props.selectedStudent.github ?
                                    this.props.selectedStudent.github : "" }
                            </h3>
                        </div>
                        
                        <div className={ "mg-top-lg" }>
                            <h3>
                                Link:{ " " }
                                <span className={ "mg-left-lg" }>
                  { this.props.selectedStudent.id ?
                      this.props.selectedStudent.id : "" }
                </span>
                            </h3>
                        </div>
                        
                        {   /// ------------------------------------------------------
                            // Lessons --------------------------------------
                            // ------------------------------------------------------
                        }
                        
                        <div style={ { backgroundColor: "white" } }>
                            { Object.values( this.props.sprints )
                                .sort( ( a, b ) => a.week - b.week )
                                .map( sprint => {
                                    return <Sprint key={ sprint.id }
                                                   sprint={ sprint }/>;
                                } ) }
                        </div>
                        
                        {   /// ------------------------------------------------------
                            // EditUser Modal -------------------------------
                            // ------------------------------------------------------
                        }
                        
                        <Modal
                            title={ `Update Student` }
                            visible={ this.state.modalOpen }
                            okText={ "Update Student" }
                            onOk={ this.updateStudentSubmit }
                            onCancel={ () => this.cancelEdit() }>
                            <Row type="flex" gutter={ 24 }>
                                <Form onSubmit={ this.onSubmit }>
                                    
                                    <Form.Item label={ "Project Manager" }>
                                        <Select
                                            showSearch
                                            style={ { width: 200 } }
                                            placeholder="PM"
                                            optionFilterProp="children"
                                            onChange={ ( value ) => {
                                                
                                                this.changeSelect( value,
                                                    "pm"
                                                );
                                            } }
                                            value={ this.state.pm }
                                            filterOption={ ( input,
                                                option ) => option.props.children.toLowerCase()
                                                .indexOf( input.toLowerCase() ) >=
                                                0 }
                                        >
                                            { this.props.pms &&
                                            Object.values( this.props.pms )
                                                .map( pm => {
                                                    
                                                    return <Select.Option
                                                        key={ pm.id }
                                                        value={ pm.id }>{ `${ pm.firstName } ${ pm.lastName }` }</Select.Option>;
                                                } ) }
                                        </Select>
                                    </Form.Item>
                                    
                                    <Form.Item label={ "First Name" }>
                                        <Input
                                            id={ "firstName" }
                                            name={ "firstName" }
                                            value={ this.state.firstName }
                                            placeholder={ "First Name" }
                                            onChange={ this.onChange }
                                        />
                                    </Form.Item>
                                    <Form.Item label={ "Last Name" }>
                                        <Input
                                            id={ "lastName" }
                                            name={ "lastName" }
                                            value={ this.state.lastName }
                                            placeholder={ "Last Name" }
                                            onChange={ this.onChange }
                                        />
                                    </Form.Item>
                                    <Form.Item label={ "Github Handle" }>
                                        <Input
                                            id={ "github" }
                                            name={ "github" }
                                            value={ this.state.github }
                                            placeholder={ "Github" }
                                            onChange={ this.onChange }
                                        />
                                    </Form.Item>
                                    
                                    <Form.Item label={ "Course" }>
                                        <Select
                                            showSearch
                                            style={ { width: 200 } }
                                            placeholder="Course"
                                            optionFilterProp="children"
                                            onChange={ ( value ) => {
                                                
                                                this.changeSelect( value,
                                                    "course"
                                                );
                                            } }
                                            value={ this.state.course }
                                            filterOption={ ( input,
                                                option ) => option.props.children.toLowerCase()
                                                .indexOf( input.toLowerCase() ) >=
                                                0 }
                                        >
                                            { this.props.courses &&
                                            Object.values( this.props.courses )
                                                .map( course => {
                                                    
                                                    return <Select.Option
                                                        key={ course.id }
                                                        value={ course.id }>{ course.courseName }</Select.Option>;
                                                } ) }
                                        </Select>
                                    </Form.Item>
                                </Form>
                            </Row>
                        </Modal>
                    </> ) : ( <>
                        
                        
                        {   /// ------------------------------------------------------
                            // DO THIS IF NOT LOADED -----------------------
                            // ------------------------------------------------------
                        }
                        
                        <Link to="/">
                            <Button className="my-3">Back</Button>
                        </Link>
                        
                        <Form onSubmit={ this.submitForm }>
                            <Skeleton count={ 3 } height={ 38 }/>
                            <Skeleton height={ 38 } width={ 75 }/>
                        </Form>
                    </> ) }
            </div> );
    }
}

const mstp = state => ( {
    students: state.students.students,
    uid: state.auth.uid,
    selectedStudent: state.students.selectedStudent,
    selectedStudentLessons: state.students.selectedStudentLessons,
    sprints: state.sprints.sprints,
    fetchingStudentLessons: state.students.fetchingStudentLessons,
    lessons: state.sprints.lessons,
    studentLessonsLoaded: state.students.studentLessonsLoaded,
    lessonsLoaded: state.sprints.lessonsLoaded,
    pms: state.autoFill.pms,
    courses: state.autoFill.courses,
} );

export default connect( mstp, {
    editStudent,
    getStudentLessons,
    completeStudentLesson,
    changeSelectedSprint,
    changeSelectedStudent,
    subscribeToPms,
    subscribe,
    unsubscribe,
    subscribeToStudents,
    subscribeToSprints,
    subscribeToCourses,
}, )( Student );
