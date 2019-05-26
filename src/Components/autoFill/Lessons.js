import React, { Component } from "react";
import {
    Button, Col, Icon, Input, Modal, Popconfirm, Row, Table, Form, Checkbox
} from "antd";
import { connect } from "react-redux";
import ModalComponent from "../Modal";
import InputComponent from "../InputComponent";
import { addSprint } from "../../actions";
import Sprint from "./Sprint";
import { changeSelectedSprint } from "../../actions";
import "./lessons.scss";

class Lessons extends Component{
    
    state = {
        modalOpen: false,
        name: "",
        order: null,
        isProject: true,
        week: null,
        sprintName: "",
    };
    
    updateLesson = () => {
        const lesson = {
            id: this.state.selectedId,
            isProject: this.state.isProject,
            order: this.state.order,
            name: this.state.name,
            week: this.state.week,
            sprintName: this.state.sprintName,
        };
        
        this.props.updateLesson( lesson );
        this.setState( {
            selectedId: null,
            modalOpen: false,
            name: "",
            order: null,
            isProject: true,
            week: null,
            weekName: ""
        } );
    };
    
    deleteLesson = lesson => {
        this.props.deleteLesson( lesson );
    };
    
    addLesson = () => {
        const lesson = {
            name: this.state.name,
            order: this.state.order,
            isProject: this.state.isProject,
        };
        this.props.addLesson( lesson );
        this.setState( {
            name: "", order: null, isProject: true, modalOpen: false
        } );
    };
    
    onCheckBoxChange = () => {
        this.setState( state => ( { isProject: !state.isProject } ) );
    };
    
    clearState = () => {
        this.setState( state => ( {
            selectedId: null,
            modalOpen: false,
            name: "",
            order: null,
            isProject: true,
            week: null,
            sprintName: "",
        } ) );
    };
    
    onChange = ( name, value ) => {
        this.setState( { [ name ]: value } );
    };
    
    addSprint = () => {
        
        let sprint = {
            name: this.state.sprintName, week: this.state.week,
        };
        this.props.addSprint( sprint );
        this.clearState();
    };
    
    getModalContent = () => {
        
        return ( <ModalComponent title={ "Add Sprint" } okText={ "Submit" }
                                 onOk={ this.addSprint }
                                 onCancel={ this.clearState }
                                 modalOpen={ this.state.modalOpen }
        >
            <InputComponent name={ "Sprint Name" } onChange={ this.onChange }
                            value={ this.state.sprintName }
            />
            <InputComponent name={ "Week" } onChange={ this.onChange }
                            value={ this.state.week }
            />
        </ModalComponent> );
    };
    
    sprintClick = sprint => {
        if( this.props.selectedSprint === sprint ){
            this.props.changeSelectedSprint( null );
        }else{
            this.props.changeSelectedSprint( sprint );
        }
    };
    
    render(){
        
        return ( <>
            <Button type={ "primary" } className={ "lessons__create-sprint" }
                    onClick={ () => this.setState( { modalOpen: true } ) }>Create
                Sprint
            </Button>
            
            { this.props.sprints.map( sprint => {
                
                return ( <div key={ sprint.id }>
                    <div className={ "inline center-vert pointer lessons__row" }
                         onClick={ () => this.sprintClick( sprint ) }
                    >
                        { this.props.selectedSprint &&
                        this.props.selectedSprint === sprint ?
                            <Icon type={ "caret-down" }/> :
                            <Icon type="caret-right"/> }
                        <h1 className={ "mg-left-lg" }>{ sprint.name }</h1>
                    </div>
                    { this.props.selectedSprint === sprint && <Sprint/> }
                </div> );
            } ) }
            { this.getModalContent() }
        </> );
    }
}

const mstp = state => {
    
    return {
        sprints: state.sprints.sprints.sort( ( a, b ) => a.week - b.week ),
        selectedSprint: state.sprints.selectedSprint,
    };
};

export default connect( mstp, { addSprint, changeSelectedSprint } )( Lessons );