import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    subscribeToAllStudents, subscribe, unsubscribe, subscribeToCourses,
    subscribeToPms, delStudent
} from '../../actions/index'
import { IStudent } from "../../types/StudentInterface";
import { Form, Icon, Input, Popconfirm, Popover, Table, Col, Row } from "antd";
import { ICourse } from "../../types/CourseInterface";
import Fuse from 'fuse.js';
import EditStudentModal from "../student/EditStudentModal";
import { IPm } from "../../types/IPm";

interface IState {
    search?: string;
    student?: null | IStudent;
    pm?: string;
}

class Students extends Component<IProps, IState> {
    
    state = {
        search: '',
        pm: '',
        student: null,
    };
    
    componentDidMount(): void {
        this.props.subscribe( "allStudents",
            this.props.subscribeToAllStudents() );
        this.props.subscribe( "courses",
            this.props.subscribeToCourses() );
        this.props.subscribe( "pms", this.props.subscribeToPms() )
    }
    
    componentWillUnmount(): void {
        this.props.unsubscribe( "allStudents" );
        this.props.unsubscribe( "courses" );
        this.props.unsubscribe( "pms" );
    }
    
    onChange = e => {
        this.setState( { [ e.target.name ]: e.target.value } );
    };
    
    searchStudents = (): IStudent[] => {
        let array = Object.values( this.props.students );
        
        const options = {
            shouldSort: true,
            threshold: 0.5,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
                "firstName",
                "lastName",
            ]
        };
        
        if ( this.props.pms && this.state.pm ) {
            
            if ( this.state.pm ) {
                
                let pms: any = new Fuse( Object.values( this.props.pms ),
                    options );
                pms = pms.search( this.state.pm );
                
                array =
                    Object.values( this.props.students ).filter( student => {
                        
                        for ( let i = 0; i < pms.length; i++ ) {
                            const id = pms[ i ].id;
                            if ( id === student.pm ) {
                                return true;
                            }
                        }
                        return false;
                    } );
            }
            
        }
        
        if ( this.props.students && this.state.search ) {
            const fuse = new Fuse( array,
                options );
            
            array = fuse.search( this.state.search );
        }
        
        return array;
    };
    
    render() {
        return (
            <div>
                <Row>
                    <Form layout={ "inline" }>
                        <Form.Item label={ "Student Name" }>
                            <Input value={ this.state.search }
                                   onChange={ this.onChange }
                                   name={ "search" }/>
                        
                        </Form.Item>
                        <Form.Item label={ "Pm Name" }>
                            <Input value={ this.state.pm }
                                   onChange={ this.onChange }
                                   name={ "pm" }/>
                        </Form.Item>
                    </Form>
                
                </Row>
                
                
                <Table
                    dataSource={ this.searchStudents() }
                    style={ { marginTop: "30px" } }
                    bordered
                    loading={ false }
                    rowKey={ "id" }
                    pagination={ { position: 'bottom' } }>
                    <Table.Column
                        title="First Name"
                        dataIndex="firstName"
                        key="firstName"
                        sorter={ ( a: IStudent,
                                   b: IStudent ) => a.firstName > b.firstName ?
                            1 : -1 }
                    />
                    <Table.Column
                        title="Last Name"
                        dataIndex="lastName"
                        key="lastName"
                        sorter={ ( a: IStudent,
                                   b: IStudent ) => a.lastName > b.lastName ?
                            1 : -1 }
                    />
                    <Table.Column title="PM" dataIndex="pm"
                                  key="pm" render={ ( text: string,
                                                      record: IStudent ) => {
                        if ( this.props.pms[ record.pm ] ) {
                            return <p>{ this.props.pms[ record.pm ].firstName } { this.props.pms[ record.pm ].lastName }</p>
                        }
                        return <p>Unknown</p>;
                        
                    } }
                    />
                    <Table.Column
                        title="Course"
                        dataIndex="course"
                        key="course"
                        filters={ Object.values( this.props.courses ).map(
                            course => ( {
                                text: course.courseName, value: course.id
                            } ) ) }
                        onFilter={ ( value,
                                     student: IStudent ) => {
                            if ( student.course ) {
                                return student.course.indexOf(
                                    value ) === 0
                            }
                            return false;
                        }
                        }
                    />
                    <Table.Column title="Github" dataIndex="github"
                                  key="github" render={ ( text, record ) => (
                        <a href={ `https://github.com/${ text }` }
                           target="_blank">{ text }</a> ) }
                    />
                    
                    <Table.Column
                        title="Action"
                        key="action"
                        render={ student => (
                            <div className={ "inline center-vert" +
                            " space-around" }>
                                <span className={ "color-blue" }>
                                    <Popover content={ <p>Edit Student</p> }>
                                        <Icon type={ "form" }
                                              className={ "mg-left-md" }
                                              style={ { fontSize: "20px" } }
                                              onClick={ () => this.setState(
                                                  { student: student } ) }/>
                                    </Popover>
                                    
                                </span>
                                <span className={ "color-red" }>
                                    <Popconfirm title={ "Delete Student" }
                                                cancelText={ "Cancel" }
                                                okText={ "Delete" }
                                                onConfirm={ () => this.props.delStudent(
                                                    student.id ) }
                                    >
                                    <Popover content={ <p>Delete Student</p> }>
                                        <Icon type={ "delete" }
                                              className={ "mg-left-md" }
                                              style={ { fontSize: "20px" } }
                                        />
                                    </Popover>
                                    </Popconfirm>
                                    
                                </span>
                            
                            </div>
                        ) }
                    />
                
                </Table>
                { this.state.student &&
                <EditStudentModal student={ this.state.student }
                                  closeModal={ () => this.setState(
                                      { student: null } ) }/> }
            </div>
        );
    }
}

const mstp = state => {
    return {
        students: state.students.allStudents,
        courses: state.autoFill.courses,
        pms: state.autoFill.pms,
    }
};

interface IProps {
    students: { [ id: string ]: IStudent };
    courses: { [ id: string ]: ICourse };
    pms: { [ id: string ]: IPm };
    subscribeToAllStudents: typeof subscribeToAllStudents;
    subscribe: typeof subscribe;
    unsubscribe: typeof unsubscribe;
    subscribeToCourses: typeof subscribeToCourses;
    subscribeToPms: typeof subscribeToPms;
    delStudent: typeof delStudent;
}

export default connect( mstp,
    {
        subscribeToAllStudents, subscribe, unsubscribe, subscribeToCourses,
        subscribeToPms, delStudent
    } )(
    Students );