// class component
import React from 'react';
import axios from 'axios'
import BaseLayout from '../components/layouts/BaseLayout'
// import Link from 'next/link'
import {Link} from '../routes'
import BasePage from '../components/basepage'
// componente HOC(hig order component) para saber si esta logueado o no
// recibe rol y recibe la pag que recibe autenticacion
import withAuth from '../components/HOC/withAuth'
// reactstrap
import{Col,Row,Card,CardBody,CardHeader,CardText,CardTitle} from 'reactstrap'
// accion de buscar en api rest portfolios
import {getPortfolios} from '../actions/index'
class Portfolios extends React.Component{
    static async getInitialProps(){
        
        
        let portfolios=[];
        try{
            portfolios=await getPortfolios();
            
            
        }
        catch(err){
            console.log(err);
        }

        return {portfolios}
    }
    
    renderPortfolios(portfolios){
        
        return portfolios.map((portfolio,index)=>{
            return(
                <Col md="4" key={index} >
                    <React.Fragment >
                        <span>
                        <Card className="portfolio-card">
                                <CardHeader className="portfolio-card-header">Compañia: {portfolio.company}</CardHeader>
                                <CardBody>
                                    <p className="portfolio-card-city"> Ubicación: {portfolio.location} </p>
                                    <CardTitle className="portfolio-card-title">Posición: {portfolio.position}</CardTitle>
                                    <CardText className="portfolio-card-text">Descripción {portfolio.description}</CardText>
                                <div className="readMore"> </div>
                                </CardBody>
                            </Card>
                        </span>
                    </React.Fragment>
                </Col>
            )
        })
    }
    render(){
        // debugger;
        
        const {portfolios}=this.props;
        
        return(
            <BaseLayout {...this.props.auth} >
                <BasePage className='portfolio-page' title="portfolios" >
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