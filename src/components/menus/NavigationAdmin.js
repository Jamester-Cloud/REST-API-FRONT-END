import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
//ToolTip
import Tippy from '@tippyjs/react';



export default class navigationAdmin extends Component {


    componentDidMount(){

    }


   async logout(){
       await axios.get('https://bakery-backend.herokuapp.com/api/authentications/logout')
        .then((res)=>{
            if(res.statusText === "OK"){
                // eliminando informacion de la session
                sessionStorage.clear();
                //Redireccionando
                window.location.href = "/";
            }
        }).catch(err=>{
            console.log(err);

        })
    }



    
    render() {
        if(sessionStorage.getItem('isLoggedInAdmin')){
            return (  
                <nav className="navbar navbar-expand-lg bg-primary">
                    <div className="container-fluid">
                    <div className="navbar-wrapper">
                        <div className="navbar-toggle">
                        <button type="button" className="navbar-toggler">
                            <span className="navbar-toggler-bar bar1"></span>
                            <span className="navbar-toggler-bar bar2"></span>
                            <span className="navbar-toggler-bar bar3"></span>
                        </button>
                        </div>
                        <Link className="navbar-brand" to="/userInfo">Fastysüß /</Link>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navigation">
                        <ul className="navbar-nav">
                        <li className="nav-item">
                        <Tippy content="Ir a la tienda" placement="bottom"  animation="shift-away">
                            <Link className="nav-link" to="/tiendaOnline" id="tienda" title="Ir a la tienda" >
                                <i className="now-ui-icons shopping_shop"></i>
                        </Link>
                        </Tippy>
                        </li>
                        <li className="nav-item">
                            <Tippy content="Ver carrito" placement="bottom"  animation="shift-away">
                                <Link className="nav-link" to="/Cart" title="Ver Carrito" >
                                    <i  className="now-ui-icons shopping_cart-simple"></i>
                                </Link>
                            </Tippy>
                        </li>
                        <li className="nav-item">
                        <Tippy content="Ver Pedidos" placement="bottom" animation="shift-away">
                            <Link className="nav-link"  to="/Pedidos" title="Ver Pedidos">
                            <i className="fa fa-truck "></i>
                            
                            </Link>
                        </Tippy>    
                        </li>
                        <li className="nav-item dropdown">
                            <p className=" text-white nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="now-ui-icons users_single-02"></i>
                            </p>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" to="/userInfo">Ver Perfil</Link>
                                <Link className="dropdown-item" to="/userInfo">Ayuda</Link>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item" onClick={()=>this.logout()} >Cerrar Sesion</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>    
                    
            )

        }else if(sessionStorage.getItem('isLoggedInClient')){
            return (  
                <nav className="navbar navbar-expand-lg bg-primary">
                    <div className="container-fluid">
                    <div className="navbar-wrapper">
                        <div className="navbar-toggle">
                        <button type="button" className="navbar-toggler">
                            <span className="navbar-toggler-bar bar1"></span>
                            <span className="navbar-toggler-bar bar2"></span>
                            <span className="navbar-toggler-bar bar3"></span>
                        </button>
                        </div>
                        <Link className="navbar-brand" to="/userInfo">Fastysüß /</Link>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navigation">
                        <ul className="navbar-nav">
                        <li className="nav-item">
                            <Tippy content="Ir a la tienda" placement="bottom"  animation="shift-away">
                                <Link className="nav-link" to="/tiendaOnline" id="tienda" title="Ir a la tienda" >
                                    <i className="now-ui-icons shopping_shop"></i>
                                </Link>
                            </Tippy>
                        </li>
                        <li className="nav-item">
                            <Tippy content="Ver carrito" placement="bottom"  animation="shift-away">
                                <Link className="nav-link" to="/Cart" title="Ver Carrito" >
                                    <i  className="now-ui-icons shopping_cart-simple"></i>
                                </Link>
                            </Tippy>
                        </li>
                        <li className="nav-item">
                            <Tippy content="Ayuda" placement="bottom" animation="shift-away">
                                <Link className="nav-link"  to="/SupportClient" title="Ayuda">
                                <i className="fa fa-question-circle "></i>
                                
                                </Link>
                            </Tippy>    
                        </li>
                        <li className="nav-item">
                            <Tippy content="Ver Pedidos" placement="bottom" animation="shift-away">
                                <Link className="nav-link"  to="/Pedidos" title="Ver Pedidos">
                                <i className="fa fa-truck "></i>
                                
                                </Link>
                            </Tippy>    
                        </li>
                        <li className="nav-item dropdown">
                            <p className=" text-white nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="now-ui-icons users_single-02"></i>
                            </p>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" to="/userInfo">Ver Perfil</Link>
                                <Link className="dropdown-item" to="/userInfo">Ayuda</Link>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item" onClick={()=>this.logout()} >Cerrar Sesion</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>    
                    
            )
        }
        
    }
}
