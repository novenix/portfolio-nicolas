import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/basepage'
import {Router} from '../routes'
// componente HOC(hig order component) para saber si esta logueado o no
import withAuth from '../components/HOC/withAuth'
import SlateEditor from '../components/slate-editor/editor'
import {createBlog} from '../actions/index'
class BlogEditor extends React.Component{
    constructor(props){
        super(props)
        //estado de estar guardando blog "isSaving"
        this.state={
            isSaving:false,
            //numero random
            lockId:Math.floor(1000 + Math.random() * 9000)
        }
        this.saveBlog=this.saveBlog.bind(this);
    }
    
    saveBlog(story,heading){
        const {lockId}=this.state;
        const blog={};
        blog.title=heading.title;
        blog.subTitle = heading.subtitle;
        blog.story=story;
        console.log(blog)
        console.log(story)
        this.setState({isSaving:true})
        createBlog(blog,lockId).then(createdBlog=>{
            this.setState({isSaving:false})
            Router.pushRoute(`/blogs/${createdBlog._id}/edit`)
        
        }).catch((err) => {
            
            this.setState({isSaving:false})
            const message = err.message || 'Server Error!';
            console.error(message);
        })
    }
    render(){
        const {isSaving}=this.state;
        return (            
            <BaseLayout {...this.props.auth} >
                 <BasePage containerClass="editor-wrapper" className="blog-editor-page">

                    <SlateEditor isLoading={isSaving} save={this.saveBlog} />
                </BasePage>
            </BaseLayout>
           
        )
    }
};

export default withAuth('siteOwner')( BlogEditor);