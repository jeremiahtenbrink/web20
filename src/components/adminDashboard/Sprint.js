import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, Icon, Input, Popconfirm, Popover } from "antd";
import ModalComponent from "../Modal";
import InputComponent from "../InputComponent";
import {
    addLesson, editLesson, deleteLesson, subscribeToSprints, subscribe,
    unsubscribe
} from "../../actions";

class Sprint extends Component{
    
    state = {
        modalOpen: false,
        name: "",
        order: null,
        tk: "",
        projects: [ "" ],
        id: null,
    };
    
    componentDidMount(){
    }
    
    componentWillUnmount(){
    
    }
    
    openModal = () => {
        this.setState( { modalOpen: true } );
    };
    
    addLesson = () => {
        
        const lesson = {
            name: this.state.name,
            order: this.state.order,
            tk: this.state.tk,
            projects: this.state.projects
        };
        
        if( this.state.id ){
            lesson.id = this.state.id;
            this.cancel();
            return this.props.editLesson( this.props.selectedSprint, lesson );
        }
        
        this.props.addLesson( this.props.selectedSprint, lesson );
        this.cancel();
    };
    
    delLesson = ( lesson ) => {
        this.props.deleteLesson( this.props.selectedSprint, lesson );
    };
    
    onChange = ( name, value ) => {
        this.setState( { [ name ]: value } );
    };
    
    cancel = () => {
        this.setState( {
            modalOpen: false, name: "", order: null, id: null, projects: [ "" ]
        } );
    };
    
    openModalEdit = ( lesson ) => {
        let projects = [ "" ];
        if( lesson.projects ){
            projects = lesson.projects;
        }
        
        this.setState( {
            modalOpen: true,
            name: lesson.name,
            order: lesson.order,
            tk: lesson.tk,
            projects,
            id: lesson.id
        } );
    };
    
    projectOnChange = ( index, e ) => {
        const value = e.target.value;
        this.setState( state => {
            state.projects[ index ] = value;
            return {
                projects: [ ...state.projects ]
            };
        } );
    };
    
    addProject = () => {
        this.setState( state => {
            state.projects.push( "" );
            return {
                projects: [ ...state.projects ],
            };
        } );
    };
    
    deleteProject = ( index ) => {
        this.setState( state => {
            state.projects.splice( index, 1 );
            return {
                projects: [ ...state.projects ]
            };
        } );
    };
    
    render(){
        
        return ( <div className={ "lessons__add-sprint" }>
            { this.props.selectedLessons.map( lesson => {
                return <div className={ "inline baseline" } key={ lesson.id }>
                    <Popover placement={ "leftBottom" }
                             content={ <p>{ `Edit ${ lesson.name }` }</p> }>
                        <Icon onClick={ () => this.openModalEdit( lesson ) }
                              type="edit"/>
                    </Popover>
                    
                    <Popconfirm
                        title={ `Are you sure delete the ${ lesson.name } lesson?
                Deleting this lesson will remove it from the db.\n Adding a course with the same name will not move the completed course on the students profile. May I suggest you edit this lesson instead.` }
                        onConfirm={ () => this.delLesson( lesson ) }
                        onCancel={ this.cancel }
                        okText="Yes"
                        cancelText="No"
                    >
                        <Popover placement={ "leftBottom" }
                                 content={
                                     <p>{ `Delete ${ lesson.name }` }</p> }>
                            <Icon
                                type={ "delete" } className={ "mg-left-md" }/>
                        </Popover>
                    </Popconfirm>
                    
                    <h3 className={ "mg-left-lg" }
                        key={ lesson.id }>{ lesson.name }</h3>
                </div>;
            } ) }
            <Button onClick={ this.openModal }>Add Lesson</Button>
            <ModalComponent modalOpen={ this.state.modalOpen }
                            onOk={ this.addLesson } onCancel={ this.cancel }
            >
                <Form>
                    <InputComponent name={ "Name" }
                                    onChange={ this.onChange }
                                    value={ this.state.name }
                    />
                    <InputComponent name={ "Order" } onChange={ this.onChange }
                                    value={ this.state.order }
                    />
                    <InputComponent name={ "TK" } onChange={ this.onChange }
                                    value={ this.state.tk }
                    />
                    <div className={ "inline" }>
                        <h3>Project Links</h3>
                        <Button className={ "mg-left-lg" }
                                onClick={ this.addProject }>Add Project</Button>
                    </div>
                    
                    { this.state.projects.map( ( project, index ) => {
                        return <div key={ project }
                                    className={ "inline baseline" }>
                            <Input value={ project }
                                   onChange={ e => this.projectOnChange( index,
                                       e
                                   ) }/>
                            <Icon className={ "mg-left-lg" }
                                  onClick={ () => this.deleteProject( index ) }
                                  type="delete"/>
                        </div>;
                    } ) }
                </Form>
            </ModalComponent>
        </div> );
    }
}

Sprint.propTypes = {};

const mstp = state => {
    
    return {
        selectedSprint: state.sprints.selectedSprint,
        selectedLessons: Object.values( state.sprints.selectedLessons.lessons )
            .sort( ( a, b ) => a.order - b.order ).map( lesson => lesson ),
    };
};

export default connect( mstp, {
    addLesson,
    editLesson,
    deleteLesson,
    subscribeToSprints,
    subscribe,
    unsubscribe
} )( Sprint );