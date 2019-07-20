// class component
import React from 'react';
import axios from 'axios'
import BaseLayout from '../components/layouts/BaseLayout'
// import Link from 'next/link'
import {Link} from '../routes'
import PorfolioCard from '../components/portfolios/portfolioCard'

import BasePage from '../components/basepage'
// componente HOC(hig order component) para saber si esta logueado o no
// recibe rol y recibe la pag que recibe autenticacion
import withAuth from '../components/HOC/withAuth'
// reactstrap
import{Col,Row,Button} from 'reactstrap'
// accion de buscar en api rest portfolios
import {getPortfolios,deletePortfolio} from '../actions/index'
import {Router} from '../routes'
class Portfolios extends React.Component{
    static async getInitialProps({req}){
        
        
        let portfolios=[];
        try{
            portfolios=await getPortfolios(req);
            
            
        }
        catch(err){
            console.log(err);
        }

        return {portfolios}
    }
    navigateToEdit(portfolioId,event){
        event.stopPropagation();
        Router.pushRoute(`/portfolios/${portfolioId}/edit`)
    }
    displayDeleteWarning(portfiolioId,event){
        event.stopPropagation();
        const isConfrirm=confirm("¿esta seguro que desea borrar portafolio?")
        
        if(isConfrirm){
            //borrar portafolio
            this.deletePort(portfiolioId);
        }
    }
    deletePort(portfiolioId){
        deletePortfolio(portfiolioId)
            .then(()=>{
                //que hacer luego?
                Router.pushRoute('/portfolios')
            })
            .catch(err=>console.error(err))
    }

    renderPortfolios(portfolios){
        const {isAuthenticated,isSiteOwner}=this.props.auth;
        
        return portfolios.map((portfolio,index)=>{
            return(
                <Col md="4" key={index} >
                    <PorfolioCard portfolio={portfolio} >
                    {isAuthenticated&&isSiteOwner&&
                            <React.Fragment>
                                <Button onClick={(event)=>this.navigateToEdit(portfolio._id,event)}  outline color="warning">Editar</Button>
                                <Button onClick={(event)=>this.displayDeleteWarning(portfolio._id,event)} outline color="danger">Borrar</Button>
                            </React.Fragment>
                        }  
                    </PorfolioCard>
                </Col>
            )
        })
    }
    render(){
        //   ;
        
        const {portfolios}=this.props;
        const {isAuthenticated,isSiteOwner}=this.props.auth;
        return(
            <BaseLayout {...this.props.auth} title='Nicolas Torres - Mis Empleos' >
                <BasePage className='portfolio-page' title="Mis Empleos" >
                    { isAuthenticated&&isSiteOwner&&
                        <Button onClick={()=>Router.pushRoute('/portfolios/new')} outline color="success" className="create-port-butt" >Crear Portafolio</Button>
                    }
                    <Row>
                        {/* {this.renderPosts(posts)} */}
                        {this.renderPortfolios(portfolios)}
                    </Row>
                </BasePage>
            </BaseLayout>
            
            
        )
    }
}
export default  Portfolios;