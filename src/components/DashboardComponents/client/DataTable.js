import React, { Component } from 'react'
//Loading
import PageLoading from '../../PageLoading';

import $ from 'jquery';

export default class DataTable extends Component {
    state={
        error:null,
        loading:true
      }

    componentDidMount(){
        setTimeout(() => {
          this.setState({
              loading:false
          })
          $("#producto").DataTable();    
        }, 3000);
        
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
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-category text-center">Carro de Compras</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-sm" id="producto">
                    <thead className=" text-primary">
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
                    {this.props.carritoDeCompras.map((item,i)=>
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
        )
    }
}
