import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/basepage'
class Blogs extends React.Component{
    render(){
        return(            
            <BaseLayout {...this.props.auth} >
                <BasePage>
                    <h1> soy blogs </h1>                 
                </BasePage>
            </BaseLayout>
            
           
        )
    }
}
export default Blogs;