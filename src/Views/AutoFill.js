import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Icon } from "antd";
import Lessons from "../components/autoFill/Lessons";
import Instructors from "../components/autoFill/Instructors";
import Tas from '../components/autoFill/Tas';

class AutoFill extends Component{
    state = {
        page: "instructors", modalOpen: false, id: null,
    };
    
    render(){
        return ( <div style={ { maxWidth: "800px", margin: "20px auto" } }>
            
            <Card actions={ [
                <>
                    <Icon type="schedule"
                          onClick={ () => this.setState( { page: "instructors" } ) }/>
                    <p>Instructors</p>
                </>, <>
                    <Icon type="profile"
                          onClick={ () => this.setState( { page: "lessons" } ) }/>
                    <p>Lessons</p>
                </>, <>
                    <Icon type="project"
                          onClick={ () => this.setState( { page: "tas" } ) }/>
                    <p>Flex TA's</p>
                </>,
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