import React, { Component } from 'react'
import axios from 'axios';
//Router
import $ from 'jquery';
/// agregar modales para la confirmacion
//Complements
import Complements from '../complementary/Complements';

export default class Perfils extends Component {

  // State del componente
  state={
    ticketsCompletos:[],
    ticketsIncompletos:[],
    ticketsDenegados:[]
  }

    // Categorias a elejir en el select
    async getTickets(){
      const res = await axios.get('http://localhost:4000/api/store/supportTicket');
      this.setState({
        ticketsIncompletos:res.data.Imcompletos,
        ticketsCompletos:res.data.completados,
        ticketsDenegados:res.data.Denegados
      })
      
      console.log(this.state.ticketsIncompletos);
      ///Inicio de las tablas
      $("#ticketsIncompletos").DataTable();
      $("#ticketsCompletos").DataTable();
      $("#ticketsDenegados").DataTable();

    }
   

    async componentDidMount(){
      this.getTickets(); 
      this.Messages=Complements.bind(this);
    }

    refresh(){
      // destruyendo tablas para volverlas a hacer
      $("#ticketsIncompletos").DataTable().destroy();
      $("#ticketsCompletos").DataTable().destroy();
      $("#ticketsDenegados").DataTable().destroy();

      this.getTickets();
    }

    deleteTicket = async(id) =>{
      await axios.delete('http://localhost:4000/api/store/supportTicket', {data:{idTicketSoporte:id}});
      this.Messages('Ticket eliminado');
      this.refresh();
    }

    denyTicket = async(id) =>{
      await axios.put('http://localhost:4000/api/store/supportTicket', {idTicketSoporte:id});
      this.Messages('Ticket denegado');
      this.refresh();

    }

    render() {
        return (
          <div className="content mt-5 p-3">
          <div className="card">
            <div className="card-header d-flex justify-content-end">
              
              <div className="nav-tabs-wrapper ">
                    <ul className="nav nav-tabs" data-tabs="tabs">
                      <li className="nav-item">
                        <a className=" nav-link active text-info" href="#inicio" data-toggle="tab">  
                          <i className="fa fa-ticket-alt"></i>
                        </a>
                      </li>                           
                      <li className="nav-item">
                        <a className="nav-link text-success " href="#completados" data-toggle="tab">
                           <i className="fa fa-ticket-alt"></i>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link text-danger" href="#denegados" data-toggle="tab">
                           <i className="fa fa-ticket-alt"></i>
                        </a>
                      </li>
                      
                    </ul>
                </div>
            </div>
            <hr/>
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
          </div>
      </div>
    
        )
    }
}


