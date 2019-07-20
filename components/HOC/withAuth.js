// HOC(hig order component)
// WithFuncionalidad.js(palabra with y la funcionalidad de el componente)
import React from 'react'
import BaseLayout from '../layouts/BaseLayout'
import BasePage from '../basepage'

//const namespace='http://localhost:3000'
// role es el rol de owner o admin o user
// antes estaba export default (role) =>(
    // (Component) =>....)

export default role =>Component =>
    class withAuth extends React.Component{
        // este get initial props es llamado por la funcion de app de mismo nombre que termina llamando a
        // el componente hijo con una funcion del mismo nombre (get initial props)
        // 1-funcion app getInitialProps()
        // 2.funcion withAuth getInitialProps()
        // 3.funcion de pages como index o about o sobretodo portfolio getInitialProps()
        static async getInitialProps(args){
            const pageProps= await Component.getInitialProps && await Component.getInitialProps(args);
            return {...pageProps}
        }
        renderProtectedPage(){
            //   ;
            const {isAuthenticated,user}=this.props.auth;
            const userRole=user&&user[`${process.env.NAMESPACE}/role`]
            let isAuthorized=false;
            if (role){
                if(userRole&&userRole===role){isAuthorized=true}
            }
            else{
                isAuthorized=true;
            }
            if(!isAuthenticated){
                return (
                    <BaseLayout {...this.props.auth}>
                        <BasePage >
                            <h1> No te has autenticado. Por favor logueate para ver este contenido </h1>     
                        </BasePage>       
                    </BaseLayout>
                )
            }
            else if(!isAuthorized){
                return(
                    <BaseLayout {...this.props.auth}>
                        <BasePage >
                            <h1> No estas autorizado. No tienes permisos para visitar esta pagina</h1>     
                        </BasePage>       
                    </BaseLayout>
                )
            }
            else{
                return ( <Component {...this.props}/>)
            }



        }
        render(){
            
            return this.renderProtectedPage()
        }
    } 
    


