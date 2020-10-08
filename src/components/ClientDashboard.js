import React, { Component } from 'react'
import axios from 'axios';
import $ from 'jquery';
import fechaES from './complementary/fechaFormat';

//
import InfoCards from './DashboardComponents/client/infoCards';

import DataTable from './DashboardComponents/client/DataTable';


export default class ClientDashboard extends Component {

  state={
    pedidosEncargados:0,
    pedidosCompletados:0,
    pedidosAnulados:0,
    carritoDeCompras:[]
  }

  async getInfo(){

    let idCliente = sessionStorage.getItem("Cliente");
    let username  = sessionStorage.getItem("Username");

    const res = await axios.post('http://localhost:4000/api/usuarios/admin', {
      idCliente:idCliente,
      username:username
    })

    this.setState({
      pedidosEncargados:res.data.pedidosImcompletados.pedidosIncomplete,
      pedidosCompletados:res.data.pedidosCompletados.pedidosComplete,
      pedidosAnulados:res.data.pedidosAnulados.pedidoAnulado,
      carritoDeCompras:res.data.listArtiFilter
    })
    
  }

  componentDidMount(){
    this.getInfo();
    this.fechaEs=fechaES.bind();
    this.fechaEs();
  }

    render() {
        return (
            <div className="container p-3">
              {/* Tarjetas */}
              <InfoCards  
              pedidosEncargados={this.state.pedidosEncargados} 
              pedidosCompletados={this.state.pedidosCompletados}
              pedidosAnulados={this.state.pedidosAnulados}
              />
              {/* Carrito de compras del cliente*/}
              <DataTable 
              carritoDeCompras={this.state.carritoDeCompras}/>
            </div>
        )
    }
}
