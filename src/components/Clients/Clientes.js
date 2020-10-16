import React, { Component } from 'react'

//Router
import DataTable from './tables/DataTable';

export default class Clientes extends Component {

    render() {

        return (
            <div className="content mt-3 p-3">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Clientes</h4>
                    </div>       
                    {/* Aca va la dataTable */}
                    <DataTable/>
                </div>
            </div>
        )
    }
}
