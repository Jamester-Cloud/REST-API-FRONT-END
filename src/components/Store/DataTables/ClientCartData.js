import React, { Component } from 'react'

import Tippy from '@tippyjs/react';

import Form from '../forms/Form';

import axios from 'axios';
//Loading
import PageLoading from '../../PageLoading';

import $ from 'jquery';
import Complements from '../../complementary/Complements';

export default class ClientCartData extends Component {

    state={
        Carrito:[],
        fechaEntrega:'',
        descripcionPedido:'',
        totalApagar:0,
        error:null,
        loading:true
    }

    async getCartData(){
        this.setState({
            loading:true,error:null
        })
        setTimeout(async () => {
            await axios.post('http://localhost:4000/api/store/getCart', 
            {idCliente:parseInt(sessionStorage.getItem('Cliente'))
        }).then(res=>{
            if(res.data !== [] && res.statusText === "OK"  ){
                
                this.setState({
                    Carrito:res.data,
                    loading:false
                })
    
                //Agregando y multiplicando las cantidades por el precio
                var arrayCantidadesPorPrecio = []
                for (var i = 0; i < res.data.length; i++) {
                    arrayCantidadesPorPrecio.push(res.data[i].cantidad * res.data[i].precio);    
                }
                //Sacando el total a pagar
                let total = arrayCantidadesPorPrecio.reduce((a, b) => a + b, 0); 
                this.setState({
                    totalApagar:total
                })
                $("#producto").DataTable();
            }else{
                this.Messages("Parece que no tienes productos ahora mismo. Agrega para visualizar");
            }
        }).catch(err=>{
            this.Messages("Error de conexion..Intenta en unos segundos")
            console.log(err);
        })
        }, 3000);
    }

    componentDidMount(){
      this.getCartData();
      this.Messages=Complements.bind(this);
    }


    refreshButton(){
        $("#producto").DataTable().destroy();
        this.getCartData();
    }

    async devolver(id){
        await axios.delete('http://localhost:4000/api/store',{
            data:{
                idListaArticulos:id
            }
        }).then(res=>{
            if(res.statusText==="OK"){
                this.Messages("Articulo devuelto");
                this.refreshButton();
            }
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
        return (   
            <div className="card-body">
                  <div className="tab-content text-left">
                      <div className="tab-pane show active" id="inicio">
                          <div className="toolbar p-3 d-flex justify-content-between">
                            <h5 className="text-success">Total a pagar: {this.state.totalApagar}</h5>
                            <Tippy content="Refrescar" placement="top" animation="shift-away">
                                <button className="btn btn-icon btn-round btn-primary btn-md mr-3" onClick={()=>this.refreshButton()}> <i className="fa fa-sync-alt"></i> </button>
                            </Tippy>
                          </div>
                          <div class="row justify-content-center">
                            <div class="col-md-2">
                                <img src="/img/icons/cart.png" alt="Carrito de compras" width="100"/>
                            </div>
                            <div class="col sm-4">
                                <div class="table-responsive">
                                    <table class="table table-striped table-hover" id="producto">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nombre</th>                                      
                                                <th>Categoria</th>
                                                <th>Precio</th> 
                                                <th>Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.Carrito.map((articulo,i)=>
                                                <tr key={i}>
                                                    <td>{articulo.idListaArticulos}</td>
                                                    <td>{articulo.nombre}</td>
                                                    <td>{articulo.categoria}</td>
                                                    <td>{articulo.precio}</td>
                                                    <td>{articulo.cantidad}</td>
                                                    <td>
                                                        <Tippy content="Devolver" position="top" animation="fade">
                                                            <button onClick={() => this.devolver(articulo.idListaArticulos)} className='btn btn-icon btn-round btn-sm btn-danger'>
                                                                <i className="fa fa-undo-alt"></i>
                                                            </button>
                                                        </Tippy>
                                                    </td>
                                                </tr>
                                            )}
                                           
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                          </div>
                      </div>
                      <div className="tab-pane fade" id="pedido">
                            <Form totalPagar={this.state.totalApagar} />
                         </div>
                  </div>
              </div>
        )
    }
}
