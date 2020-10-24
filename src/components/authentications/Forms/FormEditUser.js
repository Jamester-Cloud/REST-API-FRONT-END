import React, {useEffect }from "react";
import { useForm } from "react-hook-form";
import Axios from 'axios';
import Complements from '../../complementary/Complements';
import { useHistory } from "react-router-dom";

export default function EditCategories(props) {
  
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();
  let idEditing = props.match.params.id;
  

  function Messages(Message){
    Complements(Message);
  }

 

   // Funcion que ese ejecuta al inicio del componente 
   useEffect(() => {
    // Carga de categorias para el select
    const fetchDataUsuario = async () => {
      await Axios.post('https://bakery-backend.herokuapp.com/api/usuarios/getUser',{
        idUsuario:idEditing
      }).then((res)=>{
          console.log(res);
        //rellenando el nombre de usuario
        const username =  document.getElementById('username')
        username.value = res.data[0].username;
        //nombre de la persona
        const nombrePersona =  document.getElementById('nombrePersona')
        nombrePersona.value = res.data[0].nombrePersona;
        //Apellido persona
        const apellidoPersona =  document.getElementById('apellidoPersona')
        apellidoPersona.value = res.data[0].apellidoPersona;
        //Correo Electronico
        const correoElectronico =  document.getElementById('correoElectronico')
        correoElectronico.value = res.data[0].correoPersona;


      }).catch(err=>{
            console.log(err);
      })
 
      
    };
 
    fetchDataUsuario();
  });


  const onSubmit = async data =>{ 
      // Envio de informacion para editar
    await  Axios.put('https://bakery-backend.herokuapp.com/api/usuarios',{
        idUsuario:props.match.params.id,
        username:data.username,
        nombrePersona:data.nombrePersona,
        apellidoPersona:data.apellidoPersona,
        correoPersona:data.correoElectronico
      }).then((res)=>{
          if(res.statusText === 'OK'){
            Messages('Su usuario ha sido modificado exitosamente')
            history.push('/userInfo')
          }
      }).catch((err)=>{
        console.log(err);
      })
      
  }



  


  return (
      <div className="content mt-5">
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header text-center">
                        <img className="card-img-top mx-auto m-1 rounded-circle h-5 w-25" src="../img/birthday-cake-cupcakes-with-chocolate-frosting-fb-ig-3.jpg" alt="UserProfile"/>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <h6 className="title">Usuario</h6>    
                        <div className="row">    
                        
                            <div className="col-md-12 px-1">
                            <div className="form-group">
                                <label htmlFor="username">Nombre de usuario</label>
                                <input type="text" ref={register({ required: true })} className="form-control" name="username" id="username" placeholder="Nombre de usuario" />
                                {errors.username && <span className="ml-2 text-danger">Campo requerido</span>}
                            </div>
                            </div>
                            
                        </div>
                        <hr/>
                        <h6 className="title">Informacion Basica</h6>  
                        <div className="row">
                            <div className="col-md-6 pr-1">
                            <div className="form-group">
                                <label htmlFor="nombrePersona">Nombres</label>
                                <input type="text" ref={register({ required: true })} className="form-control" name="nombrePersona" id="nombrePersona" placeholder="Nombres"/>
                                {errors.nombrePersona && <span className="ml-2 text-danger">Campo requerido</span>}
                            </div>
                            </div>
                            <div className="col-md-6 pl-1">
                            <div className="form-group">
                                <label htmlFor="apellidoPersona">Apellidos</label>
                                <input type="text" ref={register({ required: true })} className="form-control" name="apellidoPersona" id="apellidoPersona" placeholder="Apellidos"  />
                                {errors.apellidoPersona && <span className="ml-2 text-danger">Campo requerido</span>}
                            </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                            <div className="Email-group">
                                <label htmlFor="correoElectronico">Correo Electronico</label>
                                <input type="email" ref={register({ required: true })} className="form-control" placeholder="Correo Electronico" id="correoElectronico" name="correoElectronico"/>
                                {errors.correoElectronico && <span className="ml-2 text-danger">Campo requerido</span>}
                            </div>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col-md-12">
                                <button type="submit" className="btn btn-primary btn-round"> Modificar</button>
                            </div>
                        </div>
                        
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
    ); 
  
}
