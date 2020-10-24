import React, { Component } from 'react'
import refreshFunction from '../../complementary/refreshFunction';

//Loading
import PageLoading from '../../PageLoading';
//Error
import PageError from '../../PageError';

//
import axios from 'axios';

import $ from 'jquery';
import Tippy from '@tippyjs/react';

export default class DataTable extends Component {
    // cancelacion de subscripciones
   signal = axios.CancelToken.source();
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
        await axios.get('https://bakery-backend.herokuapp.com/api/clientes', {cancelToken: this.signal.token})
        .then(res=>{
            this.setState({Clientes:res.data, loading:false });
            $("#producto").DataTable();
        }).catch(err=>{
            this.setState({
                error:err,
                loading:false
            })
        })
        

    }

  componentDidMount(){
      this.getClientes();
      this.destroyDataTables=refreshFunction.bind();
  }
  ///Cuando se desmonte el componente
  componentWillUnmount() {
    this.signal.cancel('Api is being canceled');
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
