import React, { Component } from 'react'
import axios from 'axios';
import $ from 'jquery';
import fechaES from './complementary/fechaFormat';


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

    await axios.post('http://localhost:4000/api/usuarios/admin', {
      idCliente:idCliente,
      username:username
    }).then(res=>{
      console.log(res.data);
      this.setState({
        pedidosEncargados:res.data.pedidosImcompletados.pedidosIncomplete,
        pedidosCompletados:res.data.pedidosCompletados.pedidosComplete,
        pedidosAnulados:res.data.pedidosAnulados.pedidoAnulado,
        carritoDeCompras:res.data.listArtiFilter
      })
      $("#producto").DataTable();
    }).catch(err=>{
      console.log(err);
    })
  }

  componentDidMount(){
    this.getInfo();
    this.fechaEs=fechaES.bind();
    this.fechaEs();
  }

    render() {
        return (
            <div class="container p-3">
        <div class="row">
          <div class="col-lg-4 col-md-4">
            <div class="card card-chart">
              <div class="card-header">
                <h5 class="card-category">Pedidos Encargados</h5>
                <h4 class="card-title">Pedidos Encargados</h4>
                <hr/>
                
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <img src="img/icons/Order_processing.png" alt=""/>
                  </div>
                  <div class="col-md-6">
                      <h3 class="text-info p-5">{this.state.pedidosEncargados}</h3>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4">
            <div class="card card-chart">
              <div class="card-header">
                <h5 class="card-category">Pedidos Completados</h5>
                <h4 class="card-title">Pedidos Completados</h4>
                <hr/>
                
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <img src="img/icons/order_confirm.png" alt=""/>
                  </div>
                  <div class="col-md-6">
                      <h3 class="text-info p-5">{this.state.pedidosCompletados}</h3>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4">
            <div class="card card-chart">
              <div class="card-header">
                <h5 class="card-category">Pedidos Cancelados</h5>
                <h4 class="card-title">Pedidos Cancelados</h4>
                <hr/>
                
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <img src="img/icons/order_cancelled.png" alt=""/>
                  </div>
                  <div class="col-md-6">
                      <h3 class="text-info p-5">{this.state.pedidosAnulados}</h3>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h5 class="card-category text-center">Carro de Compras</h5>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-sm" id="producto">
                    <thead class=" text-primary">
                      <tr>
                          <th>
                            Nombre
                          </th>
                          <th>
                            Categoria
                          </th>
                          <th>
                            Precio
                          </th>
                          <th>
                            Cantidad
                          </th>
                      </tr>
                      
                    </thead>
                    <tbody>
                    {this.state.carritoDeCompras.map((item,i)=>
                         <tr key={i}>
                           <td>{item.nombre}</td>
                           <td>{item.categoria}</td>
                           <td>{item.precio}</td>
                           <td>{item.cantidad}</td>
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
