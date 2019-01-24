import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/basepage'
import withAuth from '../components/HOC/withAuth'
class Ownner extends React.Component{
    render(){
        return(           
            <BaseLayout {...this.props.auth} >
                <BasePage>
                    <h1> soy Ownner </h1>     
                </BasePage>       
            </BaseLayout>
           
            
        )
    }
}
// const withSpecificAuth=withAuth('admin')
export default withAuth('siteOwner')( Ownner);
// export default withSpecificAuth( Ownner);