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
class Portfolios extends React.Component{
    static async getInitialProps(){
        let posts=[];
        try{
            const response=await axios.get('https://jsonplaceholder.typicode.com/posts')
            posts=response.data
        }
        catch(err){
            console.log(err)
        }
        // para mostrar solo 10 posts
        return{posts:posts.splice(0,10)}
    }
    renderPosts(posts){
        // debugger;
        return posts.map((post,index)=>{
            return(
                
                // para next-routes(libreria para enrutar dinamicamente (portfolio-detail))
                <Col md="4">
                    <React.Fragment key={index}>
                        <span>
                            <Card className="portfolio-card">
                                <CardHeader className="portfolio-card-header">Some Position {index}</CardHeader>
                                <CardBody>
                                    <p className="portfolio-card-city"> Some Location {index} </p>
                                    <CardTitle className="portfolio-card-title">Some Company {index}</CardTitle>
                                    <CardText className="portfolio-card-text">Some Description {index}</CardText>
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
        const {posts}=this.props;
        return(
            <BaseLayout {...this.props.auth} >
                <BasePage className='portfolio-page' title="portfolios" >
                    <Row>
                        {this.renderPosts(posts)}
                    </Row>
                </BasePage>
            </BaseLayout>
            
            
        )
    }
}
export default withAuth()( Portfolios);