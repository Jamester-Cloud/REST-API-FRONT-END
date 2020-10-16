import React, { Component } from 'react'

import Tippy from '@tippyjs/react';

import OrdersDataTables from './DataTables/OrdersDataTables';

export default class Orders extends Component {

    render() {
        return (
            <div className="content mt-5 p-3">
                <div className="card">
                    <div className="card-header d-flex justify-content-end">
                        <div className="nav-tabs-wrapper ">
                        <ul className="nav nav-tabs" data-tabs="tabs">
                        <li className="nav-item">
                            <Tippy content="Pedidos Inicio" position="top" animation="fade">
                                <a className=" nav-link active text-info" href="#inicio" data-toggle="tab">  
                                    <i className="fa fa-dolly-flatbed"></i>
                                </a>
                            </Tippy>
                        </li>                           
                        <li className="nav-item">
                            <Tippy content="Pedidos Completados" position="top" animation="fade">
                                <a className="nav-link text-success " href="#completados" data-toggle="tab">
                                    <i className="fa fa-cart-arrow-down"></i>
                                </a>
                          </Tippy>
                        </li>
                        <li className="nav-item">
                            <Tippy content="Pedidos Denegados" position="top" animation="fade">
                                <a className="nav-link text-danger" href="#denegados" data-toggle="tab">
                                    <i className="fa fa-minus-circle"></i>
                                </a>
                            </Tippy>
                        </li>
                        
                      </ul>
                  </div>
              </div>
              <hr/>
              <OrdersDataTables/>
              
            </div>
        </div>
        )
    }
}