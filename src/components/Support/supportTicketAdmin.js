import React, { Component } from 'react'
import axios from 'axios';
//Router
import $ from 'jquery';
import DataTables from './DataTables/DataTables';
/// agregar modales para la confirmacion
//Complements

export default class SupportTicketAdmin extends Component {

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
            <DataTables/>
            
          </div>
      </div>
    
        )
    }
}


