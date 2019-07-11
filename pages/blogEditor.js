import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/basepage'
// componente HOC(hig order component) para saber si esta logueado o no
import withAuth from '../components/HOC/withAuth'
import SlateEditor from '../components/slate-editor/editor'
import {createBlog} from '../actions/index'
class BlogEditor extends React.Component{
    constructor(props){
        super(props)
        //estado de estar guardando blog "isSaving"
        this.state={
            isSaving:false
        }
        this.saveBlog=this.saveBlog.bind(this);
    }
    
    saveBlog(story,heading){
        const blog={};
        blog.title=heading.title;
        blog.subTitle = heading.subtitle;
        blog.story=story;
        console.log(blog)
        this.setState({isSaving:true})
        debugger
        createBlog(blog).then(data=>{
            debugger
            this.setState({isSaving:false})
            console.log(data)
        // })
        }).catch((err) => {
            debugger
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