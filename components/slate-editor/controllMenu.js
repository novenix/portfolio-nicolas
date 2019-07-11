import {Button} from 'reactstrap'

const ControlMenu=(props)=>{
    return (
        <div className="controll-menu">
            <h1 className="title"> Escribe tu historia....</h1>
            <div className="status-box">
                {props.isLoading?"Guardando...":'Guardado.'}
            </div>
            <Button onClick={props.save} color="success">Guardar</Button>
        </div>
    )
}
export default ControlMenu;