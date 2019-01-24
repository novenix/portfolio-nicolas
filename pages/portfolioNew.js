import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/basepage'
import withAuth from '../components/HOC/withAuth'
import PortfolioCreateForm from '../components/portfolios/portfolioCreateForm'
import {Row,Col}from 'reactstrap'
class PortfolioNew extends React.Component{
    render(){
        return(           
            <BaseLayout {...this.props.auth} >
                <BasePage className="portfolio-create-page" title='Crear Portfolio' >
                    <Row>
                        <Col md='6'>
                            <PortfolioCreateForm />          
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
            
            
        )
    }
}
export default withAuth('siteOwner')(PortfolioNew);