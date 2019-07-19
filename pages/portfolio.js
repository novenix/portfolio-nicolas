import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'

import {withRouter} from 'next/router'
import axios from 'axios'
import { userInfo } from 'os';
import BasePage from '../components/basepage'
// componente HOC(hig order component) para saber si esta logueado o no
import withAuth from '../components/HOC/withAuth'
// para mostrar el contenido especifico del post con un querie para paginas dinamicas
// dar un post en especifico y mostrarlo
class PortfolioDetails extends React.Component{
    static async getInitialProps({query}){
        // aparece cuando se refresca en portforlio details
        // console.log(query)
        const postId=query.id;
        let userData={}
        try{
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            userData=response.data;
        }
        catch(err){
            console.log(err)
        }
        return{userData}
    }
    render(){
        // debugger;
        // console.log(this.props)
        const {userData}=this.props;
        return(            
            <BaseLayout {...this.props.auth} >
                <BasePage>
                    <h2>{userData.title} </h2>
                    <p>{userData.body}</p>
                    
                    <h1> ID:{userData.id} </h1>       
                </BasePage>     
            </BaseLayout>
           
            
        )
    }
}
export default withAuth()( withRouter( PortfolioDetails));
// http://localhost:3000/portfolio-detail/1