import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/basepage'
// componente HOC(hig order component) para saber si esta logueado o no
import withAuth from '../components/HOC/withAuth'
import SlateEditor from '../components/slate-editor/editor'
class About extends React.Component{
    render(){
        return (            
            <BaseLayout {...this.props.auth} >
                 <BasePage containerClass="editor-wrapper" className="blog-editor-page" title='Escribe Algo :)' >

                    <SlateEditor/>
                </BasePage>
            </BaseLayout>
           
        )
    }
};

export default withAuth('siteOwner')( About);