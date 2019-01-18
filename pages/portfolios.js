// class component
import React from 'react';
import axios from 'axios'
import BaseLayout from '../components/layouts/BaseLayout'
// import Link from 'next/link'
import {Link} from '../routes'

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
                <li key={index} >
                    {console.log(post)}
                    {/* para los links dimnamicos en url conectado con archivo server*/}
                    {/* conectado con portfolio-detail */}
                    <Link route={`/portfolio-detail/${post.id}`} >
                        <a style={{'fontSize':'20px'}}> {post.title} </a>
                    </Link>
                    
                </li>
            )
        })
    }
    render(){
        // debugger;
        const {posts}=this.props;
        return(
            <BaseLayout>
                <h1> soy portfolio </h1>
                <ul>{this.renderPosts(posts)}</ul>
            </BaseLayout>
            
        )
    }
}
export default Portfolios;