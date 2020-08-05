import React from 'react';
import {Input, Modal, Row, Form, Select} from 'antd';
import {connect} from 'react-redux';
import {ICourse} from '../../types/CourseInterface';
import {IPm} from '../../types/IPm';
import {
    editStudent, subscribe, unsubscribe, subscribeToCourses, subscribeToPms,
    addStudent,
} from '../../actions/index.js';
import {IStudent} from '../../types/StudentInterface';

interface IState {
    pm?: string;
    firstName?: string;
    lastName?: string;
    github?: string;
    course?: string;
    id?: null | string;
    link?: string;
}

class EditStudentModal extends React.Component<IProps, IState> {
    
    state = {
        pm: '', firstName: '', lastName: '', github: '', course: '', id: null,
        link: '',
    };
    
    componentDidMount(): void {
        this.setState( {...this.props.student} );
        this.props.subscribe( 'pms', this.props.subscribeToPms() );
        this.props.subscribe( 'courses', this.props.subscribeToCourses() );
    }
    
    componentWillUnmount(): void {
        this.props.unsubscribe( 'pms' );
        this.props.unsubscribe( 'courses' );
    }
    
    updateStudentSubmit = e => {
        e.preventDefault();
        const student: IStudent = {
            ...this.state,
        };
        
        if ( student.id ) {
            this.props.editStudent( student );
        } else {
            this.props.addStudent( student );
        }
        
        
        this.props.closeModal();
        
    };
    
    cancelEdit = () => {
        this.props.closeModal();
    };
    
    changeSelect = ( value: string, name: string ) => {
        this.setState( {[ name ]: value} );
    };
    
    onChange = ( e ) => {
        this.setState( {[ e.target.name ]: e.target.value} );
    };
    
    render() {
        return (
            <Modal
                title={ this.state.id ? `Update Student` : 'Create Student' }
                visible={ true }
                okText={ this.state.id ? 'Update Student' : 'Submit' }
                onOk={ this.updateStudentSubmit }
                onCancel={ () => this.cancelEdit() }>
                <Row type="flex" gutter={ 24 }>
                    {/*
                                //@ts-ignore */ }
                    <Form onSubmit={ this.onSubmit }>
                        
                        <Form.Item label={ 'Project Manager' }>
                            <Select
                                showSearch
                                style={ {width: 200} }
                                placeholder="PM"
                                optionFilterProp="children"
                                onChange={ ( value ) => {
                                    
                                    this.changeSelect( value,
                                        'pm',
                                    );
                                } }
                                value={ this.state.pm }
                                //@ts-ignore
                                filterOption={ ( input,
                                                 option ) => typeof option.props.children ===
                                'string' ?
                                    option.props.children.toLowerCase()
                                        .indexOf(
                                            input.toLowerCase() ) >=
                                    0 : '' }
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
                        
                        <Form.Item label={ 'First Name' }>
                            <Input
                                id={ 'firstName' }
                                name={ 'firstName' }
                                value={ this.state.firstName }
                                placeholder={ 'First Name' }
                                onChange={ this.onChange }
                            />
                        </Form.Item>
                        <Form.Item label={ 'Last Name' }>
                            <Input
                                id={ 'lastName' }
                                name={ 'lastName' }
                                value={ this.state.lastName }
                                placeholder={ 'Last Name' }
                                onChange={ this.onChange }
                            />
                        </Form.Item>
                        <Form.Item label={ 'Github Handle' }>
                            <Input
                                id={ 'github' }
                                name={ 'github' }
                                value={ this.state.github }
                                placeholder={ 'Github' }
                                onChange={ this.onChange }
                            />
                        </Form.Item>
                        
                        <Form.Item label={ 'Course' }>
                            <Select
                                showSearch
                                style={ {width: 200} }
                                placeholder="Course"
                                optionFilterProp="children"
                                onChange={ ( value ) => {
                                    
                                    this.changeSelect( value,
                                        'course',
                                    );
                                } }
                                value={ this.state.course }
                                //@ts-ignore
                                filterOption={ ( input,
                                                 option ) => typeof option.props.children ===
                                'string' ?
                                    option.props.children.toLowerCase()
                                        .indexOf(
                                            input.toLowerCase() ) >=
                                    0 : '' }
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
        );
    }
}


const mstp = state => ( {
    courses: state.autoFill.courses,
    pms: state.autoFill.pms,
} );

interface IProps {
    courses: {[ id: string ]: ICourse};
    pms: {[ id: string ]: IPm};
    editStudent: typeof editStudent;
    subscribe: typeof subscribe;
    unsubscribe: typeof unsubscribe;
    subscribeToCourses: typeof subscribeToCourses;
    subscribeToPms: typeof subscribeToPms;
    closeModal: Function;
    student: IStudent;
    addStudent: typeof addStudent;
}

export default connect( mstp, {
    editStudent, subscribe, unsubscribe, subscribeToCourses, subscribeToPms,
    addStudent,
} )( EditStudentModal );
