'use strict'
import React from 'react'
// para que se escriban las cosas animadamente
import Typed from 'react-typed'
import BaseLayout from '../components/layouts/BaseLayout'


import {Button,Container,Row,Col} from 'reactstrap'
// class component
// more functionality
// more stuff
// use lifecicle function

class Index extends  React.Component{
    // para un feetch en axios
    constructor(props){
        super(props)
        this.roles=["React.js y Next,js Front-end developer ","Node.js Back-end Developer","React-Native"]
    }
    render(){
      const { isAuthenticated, user }=this.props.auth;
        return(
            
        <BaseLayout className="cover" {...this.props.auth} headerType='index' >
            <div className="main-section">
              <div className="background-image">
                <img src="/static/images/background-index.png" />
              </div>
          
              <Container>
                <Row>
                  <Col md="6">
                    <div className="hero-section">
                      <div className={`flipper`}>
                        <div className="back">
                          <div className="hero-section-content">
                            <h2> Full Stack Web Developer </h2>
                            <div className="hero-section-content-intro">
                              También app developer
                            </div>
                          </div>
                          <img className="image" src="/static/images/section-1.png"/>
                          <div className="shadow-custom">
                            <div className="shadow-inner"> </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="6" className="hero-welcome-wrapper">
                    <div className="hero-welcome-text">
                      <h1>
                        {console.log(isAuthenticated)}
                        {isAuthenticated && <span>{user.name}</span>}
                        <a> </a>
                        BIENVENIDO AL PORTFOLIO Y CV DE NICOLAS TORRES.

                       
                      </h1>
                      
                    </div>
                    <Typed
                        className="self-typed"
                        loop
                        typeSpeed={70}
                        backSpeed={20}
                        strings={this.roles}                        
                        backDelay={2000}                        
                        loopCount={0}
                        showCursor
                        cursorChar="|"
                        />
                    <div className="hero-welcome-bio">
                      <h1>
                        Dale un vistazo.
                      </h1>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
        </BaseLayout>
          
            
            
        )
    }
}
export default Index;