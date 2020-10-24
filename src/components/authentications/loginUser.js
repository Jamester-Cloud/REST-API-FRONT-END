import React, { Component } from 'react'
import axios from 'axios';

import Complements from '../complementary/Complements';

export default class loginUser extends Component {

    onChange = e =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    state={
        username:'',
        pass:'',
        redirect:false
    }

    componentDidMount(){
        this.messages=Complements.bind();
    }

    onSubmit=e=>{
        e.preventDefault();
        const { username, pass } = this.state;
        this.setState({ error: false });

        axios.post('https://bakery-backend.herokuapp.com/api/authentications/signin',{
            username:username,
            pass:pass
        }).then((res)=>{
            if(res.statusText==='OK'){
                if(res.data[0].perfil === "Administrador"){
                    //Almacenando bandera de inicio de sesion admin en SessionStorage
                    sessionStorage.setItem('isLoggedInAdmin',true);
                    //Login in true
                    sessionStorage.setItem('isLoggedIn',true);
                    // almacenando el id del cliente en el la session
                    sessionStorage.setItem('Cliente',res.data[0].idCliente);
                    // almacenando el perfil del usuario en la session
                    sessionStorage.setItem('perfil',res.data[0].perfil);
                    // almacenando el id del usuario en el la session
                    sessionStorage.setItem('Usuario',res.data[0].idUsuario);
                    //almacenando usuario en localStorage
                    sessionStorage.setItem('Username',res.data[0].username);
                    //Redireccion
                    window.location.href="/Dashboard";
                }else{
                     //Almacenando bandera de inicio de sesion admin en SessionStorage
                     sessionStorage.setItem('isLoggedInClient',true);
                     //Login in true
                     sessionStorage.setItem('isLoggedIn',true);
                     // almacenando el id del cliente en el la session
                     sessionStorage.setItem('Cliente',res.data[0].idCliente);
                     // almacenando el id del usuario en el la session
                     sessionStorage.setItem('Usuario',res.data[0].idUsuario);
                     //almacenando el perfil del usuario
                     sessionStorage.setItem('perfil',res.data[0].perfil);
                     //almacenando usuario en localStorage
                     sessionStorage.setItem('Username',res.data[0].username);

                     window.location.href="/ClientDashboard";
                }             
              //  
            }
        }).catch((err)=>{
            if (err.response.status === 401) { // contraseña o usuario incorrectos
                this.messages("Contraseña o nombre de usuario incorrectos");
            }else{
                this.messages("Error de conexion");
            }
        })
    }

    render() {
            return (
                <div>
     
                <div className="container p-5 mb-5 mt-5">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="card text-center">
                                <div className="card-header">
                                    <h3>Inicio de sesion</h3>
                                    <img src="/img/374080.jpg" alt="coffee" className="card-img-top mx-auto m-1 rounded-circle h-10 w-50" />
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.onSubmit} id="usuarios">
                                        <div className="form-group">
                                            <input type="text" onChange={this.onChange} className="form-control campoObligatorio" name="username" value={this.state.username} placeholder="Nombre de usuario" autoFocus />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" onChange={this.onChange} className="form-control campoObligatorio" name="pass" value={this.state.pass} placeholder="Contraseña" autoFocus/>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-success" onSubmit={this.onSubmit}>
                                                Iniciar Sesion
                                            </button>
                                        </div>
                                    </form>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            )

        
        
    }
}
