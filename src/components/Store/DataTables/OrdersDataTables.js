import React, { Component } from 'react'
import axios from 'axios'
import {format} from 'timeago.js';
import $ from 'jquery';
import 'datatables.net/js/jquery.dataTables';
import {Link} from 'react-router-dom';

import Tippy from '@tippyjs/react';

//Error Page
import PageError from '../../PageError';


//Loading
import PageLoading from '../../PageLoading';

import Complements from '../../complementary/Complements';
import fechaES from '../../complementary/fechaFormat';


export default class OrdersDataTables extends Component {

   state={
        pedidosCompletados:[],
        pedidosPorCompletar:[],
        pedidosAnulados:[],
        error:null,
        loading:true
    }

async getPedidos(){

    this.setState({
        loading:true , error:null
    })

    setTimeout( async () => {
        await axios.post('http://localhost:4000/api/store/getPedidos',
        {idCliente:sessionStorage.getItem('Cliente')}
    ).then(res=>{
        if(res.statusText==="OK"){
            this.setState({
                pedidosPorCompletar:res.data.Imcompletos,

                pedidosCompletados:res.data.completados,

                pedidosAnulados:res.data.Denegados,
                
                loading:false,
            })

            
            $("#pedidosIncompletos").DataTable();

            $("#pedidoCompletos").DataTable();

            $("#pedidosDenegados").DataTable();
        }
        
    }).catch(err=>{
        this.setState({loading:false, error:err });
    })
    }, 3000);
    
}

async componentDidMount(){
    this.getPedidos();
    this.fechaEs=fechaES.bind();
    this.Messages=Complements.bind();
    this.fechaEs();   
}

async denyOrder(id){
    await axios.put("http://localhost:4000/api/store/orderChange",{
        idPedido:id
    }).then(res=>{
        this.getPedidos();
        if(res.statusText==="OK"){
            this.Messages("Pedido Denegado");
            this.refreshTables();
        }
    }).catch(err=>{
        this.setState({loading:false, error:err });
    })
}

refreshTables(){  
   $('#pedidoCompletos').DataTable().destroy(); 
   $('#pedidosIncompletos').DataTable().destroy(); 
   $('#pedidosDenegados').DataTable().destroy(); 
   this.getPedidos();
}

async changeOrder(id){
    await axios.post("http://localhost:4000/api/store/orderChange",{
        idPedido:id
    }).then(res=>{
        if(res.statusText==="OK"){
            switch (res.data) {
                case "Pedido completado":
                    this.Messages("Pedido completado")
                    this.refreshTables();
                    break;
            
                case "Pedido agregado a revision":
                    this.Messages("Pedido agregado a revision")
                    this.refreshTables();
                    break;

                case "Pedido eliminado":
                    this.Messages("Pedido eliminado")
                    this.refreshTables();
                    break;
                default:
                break;
            }
        }
    }).catch(err=>{
        this.setState({loading:false, error:err });
    })
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
                <div className="tab-pane show active " id="inicio">
                    <div className="toolbar p-3 text-right">                           
                      <Tippy content="Refrescar" position="top" animation="fade">
                          <button className="btn btn-icon btn-round btn-primary btn-md mr-3" onClick={()=>this.refreshTables()}> 
                              <i className="fa fa-sync-alt"></i>
                          </button>
                      </Tippy>
                    </div>
                    <div className="row justify-content-center">
                    
                      <div className="col sm-12">
                          <div className="table-responsive">
                              <table className="table table-striped table-hover" id="pedidosIncompletos">
                                  <thead>
                                      <tr>
                                          <th>ID</th>
                                          <th>descripcion</th>                                      
                                          <th>Entrega</th>
                                          <th>Total pagado</th> 
                                          <th>Actualizado</th>
                                          <th></th>
                                          <th></th>
                                        
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {this.state.pedidosPorCompletar.map((pedidos,i)=>
                                          <tr key={i}>
                                              <td>{pedidos.idPedido}</td>
                                              <td>{pedidos.descripcion}</td>
                                              <td>{format(pedidos.fechaEntrega, 'my-locale')}</td>
                                              <td>{pedidos.totalAPagar}</td>
                                              <td>{format(pedidos.fecha, 'my-locale')}</td>
                                              <td>
                                                  <Tippy content="Denegar Orden" position="top" animation="fade">
                                                      <button onClick={() => this.denyOrder(pedidos.idPedido)} className='btn btn-icon btn-round btn-sm btn-danger'>
                                                          <i className="fa fa-times"></i>
                                                      </button>
                                                  </Tippy>
                                              </td>
                                              <td>
                                                  <Tippy content="Completar Orden" position="top" animation="fade">
                                                      <button onClick={()=> this.changeOrder(pedidos.idPedido)} className='btn btn-icon btn-round btn-sm btn-success'>
                                                          <i className="fa fa-plus"></i>
                                                      </button> 
                                                  </Tippy>
                                              </td>
                                          </tr>
                                      ) }
                             
                                     
                                  </tbody>
                              </table>
                          </div>
                      </div>
                    </div>
                </div>
                <div className="tab-pane " id="completados">
                    <div className="toolbar p-3 text-right">
                          <Tippy content="Refrescar" position="top" animation="fade">
                                  <button className="btn btn-icon btn-round btn-primary btn-md mr-3" onClick={()=>this.refreshTables()}> 
                                      <i className="fa fa-sync-alt"></i>
                                  </button>
                          </Tippy>
                    </div>
                    <div className="row justify-content-center">
                    
                      <div className="col sm-6">
                          <div className="table-responsive">
                              <table className="table table-striped table-hover" id="pedidoCompletos">
                                  <thead>
                                  <tr>
                                          <th>ID</th>
                                          <th>descripcion</th>                                      
                                          <th>Entrega</th>
                                          <th>Total pagado</th> 
                                          <th>Actualizado</th>
                                          <th></th>
                                         
                                        
                                      </tr>
                                  </thead>
                                  <tbody>
                                  {this.state.pedidosCompletados.map((pedidos,i)=>
                                          <tr key={i}>
                                              <td>{pedidos.idPedido}</td>

                                              <td>{pedidos.descripcion}</td>

                                              <td>{format(pedidos.fechaEntrega, 'my-locale')}</td>

                                              <td>{pedidos.totalAPagar}</td>

                                              <td>{format(pedidos.fecha, 'my-locale')}</td>
                                              <td>
                                                  <Tippy content="Informar Problemas" position="top" animation="fade">
                                                      <Link to={"/Problem/"+ pedidos.idFactura} className='btn btn-icon btn-round btn-sm btn-info'>
                                                          <i className="fa fa-exclamation"></i>
                                                      </Link>
                                                  </Tippy>
                                              </td>
                                              
                                              
                                          </tr>
                                      ) }                                          
                                  </tbody>
                              </table>
                          </div>
                      </div>
                    </div>
               </div>
               <div className="tab-pane " id="denegados">
               <div className="toolbar p-3 text-right">
                      <button className="btn btn-icon btn-round btn-primary btn-md mr-3" onClick={()=>this.refreshTables()}> <i className="fa fa-sync-alt"></i> </button>
                    </div>
                    <div className="row justify-content-center text-danger">
                    
                      <div className="col sm-6">
                          <div className="table-responsive">
                              <table className="table table-striped" id="pedidosDenegados">
                                  <thead>
                                      <tr>
                                      <th>ID</th>
                                          <th>descripcion</th>                                      
                                          <th>Entrega</th>
                                          <th>Total pagado</th> 
                                          <th>Actualizado</th>
                                          
                                          <th></th>
                                      </tr>
                                  </thead>
                                  <tbody className="text-danger">
                                  {this.state.pedidosAnulados.map((pedidos,i)=>
                                          <tr key={i}>
                                              <td>{pedidos.idPedido}</td>

                                              <td>{pedidos.descripcion}</td>

                                              <td>{format(pedidos.fechaEntrega, 'my-locale')}</td>

                                              <td>{pedidos.totalAPagar}</td>

                                              <td>{format(pedidos.fecha, 'my-locale')}</td>
                                              <td>
                                                  <Tippy content="Eliminar" position="top" animation="fade">
                                                      <button onClick={() => this.changeOrder(pedidos.idPedido)} className='btn btn-icon btn-round btn-sm btn-danger'>
                                                          <i className="fa fa-trash-alt"></i>
                                                      </button>
                                                  </Tippy>
                                              </td>
                                          </tr>
                                      ) }
                             
                                     
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
