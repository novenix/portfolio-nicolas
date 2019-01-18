'use strict'
import React from 'react'
import axios from 'axios'
import BaseLayout from '../components/layouts/BaseLayout'
import SuperComponent from '../components/superComponent'
// class component
// more functionality
// more stuff
// use lifecicle function

class Index extends  SuperComponent{
    // para un feetch en axios
    static async getInitialProps(){
        let userData={};
        try{
            const response=await axios.get('https://jsonplaceholder.typicode.com/todos/1')
            userData=response.data
        }
        catch(err){
            console.log(err)
        }
        return{initialData:[1,2,3,4],userData}
    }
    constructor(props){
        
        super(props);
       
        this.state={
            title:"i am in index p  age"
        }
        // this.updateTitle=this.actualizarTitulo.bind(this) se usa cuando no se hace arrow y 
        console.log("constructor")        
    }
    componentDidMount(){
        console.log("componentdimount")
        
    }
    // componentDidUpdate(){
    // console.log("component did update")

    // }
    // componentWillMount(){
    //     console.log("componentwillunmount")
    // }
    updateTitle=()=>{
        // debugger;
        // console.log('soy el titulo update')
        this.setState({title:'holi, index updated'})
    }
    render(){
        // debugger;
        const {title}= this.state; // const title= this.state.title;
        const{userData,initialData}=this.props;
        console.log("render")
        return(
            
            <BaseLayout>
                <h1 className='fromPage' >index from class component</h1>         
                {/* mostrar state */}
                <h2>{title}</h2>
                <button onClick={this.updateTitle} >change Title</button>
                <h3>{initialData}</h3>
                <h3>{userData.title}</h3>
            </BaseLayout>
            
            
        )
    }
}
export default Index;