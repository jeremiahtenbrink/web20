import React from "react";
import { connect } from "react-redux";
import {
    Col, Input, Modal, Row, Table, Form, Button, Icon, Popconfirm, Select
} from "antd";
import "./instructors.scss";
import {
    updateInstructor, deleteInstructor, addInstructor, subscribeToInstructors,
    subscribe, unsubscribe, subscribeToCourses,
} from "../../actions/index";
import { IInstructor } from "../../types/InstructorInterface";
import { ICourse } from "../../types/CourseInterface";


class Instructors extends React.Component<IComponentProps, IComponentState> {
    
    state = {
        modalOpen: false,
        selectedId: null,
        name: "",
        courses: [],
        selectedCourse: ""
    };
    
    componentDidMount(): void {
        debugger;
        this.props.subscribe( "Instructors",
            this.props.subscribeToInstructors() );
        this.props.subscribe( "Courses", this.props.subscribeToCourses() )
    }
    
    componentDidUpdate( prevProps: Readonly<IComponentProps>,
                        prevState: Readonly<IComponentState>,
                        snapshot?: any ): void {
        debugger;
    }
    
    componentWillUnmount(): void {
        this.props.unsubscribe( "Instructors" );
        this.props.unsubscribe( "Courses" );
    }
    
    deleteInstructor = ( instructor: IInstructor ): void => {
        this.props.deleteInstructor( instructor );
    };
    
    updateInstructor = (): void => {
        
        const instructor = {
            id: this.state.selectedId,
            name: this.state.name,
            courses: this.state.courses
        };
        this.props.updateInstructor( instructor );
        this.setState( {
            name: "", selectedId: null, modalOpen: false, courses: []
        } );
    };
    
    addInstructor = (): void => {
        
        this.props.addInstructor( { name: this.state.name } );
        this.setState( { modalOpen: false, name: "" } );
    };
    
    onChange = ( e: React.SyntheticEvent ): void => {
        //@ts-ignore
        this.setState( { [ e.target.name ]: e.target.value } );
    };
    
    addCourse = (): void => {
        this.setState( ( state: IComponentState ) => ( {
            courses: [
                ...state.courses, this.state.selectedCourse
            ], selectedCourse: ""
        } ) );
    };
    
    removeCourse = ( courseToRemove: string ): void => {
        this.setState( ( state: IComponentState ) => ( {
            courses: state.courses.filter( course => course !== courseToRemove )
        } ) );
    };
    
    render() {
        
        return ( <>
            <Button type={ "primary" }
                    onClick={ () => this.setState( { modalOpen: true } ) }>Create
                Instructor</Button>
            <Table
                dataSource={ Object.values( this.props.instructors ) }
                style={ { marginTop: "30px" } }
                bordered
                pagination={ false }
                rowKey={ "id" }
            >
                <Table.Column
                    title="Instructor"
                    dataIndex="name"
                />
                <Table.Column
                    title="Courses"
                    dataIndex="courses"
                    render={ ( text: string, instructor: IInstructor ) => {
                        if ( instructor.courses ) {
                            return instructor.courses.map( course => {
                                return <p key={ course }>{ course }</p>;
                            } );
                        }
                        return <></>;
                        
                    } }
                />
                <Table.Column title="Actions" dataIndex="actions"
                              key="actions"
                              render={ ( text, instructor: IInstructor ) => {
                                  return (
                                      <div className={ "instructors__actions" }>
                                          <div
                                              className={ "instructors__actions--icon" }
                                              onClick={ () => this.setState( {
                                                  name: instructor.name,
                                                  modalOpen: true,
                                                  selectedId: instructor.id,
                                                  courses: instructor.courses ||
                                                      []
                                              } ) }
                                          >
                                              <Icon type={ "profile" }/>
                                              <p>Update</p>
                                          </div>
                                          <Popconfirm
                                              title="Are you sure delete this instructor?"
                                              onConfirm={ () => this.deleteInstructor(
                                                  instructor ) }
                                              okText="Yes"
                                              cancelText="No"
                                              className={ "instructors__actions--icon" }
                                              style={ { cursor: "pointer" } }
                                          >
                                              <Icon
                                                  type={ "delete" }
                                                  theme={ "twoTone" }
                                                  twoToneColor={ "#f5222d" }
                                                  style={ { cursor: "pointer" } }
                                              />
                                              <p style={ { cursor: "pointer" } }>Delete</p>
                                          </Popconfirm>
                                      </div> );
                              } }/>
            </Table>
            
            <Modal
                title={ this.state.selectedId ? `Update Instructor` :
                    "Add" + " IInstructor" }
                visible={ this.state.modalOpen }
                okText={ this.state.selectedId ? "Update Instructor" :
                    "Add Instructor" }
                onOk={ this.state.selectedId ? this.updateInstructor :
                    this.addInstructor }
                onCancel={ () => this.setState( {
                    modalOpen: false,
                } ) }>
                <Row type="flex" gutter={ 24 }>
                    <Col xs={ 24 } md={ 12 }>
                        <h3>
                                        <span
                                            style={ { color: "#f5222d" } }>*</span> Name
                        </h3>
                        <Form.Item label={ "Name" }>
                            <Input
                                style={ { width: "100%" } }
                                value={ this.state.name }
                                onChange={ this.onChange }
                                name="name"
                                required
                            />
                        </Form.Item>
                        <Button onClick={ this.addCourse }>Add Course</Button>
                        <Form.Item>
                            <Select
                                showSearch
                                style={ { width: 200 } }
                                placeholder="Course"
                                optionFilterProp="children"
                                onChange={ ( value ) => this.setState(
                                    { selectedCourse: value } ) }
                                value={ this.state.selectedCourse }
                                filterOption={ ( input,
                                                 option ) => {
                                    // @ts-ignore
                                    return option.this.props.children.toLowerCase()
                                        .indexOf( input.toLowerCase() ) >= 0
                                } }
                            >
                                { this.props.courses &&
                                Object.values( this.props.courses )
                                    .map( course => {
                                        
                                        return <Select.Option key={ course.id }
                                                              value={ `${ course.id }` }>{ course.courseName }</Select.Option>;
                                    } ) }
                            </Select>
                        </Form.Item>
                        <p>Courses in which the instructor teaches.</p>
                        { this.state.courses &&
                        this.state.courses.map( course => {
                            return <div className={ "inline" }><Icon
                                type={ "delete" }
                                onClick={ () => this.removeCourse( course ) }/>
                                <p
                                    className={ "mg-left-md" }>{ course }</p>
                            </div>;
                        } ) }
                    </Col>
                </Row>
            </Modal>
        </> );
    }
}

const mstp = state => {
    return {
        instructors: state.autoFill.instructors, courses: state.autoFill.courses
        
    };
};

export default connect( mstp,
    {
        updateInstructor, deleteInstructor, addInstructor,
        subscribeToInstructors, subscribe, unsubscribe, subscribeToCourses
    }
)( Instructors );

interface IComponentProps {
    updateInstructor: Function,
    deleteInstructor: Function,
    addInstructor: Function,
    instructors: { [ id: string ]: IInstructor },
    courses: { [ id: string ]: ICourse },
    subscribeToInstructors: Function,
    subscribe: Function,
    unsubscribe: Function,
    subscribeToCourses: Function
}

interface IComponentState {
    modalOpen: boolean,
    selectedId: string,
    name: string,
    courses: string[],
    selectedCourse: string
}