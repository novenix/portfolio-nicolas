import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/basepage'
import withAuth from '../components/HOC/withAuth'
import PortfolioCreateForm from '../components/portfolios/portfolioCreateForm'
import {Row,Col}from 'reactstrap';
import{createPortfolio}from'../actions'
import {Router} from '../routes'
import moment from 'moment';
const INITIAL_VALUES={
    title:'',
    company:'',
    location:'',
    position:'',
    description:'',
    startDate:new Date(),
    endDate:new Date()
  }
class PortfolioNew extends React.Component{
    constructor(props){
        super();
        this.state={
            error:undefined
        }
        this.savePortfolio=this.savePortfolio.bind(this);
    }

    savePortfolio(portfolioData,{setSubmitting}){
        //portfolioData.startDate = moment(portfolioData.startDate).toISOString();
        //portfolioData.endDate = moment(portfolioData.endDate).toISOString();
        setSubmitting(true);
        //alert(JSON.stringify(portfoliodata, null, 2));
        createPortfolio(portfolioData)
        .then((portfolio)=>{
            setSubmitting(false);
            
            this.setState({error:undefined})
            Router.pushRoute('/portfolios')
            
        })
        .catch((err)=>{
            //   ;
            setSubmitting(true);
            const error=err||'server Error!';
            this.setState({error})
            })
        
    }
    render(){
        const {error}=this.state;
        return(           
            <BaseLayout {...this.props.auth} >
                <BasePage className="portfolio-create-page" title='Crear Portfolio' >
                    <Row>
                        <Col md='6'>
                            <PortfolioCreateForm 
                                initialValues={INITIAL_VALUES}
                                error={error}
                                onSubmit={this.savePortfolio} />          
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
            
            
        )
    }
}
export default withAuth('siteOwner')(PortfolioNew);