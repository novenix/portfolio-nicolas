import React from 'react';
// // para SPA(single page applications)
import Link from 'next/link'
import ActiveLink from '../activeLink'
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
  DropdownItem,
  DropdownMenu,
  Dropdown
   } from 'reactstrap';

import auth0 from '../../services/auth0'

// componente para barra de navegacion por props
// BSNavlink=bootstrap Nav Link
const BsNavLink=(props)=>{
    const {route,text}=props;
    const className=props.className||'';
    return(
      
      <ActiveLink activeClassName='active' route={route}  > 
        <a className={`nav-link port-navbar-link ${className}`}> {text} </a>
       </ActiveLink>
     
        // <Link  href={route}>
        //     <a className="nav-link port-navbar-link"> {text} </a>
        // </Link>
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
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.state = {
      isOpen: false,
      dropdownOpen:false
    };
  }
  toggle() {
      
    this.setState({
      isOpen: !this.state.isOpen,
      
    });
  }
  toggleDropdown() {
      
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      
    });
  }
  renderBlogMenu(){
    const {isSiteOwner}=this.props;
    
    if(isSiteOwner){
      return(
        <UncontrolledDropdown className=' port-navbar-link   port-dropdown-menu ' isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} nav inNavbar>
                <DropdownToggle className='port-dropdown-toggle' nav caret>
                  Blogs
                </DropdownToggle>
              <DropdownMenu right>
                  <DropdownItem>
                    <BsNavLink 
                        className='port-dropdown-item' 
                        route="/blogs"
                       text="Blogs" />
                  </DropdownItem>
                  <DropdownItem>
                  <BsNavLink 
                        className='port-dropdown-item' 
                        route="/blogs/new"
                         text="Crear Blog" />
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                  <BsNavLink 
                        className='port-dropdown-item' 
                        route="/blogs/dashboard" 
                        text="Blog Dashboard" />
                  </DropdownItem>
              </DropdownMenu>
            
            </UncontrolledDropdown>
        // <Dropdown className="port-navbar-link port-dropdown-menu" nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
        //   <DropdownToggle className="port-dropdown-toggle" nav caret>
        //     Blog
        //   </DropdownToggle>
        //   <DropdownMenu>
        //     <DropdownItem>
        //       <BsNavLink className="port-dropdown-item"
        //                  route="/blogs"
        //                  text="Blogs" />
        //     </DropdownItem>
        //     <DropdownItem>
        //       <BsNavLink className="port-dropdown-item"
        //                  route="/blogs/new"
        //                  text="Create a Blog" />
        //     </DropdownItem>
        //     <DropdownItem>
        //       <BsNavLink className="port-dropdown-item"
        //                  route="/blogs/dashboard"
        //                  text="Blogs Dashboard" />
        //     </DropdownItem>
        //   </DropdownMenu>
        // </Dropdown>
      )
    }

    return (
            <NavItem className="port-navbar-item" >
              <BsNavLink route="/blogs" text="Blogs" />
            </NavItem>
            )
  }
  render() {
    const {isAuthenticated,user,className}=this.props
    
    const {isOpen}=this.state;
    const menuOpenClass=isOpen?'menu-open':'menu-close'
    return (
      <div>
          <Navbar className={`port-navbar port-nav-base absolute ${className} ${menuOpenClass}`} color="transparent" dark expand="md">
        {/* <Navbar className={`port-navbar port-nav-base  ${className} ${menuOpenClass}`} color='transparent' dark expand="md"> */}
          <NavbarBrand className="port-navbar-brand" href="/">Nicolas Torres Páez</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="port-navbar-item" >
                <BsNavLink route="/" text="Home" />
              </NavItem>
              
                {this.renderBlogMenu()}
              
              <NavItem className="port-navbar-item" >
                <BsNavLink route="/portfolios" text="Portfolio" />
              </NavItem>
              <NavItem className="port-navbar-item" >
                <BsNavLink route="/cv" text="CV" />
              </NavItem>
              <NavItem className="port-navbar-item" >
                <BsNavLink route="/about" text="About" />
              </NavItem>
              {/* <NavItem className="port-navbar-item" >
                <BsNavLink route="https://github.com/novenix" text="GIT" ></BsNavLink>
              </NavItem> */}

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
                <span className="nav-link port-navbar-link clickable" >{user.name}</span>
              </NavItem>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}