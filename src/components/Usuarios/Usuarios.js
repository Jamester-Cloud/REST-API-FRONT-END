import React, { Component } from 'react'
import axios from 'axios';
import $ from 'jquery';
import Complements from '../complementary/Complements';
import refreshFunction from '../complementary/refreshFunction';
//ToolTips
import Tippy from '@tippyjs/react';

export default class Usuarios extends Component {
    state={
        usuarios:[]
    }

    async getUsers(){
      const res = await axios.get('http://localhost:4000/api/usuarios');
      this.setState({usuarios:res.data });
      $("#producto").DataTable();
      console.log(res);
    }
    async deleteUser(id){
      await axios.delete('http://localhost:4000/api/usuarios',{data:{idUsuario:id}});
      this.refresh();
      this.Messages('Usuario Bloqueado');
    }

    async activeUser(id){
      await axios.post('http://localhost:4000/api/usuarios/activeUser',{idUsuario:id});
      this.refresh();
      this.Messages('Usuario Activado');
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
    render() {
        return (
            <div className="content mt-3 p-3">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Usuarios</h4>
                    </div>       
                    <div className="card-body">
                        <div className="tab-content text-left">
                            <div className="tab-pane active" id="inicio">
                            <div className="toolbar text-right p-3">
                                <Tippy content="Refrescar" placement="top" animation="shift-away">
                                    <button className="btn btn-icon btn-round btn-primary btn-md mr-3 " title="Refrescar" onClick={()=>this.refresh()}> 
                                        <i className="fa fa-sync-alt"></i>  
                                        <p>
                                            <span className="d-lg-none d-md-block">Refrescar</span>
                                        </p> 
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
                                                <th colSpan="1">Estatus</th> 
                                                <th>Accion</th>  
                                                                                           
                                               
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                            this.state.usuarios.map((users,i)=>
                                              <tr key={i}>
                                                     <td>{users.nombrePersona}</td>
                                                     <td>{users.apellidoPersona}</td>
                                                     <td>{users.correoPersona}</td>
                                                     
                                                    {users.estatusUsuario === "0" ? 
                                                     <td><p className="badge badge-danger"> Bloqueado</p></td>
                                                     
                                                    :<td><p className="badge badge-success">Activado</p></td>
                                                    }

                                                    {users.estatusUsuario === "0"  
                                                    ? <td><Tippy content="Editar" position="top" animation="fade"><button onClick={() => this.activeUser(users.idUsuario)} className='btn btn-icon btn-round btn-sm btn-success'><i className="fa fa-user-check"></i></button></Tippy></td>
                                                     
                                                    :<td><Tippy content="Bloquear" position="top" animation="fade"><button onClick={() => this.deleteUser(users.idUsuario)} className='btn btn-icon btn-round btn-sm btn-danger'><i className="fa fa-lock"></i></button></Tippy></td>
                                                    }  
                                                    
                                                </tr>
                                            )
                                            }
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
             
    </div>
        )
    }
}