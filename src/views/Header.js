import React from "react";
import PropTypes from "prop-types";
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
    Container
} from "reactstrap";

class Header extends React.Component{
    state = {
        isOpen: false
    };
    
    toggle(){
        this.setState( state => ( { isOpen: !state.isOpen } ) );
    }
    
    render(){
        return ( <div>
            
            <Navbar color="light" light expand="md">
                <Container>
                    <NavbarBrand href="/">PM Dashboard</NavbarBrand>
                    <NavbarToggler onClick={ this.toggle }/>
                    <Collapse isOpen={ this.state.isOpen } navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/add-students/">Add
                                    Students</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                
                </Container>
            </Navbar>
        </div> );
    }
}

Header.propTypes = {};

export default Header;