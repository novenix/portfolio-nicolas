import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/basepage'
// componente HOC(hig order component) para saber si esta logueado o no
import withAuth from '../components/HOC/withAuth'
class About extends React.Component{
    render(){
        return (            
            <BaseLayout {...this.props.auth} >
                <BasePage className="about-page" title='soy acerca de' >
                                
                </BasePage>
            </BaseLayout>
           
        )
    }
};

export default withAuth()( About);