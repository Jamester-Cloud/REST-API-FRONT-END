import React, { useState, useEffect}from "react";
import { useForm } from "react-hook-form";
import Axios from 'axios';
import Complements from '../../complementary/Complements';
import { useHistory } from "react-router-dom";


export default function FormArticulo(props){

  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();
  let Edit = false;
  let idEditing = props.match.params.id;
  const [records, setData] = useState({ categorias: [] });

  function Messages(Message){
    Complements(Message);
  }
 
  // Funcion que ese ejecuta al inicio del componente 
  useEffect(() => {
    // Carga de categorias para el select
    const fetchDataCategories = async () => {
      const result = await Axios.get(
        'http://localhost:4000/api/categorias',
      );
 
      setData(result.data);
      
    };
 
    fetchDataCategories();
  }, []);
// carga de los campos en caso de edicion
if(idEditing !== undefined){
  Axios.post('http://localhost:4000/api/articulos/getArt',{
    idArticulo:idEditing
  }).then((res)=>{
     const nombre =  document.getElementById('nombre')
     nombre.value = res.data[0].nombre;

     const precio =  document.getElementById('precio')
     precio.value = res.data[0].precio;

     const stock =  document.getElementById('stock')
     stock.value = res.data[0].stock;
     //Carga de los selects
     const categoria =  document.getElementById('categoria')
     let ca = categoria.options
    
      for (let i = 1; i < ca.length; i++) {
        if(ca[i].innerText === res.data[0].categoria){
          categoria.value= ca[i].value;
        }
      }

      Edit=true;
  })
}
  
  


  const onSubmit = async fields =>{ 
    if(Edit){
      console.log(fields.categoria);
      // Envio de informacion para editar
    await  Axios.put('http://localhost:4000/api/articulos',{
        idArticulo:props.match.params.id,
        idCategoria:fields.categoria,
        nombre:fields.nombre,
        precio:fields.precio,
        stock:fields.stock
      }).then((res)=>{
          if(res.statusText === 'OK'){
            Messages('Articulo Modificado');
            history.push('/articulo')
          }
      }).catch((err)=>{
        console.log(err);
      })
    }else{
      Axios.post('http://localhost:4000/api/articulos',{
        idCategoria:fields.categoria,
        nombre:fields.nombre,
        precio:fields.precio,
        stock:fields.stock
      }).then((res)=>{
          if(res.statusText === 'OK'){
            Messages('Articulo registrado');
            history.push('/articulo')
          }
      }).catch((err)=>{
        console.log(err);
      })
    }
}






  return (
      <div className="content mt-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <h3 className="text-left "> Articulo</h3>
            <div className="text-right"><button className=" btn btn-round btn-icon btn-info" onClick={()=>history.push('/articulo')}><i className="fa fa-arrow-left"></i></button></div>
          </div>
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-md-12 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" className="form-control campoObligatorio" name="nombre" id="nombre" ref={register({ pattern: /^[A-Za-z0-9\s]+$/g , required: true })} placeholder="Ingrese el nombre del articulo" />
                    {errors.nombre && errors.nombre.type === "required" && <span className="ml-2 text-danger">*Campo obligatorio</span>}
                    {errors.nombre && errors.nombre.type === "pattern" && <span className="ml-2 text-danger">*Solo se permiten letras</span> }

                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="stock">Stock:</label>
                    <input type="text" maxLength="2" className="form-control campoObligatorio" name="stock" id="stock" ref={register({ required: true, pattern:/^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/ })} placeholder="Ingrese el stock disponible" />
                    {errors.stock && errors.stock.type === "required" && <span className="ml-2 text-danger">*Campo obligatorio</span>}
                    {errors.stock && errors.stock.type === "pattern" && <span className="ml-2 text-danger">*Solo se permiten numeros entero positivos</span> }

                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="precio">Precio:</label>
                    <input type="text" className="form-control campoObligatorio" name="precio" id="precio" ref={register({ required: true, pattern:/^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/ })} placeholder="Ingrese el precio actual del articulo" />
                    {errors.precio && errors.precio.type === "required" && <span className="ml-2 text-danger">*Campo obligatorio</span>}
                    {errors.precio && errors.precio.type === "pattern" && <span className="ml-2 text-danger">*Solo se permiten numeros entero positivos</span> }

                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="categoria">Categoria:</label>
                   <select name="categoria" className="form-control" id="categoria" ref={register({ required: true })}>
                     <option value="">Seleccione una categoria</option>
                      {records.categorias.map((item,i) => (
                          <option key={i} value={item.idCategoria}>{item.categoria}</option>
                        ))}
                   </select>
                    {errors.categoria && <span className="ml-2 text-danger">*Campo requerido</span>}

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
