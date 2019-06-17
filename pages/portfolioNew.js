import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/basepage'
import withAuth from '../components/HOC/withAuth'
import PortfolioCreateForm from '../components/portfolios/portfolioCreateForm'
import {Row,Col}from 'reactstrap';
import{createPortfolio}from'../actions'

class PortfolioNew extends React.Component{
    constructor(props){
        super();
        this.savePortfolio=this.savePortfolio.bind(this);
    }

    savePortfolio(portfolioData){
        //alert(JSON.stringify(portfoliodata, null, 2));
        createPortfolio(portfolioData)
        .then((portfolio)=>{
            debugger;
            console.log(portfolio);
            
        })
        .catch((err)=>{console.error(err)})
        
    }
    render(){
        return(           
            <BaseLayout {...this.props.auth} >
                <BasePage className="portfolio-create-page" title='Crear Portfolio' >
                    <Row>
                        <Col md='6'>
                            <PortfolioCreateForm onSubmit={this.savePortfolio} />          
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
            
            
        )
    }
}
export default withAuth('siteOwner')(PortfolioNew);