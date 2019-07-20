import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/basepage'
import {Row,Col,Container}from 'reactstrap';
import {Link} from '../routes'
import moment from 'moment'
import { getBlogs } from '../actions';
import {shortenText} from '../helpers/utils'

class Blogs extends React.Component{
    static async getInitialProps({req}){
        let blogs=[]
        try{
            blogs=await getBlogs(req);
            //console.log(blogs)
        }   
        catch(err){
            console.error(err)
        }
        //console.log(blogs)
        return {blogs}
    }
    renderBlogs=(blogs)=>(

        blogs.map((blog,index)=>(
            <div key={index} className="post-preview">
                <Link route={`/blogs/${blog.slug}`}>
                    <a>
                    <h2 className="post-title">
                        {blog.title}
                    </h2>
                    <h3 className="post-subtitle">
                         {shortenText( blog.subTitle,124)}
                    </h3>
                    </a>
                </Link>
                <p className="post-meta">Posted by
                    <a href="#"> {blog.author} </a>
                    {moment(blog.createdAt).format('LLLL')}</p>
            </div>
        ))
    )

    
    render(){
        const {blogs}=this.props;
        //console.log(blogs)
        return(           
            <BaseLayout title='Nicolas Torres - Blogs Para Leer' {...this.props.auth} headerType={'landing'} className="blog-listing-page">
                <div className="masthead" style={{"backgroundImage": "url('/static/images/home-bg.jpg')"}}>
                <div className="overlay"></div>
                <Container>
                    <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <div className="site-heading">
                        <h1>Blogs Nicolás Torres</h1>
                        <span className="subheading">Programación,tecnología,Sci-Fi...</span>
                        </div>
                    </div>
                    </div>
                </Container>
                </div>
                <BasePage className="blog-body">
                <Row>
                    <Col md="10" lg="8" className="mx-auto">
                    {
                        this.renderBlogs(blogs)
                    }
                    <div className="clearfix">
                        <a className="btn btn-primary float-right" href="#">Posts Antiguos &rarr;</a>
                    </div>
                    </Col>
                </Row>
            
                <footer>
                    <Container>
                    <Row>
                        <div className="col-lg-8 col-md-10 mx-auto">
                        <ul className="list-inline text-center">
                            <li className="list-inline-item">
                            <a target='_blank' href="https://www.instagram.com/novenix/">
                                <span className="fa-stack fa-lg">
                                <i className="fas fa-circle fa-stack-2x"></i>
                                <i className="fab fa-instagram fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                            </li>
                            <li className="list-inline-item">
                            <a target='_blank' href="https://www.youtube.com/user/novenix1989">
                                <span className="fa-stack fa-lg">
                                <i className="fas fa-circle fa-stack-2x"></i>
                                <i className="fab fab fa-youtube fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                            </li>
                            <li className="list-inline-item">
                            <a target='_blank' href="https://github.com/novenix">
                                <span className="fa-stack fa-lg">
                                <i className="fas fa-circle fa-stack-2x"></i>
                                <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                            </li>
                        </ul>
                        <p className="copyright text-muted">Copyright &copy; Nicolas Torres 2019</p>
                        </div>
                    </Row>
                    </Container>
                </footer>
                
                </BasePage>

          </BaseLayout>
          
            
           
        )
    }
}
export default Blogs;