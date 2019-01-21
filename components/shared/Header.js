import React from 'react';
// // para SPA(single page applications)
import Link from 'next/link'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
   } from 'reactstrap';

import auth0 from '../../services/auth0'

// componente para barra de navegacion por props
// BSNavlink=bootstrap Nav Link
const BsNavLink=(props)=>{
    const {route,text}=props;
    return(
        <Link  href={route}>
            <a className="nav-link port-navbar-link"> {text} </a>
        </Link>
    )
}
const Login=()=>{
  return(
    <span onClick={auth0.login} className="nav-link port-navbar-link clickable" > Login</span>
  )
}
const Logout=()=>{
  return(
    <span onClick={auth0.logout} className="nav-link port-navbar-link clickable" > Logout</span>
  )
}

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
      
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const {isAuthenticated,user}=this.props
    return (
      <div>
        <Navbar className="port-navbar port-default" color='transparent' dark expand="md">
          <NavbarBrand className="port-navbar-brand" href="/">Nicolas Torres Páez</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="port-navbar-item" >
                <BsNavLink route="/" text="Home" />
              </NavItem>
              <NavItem className="port-navbar-item" >
                <BsNavLink route="/blogs" text="Blogs" />
              </NavItem>
              <NavItem className="port-navbar-item" >
                <BsNavLink route="/portfolios" text="Portfolio" />
              </NavItem>
              <NavItem className="port-navbar-item" >
                <BsNavLink route="/cv" text="CV" />
              </NavItem>
              <NavItem className="port-navbar-item" >
                <BsNavLink route="/about" text="Acerca De" />
              </NavItem>
              <NavItem className="port-navbar-item" >
                <BsNavLink route="https://github.com/novenix" text="GITHUB" ></BsNavLink>
              </NavItem>

              {!isAuthenticated &&
                <NavItem className="port-navbar-item" >
                  <Login/>
                </NavItem>
              }
              {isAuthenticated &&
              <NavItem className="port-navbar-item" >
                <Logout/>
              </NavItem>
              }
              {isAuthenticated &&
              <NavItem className="port-navbar-item" >
                <span className="nav-link port-navbar-link" >{user.name}</span>
              </NavItem>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}