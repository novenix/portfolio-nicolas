// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, FormGroup, Label } from 'reactstrap';
import PortInput from '../form/portInput';

const validateInputs=(values)=>{
    let errors = {};
    // debugger;
    
    Object.entries(values).forEach(([key,value])=>{
        if(!values[key]){
            errors[key]=`El campo ${key} es requerido`
        }
        
    })

    return errors;
}
const INITIAL_VALUES={
    Título:'',
    Compañía:'',
    Ubicación:'',
    Posición:'',
    Descripción:'',
    startDate:'',
    endDate:''
}
const PortfolioCreateForm = () => (
  <div>
    
    
    <Formik
      initialValues={INITIAL_VALUES}
      validate={validateInputs}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
                     
            <Field  type="text" 
                    name="Título"
                    label='Título'
                    component={PortInput}/>
            <Field  type="text" 
                    name="Compañía"
                    label='Compañía'
                    component={PortInput}/>
            <Field  type="text" 
                    name="Ubicación"
                    label='Ubicación'
                    component={PortInput}/>
            <Field  type="text" 
                    name="Posición"
                    label='Posición'
                    component={PortInput}/>
            <Field  type="textarea" 
                    name="Descripción"
                    label='Descripción'
                    component={PortInput}/>
          
            
            
          

          

          <FormGroup>
          <Label>Fecha de inicio</Label>
          <Field className='form-control' type="text" name="startDate" />
          <ErrorMessage name="startDate" component="div" />
          </FormGroup>

          <FormGroup>
          <Label>Fecha final</Label>
          <Field className='form-control' type="text" name="endDate" />
          <ErrorMessage name="endDate" component="div" />
          </FormGroup>

          <button type="submit" disabled={isSubmitting}>
            Create
          </button>
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
