import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/basepage'
class About extends React.Component{
    render(){
        return (            
            <BaseLayout {...this.props.auth} >
                <BasePage className="about-page" >
                    <h1> i am the about page</h1>               
                </BasePage>
            </BaseLayout>
           
        )
    }
};

export default About;