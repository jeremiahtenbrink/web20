import React, { Component } from "react";
import { Card, Icon, Popover, Button } from "antd";
import Lessons from "../components/autoFill/Lessons";
import Instructors from "../components/autoFill/Instructors";
import Tas from "../components/autoFill/Tas";
import {
    copySprints, unsubscribe, subscribe, subscribeToInstructors,
    subscribeToCourses, subscribeToPms, subscribeToTas
} from "../actions";
import { connect } from "react-redux";
import { history } from "../configStore";

interface IState {
    page: string,
    modalOpen: boolean,
    id: null | number,
}

class AdminDashboard extends Component<IProps, IState> {
    state = {
        page: "instructors", modalOpen: false, id: null,
    };
    
    componentDidMount() {
    }
    
    componentWillUnmount() {
    }
    
    render() {
        return ( <div style={ { maxWidth: "800px", margin: "20px auto" } }>
            
            <Card actions={ [
                <Popover content={ <p>Dashboard</p> }>
                    <Icon type="dashboard"
                          style={ { fontSize: "24px" } }
                          onClick={ () => this.props.history.push( "/" ) }/>
                </Popover>, <Popover content={ <p>Instructors</p> }>
                    <Icon type="user"
                          style={ { fontSize: "24px" } }
                          onClick={ () => this.setState(
                              { page: "instructors" } ) }/>
                </Popover>, <Popover content={ <p>Lessons</p> }>
                    <Icon type="profile"
                          style={ { fontSize: "24px" } }
                          onClick={ () => this.setState(
                              { page: "lessons" } ) }/>
                </Popover>, <Popover content={ <p>Flex TA's</p> }>
                    <Icon type="project"
                          style={ { fontSize: "24px" } }
                          onClick={ () => this.setState( { page: "tas" } ) }/>
                </Popover>,
            ] }>
                
                <h1>Admin Dashboard: { this.state.page.toUpperCase() }</h1>
            
            </Card>
            {/*<Button*/ }
            {/*onClick={ () => this.props.copySprints() }>Copy Sprints</Button>*/ }
            { this.state.page === "instructors" && <Card><Instructors/></Card> }
            { this.state.page === "lessons" && <Card><Lessons/></Card> }
            { this.state.page === "tas" && <Card><Tas/></Card> }
        
        </div> );
    }
}

const mstp = state => ( {} );

interface IProps {
    copySprints: typeof copySprints;
    subscribeToInstructors: typeof subscribeToInstructors;
    subscribe: typeof subscribe;
    unsubscribe: typeof unsubscribe;
    subscribeToCourses: typeof subscribeToCourses;
    subscribeToPms: typeof subscribeToPms;
    subscribeToTas: typeof subscribeToTas;
    history: typeof history;
}

export default connect( mstp, {
    copySprints,
    subscribeToInstructors,
    subscribe,
    unsubscribe,
    subscribeToCourses,
    subscribeToPms,
    subscribeToTas
} )( AdminDashboard );
