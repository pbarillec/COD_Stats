import React, { useState } from 'react';
import { logout, isLogin } from '../utils';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';


class NavBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        isLogin: isLogin()
    }
  }

  handleLogout = () => {
      logout();
      this.setState({
          isLogin: false
      })
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">CODStats for {this.props.game}</NavbarBrand>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/dashboard/cold_war">Cold War</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/dashboard/warzone">Warzone</NavLink>
              </NavItem>
            </Nav>
            <NavLink href="/login" onClick={() => this.handleLogout()}>Disconnect</NavLink>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;