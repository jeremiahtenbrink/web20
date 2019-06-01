import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Popover } from "antd";
import Lessons from "../components/autoFill/Lessons";
import Instructors from "../components/autoFill/Instructors";
import Tas from "../components/autoFill/Tas";

class AutoFill extends Component{
    state = {
        page: "instructors", modalOpen: false, id: null,
    };
    
    render(){
        return ( <div style={ { maxWidth: "800px", margin: "20px auto" } }>
            
            <Card actions={ [
                <Popover content={ <p>Dashboard</p> }>
                    <Icon type="dashboard"
                          onClick={ () => this.props.history.push( "/" ) }/>
                </Popover>, <Popover content={ <p>Instructors</p> }>
                    <Icon type="schedule"
                          onClick={ () => this.setState( { page: "instructors" } ) }/>
                </Popover>, <Popover content={ <p>Lessons</p> }>
                    <Icon type="profile"
                          onClick={ () => this.setState( { page: "lessons" } ) }/>
                </Popover>, <Popover content={ <p>Flex TA's</p> }>
                    <Icon type="project"
                          onClick={ () => this.setState( { page: "tas" } ) }/>
                </Popover>,
            ] }>
                
                <h1>Autofill Dashboard: { this.state.page.toUpperCase() }</h1>
            
            </Card>
            
            { this.state.page === "instructors" && <Card><Instructors/></Card> }
            { this.state.page === "lessons" && <Card><Lessons/></Card> }
            { this.state.page === "tas" && <Card><Tas/></Card> }
        
        </div> );
    }
}

export default AutoFill;