import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Button, // Checkbox,
    Col, Icon, Input, Modal, Popconfirm, Row, Table, Form
} from "antd";
import {
    deleteTa, updateTa, addTa, subscribe, unsubscribe, subscribeToTas,
} from "../../actions";

class Tas extends Component{
    
    state = {
        modalOpen: false,
        cohort: "",
        firstName: "",
        lastName: "",
        selectedId: null,
    };
    
    componentDidMount(){
        this.props.subscribe( "Tas", this.props.subscribeToTas() );
    }
    
    componentWillUnmount(){
        this.props.unsubscribe( "Tas" );
    }
    
    deleteTA = ta => {
        this.props.deleteTa( ta );
    };
    
    updateTA = () => {
        let ta = {
            id: this.state.selectedId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            cohort: this.state.cohort,
        };
        this.props.updateTa( ta );
        this.setState( {
            firstName: "",
            lastName: "",
            cohort: "",
            selectedId: null,
            modalOpen: false
        } );
    };
    
    onChange = e => {
        this.setState( { [ e.target.name ]: e.target.value } );
    };
    
    addTA = () => {
        let ta = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            cohort: this.state.cohort
        };
        
        this.props.addTa( ta );
        this.setState( {
            firstName: "",
            lastName: "",
            cohort: "",
            selectedId: null,
            modalOpen: false
        } );
    };
    
    render(){
        return ( <>
            <Button type={ "primary" }
                    onClick={ () => this.setState( { modalOpen: true } ) }>Create
                TA</Button>
            <Table
                dataSource={ Object.values( this.props.tas )
                    .sort( ( a, b ) => a.firstName - b.firstName ) }
                style={ { marginTop: "30px" } }
                bordered
                pagination={ false }
                rowKey={ "id" }
            >
                <Table.Column
                    title="First Name"
                    dataIndex="firstName"
                />
                <Table.Column
                    title="Last Name"
                    dataIndex="lastName"
                />
                <Table.Column
                    title="Cohort"
                    dataIndex="cohort"
                />
                <Table.Column title="Actions" dataIndex="actions"
                              key="actions" render={ ( text, record ) => {
                    return ( <div className={ "instructors__actions" }>
                        <div className={ "instructors__actions--icon" }
                             onClick={ () => this.setState( {
                                 firstName: record.firstName,
                                 lastName: record.lastName,
                                 cohort: record.cohort,
                                 modalOpen: true,
                                 selectedId: record.id,
                             } ) }
                        >
                            <Icon type={ "profile" }/>
                            <p>Update</p>
                        </div>
                        <Popconfirm
                            title="Are you sure delete this TA?"
                            onConfirm={ () => this.deleteTA( record ) }
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
                title={ this.state.selectedId ? `Update TA` : "Add TA" }
                visible={ this.state.modalOpen }
                okText={ this.state.selectedId ? "Update TA" : "Add TA" }
                onOk={ this.state.selectedId ? this.updateTA : this.addTA }
                onCancel={ () => this.setState( {
                    modalOpen: false,
                    selectedId: null,
                    name: "",
                    order: null,
                    isProject: true,
                } ) } align={ "center" }>
                <Row type="flex" gutter={ 24 }>
                    <Col xs={ 24 } md={ 12 }>
                        <h3>
                                <span
                                    style={ { color: "#f5222d" } }>*</span> First
                            Name
                        </h3>
                        <Form.Item>
                            <Input
                                style={ { width: "100%" } }
                                value={ this.state.firstName }
                                onChange={ this.onChange }
                                name="firstName"
                                required
                            />
                        </Form.Item>
                        
                        <h3>
                                <span
                                    style={ { color: "#f5222d" } }>*</span> Last
                            Name
                        </h3>
                        <Form.Item>
                            <Input
                                style={ { width: "100%" } }
                                value={ this.state.lastName }
                                onChange={ this.onChange }
                                name="lastName"
                                required
                            />
                        </Form.Item>
                        
                        <h3>
                                <span
                                    style={ { color: "#f5222d" } }>*</span> Cohort
                        </h3>
                        <Form.Item>
                            <Input
                                style={ { width: "100%" } }
                                value={ this.state.cohort }
                                onChange={ this.onChange }
                                name="cohort"
                                required
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Modal>
        </> );
    }
}

const mstp = state => ( {
    tas: state.autoFill.tas,
} );

export default connect( mstp, {
    deleteTa, updateTa, addTa, subscribe, unsubscribe, subscribeToTas,
} )( Tas );