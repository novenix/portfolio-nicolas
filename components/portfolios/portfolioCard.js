import React from 'react'
import{Card,CardBody,CardHeader,CardText,CardTitle,Button} from 'reactstrap'
import PortfolioCardDetail from './portfolioCardDetail'
export default class PortfolioCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          isOpen: false
        };
    
        this.handleToggle = this.handleToggle.bind(this);
    }
    handleToggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
      }
    render(){

        const {portfolio,children}=this.props;
        const {isOpen}=this.state;
        return(
            
            <span onClick={this.handleToggle} >
                <PortfolioCardDetail toggle={this.handleToggle} portfolio={portfolio} isOpen={isOpen}/>
                <Card className="portfolio-card">
                        <CardHeader className="portfolio-card-header">Compañia: {portfolio.company}</CardHeader>
                        <CardBody>
                            <p className="portfolio-card-city"> Ubicación: {portfolio.location} </p>
                            <CardTitle className="portfolio-card-title">Posición: {portfolio.position}</CardTitle>
                            <CardText className="portfolio-card-text">Descripción {portfolio.description}</CardText>
                        <div className="readMore">
                            
                            </div>
                        </CardBody>
                        {children}
                    </Card>
            </span>
                    
        )
    }
}