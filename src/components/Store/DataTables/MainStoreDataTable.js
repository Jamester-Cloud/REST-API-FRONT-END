import React from 'react'
import "./shop.css";
import axios from 'axios';
//import Tippy from 'tippy.js';
import { Link } from 'react-router-dom';

import Tippy from '@tippyjs/react';
//Loading
import PageLoading from '../../PageLoading';
//error
import PageError from '../../PageError';

class MainStoreDataTable extends React.Component {

  signal = axios.CancelToken.source();
  constructor() {
    super();
    this.state = {
      //Loaders
      loading: true,
      //data
      articulos: [], // --> Data State
      error: null,
      //Modal Art state
      idArticulo:0,
      categoria:'',
      nombre:'',
      descripcion:'',
      precio:0,
      stock:0
    }
  }
  // Obtiene los detalles del articulo
  async ArtDetails(id){
    await axios.post('https://bakery-backend.herokuapp.com/api/articulos/getArt',{
      idArticulo:id
    }, {cancelToken: this.signal.token}).then(res=>{
      this.setState({
        idArticulo:res.data[0].idArticulo,
        categoria:res.data[0].categoria,
        nombre:res.data[0].nombre,
        descripcion:res.data[0].descripcion,
        precio:res.data[0].precio,
        stock:res.data[0].stock
      })

    }).catch(err=>{
      console.log(err);
    })
  }
  // carga de los articulos al rcargarse el componente
  async getArticles() {
    this.setState({
      loading: true, error: null
    })
    await axios.get('https://bakery-backend.herokuapp.com/api/articulos', {cancelToken: this.signal.token})
      .then(res => {
        this.setState({
          articulos: res.data,
          loading: false
        })
      }).catch(err => {
        console.log(err);
      })
  }
  async componentDidMount() {
    this.getArticles();
  }

  componentWillUnmount() {
    this.signal.cancel('Api is being canceled');
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
    if(this.state.error){
        return (
            <div className="row justify-content-center fadeIn">
                    <div className="col-bg-12">
                        <PageError errors={this.state.error} />
                    </div>
            </div> 
        );
      }

    return (
      <div className="container">
        <hr />
        <div className="row">
          {this.state.articulos.map((e,i)=>
            <div className="col-sm-4 nt text-center" key={i}>
                  <div className="card">
                      <img className="mx-auto d-block img-fluid" alt="Product" src="/img/icons/product.png" />
                      <div className="card-body">
                          <h5 className="card-title">{e.nombre}</h5>
                          <div className="contenido">
                              <div className="card-text">
                                  Categoria: {e.categoria}
                              </div>
                          </div>
                          <button type="button" id="modalTrigger" onClick={()=>this.ArtDetails(e.idArticulo)} className="btn btn-primary btn-round" data-toggle="modal" data-target="#exampleModal">
                              Ver Informacion
                          </button>
                      </div>
                  </div>
              </div>
            )}
        </div>
          {/* Ventana Modal */}
                      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog">
                              <div className="modal-content">

                                  <div className="modal-header">
                                      <h5 className="modal-title" id="exampleModalLabel">Categoria: {this.state.categoria}</h5>
                                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                          <span aria-hidden="true">&times;</span>
                                      </button>
                                  </div>
                                  <br/>
                                  <div >
                                      <img className="mx-auto d-block" src="/img/icons/product.png"  alt="Product" />
                                  </div>{/*https://www.americanspecialops.com/images/side/msrt.jpg*/}
                                  <div className="modal-body">
                                      <h2>{this.state.nombre}</h2>
                                      <p>
                                          {this.state.descripcion}
                                      </p>
                                      <div className=" d-flex">
                                                  <h5 className="ml-2">Precio: {this.state.precio}</h5>
                                                  {this.state.stock === 0
                                                  ?<h5 className="ml-4 text-danger">Sin Stock</h5>
                                                  :<h5 className="ml-4 text-success">En Stock: {this.state.stock}</h5> }
                                                  
                                              </div>
                                  </div>
                                  <div className="modal-footer">
                                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                      <div className="dropdown">
                                              {this.state.stock === 0 
                                                      ?<Tippy content="Proceder a la compra" placement="top" animation="shift-away">
                                                      <button disabled className="btn btn-round btn-outline-default btn-info dropdown-toggle btn-simple btn-icon no-caret" data-toggle="dropdown">
                                                          <i className="now-ui-icons shopping_shop"></i>
                                                      </button>
                                                  </Tippy>
                                                      :<Tippy content="Proceder a la compra" placement="top" animation="shift-away">
                                                          <Link id="redirect" to={"/addToCart/"+this.state.idArticulo}  className="btn btn-round btn-outline-default btn-info dropdown-toggle btn-simple btn-icon no-caret">
                                                              <i className="now-ui-icons shopping_shop"></i>
                                                          </Link>
                                                      </Tippy> 
                                              }
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
  export default MainStoreDataTable;
