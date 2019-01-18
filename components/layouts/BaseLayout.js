import React from 'react'
import Header from '../shared/Header'
// funcional
// dumb component
// get data
// return data
// functional component
const BaseLayout =(props)=>{
    return(
        <React.Fragment>
            <Header/>
            {props.children}
        </React.Fragment>
    )
}
export default BaseLayout;