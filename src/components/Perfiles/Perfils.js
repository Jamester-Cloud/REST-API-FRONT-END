import React, { Component } from 'react'
import axios from 'axios';
//Router
import $ from 'jquery';
import {Link} from 'react-router-dom'
import Tippy from '@tippyjs/react';

//Complements
import Complements from '../complementary/Complements';
import refreshFunction from '../complementary/refreshFunction';

export default class Perfils extends Component {

  // State del componente
  state={
    perfil:'',
    perfiles:[]
  }

    // Categorias a elejir en el select
    async getPerfiles(){
      const res = await axios.get('http://localhost:4000/api/perfil');
      this.setState({perfiles:res.data });
      $("#producto").DataTable();
    }
    // Evento on change que cambia los selects
    onChange=e=>{
      this.setState({
        [e.target.name]:e.target.value
      })
    }

    async componentDidMount(){
      this.getPerfiles(); 
      this.Messages=Complements.bind(this);
      this.destroyDataTables=refreshFunction.bind();
    }

    refresh(){
      this.destroyDataTables();
      this.getPerfiles();
    }

    deleteCrt = async(id) =>{
      await axios.delete('http://localhost:4000/api/perfil', {data:{idPerfil:id}});
      this.Messages('Perfil eliminado');
      this.refresh();
    }

    render() {
        return (
  <div className="content mt-3 p-3">
    <div className="card">
          <div className="card-header">
            <h4 className="card-title">Perfiles</h4>
          </div>       
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
          </div>
             
    </div>
    
        )
    }
}


