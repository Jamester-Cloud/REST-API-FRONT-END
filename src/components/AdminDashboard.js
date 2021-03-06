import React, { Component } from 'react'
import axios from 'axios';
import $ from 'jquery';

import InfoCards from './DashboardComponents/admin/InfoCards';
import DataTable from './DashboardComponents/admin/DataTable';


export default class AdminDashboard extends Component {


  signal = axios.CancelToken.source();
  
  state={
    clientesActivos:0,
    clientesInactivos:0,
    pedidosCompletados:0,
    pedidosImcompletos:0,
    productos:[]
  }

  async getInfo(){

    let currentAdminUser =  sessionStorage.getItem('Username');
    const res = await axios.post('https://bakery-backend.herokuapp.com/api/usuarios/admin',{username:currentAdminUser}, {cancelToken: this.signal.token});
    
    this.setState({
      //clientes
      clientesActivos:res.data.ActiveClients[0].clientesActivos,
      clientesInactivos:res.data.InactiveClients[0].clientesInactivos,
      //Pedidos
      pedidosCompletados:res.data.Complete[0].pedidosComplete,
      pedidosImcompletos:res.data.Incomplete[0].pedidosIncomplete,
      //Articulos
      productos:res.data.Articulos
    })
    $("#producto").DataTable();
  }

  componentDidMount(){
    this.getInfo();
  }

  componentWillUnmount() {
        this.signal.cancel('Api is being canceled');
  }


    render() {
        return (       
            <div className="container p-3">
              {/* Tarjetas */}
              <InfoCards clientesActivos={this.state.clientesActivos} clientesInactivos={this.state.clientesInactivos} pedidosCompletados={this.state.pedidosCompletados} pedidosImcompletos={this.state.pedidosImcompletos} />
              {/* DataTable productos en el sistema */}
              <DataTable productos={this.state.productos}/>
            </div>
     
        )

    }
}
