// solo para usuarios logueados (pag secreta solo para los logueados)
import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/basepage'
// componente HOC(hig order component) para saber si esta logueado o no
// recibe rol y recibe la pag que recibe autenticacion
import withAuth from '../components/HOC/withAuth'
import{getSecretData} from '../actions'

class Secret extends React.Component{
//    esta estaba static async
     static async getInitialProps({req}){
        const anotherSecretData=  await getSecretData(req)
        
        return{anotherSecretData}
    }
    state={
        secretData:[]
    }
    // cuando el componente se vaya a montar
    async componentDidMount(){
        const secretData=await getSecretData();
        
       //  ;
        this.setState({
            secretData
        });
    }
    displaySecretData(){
        const{secretData}=this.state;
        
        if(secretData&&secretData.length>0){
            return secretData.map((data,index)=>{
                return(
                    <div key={index} >
                        <p>{data.title}</p>
                        <p>{data.description}</p>
                    </div>
                )
            })
        }
        else{
            return null;
        }
    }
    render(){
        //   ;
        const {superSecretValue}=this.props;
        
        
        return(   
            
            <BaseLayout {...this.props.auth} >
                    <BasePage>
                        <h1> soy secret </h1> 
                        <p>secret content</p>  
                        <h2>{superSecretValue}</h2> 
                        {this.displaySecretData()} 
                    </BasePage>       
                </BaseLayout>     
            
           
           
           
            
        )
    }
}
// se usa el withAuth, y puedo mostrar en todas las paginas que se necesiten que por favor
// se loguee
export default withAuth()(Secret);