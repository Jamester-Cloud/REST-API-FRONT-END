import React, { Component } from 'react'
import refreshFunction from '../../complementary/refreshFunction';

import {Link} from 'react-router-dom'
import Complements from '../../complementary/Complements';
//Loading
import PageLoading from '../../PageLoading';

//
import axios from 'axios';

import $ from 'jquery';
import Tippy from '@tippyjs/react';

import PageError from '../../PageError';

export default class DataTable extends Component {
  
   signal = axios.CancelToken.source();
  

  // State del componente
  state={
    perfil:'',
    error:null,
    loading:true,
    perfiles:[] // -> Data State
  }

  // Categorias a elejir en el select
  async getPerfiles(){
      this.setState({
          loading:true , error:null
      })
      await axios.get('https://bakery-backend.herokuapp.com/api/perfil', {cancelToken: this.signal.token})
      .then(res=>{
          this.setState({perfiles:res.data, loading:false });
          $("#producto").DataTable();
      
      }).catch(err=>{
          this.setState({loading:false, error:err });
      })
  }

    // cuando se monte el componente
    componentDidMount(){
      this.getPerfiles(); 
      this.Messages=Complements.bind(this);
      this.destroyDataTables=refreshFunction.bind();
    }
    ///Cuando se desmonte el componente
    componentWillUnmount() {
      this.signal.cancel('Api is being canceled');
    }
    //Refrescar las tablas
    refresh(){
      this.destroyDataTables();
      this.getPerfiles();
    }

    deleteCrt = async(id) =>{
      await axios.delete('https://bakery-backend.herokuapp.com/api/perfil', {data:{idPerfil:id}}, {cancelToken: this.signal.token,})
      .catch(err=>{
        this.setState({loading:false, error:err });
      });
      this.Messages('Perfil eliminado');
      this.refresh();
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
                         <button className="btn btn-icon btn-round btn-primary btn-md mr-3" title="Refrescar" onClick={()=>this.refresh()}> 
                          <i className="fa fa-sync-alt"></i> 
                         </button>
                    </Tippy>
                    <Tippy content="Nuevo perfil" placement="top" animation="shift-away">
                      <Link className="btn btn-icon btn-round btn-md btn-success mr-3" to="/addPerfil" >
                          <i className="fa fa-plus"></i> 
                      </Link>
                    </Tippy> 
                  </div>

                      <div className="table-responsive table-hover">
                          <table id="producto" className="table table-striped">
                              <thead>
                                  <tr>
                                      <th colSpan="1">Perfil</th>
                                      <th></th>
                                      <th></th>
                                       
                                  </tr>
                              </thead>
                              <tbody>
                                {
                                    this.state.perfiles.map((p,i)=>
                                      <tr key={i}>
                                        <td>{p.perfil}</td>
                                        <td><Tippy content="Editar" position="top" animation="fade">
                                          <Link to={"/EditPerfils/"+ p.idPerfil} className='btn btn-icon btn-round btn-sm btn-info'>
                                            <i className="fa fa-pen"></i></Link></Tippy></td>
                                        <td><Tippy content="Eliminar" position="top" animation="fade">
                                          <button onClick={() => this.deleteCrt(p.idPerfil)} className='btn btn-icon btn-round btn-sm btn-danger'>
                                            <i className="fa fa-trash-alt"></i></button></Tippy></td>
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
