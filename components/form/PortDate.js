import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormGroup, Label, Button } from 'reactstrap';
 
export default class PortDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateValue: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
    }
 
    componentDidMount () {
        
        this.setState({isBrowserLoaded: true})
        
    }
 
    handleChange(date) {
        
        const{setFieldValue,setFieldTouched}=this.props.form;
        const{name}=this.props.field;
        // const formattedDate=date.format()
        this.setState({
            dateValue: date
        });
        setFieldValue(name,date,true);
        setFieldTouched(name,true,true);
    }
 
    render() {
        const {label,field,form:{touched,errors}}=this.props;
        const isLoaded = this.state;
        // const {touched,errors}=this.props.form;

        return (
            <React.Fragment>
                {}
                { this.state.isBrowserLoaded&&<Label>{label}</Label> && <div className="input-group">
                    <DatePicker
                        selected={this.state.dateValue}
                        onChange={this.handleChange}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        maxDate={this.state.dateValue}
                    />
                    {touched[field.name] &&
                    errors[field.name] && <div className="error">{errors[field.name]}</div>}
                </div>
                
                }
                
            </React.Fragment>
        );
    }
}
// import React from "react";
// import DatePicker from "react-datepicker";
// import moment from 'moment'
// import "react-datepicker/dist/react-datepicker.css";



// export default class PortDate extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       dateValue: moment()
//     };
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(date) {
//       debugger;
//     const formattedDate=date.format()
//     this.setState({
//         dateValue: date
//     });
//   }

//   render() {
//     return (
//       <DatePicker
//         selected={this.state.dateValue}
//         onChange={this.handleChange}
//       />
//     );
//   }
// }
