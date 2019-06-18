import React from "react";
import { Select, Form, Button, Popconfirm, message } from "antd";
import InputComponent from "../InputComponent";
import ModalComponent from "../Modal";
import {
    addCourse, delCourses, subscribe, subscribeToCourses, unsubscribe
} from "../../actions/index";
import { connect } from "react-redux";
import { ICourse } from "../../types/CourseInterface";

interface IState {
    courseName: string;
    id: string;
    modalOpen: boolean;
}

class Courses extends React.Component<IProps, IState> {
    state = {
        courseName: "", id: "", modalOpen: false,
    };
    
    componentDidMount() {
        this.props.subscribe( "Courses", this.props.subscribeToCourses() );
    }
    
    componentWillUnmount() {
        this.props.unsubscribe( "Courses" );
    }
    
    addCourse = () => {
        const course = {
            courseName: this.state.courseName, id: this.state.id,
        };
        this.props.addCourse( course );
        this.setState( { courseName: "", id: "", modalOpen: false } );
        message.success( `${ course.courseName } added.` );
    };
    
    clearState = () => {
        this.setState( { courseName: "", id: "", modalOpen: false } );
    };
    
    onChange = ( name, value ) => {
        // @ts-ignore
        this.setState( { [ name ]: value } );
    };
    
    confirm = ( e ) => {
        const course = Object.values( this.props.courses )
            .filter( course => course.id === this.props.selectedCourse )[ 0 ];
        this.props.delCourses( course );
        this.props.removeSelectedCourse();
        message.success( "Course removed" );
    };
    
    cancel = ( e ) => {
        console.log( e );
        message.error( "Course Not removed" );
    };
    
    render() {
        const Option = Select.Option;
        return ( <div>
            <Button onClick={ () => this.setState( { modalOpen: true } ) }>Add
                Course</Button>
            <div className={ "inline" }>
                <Form.Item>
                    <Select
                        showSearch
                        style={ { width: 200 } }
                        placeholder="Student"
                        optionFilterProp="children"
                        onChange={ ( value ) => {
                            
                            this.props.changeCourseSelect( "selectedCourse",
                                value
                            );
                        } }
                        value={ this.props.selectedCourse }
                        filterOption={ ( input,
                                         option ) => typeof option.props.children ===
                        "string" ? option.props.children.toLowerCase()
                            .indexOf( input.toLowerCase() ) >= 0 : '' }
                    >
                        { this.props.courses &&
                        Object.values( this.props.courses ).map( course => {
                            
                            return <Option key={ course.id }
                                           value={ `${ course.id }` }>{ course.courseName }</Option>;
                        } ) }
                    </Select>
                </Form.Item>
            
            </div>
            
            <ModalComponent title={ "Add Course" } okText={ "Submit" }
                            onOk={ this.addCourse }
                            onCancel={ this.clearState }
                            modalOpen={ this.state.modalOpen }
            >
                <InputComponent name={ "Course Name" }
                                onChange={ this.onChange }
                                value={ this.state.courseName }
                                required={ true }
                />
                <InputComponent name={ "ID" } onChange={ this.onChange }
                                value={ this.state.id }
                                required={ true }
                />
            </ModalComponent>
        </div> );
    }
}

const mstp = state => ( {
    courses: state.autoFill.courses,
} );

interface IProps {
    courses: { [ id: string ]: ICourse };
    selectedCourse: string,
    addCourse: typeof addCourse;
    delCourses: typeof delCourses;
    subscribeToCourses: typeof subscribeToCourses;
    subscribe: typeof subscribe;
    unsubscribe: typeof unsubscribe;
    removeSelectedCourse: Function;
    changeCourseSelect: Function;
}

export default connect( mstp,
    { addCourse, delCourses, subscribeToCourses, subscribe, unsubscribe }
)(
    Courses );