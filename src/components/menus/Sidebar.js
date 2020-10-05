import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import $ from 'jquery';

export default class Sidebar extends Component {


    menuControl(){
        $(document).ready(function() { 
            $(function() {
                var page = window.location.pathname;
                $('.nav li').filter(function(){
                   return $(this).find('a').attr('href').indexOf(page) !== -1
                }).addClass('active');
              
                $(".nav a").on("click", function() {
                  $(".nav").find(".active").removeClass("active");
                  $(this).parent().addClass("active");
                });
              });
        });
    }

    render() {
        this.menuControl();
        return (
            
            <div className="sidebar" data-color="orange">
                <div className="logo">
                    <Link to="/Dashboard" className="simple-text logo-mini">
                        {sessionStorage.getItem("Username").charAt(0)}
                    </Link>
                    <Link to="/Dashboard" className="simple-text logo-normal">
                        {sessionStorage.getItem("Username")}
                    </Link>
                </div>
                <div className="sidebar-wrapper" id="sidebar-wrapper">
                    <ul className="nav">
                    <li className="">
                        <Link to="/Dashboard">
                        <i className="now-ui-icons business_chart-bar-32"></i>
                        <p>Inicio</p>
                        </Link>
                    </li>
                    <li className="">
                        <Link to="/usuarios">
                        <i className="now-ui-icons users_single-02"></i>
                        <p>Usuarios</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Perfiles">
                        <i className="now-ui-icons business_badge"></i>
                        <p>Perfiles</p>
                        </Link>
                    </li>
                    <li>
                        {/* Condicionar a vista del cliente */}
                        <Link to="/supportTicketAdmin">
                        <i className="now-ui-icons business_badge"></i>
                        <p>Atencion al Cliente</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/categoria">
                        <i className="now-ui-icons location_map-big"></i>
                        <p>Categorias</p>
                        </Link>
                    </li>
                    <li className="">
                        <Link to="/articulo">
                        <i className="now-ui-icons design_app"></i>
                        <p>Articulos</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Clientes">
                        <i className="now-ui-icons users_circle-08"></i>
                        <p>Clientes</p>
                        </Link>
                    </li>
                    </ul>
                </div>
            </div>
        )
    }
}




