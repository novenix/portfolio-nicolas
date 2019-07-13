import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/basepage'
// componente HOC(hig order component) para saber si esta logueado o no
import withAuth from '../components/HOC/withAuth'
import SlateEditor from '../components/slate-editor/editor'
import {getBlogById} from '../actions/index'
class BlogEditorUpdate extends React.Component{
    static async getInitialProps({query}){
        const blogId=query.id;
        let blog={}
        console.log(blogId)
        try{
            blog=await getBlogById(blogId)
            
        }
        catch(err){
            console.error(err); 
        }
        return {blog}
    }
    
    constructor(props){
        super(props)
        //estado de estar guardando blog "isSaving"
        this.state={
            isSaving:false
        }
    }
    
    
    render(){
        const {blog}=this.props;
        console.log(blog)
        const {isSaving}=this.state;
        return (            
            <BaseLayout {...this.props.auth} >
                 <BasePage containerClass="editor-wrapper" className="blog-editor-page">

                    <SlateEditor initialValue={blog.story} isLoading={isSaving} save={()=>{console.log("update")}} />
                </BasePage>
            </BaseLayout>
           
        )
    }
};

export default withAuth('siteOwner')( BlogEditorUpdate);