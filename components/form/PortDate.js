import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormGroup, Label, Button } from 'reactstrap';
 
export default class PortDate extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            maxDates:new Date(),
            dateValue: new Date(),
            isHidden:false
        };
        this.handleChange = this.handleChange.bind(this);
    }
 
    componentDidMount () {
        
        this.setState({isBrowserLoaded: true})
        
    }
    setFieldvalueAndTouched(date,touched){
        const{setFieldValue,setFieldTouched}=this.props.form;
        const{name}=this.props.field;    

        
        setFieldValue(name,date,true);
        setFieldTouched(name,touched,true);    
    }
    handleChange(date) {
        
        
        
        this.setState({
            dateValue: date
        });
       this.setFieldvalueAndTouched(date,true)
    }
    toggleDate(date){
      
        this.setState({
            isHidden:!this.state.isHidden
        })
        this.setFieldvalueAndTouched(date,true)
    }
    render() {
        const {label,canBeDisabled,field,form:{touched,errors}}=this.props;
        // const label=this.props;
        const isLoaded = this.state.isBrowserLoaded;
        const {isHidden,dateValue}=this.state;
        // const {touched,errors}=this.props.form;
       
        return (
            
            <React.Fragment>
                {<Label>{label}</Label>}
                { isLoaded && <div className="input-group">
                    { !isHidden&&               
                    <DatePicker
                        selected={dateValue}
                        onChange={this.handleChange}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        maxDate={this.state.maxDates}
                    />}
                    { canBeDisabled&& !isHidden&&<Button color="warning" size="sm"  onClick={()=>{this.toggleDate()}} >Aún trabaja aquí...</Button>}
                    {canBeDisabled&&isHidden&&
                        <React.Fragment>
                            <span> Aun trabajando aqui... </span>
                            <Button color="info" size="sm" onClick={()=>{this.toggleDate(dateValue)}} > Poner fecha Final </Button>
                        </React.Fragment>
                    }
                    {touched[field.name] &&
                    errors[field.name] && <div className="error">{errors[field.name]}</div>}
                </div>
                
                }
                
                
            </React.Fragment>
        );
    }
}
