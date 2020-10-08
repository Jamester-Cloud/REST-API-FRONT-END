import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
//Loading
import PageLoading from '../../PageLoading';

export default class MainStoreDataTable extends Component {
    state={
        articulos:[], // --> Data State
        error:null,
        loading:true
    }
    // carga de los articulos al rcargarse el componente
    async getArticles(){
        this.setState({
            loading:true , error:null
        })

        setTimeout( async () => {
            await axios.get('http://localhost:4000/api/articulos')
            .then(res =>{
                this.setState({
                    articulos:res.data,
                    loading:false
                })
            }).catch(err=>{
                console.log(err);
            })
        }, 3000);

    }
    async componentDidMount(){
        this.getArticles();
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
        )
    }
}
