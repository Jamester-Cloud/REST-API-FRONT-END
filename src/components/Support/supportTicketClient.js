import React, { Component } from 'react'
import DataTablesClient from './DataTables/DataTablesClient';

export default class supportTicketClient extends Component {


    render() {
        return (
            <div className="content mt-5 p-3">
            <div className="card">
                <div class="card-header d-flex justify-content-start">
                    <h3>Tickets</h3>
                </div>
                <hr/>
                <DataTablesClient/>
              
            </div>
           
        </div>
        )
    }
}
