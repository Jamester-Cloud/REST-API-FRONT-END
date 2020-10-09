import React, { Component } from 'react';
import PageLoading from '../../PageLoading';
import $ from 'jquery';


export default class DataTable extends Component {
    

    state={
        error:null,
        loading:true
    }

    componentDidMount(){
        setTimeout(() => { // prueba
            this.setState({loading:false});
            $("#productos").DataTable();
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
                        {this.props.productos.map((arts,i)=>
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
        )
    }
}
