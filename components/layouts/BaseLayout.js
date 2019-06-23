import React from 'react'
import Header from '../shared/Header'
import Head from 'next/head'
// funcional
// dumb component
// get data
// return data
// functional component
const BaseLayout =(props)=>{
    const {className , children,isAuthenticated,user} = props;
    const headerType=props.headerType||'default';
    return(
        <React.Fragment>
            <Head>
                <title>CV Nicolas Torres</title>
                <script src="https://kit.fontawesome.com/52781db4ba.js"></script>
            </Head>
            <div className="layout-container" >
            

                {<Header className={`port-nav-${headerType}`}  isAuthenticated={isAuthenticated} user={user} />}
                    <main className={`cover ${className}`} >
                        <div  className="wrapper" >
                            {children}
                        </div>
                    </main>      
            </div>
    </React.Fragment>
    )
}
export default BaseLayout;