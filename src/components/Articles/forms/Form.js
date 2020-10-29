
/* eslint-disable */

import React, { useState, useEffect, useMemo}from "react";
import { useForm } from "react-hook-form";
import Axios from 'axios';
import Complements from '../../complementary/Complements';
import { useHistory } from "react-router-dom";
import $ from 'jquery';
import * as Yup from "yup";

export default function FormArticulo(props){
  //probar otra libreria

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
        'https://bakery-backend.herokuapp.com/api/categorias',
      );
 
      setData(result.data);
      
    };
 
    fetchDataCategories();

    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
          $('#blah').attr('src', e.target.result);
        }
        
        reader.readAsDataURL(input.files[0]); // convert to base64 string
      }
    } 

    $("#picture").change(function() {
      readURL(this);
    });




  }, []);
// carga de los campos en caso de edicion
if(idEditing !== undefined){
  Axios.post('https://bakery-backend.herokuapp.com/api/articulos/getArt',{
    idArticulo:idEditing
  }).then((res)=>{

    //Carga de datos
     const nombre =  document.getElementById('nombre')
     nombre.value = res.data[0].nombre;

     const descripcion =  document.getElementById('descripcion')
     descripcion.value = res.data[0].descripcion;

     const precio =  document.getElementById('precio')
     precio.value = res.data[0].precio;

     const stock =  document.getElementById('stock')
     stock.value = res.data[0].stock;
     //Carga de los selects
     const categoria =  document.getElementById('categoria')
     let ca = categoria.options;
    
      for (let i = 1; i < ca.length; i++) {
        if(ca[i].innerText === res.data[0].categoria){
          categoria.value= ca[i].value;
        }
      }

      Edit=true;
  })
}

/// adding a schme validation using yup (Not working. I must fix it in another project (app)
// UPDATE: fix it...now just the image validation works. so i need to fix all the other fields in order to validate the rest of the form
// and not just the file input for the article picture
  const schema = Yup.object().shape({
    nombre:Yup
     .string()
     .required('Campo obligatorio'),
     descripcion:Yup
      .string()
      .required('Campo obligatorio'),
     stock:Yup
      .number()
      .positive()
      .typeError('Ingrese solo numeros positivos')
      .min(2, 'Minimo 2 caracteres')
      .required('Campo obligatorio'),
     precio:Yup
      .number()
      .required('Campo obligatorio')
      .typeError('Ingrese solo numeros positivos')
      .min(6, 'Minimo 6 caracteres'),
     categoria:Yup
      .string()
      .required('Campo obligatorio'),
         
});

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const onSubmit = async (fields) => {
        if(Edit){ // editando el articulo
          var formData = new FormData();
          var imagefile = fields.picture[0];

          formData.append("image", imagefile);
          formData.append("idCategoria", fields.categoria);
          formData.append("nombre", fields.nombre);
          formData.append("descripcion", fields.descripcion);
          formData.append("precio", fields.precio);
          formData.append("stock", fields.stock);
          // id para la edicion
          formData.append('idArticulo', props.match.params.id);
          // Envio de informacion para editar
          await Axios.put('https://bakery-backend.herokuapp.com/api/articulos',formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res)=>{
              if(res.statusText === 'OK'){
                Messages('Articulo Modificado');
                window.location.href='/articulo';
              }
          }).catch((err)=>{
              alert(err);
          })
    }else{ // Agregando articulo
      var formData = new FormData();
      var imagefile = fields.picture[0];

      formData.append("image", imagefile);
      formData.append("idCategoria", fields.categoria);
      formData.append("nombre", fields.nombre);
      formData.append("descripcion", fields.descripcion);
      formData.append("precio", fields.precio);
      formData.append("stock", fields.stock);

      await Axios.post('https://bakery-backend.herokuapp.com/api/articulos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res)=>{
          if(res.statusText === 'OK'){
            Messages('Articulo agregado');
            window.location.href='/articulo';
          }
      }).catch((err)=>{
          alert(err);
      })
    }
  };
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
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" className="form-control campoObligatorio" name="nombre" id="nombre"  ref={register} placeholder="Ingrese el nombre del articulo" />
                      {errors.nombre &&  <span className="ml-2 text-danger">{errors.nombre.message}</span>}
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="nombre">Descripción:</label>
                    <textarea type="text" className="form-control campoObligatorio" defaultValue="" name="descripcion" id="descripcion" ref={register} placeholder="Ingrese el descripcion del articulo" ></textarea>
                    {errors.descripcion && <span className="ml-2 text-danger">{errors.descripcion.message}</span>}
                  </div>
                      
                  <div className="form-group col-md-6">
                    <label htmlFor="stock">Stock:</label>
                    <input type="text" maxLength="2" className="form-control campoObligatorio" name="stock" id="stock" ref={register({ required: true, pattern:/^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/ })} placeholder="Ingrese el stock disponible" />
                      {errors.stock &&  <span className="ml-2 text-danger">{errors.stock.message}</span>}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="precio">Precio:</label>
                    <input type="text" className="form-control campoObligatorio" name="precio" id="precio" ref={register({ required: true, pattern:/^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/ })} placeholder="Ingrese el precio actual del articulo" />
                    {errors.precio && <span className="ml-2 text-danger">{errors.precio.message}</span>}
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
