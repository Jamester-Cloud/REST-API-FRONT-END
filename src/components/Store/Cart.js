import React, { Component } from 'react'

// tooltips
import Tippy from '@tippyjs/react';

import ClientCartData from '../Store/DataTables/ClientCartData'

export default class Cart extends Component {

    render() {
        return (
            <div className="content mt-5 p-3">
            <div className="card">
              <div class="card-header d-flex justify-content-end">
                <div class="nav-tabs-wrapper ">
                      <ul class="nav nav-tabs" data-tabs="tabs">
                        <li class="nav-item">
                            <Tippy content="Agregados al carrito" position="top" animation="fade">
                                <a class=" nav-link active text-info" href="#inicio" data-toggle="tab">  
                                    <i class="fa fa-shopping-cart"></i>
                                </a>
                            </Tippy>
                        </li>                           
                        <li class="nav-item">
                            <Tippy content="Pedido a domicilio" position="top" animation="fade">
                                <a class="nav-link text-success " href="#pedido" data-toggle="tab">
                                    <i class="fa fa-dollar-sign"></i>
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
