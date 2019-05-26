import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Row, Modal, Icon, Table } from "antd";
import {
    editStudent, getStudentLessons, completeStudentLesson, changeSelectedSprint,
    changeSelectedStudent
} from "../actions";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Sprint from "../components/student/Sprint";

class Student extends Component{
    state = {
        changingSelectedStudent: false,
        populatedLessonsWithStudentLessons: false,
        populatingLessonsInit: false,
        lessons: [],
        loaded: false,
        studentId: "",
        firstName: "",
        lastName: "",
        github: "",
        link: "",
        modalOpen: false,
    };
    
    componentWillUpdate( nextProps, nextState, nextContext ){
        
        // check if selected student is there and if not then change the
        // selected student to the correct student by id.
        if( !nextState.changingSelectedStudent && nextProps.students.length >
            0 && !nextProps.selectedStudent ){
            
            this.setState( { changingSelectedStudent: true } );
            this.props.changeSelectedStudent( this.props.match.params.id );
        }
        
        // check if we have a selected student and if so change the
        // changingSelectedStudent state back to false and get the students
        // lessons from db.
        if( nextState.changingSelectedStudent && nextProps.selectedStudent ){
            this.setStudentInfo( nextProps.selectedStudent );
            this.props.getStudentLessons( nextProps.selectedStudent,
                nextProps.uid
            );
        }
        
    }
    
    setStudentInfo = ( student = this.props.selectedStudent ) => {
        
        this.setState( {
            modalOpen: false,
            changingSelectedStudent: false,
            firstName: student.firstName,
            lastName: student.lastName,
            github: student.github,
            link: student.link,
            loaded: true,
        } );
        
    };
    
    componentDidMount(){
        if( this.props.students.length > 0 ){
            this.setState( { changingSelectedStudent: true } );
            this.props.changeSelectedStudent( this.props.match.params.id );
        }
        
    }
    
    onChange = e => {
        this.setState( { [ e.target.name ]: e.target.value } );
    };
    
    cancelEdit = () => {
        this.setStudentInfo();
    };
    
    generateLink = () => {
    };
    
    updateStudentSubmit = e => {
        
        let student = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            link: this.state.link,
            github: this.state.github,
            studentId: this.state.studentId,
        };
        this.props.editStudent( student );
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
        return ( <div style={ { maxWidth: "800px", margin: "30px auto" } }>
            { this.state.loaded ? ( <>
                <div className={ "inline" }>
                    <Link to="/">
                        <Button type={ "primary" } size={ "large" }>
                            Back
                        </Button>
                    </Link>
                    <Button size={ "large" } className={ "mg-left-sm" }
                            onClick={ () => this.setState( { modalOpen: true } ) }
                    >
                        Edit User
                    </Button>
                    <h1 className={ "mg-left-lg" }>
                        { this.props.selectedStudent.firstName } { this.props.selectedStudent.lastName }
                    </h1>
                </div>
                <div className={ "mg-top-lg" }>
                    <h3>Github Handle: { this.props.selectedStudent.github ?
                        this.props.selectedStudent.github : "" }
                    </h3>
                
                </div>
                
                <div className={ "mg-top-lg" }>
                    <h3>Link:
                        { this.props.selectedStudent.link ?
                            this.props.selectedStudent.link : "" }
                    </h3>
                </div>
                <div className={ "mg-top-lg" }>
                    <Button onClick={ this.generateLink }>
                        { this.props.selectedStudent.link ? "Generate New ID" :
                            "Generate ID" }
                    </Button>
                </div>
                
                <div style={ { backgroundColor: "white" } }>
                    { Object.values( this.props.sprints )
                        .sort( ( a, b ) => a.week - b.week ).map( sprint => {
                            return <Sprint sprint={ sprint }/>;
                        } ) }
                </div>
                
                
                <Modal
                    title={ `Update Student` }
                    visible={ this.state.modalOpen }
                    okText={ "Update Student" }
                    onOk={ this.updateStudentSubmit }
                    onCancel={ () => this.cancelEdit() }>
                    <Row type="flex" gutter={ 24 }>
                        <Form onSubmit={ this.onSubmit }>
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
                        </Form>
                    </Row>
                </Modal>
            
            </> ) : ( <>
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
} );

export default connect( mstp, {
    editStudent,
    getStudentLessons,
    completeStudentLesson,
    changeSelectedSprint,
    changeSelectedStudent
}, )( Student );
