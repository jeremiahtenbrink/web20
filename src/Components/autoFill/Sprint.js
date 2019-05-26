import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form } from "antd";
import ModalComponent from "../Modal";
import InputComponent from "../InputComponent";
import { addLesson } from "../../actions";

class Sprint extends Component{
    
    state = {
        modalOpen: false, name: "", order: null
    };
    
    openModal = () => {
        this.setState( { modalOpen: true } );
    };
    
    addLesson = () => {
        const lesson = {
            name: this.state.name, order: this.state.order,
        };
        
        this.props.addLesson( this.props.selectedSprint, lesson );
        this.cancel();
    };
    
    onChange = ( name, value ) => {
        this.setState( { [ name ]: value } );
    };
    
    cancel = () => {
        this.setState( { modalOpen: false, name: "", order: null } );
    };
    
    render(){
        return ( <div className={ "lessons__add-sprint" }>
            { this.props.selectedLessons.map( lesson => {
                return <h3 key={ lesson.id }>{ lesson.name }</h3>;
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
                </Form>
            </ModalComponent>
        </div> );
    }
}

Sprint.propTypes = {};

const mstp = state => ( {
    selectedSprint: state.sprints.selectedSprint,
    selectedLessons: state.sprints.selectedLessons.sort( ( a, b ) => a.order -
        b.order ),
} );

export default connect( mstp, { addLesson } )( Sprint );