import React from 'react'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import Complements from '../../complementary/Complements';


export default function Form(props) {
    const { register, handleSubmit, errors } = useForm();
    const totalApagar = props.totalPagar;
     

    function Messages(Message){
        Complements(Message);
    }

    let history = useHistory();

    const onSubmit=async data=>{
        Axios.post('http://localhost:4000/api/store',{
            idCliente:parseInt(sessionStorage.getItem('Cliente')),
            descripcion:data.descripcion,
            fechaEntrega:data.fechaEntrega,
            totalApagar:data.totalPagar,
        }).then(()=>{
            Messages('Pedido realizado exitosamente');
            history.push('/tiendaOnline')
        }).catch(err=>{
            console.log(err);
        })
    } 
    return (
        <div className="row justify-content-center">
            <div className="col-md-12 mx-auto">
                <h5 className="mb-5">Caja:</h5>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="descripcion">Descripcion del pedido</label>
                        <input type="text" className="form-control" name="descripcion" ref={register({ required: true })} placeholder="Describa el pedido-Ej: direccion de envio,calle,telefono"/>
                        {errors.descripcion && <span className="ml-2 text-danger">Campo requerido</span>}
                    </div>
                    <input type="hidden" name="totalPagar" ref={register({ required: true })} value={totalApagar} id="totalPagar"/>
                        {errors.totalApagar &&  Messages("No hay nada que comprar") } 
                    <div className="form-group">
                        <label htmlFor="fechaEntrega">Fecha de entrega</label>
                        <input type="date" className="form-control" name="fechaEntrega" ref={register({ required: true })} id="fechaEntrega" placeholder="Ingrese la fecha de entrega"/>
                        {errors.fechaEntrega && <span className="ml-2 text-danger">Campo requerido</span>}   
                    </div>
                    <input type="submit" className="btn btn-success btn-block mt-5" value="Agregar"/>
                </form>
            </div>
        </div>
    )
}
