import React, { Component } from 'react'
//Loading
import PageLoading from '../../PageLoading';

export default class infoCards extends Component {
      state={
        error:null,
        loading:true
      }

      componentDidMount(){
          setTimeout(() => {
            this.setState({
                loading:false
            })    
          }, 2000);
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
                <div className="col-lg-4 col-md-4">
                    <div className="card card-chart">
                        <div className="card-header">
                            <h5 className="card-category">Pedidos Encargados</h5>
                            <h4 className="card-title">Pedidos Encargados</h4>
                            <hr/>
                            
                        </div>
                        <div className="card-body">
                            <div className="row">
                            <div className="col-md-6">
                                <img src="img/icons/Order_processing.png" alt=""/>
                            </div>
                            <div className="col-md-6">
                                <h3 className="text-info p-5">{this.props.pedidosEncargados}</h3>
                            </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            
                        </div>
                    </div>
                </div>
          <div className="col-lg-4 col-md-4">
            <div className="card card-chart">
              <div className="card-header">
                <h5 className="card-category">Pedidos Completados</h5>
                <h4 className="card-title">Pedidos Completados</h4>
                <hr/>
                
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <img src="img/icons/order_confirm.png" alt=""/>
                  </div>
                  <div className="col-md-6">
                      <h3 className="text-info p-5">{this.props.pedidosCompletados}</h3>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="card card-chart">
              <div className="card-header">
                <h5 className="card-category">Pedidos Cancelados</h5>
                <h4 className="card-title">Pedidos Cancelados</h4>
                <hr/>
                
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <img src="img/icons/order_cancelled.png" alt=""/>
                  </div>
                  <div className="col-md-6">
                      <h3 className="text-info p-5">{this.props.pedidosAnulados}</h3>
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
