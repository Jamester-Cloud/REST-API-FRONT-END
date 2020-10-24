import React from "react";
import { useForm } from "react-hook-form";
import Axios from 'axios';
import { useHistory } from "react-router-dom";
//Messages
import Complements from '../../complementary/Complements';


export default function Form(props) {
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();
  let idEditing = props.match.params.id;
  let Edit = false;
  
  function Messages(Message){
    Complements(Message);
  }

  const onSubmit = async data =>{ 
    if(Edit){
      // Envio de informacion para editar
    await  Axios.put('https://bakery-backend.herokuapp.com/api/perfil',{
        idPerfil:props.match.params.id,
        perfil:data.perfil
      }).then((res)=>{
          if(res.statusText === 'OK'){
            Messages('Perfil Modificado');
            history.push('/perfiles')
          }
      }).catch((err)=>{
        console.log(err);
      })
    }else{
      // Envio de informacion para registrar
      Axios.post('https://bakery-backend.herokuapp.com/api/perfil',{
        perfil:data.perfil
      }).then((res)=>{
          if(res.statusText === 'OK'){
            Messages('Perfil Registrado');
            history.push('/perfiles')
          }
      }).catch((err)=>{
        console.log(err);
      })
    }
}

  
  Axios.post('https://bakery-backend.herokuapp.com/api/perfil/getPerfil',{
    idPerfil:idEditing
  }).then((res)=>{
    if(idEditing!==undefined){
      let perfilValue = document.getElementById('perfil')
      perfilValue.value=res.data[0].perfil;
      Edit=true;
    }
  })


  return (
      <div className="content mt-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <h3 className="text-left">Perfil</h3>
            <div className="text-right"><button className=" btn btn-round btn-icon btn-info" onClick={()=>history.push('/perfiles')}><i className="fa fa-arrow-left"></i></button></div>
          </div>
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-md-12 mx-auto">
                <h5 className="mb-5">Agregar Perfiles</h5>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="perfils" className="error">Perfil:</label>
                    <input type="text" className="form-control campoObligatorio" name="perfil" id="perfil" ref={register({ required: true })} placeholder="Ingrese el nombre del perfil" />
                    {errors.perfil && <span className="ml-2 text-danger">Campo requerido</span>}
                  </div>
                  <button type="submit" className="btn btn-success btn-block mt-5" >Agregar</button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    ); 
  
}
