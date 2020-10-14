import React, { Component } from 'react'

// tooltips
import Tippy from '@tippyjs/react';

import ClientCartData from '../Store/DataTables/ClientCartData'

export default class Cart extends Component {

    render() {
        return (
            <div className="content mt-5 p-3">
            <div className="card">
              <div className="card-header d-flex justify-content-end">
                <div className="nav-tabs-wrapper ">
                      <ul className="nav nav-tabs" data-tabs="tabs">
                        <li className="nav-item">
                            <Tippy content="Agregados al carrito" position="top" animation="fade">
                                <a className=" nav-link active text-info" href="#inicio" data-toggle="tab">  
                                    <i className="fa fa-shopping-cart"></i>
                                </a>
                            </Tippy>
                        </li>                           
                        <li class="nav-item">
                            <Tippy content="Pedido a domicilio" position="top" animation="fade">
                                <a className="nav-link text-success " href="#pedido" data-toggle="tab">
                                    <i className="fa fa-dollar-sign"></i>
                                </a>
                            </Tippy>
                        </li>
                      </ul>
                  </div>
              </div>
              <hr/>
              <ClientCartData/>
              
            </div>
        </div>
        )
    }
}
