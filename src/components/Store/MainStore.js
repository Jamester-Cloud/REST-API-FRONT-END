import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';

export default class MainStore extends Component {

    state={
        articulos:[],
    }
    // carga de los articulos al rcargarse el componente
    async componentDidMount(){
        const res = await axios.get('http://localhost:4000/api/articulos')
        this.setState({
            articulos:res.data
        })
        console.log(res.data);
    }
    render() {
        return (
            <div className="container p-3">
                {/* comienzo del bucle para recorrer y mostrar los productos */}
                <div className="row  mx-auto">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header text-center">
                                <h3 className="text-success card-title">Tienda</h3>
                            </div>
                            <div className="card-body">
                                <hr/>
                                <div className="row">
                                    {this.state.articulos.map((e,i)=>
                                    <div className="col-sm-6" key={i}>
                                        <div className="card card-chart">
                                            <div className="card-header">
                                                <h5 className="card-category">{e.categoria}</h5>
                                                <h4 className="card-title mt-3">{e.nombre}</h4>
                                                <hr/>
                                                <div className="dropdown">
                                                    {e.stock === 0 
                                                    ?<Tippy content="Ver articulo" placement="top" animation="shift-away">
                                                    <button disabled className="btn btn-round btn-outline-default btn-info dropdown-toggle btn-simple btn-icon no-caret" data-toggle="dropdown">
                                                        <i className="now-ui-icons shopping_shop"></i>
                                                    </button>
                                                </Tippy>
                                                    :<Tippy content="Ver articulo" placement="top" animation="shift-away">
                                                        <Link to={"/addToCart/"+e.idArticulo} className="btn btn-round btn-outline-default btn-info dropdown-toggle btn-simple btn-icon no-caret" data-toggle="dropdown">
                                                            <i className="now-ui-icons shopping_shop"></i>
                                                        </Link>
                                                    </Tippy> 
                                                    }
                                                </div>
                                            </div>
                                            <div className="card-body text-center">
                                                <div className="row ">
                                                    <div className="col-md-12">
                                                        <img src="/img/icons/product.png" alt="producto"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="card-footer d-flex">
                                                <h5 className="ml-2">Precio:{e.precio}</h5>
                                                {e.stock === 0
                                                ?<h5 className="ml-5 text-danger">Sin Stock</h5>
                                                :<h5 className="ml-5 text-success">En Stock:{e.stock}</h5> }
                                                
                                            </div>
                                        </div>
                                    </div>
                                     )}
                                </div>            
                            </div>
                            <hr/>
                            <div className="card-footer p-2 mb-3">
                                <h6 className="text-success">Estado de la tienda: Activa</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
