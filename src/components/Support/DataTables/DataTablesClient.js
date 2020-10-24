import React, { Component } from 'react'

import Complements from '../../complementary/Complements';

import axios from 'axios';
import $ from 'jquery';

//Loading
import PageLoading from '../../PageLoading';
//Error
import PageError from '../../PageError';

import Tippy from '@tippyjs/react';

export default class DataTablesClient extends Component {

    signal = axios.CancelToken.source();

    state={
        ticketsSoporteCliente:[],
        error:null,
        loading:true
    }

    refresh(){
        // destruyendo tablas para volverlas a hacer
        $("#productos").DataTable().destroy();
  
        this.getTicketsCliente();
      }

    async getTicketsCliente(){
        this.setState({loading:true});
        await axios.post('https://bakery-backend.herokuapp.com/api/store/getTicketClient', 
        {
            idCliente:parseInt(sessionStorage.getItem('Cliente'))
        }, {cancelToken: this.signal.token}).then(res=>{
            if(res.statusText === "OK"){
                this.setState({
                    ticketsSoporteCliente:res.data,
                    loading:false
                })
                $("#producto").DataTable();
            }
        }).catch(err=>{
            this.setState({loading:false, error:err });
        })
    }

    async completeTicket(id,feedback){
        await axios.put('https://bakery-backend.herokuapp.com/api/store/getTicketClient', 
        {
            idCliente:id,
            feedback:feedback
        }, {cancelToken: this.signal.token}).then(res=>{
            if(res.statusText === "OK"){
                this.Messages('Ticket completado exitosamente. Lamentamos los inconvenientes')
                
            }
        }).catch(err=>{
            this.setState({loading:false, error:err });
        })
    }

    componentDidMount(){
        //LLamado a la funcion que obtiene todo los tickets
        this.Messages=Complements.bind(this);
        this.getTicketsCliente();
    }
    ///Cuando se desmonte el componente
    
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
                      <div className="tab-pane show active fade" id="inicio">
                      <div className="toolbar p-3 d-flex justify-content-end">
                            <Tippy content="Refrescar" placement="top" animation="shift-away">
                                <button className="btn btn-icon btn-round btn-primary btn-md mr-3" onClick={()=>this.refresh()}> <i className="fa fa-sync-alt"></i> </button>
                            </Tippy>
                          </div>
                          <div class="row justify-content-center">
                            
                            <div class="col sm-4">
                                <div class="table-responsive">
                                    <table class="table table-striped table-hover" id="producto">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Titulo</th>                                      
                                                <th>Descripcion</th>
                                                <th>Causa</th> 
                                                <th>Estado</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.ticketsSoporteCliente.map((ticket,i)=>
                                                    <tr key={i}>
                                                        <td>{ticket.idticketSoporte}</td>
                                                        <td>{ticket.tituloTicket}</td>
                                                        <td>{ticket.descripcionSoporte}</td>
                                                        <td>{ticket.causaTicketSoporte}</td>
                                                        {ticket.estatusTicket === "0" ? 
                                                         <td><p className="badge badge-danger"> Denegado</p></td>
                                                     
                                                        :<td><p className="badge badge-success">Activo</p></td>
                                                        }
                                                        <td><button data-toggle="modal" data-target="#exampleModalCenter" className='btn btn-icon btn-round btn-sm btn-success'><i className="fa fa-check"></i></button></td>
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
                   {/* Modal */}
                    <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Por favor, tomese el tiempo de darnos un feedback.</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                        <div className="form-row">
                                            <div className="form-group col-md-12">
                                                <textarea className="form-control" name="feedback" id="feedback"></textarea>
                                            </div>
                                        </div>
                                </div>
                                <div class="modal-footer mx-auto">
                                    <button type="button" onClick={ () => this.completeTicket(parseInt(sessionStorage.getItem('Cliente')), $("#feedback").val() ) } className="btn btn-round btn-success">Completar Ticket</button>
                                </div>
                            </div>
                        </div>
                    </div>
              </div>
        )
    }
}
