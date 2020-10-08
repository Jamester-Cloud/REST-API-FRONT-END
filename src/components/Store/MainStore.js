import React, { Component } from 'react'

import MainStoreDataTable from './DataTables/MainStoreDataTable';

export default class MainStore extends Component {

    render() {
        return (
            <div className="container p-3">
                {/* comienzo del bucle para recorrer y mostrar los productos */}
                <div className="row  mx-auto">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header text-center">
                                <h3 className="text-success card-title">Tienda</h3>
                            </div>
                            <MainStoreDataTable/>
                            
                            <hr/>
                            <div className="card-footer p-2 mb-3">
                                <h6 className="text-success">Estado de la tienda: Activa</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
