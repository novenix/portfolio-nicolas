// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button,Alert} from 'reactstrap';
import PortInput from '../form/portInput';
import PortDate from '../form/PortDate'

const validateInputs=(values)=>{
    let errors = {};
     //debugger;
    
    Object.entries(values).forEach(([key,value])=>{
      //debugger;
        // if(!values[key] && (values[key]==="startDate" || values[key]==='endDate')){
          if (!values[key]  && key !== 'endDate') {
            errors[key]=`El campo ${key} es requerido`
        }
        
    })
    const startDate=values.startDate;
    const endDate=values.endDate;
    //if(startDate&&endDate&&endDate.isBefore(startDate)){
    if(startDate && endDate && endDate < startDate){
      errors.endDate='la fecha final no puede estar antes de la inicial';
    }

    return errors;
}

const PortfolioCreateForm = ({initialValues,onSubmit,error}) => (
  
  <div>
    
    
    <Formik
      initialValues={initialValues}
      validate={validateInputs}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
                     
            <Field  type="text"
                    name="title"
                    label='Título'
                    component={PortInput}/>
            <Field  type="text"
                    name="company"
                    label='Compañía'
                    component={PortInput}/>
            <Field  type="text"
                    name="location"
                    label='Ubicación'
                    component={PortInput}/>
            <Field  type="text"
                    name="position"
                    label='Posición'
                    component={PortInput}/>
            <Field  type="textarea"
                    name="description"
                    label='Descripción'
                    component={PortInput}/>
            <Field  
                    name="startDate"
                    label='Start Date'
                    initialDate={initialValues.startDate}
                    component={PortDate}/>

            <Field  
                    name="endDate"
                    label='End Date'
                    canBeDisabled={true}
                    initialDate={initialValues.endDate}
                    component={PortDate}/>
          {
            error&&
            <Alert color="danger">
              {error}
            </Alert>
          }
          <Button color="success" type="submit" disabled={isSubmitting}>
            Create
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default PortfolioCreateForm;



// import React from 'react'
// export default class PortfolioCreateForm extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {title: '',description:'',languaje:''};  
//       this.handleChange = this.handleChange.bind(this);    
//       this.handleSubmit = this.handleSubmit.bind(this);
//     }
  
//     handleChange(event) {   
        
//       const field=event.target.name;
//       this.setState({[field]: event.target.value});
//     }
    
  
//     handleSubmit(event) {
//       alert('A title was submitted: ' + this.state.title+' description '+this.state.description+' con lenguaje de programacion favorito '+this.state.languaje);
//       event.preventDefault();
//     }
  
//     render() {
       
//       return (
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             Name:
//             <input name='title' type="text" value={this.state.value} onChange={this.handleChange} />
            
//           </label>
//           <label>
//             Description:
//             <textarea name='description' value={this.state.value} onChange={this.handleChange} />
//           </label>
//           <label>
//             Selecciona tu lenguaje favorito de programacion:
//             <select name='languaje' value={this.state.value} onChange={this.handleChange}>
//                 <option value="JavaScript">JavaScript</option>
//                 <option value="Java">Java</option>
//                 <option value="Python">Python</option>
//                 <option value="C#">C#</option>
//             </select>
//           </label>
//           <input type="submit" value="Submit" />
//         </form>
//       );
//     }
//   }
