import React from "react";
import { useForm } from "react-hook-form";
import Axios from 'axios';
import Complements from '../../complementary/Complements';
import { useHistory } from "react-router-dom";

export default function EditCategories(props) {
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
    await  Axios.put('http://localhost:4000/api/categorias',{
        idCategoria:props.match.params.id,
        categoria:data.categoria
      }).then((res)=>{
          if(res.statusText === 'OK'){
            Messages('Categoria Modificada');
            history.push('/Categoria')
          }
      }).catch((err)=>{
        console.log(err);
      })
    }else{
      // Envio de informacion para registrar
      Axios.post('http://localhost:4000/api/categorias',{
        categoria:data.categoria
      }).then((res)=>{
          if(res.statusText === 'OK'){
            Messages('Categoria Registrada');
            history.push('/Categoria')
          }
      }).catch((err)=>{
        console.log(err);
      })
    }
}

  
  Axios.post('http://localhost:4000/api/categorias/getCategoria',{
     idCategoria:idEditing
  }).then((res)=>{
    if(idEditing!==undefined){
      let categoryValue = document.getElementById('categoria')
      categoryValue.value=res.data[0].categoria;
      Edit=true;
    }
  })


  return (
      <div className="content mt-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <h3 className="text-left "> Categoria</h3>
            <div className="text-right"><button className=" btn btn-round btn-icon btn-info" onClick={()=>history.push('/Categoria')}><i className="fa fa-arrow-left"></i></button></div>
          </div>
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-md-12 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="categoria">Categoria:</label>
                    <input type="text" className="form-control campoObligatorio" name="categoria" id="categoria" ref={register({ required: true })} placeholder="Ingrese el nombre de la categoria" />
                    {errors.categoria && <span className="ml-2 text-danger">Campo requerido</span>}
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
