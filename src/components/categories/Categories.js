import React, { Component } from 'react'
import DataTable from './dataTables/DataTable';

export default class Categories extends Component {
    render() {
        return (
          <div className="content mt-3 p-3">
          <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Categorias</h4>
                </div>       
                <DataTable/>  
                </div>
          </div>
    
        )
    }
}
