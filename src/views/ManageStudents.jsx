import React from "react";
import MakeInput from "../components/MakeInput";
import {
    addStudent, subscribeToStudents, delStudent, editStudent, subscribe,
    unsubscribe,
} from "../actions";

import { connect } from "react-redux";

import {
    PageHeader, Table, Divider, Button, Modal, Row, Col, Form, Input, Select,
    Popconfirm,
} from "antd";

import { Link } from "react-router-dom";

class ManageStudents extends React.Component{
    state = {
        modalOpen: false, modalId: false, student: {
            firstName: "", lastName: "", github: "", course: ""
        }, subscribedToStudents: false,
    };
    
    componentDidMount(){
        debugger;
        if( this.props.uid ){
            this.props.subscribe( "students",
                this.props.subscribeToStudents( this.props.uid )
            );
            this.setState( { subscribedToStudents: true } );
        }
    }
    
    componentDidUpdate( prevProps, prevState, snapshot ){
        if( !this.state.subscribedToStudents && this.props.uid ){
            this.props.subscribe( "students",
                this.props.subscribeToStudents( this.props.uid )
            );
            this.setState( { subscribedToStudents: true } );
        }
    }
    
    componentWillUnmount(){
        this.props.unsubscribe( "students" );
    }
    
    addHandler = e => {
        
        e.preventDefault();
        this.props.addStudent( {
            student: this.state.student, id: this.props.uid,
        } );
        this.setState( {
            modalOpen: false, modalId: false, student: {
                firstName: "", lastName: "", github: "",
            },
        } );
    };
    
    updateStudent = ( { id, firstName, lastName, github, course } ) => {
        this.setState( {
            modalOpen: true, modalId: id, student: {
                firstName, lastName, github, course
            },
        } );
    };
    
    updateStudentSubmit = () => {
        this.props.editStudent( {
            ...this.state.student, id: this.state.modalId
        }, this.props.uid, );
        this.setState( {
            modalOpen: false, modalId: false, student: {
                firstName: "", lastName: "", github: "",
            },
        } );
    };
    
    inputHandler = e => {
        this.setState( {
            student: {
                ...this.state.student, [ e.target.name ]: e.target.value,
            },
        } );
    };
    
    changeSelect = ( value, name ) => {
        this.setState( {
            student: {
                ...this.state.student, [ name ]: value
            }
        } );
    };
    
    render(){
        return ( <div style={ { maxWidth: "800px", margin: "30px auto" } }>
            <div className={ "inline" }>
                <Link to={ "/" }><Button
                    size={ "large" }>Back</Button></Link>
                <Button type={ "primary" }
                        onClick={ () => this.setState( { modalOpen: true } ) }
                        size={ "large" }
                        className={ "mg-left-md" }
                >
                    Create Student
                </Button>
                <h1 className={ "mg-left-lg" }>Manage Students</h1>
            </div>
            <div style={ { backgroundColor: "white" } }>
                <Table
                    dataSource={ Object.values( this.props.students ) }
                    style={ { marginTop: "30px" } }
                    bordered
                    loading={ this.props.isLoading }
                    rowKey={ "id" }
                    pagination={ false }>
                    <Table.Column
                        title="First Name"
                        dataIndex="firstName"
                        key="firstName"
                    />
                    <Table.Column
                        title="Last Name"
                        dataIndex="lastName"
                        key="lastName"
                    />
                    <Table.Column title="Github" dataIndex="github"
                                  key="github"/>
                    <Table.Column
                        title="Action"
                        key="action"
                        render={ student => ( <span>
                  <Button
                      type="primary"
                      onClick={ () => this.updateStudent( student ) }>
                    Edit
                  </Button>
                  <Divider type="vertical"/>
                  <Popconfirm
                      title="Are you sure delete this user?"
                      onConfirm={ () => this.props.delStudent( student.id,
                          this.props.uid
                      ) }
                      okText="Yes"
                      okButtonProps={ { type: "danger" } }
                      cancelText="No">
                    <Button type="danger">Delete</Button>
                  </Popconfirm>
                </span> ) }
                    />
                </Table>
            </div>
            <Modal
                title={ this.state.modalId ? `Update Student` :
                    "Create a new student" }
                visible={ this.state.modalOpen }
                okText={ this.state.modalId ? "Update Student" : "Add Student" }
                onOk={ this.state.modalId ? this.updateStudentSubmit :
                    this.addHandler }
                onCancel={ () => this.setState( {
                    modalOpen: false, modalId: false
                } ) }>
                <Row type="flex" gutter={ 24 }>
                    <Col xs={ 24 } md={ 12 }>
                        <MakeInput onChange={ this.inputHandler }
                                   required={ true }
                                   value={ this.state.student.firstName }
                                   name={ "firstName" }
                                   isLoading={ false }
                                   type={ "input" }
                                   title={ "First Name" }
                        />
                    </Col>
                    
                    <Col xs={ 24 } md={ 12 }>
                        <MakeInput onChange={ this.inputHandler }
                                   required={ true }
                                   value={ this.state.student.lastName }
                                   name={ "lastName" }
                                   isLoading={ false }
                                   type={ "input" }
                                   title={ "Last Name" }
                        />
                    </Col>
                    <Col xs={ 24 }>
                        <MakeInput onChange={ this.inputHandler }
                                   required={ false }
                                   value={ this.state.student.github }
                                   name={ "github" }
                                   isLoading={ false }
                                   type={ "input" }
                                   title={ "Github Handle" }
                        />
                    </Col>
                    <Col xs={ 24 } md={ 12 }>
                        <Form.Item label={ "Course" }>
                            <Select
                                showSearch
                                style={ { width: 200 } }
                                placeholder="Course"
                                optionFilterProp="children"
                                onChange={ ( value ) => {
                                    
                                    this.changeSelect( value, "course" );
                                } }
                                value={ this.state.student.course }
                                filterOption={ ( input,
                                    option ) => option.props.children.toLowerCase()
                                    .indexOf( input.toLowerCase() ) >= 0 }
                            >
                                { this.props.courses &&
                                Object.values( this.props.courses )
                                    .map( course => {
                                        
                                        return <Select.Option key={ course.id }
                                                              value={ course.id }>{ course.courseName }</Select.Option>;
                                    } ) }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Modal>
        </div> );
    }
}

const mapStateToProps = ( { students, auth, autoFill } ) => ( {
    isLoading: students.isLoading,
    uid: auth.uid,
    students: students.students,
    isAdding: students.isAdding,
    courses: autoFill.courses,
} );

export default connect( mapStateToProps,
    {
        addStudent,
        editStudent,
        subscribeToStudents,
        delStudent,
        subscribe,
        unsubscribe
    },
)(
    ManageStudents );
