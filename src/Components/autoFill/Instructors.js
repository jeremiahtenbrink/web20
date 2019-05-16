import React from "react";
import { connect } from "react-redux";
import {
    Col, Input, Modal, Row, Table, Form, Button, Icon, Popconfirm
} from "antd";
import "./instructors.scss";
import {
    updateInstructor, deleteInstructor, addInstructor
} from "../../actions";

class Instructors extends React.Component{
    
    state = {
        modalOpen: false, selectedId: null, name: "",
    };
    
    deleteInstructor = ( instructor ) => {
        this.props.deleteInstructor( instructor );
    };
    
    updateInstructor = () => {

        const instructor = { id: this.state.selectedId, name: this.state.name };
        this.props.updateInstructor( instructor );
        this.setState( { name: "", selectedId: null, modalOpen: false } );
    };
    
    addInstructor = () => {

        this.props.addInstructor( { name: this.state.name } );
        this.setState( { modalOpen: false, name: "" } );
    };
    
    onChange = e => {
        this.setState( { [ e.target.name ]: e.target.value } );
    };
    
    render(){
        
        return ( <>
            <Button type={ "primary" }
                    onClick={ () => this.setState( { modalOpen: true } ) }>Create
                Instructor</Button>
            <Table
                dataSource={ this.props.instructors }
                style={ { marginTop: "30px" } }
                bordered
                pagination={ false }
                rowKey={ "id" }
            >
                <Table.Column
                    title="Instructor"
                    dataIndex="name"
                />
                <Table.Column title="Actions" dataIndex="actions"
                              key="actions" render={ ( text, record ) => {
                    return ( <div className={ "instructors__actions" }>
                        <div className={ "instructors__actions--icon" }
                             onClick={ () => this.setState( {
                                 name: record.name,
                                 modalOpen: true,
                                 selectedId: record.id
                             } ) }
                        >
                            <Icon type={ "profile" }/>
                            <p>Update</p>
                        </div>
                        <Popconfirm
                            title="Are you sure delete this instructor?"
                            onConfirm={ () => this.deleteInstructor( record ) }
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
                title={ this.state.selectedId ? `Update Instructor` :
                    "Add" + " Instructor" }
                visible={ this.state.modalOpen }
                okText={ this.state.selectedId ? "Update Instructor" :
                    "Add Instructor" }
                onOk={ this.state.selectedId ? this.updateInstructor :
                    this.addInstructor }
                onCancel={ () => this.setState( {
                    modalOpen: false, modalId: null
                } ) }>
                <Row type="flex" gutter={ 24 }>
                    <Col xs={ 24 } md={ 12 }>
                        <h3>
                                        <span
                                            style={ { color: "#f5222d" } }>*</span> Name
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
                    </Col>
                </Row>
            </Modal>
        </> );
    }
}

const mstp = state => {
    return { instructors: state.autoFill.instructors };
};

export default connect( mstp,
    { updateInstructor, deleteInstructor, addInstructor }
)(
    Instructors );