import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/basepage'
import withAuth from '../components/HOC/withAuth'
import PortfolioCreateForm from '../components/portfolios/portfolioCreateForm'
import {Row,Col}from 'reactstrap';
import{updatePortfolio, getPortfolioById}from'../actions'
import {Router} from '../routes'
import moment from 'moment';
class PortfolioEdit extends React.Component{
    static  async getInitialProps({query}){
        let portfolio={};
        try{
            portfolio= await getPortfolioById(query.id);
        }
        catch(error){
            console.log(error)
        }
        console.log(portfolio);
        return{portfolio}
    }
    constructor(props){
        super();
        this.state={
            error:undefined
        }
        this.updatePortfolio=this.updatePortfolio.bind(this);
    }

    updatePortfolio(portfolioData,{setSubmitting}){
        //portfolioData.startDate = moment(portfolioData.startDate).toISOString();
        //portfolioData.endDate = moment(portfolioData.endDate).toISOString();
        setSubmitting(true);
        //debugger;
        //alert(JSON.stringify(portfoliodata, null, 2));
        updatePortfolio(portfolioData)
        .then((portfolio)=>{
            setSubmitting(false);
            
            this.setState({error:undefined})
            Router.pushRoute('/portfolios')
            
        })
        .catch((err)=>{
            // debugger;
            setSubmitting(true);
            const error=err||'server Error!';
            this.setState({error})
            })
        
    }
    render(){
        const {error}=this.state;
        const {portfolio}=this.props;
        return(           
            <BaseLayout {...this.props.auth} >
                <BasePage className="portfolio-create-page" title='actualizar Portfolio' >
                    <Row>
                        <Col md='6'>
                            <PortfolioCreateForm initialValues={portfolio}
                                                error={error}
                                                onSubmit={this.updatePortfolio} />          
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
            
            
        )
    }
}
export default withAuth('siteOwner')(PortfolioEdit);