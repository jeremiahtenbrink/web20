import React, { Component } from "react";
import {
    Button, Col, Icon, Input, Modal, Popconfirm, Row, Table, Form
} from "antd";
import { connect } from "react-redux";

class Lessons extends Component{
    
    state = {
        selectedId: null, modalOpen: false,
    };
    
    render(){
        return ( <>
            <Button type={ "primary" }
                    onClick={ () => this.setState( { modalOpen: true } ) }>Create
                Instructor</Button>
            <Table
                dataSource={ this.props.lessons }
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
    debugger;
    const lessons = state.autoFill.lessons;
    const sprints = state.autoFill.sprints;
    const combine = sprints.concat( lessons );
    combine.sort( ( a, b ) => a.order - b.order );
    return {
        lessons: combine,
    };
};

export default connect( mstp )( Lessons );