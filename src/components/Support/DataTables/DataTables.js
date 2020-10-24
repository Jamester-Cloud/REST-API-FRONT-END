import React, { Component } from 'react';
import axios from 'axios';
//Router
import $ from 'jquery';
//Loading
import PageLoading from '../../PageLoading';
//Error
import PageError from '../../PageError';

import Complements from '../../complementary/Complements';

export default class DataTables extends Component {
      signal = axios.CancelToken.source();
        // State del componente
      state={
        ticketsCompletos:[],
        ticketsIncompletos:[],
        ticketsDenegados:[],
        error:null,
        loading:true
      }
      // Categorias a elejir en el select
      async getTickets(){
        this.setState({loading:true});
        await axios.get('https://bakery-backend.herokuapp.com/api/store/supportTicket', {cancelToken: this.signal.token})
        .then(res=>{
            this.setState({
                ticketsIncompletos:res.data.Imcompletos,
                ticketsCompletos:res.data.completados,
                ticketsDenegados:res.data.Denegados,
                loading:false
              })
                      ///Inicio de las tablas
                $("#ticketsIncompletos").DataTable();
                $("#ticketsCompletos").DataTable();
                $("#ticketsDenegados").DataTable();
        }).catch(err=>{
          this.setState({loading:false, error:err });
        })
      }
     
  
      async componentDidMount(){
        this.getTickets(); 
        this.Messages=Complements.bind(this);
      }
      componentWillUnmount() {
        this.signal.cancel('Api is being canceled');
      }
  
      refresh(){
        // destruyendo tablas para volverlas a hacer
        $("#ticketsIncompletos").DataTable().destroy();
        $("#ticketsCompletos").DataTable().destroy();
        $("#ticketsDenegados").DataTable().destroy();
  
        this.getTickets();
      }
  
      deleteTicket = async (id) =>{
        await axios.delete('https://bakery-backend.herokuapp.com/api/store/supportTicket', {data:{idTicketSoporte:id}}, {cancelToken: this.signal.token}).catch(err=>{
          this.setState({loading:false, error:err });
        })
        this.Messages('Ticket eliminado');
        this.refresh();
      }
  
      denyTicket = async (id) =>{
        await axios.put('https://bakery-backend.herokuapp.com/api/store/supportTicket', {idTicketSoporte:id}, {cancelToken: this.signal.token})
        .catch(err=>{
          this.setState({loading:false, error:err });
      })
        this.Messages('Ticket denegado');
        this.refresh();
  
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
                <div className="card-title"><h3>Tickets de Soporte</h3></div>
                <div className="tab-content text-left">
                    <div className="tab-pane show active " id="inicio">
                        <div className="toolbar p-3 text-right">                           
                          <button className="btn btn-icon btn-round btn-primary btn-md mr-3" onClick={()=>this.refresh()}> <i className="fa fa-sync-alt"></i> </button>
                        </div>
                        <div className="row justify-content-center">
                        
                          <div className="col sm-12">
                              <div className="table-responsive">
                                  <table className="table table-striped table-hover" id="ticketsIncompletos">
                                      <thead>
                                          <tr>
                                              <th>ID</th>
                                              <th>Titulo</th>                                      
                                              <th>Descripcion</th>
                                              <th>Causa</th> 
                                              <th className="text-center"></th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                        {this.state.ticketsIncompletos.map((ticket,i)=>
                                          <tr key={i}>
                                            <td>{ticket.idticketSoporte}</td>
                                            <td>{ticket.tituloTicket}</td>
                                            <td>{ticket.descripcionSoporte}</td>
                                            <td>{ticket.causaTicketSoporte}</td>
                                            <td className="text-right"><button onClick={()=>{this.denyTicket(ticket.idticketSoporte)}} className='btn btn-icon btn-round btn-sm btn-danger'><i className="fa fa-times"></i></button></td>
                                          </tr>
                                        )}
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                        </div>
                    </div>
                    <div className="tab-pane " id="completados">
                    <div className="toolbar p-3 text-right">
                          <button className="btn btn-icon btn-round btn-primary btn-md mr-3" onClick={()=>this.refresh()}> <i className="fa fa-sync-alt"></i> </button>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col sm-6">
                              <div className="table-responsive">
                                  <table className="table table-striped table-hover" id="ticketsCompletos">
                                      <thead>
                                        <tr>
                                          <th>ID</th>
                                          <th>Titulo</th>                                      
                                          <th>Descripcion</th>
                                          <th>Causa</th> 
                                          <th>Retro alimentacion del cliente</th>
                                          <th></th> 
                                        </tr>
                                      </thead>
                                      <tbody>
                                      {this.state.ticketsCompletos.map((ticket,i)=>
                                          <tr key={i}>
                                            <td>{ticket.idticketSoporte}</td>
                                            <td>{ticket.tituloTicket}</td>
                                            <td>{ticket.descripcionSoporte}</td>
                                            <td></td>
                                            <td>{ticket.causaTicketSoporte}</td>
                                            <td><button onClick={()=>{this.deleteTicket(ticket.idticketSoporte)}} className='btn btn-icon btn-round btn-sm btn-danger'><i className="fa fa-trash"></i></button></td>
                                          </tr>
                                        )}                                     
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                        </div>
                   </div>
                   <div className="tab-pane " id="denegados">
                   <div className="toolbar p-3 text-right">
                          <button className="btn btn-icon btn-round btn-primary btn-md mr-3" onClick={()=>this.refresh()}> <i className="fa fa-sync-alt"></i> </button>
                        </div>
                        <div className="row justify-content-center text-danger">
                        
                          <div className="col sm-6">
                              <div className="table-responsive">
                                  <table className="table table-striped" id="ticketsDenegados">
                                      <thead>
                                          <tr>
                                              <th>ID</th>
                                              <th>Titulo</th>                                      
                                              <th>Descripcion</th>
                                              <th>Causa</th> 
                                              <th></th> 
                                          </tr>
                                      </thead>
                                      <tbody className="text-danger">
                                        {this.state.ticketsDenegados.map((ticket,i)=>
                                          <tr key={i}>
                                            <td>{ticket.idticketSoporte}</td>
                                            <td>{ticket.tituloTicket}</td>
                                            <td>{ticket.descripcionSoporte}</td>
                                            <td>{ticket.causaTicketSoporte}</td>
                                            <td><button onClick={()=>{this.deleteTicket(ticket.idticketSoporte)}} className='btn btn-icon btn-round btn-sm btn-danger'><i className="fa fa-trash"></i></button></td>
                                          </tr>
                                        )}
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
