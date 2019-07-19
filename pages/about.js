import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/basepage'
// componente HOC(hig order component) para saber si esta logueado o no
import withAuth from '../components/HOC/withAuth'
import{Row,Col} from 'reactstrap'
class About extends React.Component{
    render(){
        return (            
            
                <BaseLayout title="Nicolas Torres - Conoceme" {...this.props.auth}>
        <BasePage className="about-page">
          <Row className="mt-5">
            <Col md="6">
              <div className="left-side">
                <h1 className="title fadein">Hola, Bienvenido</h1>
                <h4 className="subtitle fadein">A Acerca De Mi</h4>
                <p className="subsubTitle fadein">No Olvides de visitar Mis Blogs</p>
              </div>
            </Col>
            <Col md="6">
              <div className="fadein">
              <p>Descarga mi CV en la seccion de arriba </p>
                <p>Mi Nombre es Nicolás Torres </p>
                <p>
                Soy estudiante de la Escuela Colombiana De Ingenieria Julio Garavito
                </p>
                <p>
                Desde que empecé mi carrera he tenido mucha curiosidad por la programación web en general
                y desde que aprendí todo lo necesario de next.js (react.js) y Node.js junto con MongoDB 
                he podido realizar pequeños proyectos para servicios web con api rest.
                </p>
              </div>
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
            
           
        )
    }
};

export default  About;