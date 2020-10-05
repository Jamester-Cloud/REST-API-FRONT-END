import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import $ from 'jquery';

export default class Sidebar extends Component {


    menuControl(){
        // funcion que selecciona el menu en las LI y le pone la clase active
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
                    <Link to="/ClientDashboard" className="simple-text logo-mini">
                        {sessionStorage.getItem("Username").charAt(0)}
                    </Link>
                    <Link to="/ClientDashboard" className="simple-text logo-normal">
                        {sessionStorage.getItem("Username")}
                    </Link>
                </div>
                <div className="sidebar-wrapper" id="sidebar-wrapper">
                    <ul className="nav">
                        <li className="">
                            <Link to="/ClientDashboard">
                            <i className="now-ui-icons business_chart-bar-32"></i>
                            <p>Inicio</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}




