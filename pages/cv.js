import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/basepage'
class Cv extends React.Component{
    render(){
        return(           
            <BaseLayout {...this.props.auth} >
                <BasePage>
                    <h1> soy cv </h1>     
                </BasePage>       
            </BaseLayout>
           
            
        )
    }
}
export default Cv;