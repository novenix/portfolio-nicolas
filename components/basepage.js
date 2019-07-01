import React from 'react'
import {Container}from 'reactstrap'
import PropTypes from 'prop-types'
// componente funcional
// como todo esta en relative. se usa basepage para bajar todo y que se vea abajo del header


const BasePage=(props)=>{
    // const {className}=props.className || '';
    // este es lo mismo de lo de arriba
    const {className,title,containerClass}=props;
    
    return(
        <div className={`base-page ${className}`} >
        
            <Container className={containerClass} >
            {title&&<div className='page-header' > <h1 className='page-header-title' >{title}</h1> </div>}
                {props.children}
            </Container>
        </div>
    )
}
// defaultprops hace que no hlla clasname esperando
BasePage.defaultProps={
    className:'',
    containerClass:''
}

export default BasePage;