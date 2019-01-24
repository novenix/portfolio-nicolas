// este se usa para importar todos los css o lo que se necesite
//  en un solo lugar y ponerlos en la app (como la autenticacion)
import React from 'react'
import App, { Container } from 'next/app'
import auth0 from '../services/auth0'
// stylings
import '../styles/main.scss'
// estilos de los reactstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// -----
export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    const user=process.browser?await auth0.clientAuth():await auth0.serverAuth(ctx.req);
    // console.log(isAuthenticated)

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    // parte de abajo
    // let isAuthenticated=false;
    // if(user){
    //   isAuthenticated=true
    // }
    const auth={user,isAuthenticated:!!user}

    return { pageProps,auth }
  }

  render () {
    const { Component, pageProps,auth } = this.props

    return (
      <Container>
        <Component {...pageProps } auth={auth} />
      </Container>
    )
  }
}