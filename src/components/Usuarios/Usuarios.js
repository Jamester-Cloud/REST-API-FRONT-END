import React, { Component } from 'react'
import DataTable from './dataTables/DataTables';
//ToolTips

export default class Usuarios extends Component {

    render() {
        return (
            <div className="content mt-3 p-3">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Usuarios</h4>
                    </div>
                    {/*DataTable*/}
                    <DataTable/>
                    </div>
             
    </div>
        )
    }
}