import React, { Component } from 'react'
import axios from 'axios';
//Router
import $ from 'jquery';

import Tippy from '@tippyjs/react';
import refreshFunction from '../complementary/refreshFunction';

export default class Clientes extends Component {

    state={
        Clientes:[]
    }

      async getClientes(){
        const res = await axios.get('http://localhost:4000/api/clientes');
        this.setState({Clientes:res.data });
        $("#producto").DataTable();
        console.log();
      }

      componentDidMount(){
          this.getClientes();
          this.destroyDataTables=refreshFunction.bind();
      }

      refresh(){
          this.destroyDataTables();
          this.getClientes();
      }
    render() {
        return (
            <div className="content mt-3 p-3">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Clientes</h4>
                    </div>       
                    <div className="card-body">
                        <div className="tab-content text-left">
                            <div className="tab-pane active" id="inicio">
                            <div className="toolbar text-right p-3">
                                <Tippy content="Refrescar" placement="top" animation="shift-away">
                                    <button title="Refrescar" className="btn btn-icon btn-round btn-primary btn-md mr-3" onClick={()=>this.refresh()}> <i className="fa fa-sync-alt"></i> </button>
                                </Tippy>
                            </div>

                                <div className="table-responsive table-hover">
                                    <table id="producto" className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th colSpan="1">Nombre</th>
                                                <th colSpan="1">Apellido</th>
                                                <th colSpan="1">Correo</th>
                                                <th colSpan="1">Descuento</th>                                               
                                               
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                this.state.Clientes.map((CL,i)=>
                                            <tr key={i}>
                                                <td>{CL.nombrePersona}</td>
                                                <td>{CL.apellidoPersona}</td>
                                                <td>{CL.correoPersona}</td>
                                                <td>{CL.descuento}</td>                                               
                                                
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
