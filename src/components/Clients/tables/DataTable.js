import React, { Component } from 'react'
import refreshFunction from '../../complementary/refreshFunction';

//Loading
import PageLoading from '../../PageLoading';

//
import axios from 'axios';

import $, { error } from 'jquery';
import Tippy from '@tippyjs/react';

export default class DataTable extends Component {
    // state del componente

    state={
        Clientes:[], // ->Data State
        loading:true,
        error:null,
    }

    
    async getClientes(){
        this.setState({
            loading:true , error:null
        })

        setTimeout( async () => { // Prueba, quitar al subir al hosting
            await axios.get('http://localhost:4000/api/clientes')
            .then(res=>{
                this.setState({Clientes:res.data, loading:false });
                $("#producto").DataTable();
            }).catch(err=>{
                this.setState({
                    error:err,
                    loading:false
                })
            })
        }, 3000);

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
        if(this.state.loading === true){
            return (
                <div className="row justify-content-center fadeIn">
                        <div className="col-bg-12">
                            <PageLoading />
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
        )
    }
}
