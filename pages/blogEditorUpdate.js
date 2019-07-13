import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/basepage'
// componente HOC(hig order component) para saber si esta logueado o no
import withAuth from '../components/HOC/withAuth'
import SlateEditor from '../components/slate-editor/editor'
import {getBlogById,updateBlog} from '../actions/index'
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
        this.updateBlogs=this.updateBlogs.bind(this);
    }
    
    updateBlogs(story,heading){
        const {blog}=this.props;

        const updatedBlog={};
        updatedBlog.title=heading.title;
        updatedBlog.subTitle = heading.subtitle;
        updatedBlog.story=story;
        // console.log(blog)
        // console.log(story)
        this.setState({isSaving:true})
        updateBlog(updatedBlog,blog._id).then(updatedBlog=>{
            this.setState({isSaving:false})

        }).catch((err) => {
            
            this.setState({isSaving:false})
            const message = err.message || 'Server Error!';
            console.error(message);
        })
    }
    render(){
        const {blog}=this.props;
        console.log(blog)
        const {isSaving}=this.state;
        return (            
            <BaseLayout {...this.props.auth} >
                 <BasePage containerClass="editor-wrapper" className="blog-editor-page">

                    <SlateEditor initialValue={blog.story} isLoading={isSaving} save={this.updateBlogs} />
                </BasePage>
            </BaseLayout>
           
        )
    }
};

export default withAuth('siteOwner')( BlogEditorUpdate);