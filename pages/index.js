'use strict'
import React from 'react'

import BaseLayout from '../components/layouts/BaseLayout'
// estilos de los reactstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Container} from 'reactstrap'
// class component
// more functionality
// more stuff
// use lifecicle function

class Index extends  React.Component{
    // para un feetch en axios
    
    render(){
      
        return(
            
            <BaseLayout>
            <Container  >
                <Button color="danger">danger!</Button>
            </Container>
              
            </BaseLayout>
            
            
        )
    }
}
export default Index;