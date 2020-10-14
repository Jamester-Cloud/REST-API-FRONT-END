import React, { Component } from 'react'
import refreshFunction from '../../complementary/refreshFunction';
import Complements from '../../complementary/Complements';

//Loading
import PageLoading from '../../PageLoading';

//error Page
import PageError from '../../PageError';

//
import axios from 'axios';

import $ from 'jquery';
import Tippy from '@tippyjs/react';

export default class DataTables extends Component {

    signal = axios.CancelToken.source();

    state={
      usuarios:[], // -> data State
      error:null,
      loading:true
    }
    //Obteniendo a todos los usuarios
    async getUsers(){
        this.setState({
            loading:true , error:null
        })
        await axios.get('http://localhost:4000/api/usuarios', {cancelToken: this.signal.token})
        .then(res=>{
            this.setState({
                usuarios:res.data,
                loading:false
            });
            $("#producto").DataTable();
        }).catch(err=>{
            this.setState({loading:false, error:err });
        })        
    }

    componentWillUnmount() {
      this.signal.cancel('Api is being canceled');
    } 
  
      async deleteUser(id){
        await axios.delete('http://localhost:4000/api/usuarios', {cancelToken: this.signal.token}, {data:{idUsuario:id}})
        .catch(err=>{
            this.setState({loading:false, error:err });
          });
        this.refresh();
        this.Messages('Usuario Bloqueado');
      }
  
      async activeUser(id){
        await axios.post('http://localhost:4000/api/usuarios/activeUser', {cancelToken: this.signal.token}, {idUsuario:id})
        .catch(err=>{
            this.setState({loading:false, error:err });
          });
        this.refresh();
        this.Messages('Usuario Activado');
      }
      //si el usuario es el actual en la session se debera cerrar la session, para que la vuelva a abrir
      async changeProfile(id){
          await axios.put('http://localhost:4000/api/usuarios/checkUser', {cancelToken: this.signal.token}, {
              idUsuario:id
          }).then( async (res)=>{
              // si la peticion al servidor estubo correcta.
              if(res.statusText==='OK'){
                  // si el id del usuario coincide con el id el usuario actual (LogOut)
                  if(res.data === parseInt((sessionStorage.getItem('Usuario')))){
                      await axios.get('http://localhost:4000/api/authentications/logout')
                          .then((res)=>{
                              if(res.statusText === "OK"){
                                  // eliminando informacion de la session
                                  sessionStorage.clear();
                                  //Redireccionando
                                  window.location.href = "/";
                              }
                          }).catch(err=>{
                              console.log(err);
  
                          })
                  }else{
                      this.Messages('Se cambió de rol al usuario');
                      this.refresh();
                  }
              //Si no enviar un mensaje de error
              }
          }).catch(err=>{
              console.log(err);
          })
      }
  
      refresh(){
        this.destroyDataTables();
        this.getUsers();
      }

      componentDidMount(){
        this.getUsers();
        this.Messages=Complements.bind(this);
        this.destroyDataTables=refreshFunction.bind();
      }

      componentWillUnmount() {
        this.signal.cancel('Api is being canceled');
      }

    render() {

        if(this.state.loading === true){
            return (
                <div className="row justify-content-center fadeIn">
                        <div className="col-bg-12">
                            <PageLoading />
                        </div>
                </div> 
            );
        }

        if(this.state.error){
            return (
                <div className="row justify-content-center fadeIn">
                        <div className="col-bg-12">
                            <PageError errors={this.state.error} />
                        </div>
                </div> 
            );
        }
        return (           
            <div className="card-body">
              <div className="tab-content text-left">
                <div className="tab-pane active" id="inicio">
                <div className="toolbar text-right p-3">
                    <Tippy content="Refrescar" placement="top" animation="shift-away">
                        <button className="btn btn-icon btn-round btn-primary btn-md mr-3 " title="Refrescar" onClick={()=>this.refresh()}> 
                            <i className="fa fa-sync-alt"></i>  
                             
                        </button>
                    </Tippy>
                    <Tippy content="Usuarios Conectados" placement="top" animation="shift-away">
                        <button className="btn btn-icon btn-round btn-info btn-md mr-3" title="Ver usuarios conectados" onClick={()=>this.getUsers()}> <i className="fa fa-users"></i> </button>
                    </Tippy>
                </div>

                    <div className="table-responsive table-hover">
                        <table id="producto" className="table table-striped">
                            <thead>
                                <tr>
                                    <th colSpan="1">Nombre</th>
                                    <th colSpan="1">Apellido</th>
                                    <th colSpan="1">Correo</th>
                                    <th className="1">Perfil</th>
                                    <th colSpan="1">Estatus</th> 
                                    <th colSpan="1">Accion</th>
                                    <th colSpan="1"></th>                  
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.usuarios.map((users,i)=>
                                  <tr key={i}>
                                         <td>{users.nombrePersona}</td>
                                         <td>{users.apellidoPersona}</td>
                                         <td>{users.correoPersona}</td>
                                         <td>{users.perfil}</td>
                                         
                                        {users.estatusUsuario === "0" ? 
                                         <td><p className="badge badge-danger"> Bloqueado</p></td>
                                         
                                        :<td><p className="badge badge-success">Activado</p></td>
                                        }

                                        {users.estatusUsuario === "0"  
                                        ? <td><Tippy content="Editar" position="top" animation="fade"><button onClick={() => this.activeUser(users.idUsuario)} className='btn btn-icon btn-round btn-sm btn-success'><i className="fa fa-user-check"></i></button></Tippy></td>
                                         
                                        :<td><Tippy content="Bloquear" position="top" animation="fade"><button onClick={() => this.deleteUser(users.idUsuario)} className='btn btn-icon btn-round btn-sm btn-danger'><i className="fa fa-lock"></i></button></Tippy></td>
                                        }
                                        <td><Tippy content="Cambiar rol" position="top" animation="fade"><button onClick={() => this.changeProfile(users.idUsuario)} className='btn btn-icon btn-round btn-sm btn-info'><i className="fa fa-sync-alt"></i></button></Tippy></td>
                                        
                                    </tr>
                                )
                                }
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
