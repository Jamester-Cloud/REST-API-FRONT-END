import React, { Component } from 'react'
import axios from 'axios';
import {format,register} from 'timeago.js';
import $ from 'jquery';
import Complements from '../../complementary/Complements';
import refreshFunction from '../../complementary/refreshFunction';
//Router
import {Link} from 'react-router-dom'
//ToolTips
import Tippy from '@tippyjs/react';
//Loading
import PageLoading from '../../PageLoading';
//Error
import PageError from '../../PageError';

export default class dataTable extends Component {
    // State del componente
  state={
    articles:[],
    loading:true,
    error:null
  }
  //Helper para la fecha en ES de timeago.js
  fechaES(){
    const localeFunc = (number, index, totalSec) => {
      return [
        ['justo ahora', 'en un rato'],
        ['hace %s segundos', 'en %s segundos'],
        ['hace 1 minuto', 'en 1 minuto'],
        ['hace %s minutos', 'en %s minutos'],
        ['hace 1 hora', 'en 1 hora'],
        ['hace %s horas', 'en %s horas'],
        ['hace 1 día', 'en 1 día'],
        ['hace %s días', 'en %s días'],
        ['hace 1 semana', 'en 1 semana'],
        ['hace %s semanas', 'en %s semanas'],
        ['hace 1 mes', 'en 1 mes'],
        ['hace %s meses', 'en %s meses'],
        ['hace 1 año', 'en 1 año'],
        ['hace %s años', 'en %s años'],
      ][index];
    };
    
    // Utilizando el metodo Register
    register('my-locale', localeFunc);  
   }
   //Obteniendo Articulos
   async getArticulos(){
    setTimeout( async () => {
        await axios.get('http://localhost:4000/api/articulos').then(res=>{
            this.setState({articles:res.data, loading:false });
            $("#producto").DataTable();
        }).catch(err=>{
            this.setState({error:err , loading:false });
        })
    }, 3000);
   }

    refrescarTabla(){
      this.destroyDataTables();
      this.getArticulos();
    }

    async componentDidMount(){
      this.getArticulos();
      this.fechaES();
      this.Messages=Complements.bind(this);
      this.destroyDataTables=refreshFunction.bind();
    }

    deleteArt = async(id) =>{
      await axios.delete('http://localhost:4000/api/articulos', {data:{idArticulo:id}}).catch(err=>{
        this.setState({error:err , loading:false });
      })
      this.Messages('Articulo Eliminado');
      this.refrescarTabla()
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
            <div className="card-body">
              <div className="tab-content text-left">
                      <div className="toolbar text-right p-3">
                        <Tippy content="Refrescar" placement="top" animation="shift-away">
                            <button className="btn btn-icon btn-primary btn-round btn-md mr-3" title="Refrescar" onClick={()=>this.refrescarTabla()}> <i className="fa fa-sync-alt"></i> </button> 
                        </Tippy>
                        <Tippy content="Nuevo articulo" placement="top" animation="shift-away">
                         <Link className="btn btn-icon btn-round btn-md btn-success mr-3" to="/addArticulo" ><i className="fa fa-plus"></i> </Link>
                        </Tippy>
                      </div>

                       <div className="table-responsive table-hover">
                          <table id="producto" className="table table-striped">
                              <thead>
                                  <tr>
                                      <th colSpan="1">Articulo</th>
                                      <th colSpan="1">Precio</th>
                                      <th colSpan="1">Categoria</th>
                                      <th colSpan="1">Actualizado</th>
                                      <th colSpan="1">Existencias</th>
                                      <th></th>
                                      <th></th> 
                                  </tr>
                              </thead>
                              <tbody>
                                      {
                                          this.state.articles.map((article,i)=>
                                            <tr key={i}>
                                              <td>{article.nombre}</td>
                                              <td>{article.precio}</td>
                                              <td>{article.categoria}</td>
                                              <td>{format(article.fechaIngreso, 'my-locale')}</td>
                                              <td>{article.stock}</td>
                                              <td><Tippy content="Editar" position="top" animation="fade">
                                                <Link to={"/edit/"+ article.idArticulo} className='btn btn-icon btn-round btn-sm btn-info'>
                                                  <i className="fa fa-pen"></i></Link></Tippy></td>
                                              <td><Tippy content="Eliminar" postion="top" animation="fade">
                                                <button onClick={() => this.deleteArt(article.idArticulo)} className='btn btn-icon btn-round btn-sm btn-danger'>
                                                  <i className="fa fa-trash-alt"></i></button></Tippy></td>
                                            </tr>
                                          )
                                      }
                              </tbody>
                          </table>
                        </div>
                     
                  </div>
              </div>
        )
    }
}
