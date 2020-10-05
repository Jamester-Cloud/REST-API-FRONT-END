import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class UserInfo extends Component { 


    state={
      username:sessionStorage.getItem("Username"),
      perfilUsuario:sessionStorage.getItem("perfil"),
    }
  
    render() {
        return (
  <div className="content mt-3 p-3">
    <div className="row">
      <div className="col-md-12">
        <div className="card card-user">
          <div className="image">
            <img src="img/baking-wallpapers-28205-8677103.jpg" alt="UserWallpaper"/>
          </div>
          <div className="card-body">
            <div className="author text-left">
              
                <img className="avatar border-gray" src="img/birthday-cake-cupcakes-with-chocolate-frosting-fb-ig-3.jpg" alt="UserProfile"/>
        <h5 className="title text-primary">{this.state.username}</h5>

              <p className="description">
                    {this.state.perfilUsuario}
              </p>
            </div>

          </div>
          <hr/>
          <div className="button-container p-1">
            <Link className=" btn btn-round btn-primary" to={"/editUser/"+parseInt(sessionStorage.getItem("Usuario"))}>Editar Perfil</Link>
          </div>
        </div>
      </div>
    </div>
  </div>





        )
    }
}
