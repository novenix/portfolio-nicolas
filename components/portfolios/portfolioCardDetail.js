import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment'

class PortfolioCardDetail extends React.Component {
  
  render() {
      const {isOpen,toggle,portfolio}=this.props;
    return (
      <div>
        
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>{portfolio.title}</ModalHeader>
          <ModalBody>
            <p><b> Descripción:</b>{portfolio.description}</p>
            <p><b> Compañia:</b>{portfolio.company}</p>
            <p><b> Posición:</b>{portfolio.position}</p>
            <p><b> Ubicación:</b>{portfolio.location}</p>
            {/* <p><b> Fecha Inicial:</b>{portfolio.startDate}</p>
            <p><b> Fecha Inicial:</b>{portfolio.endDate}</p> */}
            <p><b> Fecha Inicial:</b>{moment(portfolio.startDate).format('MMMM YYYY')}</p>
            <p><b> Fecha Final:</b>{portfolio.endDate?moment(portfolio.endDate).format('MMMM YYYY'):'aun trabaja aquí'}</p>
           
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>Salir</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default PortfolioCardDetail;