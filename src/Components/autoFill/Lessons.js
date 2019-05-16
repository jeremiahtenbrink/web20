import React, { Component } from "react";
import {
    Button, Col, Icon, Input, Modal, Popconfirm, Row, Table, Form, Checkbox
} from "antd";
import { connect } from "react-redux";
import { updateLesson, deleteLesson, addLesson } from "../../actions";

class Lessons extends Component{
    
    state = {
        selectedId: null,
        modalOpen: false,
        name: "",
        order: null,
        isProject: true
    };
    
    updateLesson = () => {
        const lesson = {
            id: this.state.selectedId,
            isProject: this.state.isProject,
            order: this.state.order,
            name: this.state.name,
        };
        
        this.props.updateLesson( lesson );
        this.setState( {
            selectedId: null,
            modalOpen: false,
            name: "",
            order: null,
            isProject: true
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
        this.props.addLesson(lesson);
        this.setState({name: '', order: null, isProject: true, modalOpen: false})
    };
    
    onCheckBoxChange = () => {
        this.setState( state => ( { isProject: !state.isProject } ) );
    };
    
    onChange = e => {
        this.setState( { [ e.target.name ]: e.target.value } );
    };
    
    render(){
        return ( <>
            <Button type={ "primary" }
                    onClick={ () => this.setState( { modalOpen: true } ) }>Create
                Lesson</Button>
            <Table
                dataSource={ this.props.lessons }
                style={ { marginTop: "30px" } }
                bordered
                pagination={ false }
                rowKey={ "id" }
            >
                <Table.Column
                    title="Lesson"
                    dataIndex="name"
                />
                <Table.Column title="Actions" dataIndex="actions"
                              key="actions" render={ ( text, record ) => {
                    return ( <div className={ "instructors__actions" }>
                        <div className={ "instructors__actions--icon" }
                             onClick={ () => this.setState( {
                                 name: record.name,
                                 modalOpen: true,
                                 selectedId: record.id,
                                 order: record.order,
                                 isProject: record.isProject,
                             } ) }
                        >
                            <Icon type={ "profile" }/>
                            <p>Update</p>
                        </div>
                        <Popconfirm
                            title="Are you sure delete this instructor?"
                            onConfirm={ () => this.deleteLesson( record ) }
                            okText="Yes"
                            cancelText="No"
                            className={ "instructors__actions--icon" }
                            style={ { cursor: "pointer" } }
                        >
                            <Icon
                                type={ "delete" } theme={ "twoTone" }
                                twoToneColor={ "#f5222d" }
                                style={ { cursor: "pointer" } }
                            />
                            <p style={ { cursor: "pointer" } }>Delete</p>
                        </Popconfirm>
                    </div> );
                } }/>
            </Table>
            
            <Modal
                title={ this.state.selectedId ? `Update Lesson` :
                    "Add" + " Lesson" }
                visible={ this.state.modalOpen }
                okText={ this.state.selectedId ? "Update Lesson" :
                    "Add Lesson" }
                onOk={ this.state.selectedId ? this.updateLesson :
                    this.addLesson }
                onCancel={ () => this.setState( {
                    modalOpen: false,
                    selectedId: null,
                    name: "",
                    order: null,
                    isProject: true,
                } ) }>
                <Row type="flex" gutter={ 24 }>
                    <Col xs={ 24 } md={ 12 }>
                        <h3>
                            <span style={ { color: "#f5222d" } }>*</span> Name
                        </h3>
                        <Form.Item>
                            <Input
                                style={ { width: "100%" } }
                                value={ this.state.name }
                                onChange={ this.onChange }
                                name="name"
                                required
                            />
                        </Form.Item>
                        
                        <h3>
                            <span style={ { color: "#f5222d" } }>*</span> Order
                        </h3>
                        <Form.Item>
                            <Input
                                style={ { width: "100%" } }
                                value={ this.state.order }
                                onChange={ this.onChange }
                                name="order"
                                required
                            />
                        </Form.Item>
                        <Checkbox
                            checked={ !this.state.isProject }
                            disabled={ this.state.disabled }
                            onChange={ this.onCheckBoxChange }
                        >
                            Sprint
                        </Checkbox>
                    </Col>
                </Row>
            </Modal>
        </> );
    }
}

const mstp = state => {

    const lessons = state.autoFill.lessons;
    const sprints = state.autoFill.sprints;
    const combine = sprints.concat( lessons );
    combine.sort( ( a, b ) => a.order - b.order );
    return {
        lessons: combine,
    };
};

export default connect( mstp, { updateLesson, deleteLesson, addLesson } )( Lessons );