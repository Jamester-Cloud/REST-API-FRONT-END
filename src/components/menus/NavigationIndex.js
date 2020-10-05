import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class navigation_index extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-primary fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to="/">FastySüB</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/user">Registrarse</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Iniciar Sesion</Link>
                            </li>
                        </ul>       
                    </div>
                </div>
                </nav>
        )
    }
}
