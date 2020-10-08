import React, { Component } from 'react'
import PageLoading from '../../PageLoading';
export default class InfoCards extends Component {
  
    state={
        error:null,
        loading:true
    }

    componentDidMount(){
        setTimeout(() => { // prueba
            this.setState({loading:false});
        }, 1000);
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
                      <h3 className="text-success">{this.props.clientesActivos}  <i className="fa fa-user-check"></i></h3>
                      <h3 className="text-danger">{this.props.clientesInactivos} <i className="fa fa-user-minus"></i></h3>
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
                      <h3 className="text-danger">{this.props.pedidosImcompletos}<i className="fa fa-times"></i> </h3>
                      <h3 className="text-success">{this.props.pedidosCompletados}<i className="fa fa-clipboard-check"></i>  </h3>
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
        )
    }
}
