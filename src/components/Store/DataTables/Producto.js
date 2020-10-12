import React from "react";
import "./shop.css";
import axios from 'axios';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';


class Producto extends React.Component {
    constructor(props) {
        super();
    }
    render() {
        return (
            <div className="col-sm-4 nt" key={this.props.key}>
                <div className="card">
                    <img className="mx-auto d-block img-fluid" src="/img/icons/product.png" />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.nombre}</h5>
                        <div className="contenido">
                            <div className="card-text">
                                Categoria: {this.props.categoria}
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            Ver Informacion
                        </button>
                    </div>
                </div>
                {/* Ventana Modal */}
                <div>
                    

                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                               
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Categoria: {this.props.categoria}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <br/>
                                <div >
                                    <img className="mx-auto d-block " src="/img/icons/product.png"  alt="..." />
                                </div>{/*https://www.americanspecialops.com/images/side/msrt.jpg*/}
                                <div className="modal-body">
                                    <h2>{this.props.nombre}</h2>
                                    <p>
                                        Este es un texto de prueba que puede ser modificado 
                                        en cualquier momento, que tenga buen dia.
                                    </p>
                                    <div className=" d-flex">
                                                <h5 className="ml-2">Precio: {this.props.precio}</h5>
                                                {this.props.stock === 0
                                                ?<h5 className="ml-4 text-danger">Sin Stock</h5>
                                                :<h5 className="ml-4 text-success">En Stock: {this.props.stock}</h5> }
                                                
                                            </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <div className="dropdown">
                                                    {this.props.stock === 0 
                                                    ?<Tippy content="Ver articulo" placement="top" animation="shift-away">
                                                    <button disabled className="btn btn-round btn-outline-default btn-info dropdown-toggle btn-simple btn-icon no-caret" data-toggle="dropdown">
                                                        <i className="now-ui-icons shopping_shop"></i>
                                                    </button>
                                                </Tippy>
                                                    :<Tippy content="Ver articulo" placement="top" animation="shift-away">
                                                        <Link to={"/addToCart/"+this.props.idArticulo} className="btn btn-round btn-outline-default btn-info dropdown-toggle btn-simple btn-icon no-caret" data-toggle="dropdown">
                                                            <i className="now-ui-icons shopping_shop"></i>
                                                        </Link>
                                                    </Tippy> 
                                                    }
                                                </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
   
                {/* Ventana Modal */}

            </div>

        );
    }
}
export default Producto;
