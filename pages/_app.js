// este se usa para importar todos los css o lo que se necesite
//  en un solo lugar y ponerlos en la app (como la autenticacion)
import React from 'react'
import App, { Container } from 'next/app'
import auth0 from '../services/auth0'
// stylings
import '../styles/main.scss'
// estilos de los reactstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const namespace="http://localhost:3000"
// -----
export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    const user=process.browser?await auth0.clientAuth():await auth0.serverAuth(ctx.req);
    // console.log(isAuthenticated)

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    
    const isSiteOwner=user&&user[namespace+'/role']==='siteOwner';
    // parte de abajo
    // let isAuthenticated=false;
    // if(user){
    //   isAuthenticated=true
    // }
    const auth={user,isAuthenticated:!!user,isSiteOwner}

    return { pageProps,auth }
  }

  render () {
    const { Component, pageProps,auth } = this.props

    return (
      <Container>
        
        <ToastContainer />
        <Component {...pageProps } auth={auth} />
      </Container>
    )
  }
}