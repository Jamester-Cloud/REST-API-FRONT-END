import React, { Component } from 'react'
import axios from 'axios';
import $ from 'jquery';


export default class AdminDashboard extends Component {

  state={
    productos:[],
    clientesActivos:0,
    clientesInactivos:0,
    pedidosCompletados:0,
    pedidosImcompletos:0
  }

  async getInfo(){
    let currentAdminUser =  sessionStorage.getItem('Username');
    const res = await axios.post('http://localhost:4000/api/usuarios/admin',{username:currentAdminUser});
    
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
    console.log(this.state.pedidosCompletados);

    $("#productos").DataTable();
  }

  componentDidMount(){
    this.getInfo();
  }


    render() {
        return (       
            <div className="container p-3">
              
              <div className="row">
                  
          <div className="col-lg-6 col-md-6">
            <div className="card card-chart">
              <div className="card-header">
                <h5 className="card-category">Clientes Actuales</h5>
                <h4 className="card-title">Clientes</h4>
                <hr/>
                <div className="dropdown">
                  <button type="button" className="btn btn-round btn-outline-default btn-info dropdown-toggle btn-simple btn-icon no-caret" data-toggle="dropdown">
                    <i className="now-ui-icons users_circle-08"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h3 className="text-success">{this.state.clientesActivos}  <i className="fa fa-user-check"></i></h3>
                    <h3 className="text-danger">{this.state.clientesInactivos} <i className="fa fa-user-minus"></i></h3>
                  </div>
                  <div className="col-md-6">
                    <h3 className="text-success"> Activos</h3>
                    <h3 className="text-danger"> Inactivos</h3>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="card card-chart">
              <div className="card-header">
                <h5 className="card-category">Pedidos</h5>
                <h4 className="card-title">Pedidos</h4>
                <hr/>
                <div className="dropdown">
                  <button type="button" className="btn btn-primary btn-round btn-outline-default dropdown-toggle btn-simple btn-icon no-caret" data-toggle="dropdown">
                    <i className="now-ui-icons shopping_shop"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h3 className="text-danger">{this.state.pedidosImcompletos}<i className="fa fa-times"></i> </h3>
                    <h3 className="text-success">{this.state.pedidosCompletados}<i className="fa fa-clipboard-check"></i>  </h3>
                  </div>
                  <div className="col-md-6">
                    <h3 className="text-danger">  Pendientes</h3>
                    <h3 className="text-success">  Completados</h3>
                  </div>
                </div>
              </div>  
              <div className="card-footer">
               
              </div>
            </div>
          </div>
              </div>
              <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <p className="" > Lista de todos los productos en el sistema</p>
                <h4 className="card-title"> Productos <img width="100" alt="Productos" src="/img/icons/product.png"/> <img width="100" alt="Comida" src="/img/icons/food.png"/> <img width="100" alt="Lavanderia" src="/img/icons/laundry.png"/></h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table" id="productos">
                    <thead className=" text-primary">
                        <tr>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Categoria</th>
                          <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                      {this.state.productos.map((arts,i)=>
                        <tr key={i}>
                          <td>{arts.nombre}</td>
                          <td>{arts.precio}</td>
                          <td>{arts.categoria}</td>
                          <td>{arts.stock}</td>
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
