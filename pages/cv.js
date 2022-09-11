import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/basepage'
import {Row,Col} from 'reactstrap'
class Cv extends React.Component{
    render(){
        return(           
            <BaseLayout title='Nicolas Torres - Descarga Mi CV' {...this.props.auth} >
                <BasePage title="Preview de mi CV" className='cv-page' >
                    <Row>
                        <Col md={{size:8,offset:2}} >
                            <div className='cv-title' >
                            <h2>contacto:</h2>
                                <p>Si desean contactarme, favor hacerlo por medios como Linkedin, o Computrabajo</p>
                                <p>contnikotorr@hotmail.com</p>
                                <p>https://www.linkedin.com/in/nicolastorrespaez/</p>
                                
                                <a download='cv_nicolas.pdf'
                                    className='btn btn-success'
                                    href=''
                                >
                                    Descargar
                                </a>
                               
                            </div>
                            <iframe style={{width:'100%',height:'800px'}} src='/static/cv_nicolas.pdf' ></iframe>
                        </Col>
                    </Row>
                   
                </BasePage>       
            </BaseLayout>
           
            
        )
    }
}
export default Cv;
