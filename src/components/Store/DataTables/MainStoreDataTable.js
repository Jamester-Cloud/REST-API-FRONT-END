import React, { Component } from 'react'
import "./shop.css";
import axios from 'axios';
//import Tippy from 'tippy.js';
import { Link } from 'react-router-dom';
import Producto from './Producto';
import Tippy from '@tippyjs/react';
//Loading
import PageLoading from '../../PageLoading';
//error
import PageError from '../../PageError';

class MainStoreDataTable extends React.Component {
  constructor() {
    super();
    this.state = {
      articulos: [], // --> Data State
      error: null,
      loading: true
    }
  }
  
  
// carga de los articulos al rcargarse el componente
async getArticles() {
  this.setState({
    loading: true, error: null
  })

  setTimeout(async () => {
    await axios.get('http://localhost:4000/api/articulos')
      .then(res => {
        this.setState({
          articulos: res.data,
          loading: false
        })
      }).catch(err => {
        console.log(err);
      })
  }, 3000);

}
async componentDidMount() {
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
  if(this.state.error){
      return (
          <div className="row justify-content-center fadeIn">
                  <div className="col-bg-12">
                      <PageError errors={this.state.error} />
                  </div>
          </div> 
      );
    }
  const arreglocomponentes = this.state.articulos.map((e, i) => {
    return (
      <Producto 
        key={i}
        nombre={e.nombre}
        categoria={e.categoria}
        stock={e.stock}
        precio={e.precio}
        idArticulo={e.idArticulo}
      />
    );
  }
  );
  return (
    <div className="container">
      <hr />
      <div className="row">
        {arreglocomponentes}
      </div>
    </div>
  );
}
}
export default MainStoreDataTable;
