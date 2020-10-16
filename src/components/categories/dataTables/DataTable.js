import React, { Component } from 'react'
import axios from 'axios';
import $ from 'jquery';
import Tippy from '@tippyjs/react';
import {Link} from 'react-router-dom';
import Complements from '../../complementary/Complements';
import refreshFunction from '../../complementary/refreshFunction';
//Loading
import PageLoading from '../../PageLoading';
//error
import PageError from '../../PageError';

export default class DataTable extends Component {

  signal = axios.CancelToken.source();
  // State del componente
  state={
    categorias:[], // -> Data State
    error:null,
    loading:true
  }

    // Categorias a elejir en el select
    async getCategorias(){
      this.setState({loading:true});
      await axios.get('http://localhost:4000/api/categorias', {cancelToken: this.signal.token}).then(res=>{
          this.setState({categorias:res.data.categorias , loading:false});
          $("#producto").DataTable();
      }).catch(err=>{
        this.setState({loading:false, error:err });
      })
    }
    // Evento on change que cambia los selects
    async componentDidMount(){
      this.getCategorias(); 
      this.Messages=Complements.bind(this);
      this.destroyDataTables=refreshFunction.bind();
    }
    componentWillUnmount() {
      this.signal.cancel('Api is being canceled');
    }

    refresh(){
      this.destroyDataTables();
      this.getCategorias();
    }

    deleteCrt = async(id) =>{

      await axios.delete('http://localhost:4000/api/categorias', {data:{idCategoria:id}}, {cancelToken: this.signal.token}).catch(err=>{
        this.setState({loading:false, error:err });
      })
      this.refresh();
      this.Messages('Categoria Eliminada');
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
                        <div className="tab-pane active" id="inicio">
                        <div className="toolbar text-right p-3">
                          <Tippy content="Refrescar" placement="top" animation="shift-away">
                            <button className="btn btn-icon btn-round btn-primary btn-md mr-3" title="Refrescar" onClick={()=>this.refresh()}> <i className="fa fa-sync-alt"></i> </button>
                          </Tippy>
                          <Tippy content="Nueva Categoria" placement="top" animation="shift-away">
                              <Link className="btn btn-icon btn-round btn-md btn-success mr-3" to="/addCategories" ><i className="fa fa-plus"></i> </Link> 
                          </Tippy>
                        </div>
      
                            <div className="table-responsive table-hover">
                                <table id="producto" className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th colSpan="1">Categoria</th>
                                            <th></th>
                                            <th></th>
                                             
                                        </tr>
                                    </thead>
                                    <tbody>
                                      {
                                        this.state.categorias.map((Cats,i)=>
                                          <tr key={i}>
                                            <td>{Cats.categoria}</td>
                                            <td><Tippy content="Editar" position="top" animation="fade"><Link to={"/editCategories/"+ Cats.idCategoria} className='btn btn-icon btn-round btn-sm btn-info'><i className="fa fa-pen"></i></Link></Tippy></td>
                                              <td><Tippy content="Eliminar" position="top" animation="fade"><button onClick={() => this.deleteCrt(Cats.idCategoria)} className='btn btn-icon btn-round btn-sm btn-danger'><i className="fa fa-trash-alt"></i></button></Tippy></td>
                                          </tr>
                                        )
                                      }  
                             
                                    </tbody>
                                </table>
                              </div>
                           </div>
                        </div>
                    </div>
        )
    }
}
