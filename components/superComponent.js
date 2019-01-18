import React from 'react';
import BaseLayout from './layouts/BaseLayout'

class SuperComponent extends React.Component{
    constructor(props){
        super(props);
        this.somevariable='solo una variable'
    }
    alertName(title){
        alert(title);
    }
    render(){
        return(
            <BaseLayout>
                 <h1> soy blogs </h1>                 
            </BaseLayout>
           
        )
    }
}
export default SuperComponent;