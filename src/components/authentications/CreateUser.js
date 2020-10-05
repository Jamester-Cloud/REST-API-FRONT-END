import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Axios from 'axios';
import Complements from '../complementary/Complements';
import $ from 'jquery';

export default function CreateUser() {

    const { register, handleSubmit, errors } = useForm();

    //Mensajes
    function Messages(Message){
        Complements(Message);
    }

    useEffect(()=>{
        var text = document.getElementById('username')
        // tomando cada tecla del usuario
        text.addEventListener('keyup', (e)=>{
            // recogiendo el valor del input a traves del evento
            var inputText =e.path[0].value 
            //Agregando al div y quitando espacios en blanco
            document.querySelector(".Texto").innerHTML = inputText.trim();
            // iniciando comprobacion del usuario
            Axios.post('http://localhost:4000/api/usuarios/checkUser', {
                username:inputText
            }).then(res=>{
                console.log(res.data)
                if(res.statusText==="OK"){
                    if(res.data.length === 0){
                        
                        // si no se encuentra ningun registro
                        //cambiar a clase de exito
                       $(".Texto").addClass("text-success").removeClass('text-danger')
                       //Activar el boton de envio
                       $("#botonEnviar").removeAttr('disabled')
                    }else if(res.data[0].username === inputText){
                       $(".Texto").addClass("text-danger").removeClass('text-success')
                       document.querySelector(".Texto").innerHTML = "Este nombre de usuario ya existe"
                       $("#botonEnviar").attr('disabled','true')
                    }
                }
            })
        })
    })

    //Funcion de envio de informacion
    const onSubmit = async data =>{ 
        console.log(data);
        // Envio de informacion para editar
        await Axios.post('http://localhost:4000/api/authentications/signup',{
           //persona data
           nombrePersona:data.nombrePersona,
           apellidoPersona:data.apellidoPersona,
           correoPersona:data.correoPersona,
           //User data
           username:data.username.trim(),
           pass:data.pass
           //
          }).then((res)=>{
              if(res.statusText === 'OK'){
                    //Almacenando bandera de inicio de sesion admin en SessionStorage
                    sessionStorage.setItem('isLoggedInClient',true);
                    //Login in true
                    sessionStorage.setItem('isLoggedIn',true);
                    // almacenando el id del cliente en el la session
                    sessionStorage.setItem('Cliente',res.data[0].idCliente);
                    // almacenando el id del usuario en el la session
                    sessionStorage.setItem('Usuario',res.data[0].idUsuario);
                    //almacenando usuario en localStorage
                    sessionStorage.setItem('Username',res.data[0].username);
                    //almacenando perfil en la session
                    sessionStorage.setItem('perfil',res.data[0].perfil);
                    
                    Messages("Bienvenido: " + res.data[0].username)

                    window.location.href="/ClientDashboard";
              }
          }).catch((err)=>{
            console.log(err);
          })
    }
    

    return (
        <div className="container p-5 mt-5">
            <div className="row">
                <div className="col-md-10 mx-auto">
                    <div className="card">
                        <div className="card-header">
                            <h3>Registro de usuarios</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h4>Informacion basica de contacto:</h4>
                                <div className="form-group">
                                    <input type="text" className="form-control campoObligatorio" name="nombrePersona" ref={register({ required: true, pattern: /^[A-Za-z]+$/i })} placeholder="Ingrese su nombre" autoFocus />
                                    {errors.nombrePersona && errors.nombrePersona.type === "required" &&  <span className="ml-2 text-danger">Campo requerido</span>}
                                    {errors.nombrePersona && errors.nombrePersona.type === "pattern"  &&  <span className="ml-2 text-danger">Solo se permiten letras</span> }
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control campoObligatorio" name="apellidoPersona" ref={register({ required: true, pattern: /^[A-Za-z]+$/i })} placeholder="Ingrese su apellido" autoFocus/>
                                    {errors.apellidoPersona && errors.apellidoPersona.type==="required" &&  <span className="ml-2 text-danger">Campo requerido</span>}
                                    {errors.apellidoPersona && errors.apellidoPersona.type === "pattern" && <span className="ml-2 text-danger">Solo se permiten letras</span> }
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control campoObligatorio correoElectronico" ref={register({ required: true , pattern:/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })} name="correoPersona" placeholder="Ingrese su correo electronico" autoFocus/>
                                    {errors.correoPersona && errors.correoPersona.type==="required" &&  <span className="ml-2 text-danger">Campo requerido</span>}
                                    {errors.correoPersona && errors.correoPersona.type === "pattern" && <span className="ml-2 text-danger">Ingrese una direccion de correo electronica valida</span> }
                                </div>
                                <hr/>
                                <h4>Registro del usuario:</h4>
                                <hr/>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <input type="text" className="form-control campoObligatorio" ref={register({ required: true , pattern: /^[a-zA-Z ]*$/ })} id="username" name="username" placeholder="Nombre de usuario" autoFocus/>
                                        {errors.username && errors.username.type === "required" && <span className="ml-2 text-danger">Campo requerido</span>}
                                        {errors.username && errors.username.type === "pattern" && <span className="ml-2 text-danger">No se permiten caracteres especiales</span> }
                                        
                                    </div>
                                    <div className="form-group col-md-6">

                                        <p>
                                            <div className="Texto text-center">

                                            </div>
                                        </p>
                                        
                                    </div>
                                    <div className="form-group col-md-5">
                                        <input type="password" minLength="8" ref={register({ required: true })} className="form-control campoObligatorio" id="pass" name="pass" placeholder="Contraseña" autoFocus/>
                                        {errors.pass && <span className="ml-2 text-danger">Campo requerido</span>}
                                    </div>
                                    <div className="form-group col-md-7 text-right">
                                    
                                        <p>Recomendamos crear una contraseña.</p>
                                        <h6>Que contenga mayusculas, minusculas, numeros y simbolos</h6>
                                        
                                    </div>
                                    <div className="form-group col-md-12 mt-5 text-center" >
                                        <button id="botonEnviar" className="btn btn-success ">
                                            Registrarse
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

