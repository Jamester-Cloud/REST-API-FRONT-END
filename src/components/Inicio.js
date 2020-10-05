import React, { Component } from 'react'

export default class Inicio extends Component {
    render() {
        return (
            <div>
                <div className="page-header page-header-small">
      <div className="page-header-image" data-parallax="true" style={{backgroundImage:`url(${"/img/bakery-wallpaper-2.jpg"})`}}>
      </div>
      <div className="content-center">
        <div className="container">
          <h1 className="title">Rodriang Bakerys</h1>
          <div className="text-center">
            
          </div>
        </div>
      </div>
    </div>
    <div className="section section-about-us">
      <div className="container">
        <div className="row">
          <div className="col-md-8 ml-auto mr-auto text-center">
            <h2 className="title">Conocenos</h2>
            <h5 className="description text-bake">
                Somos un equipo dedicado a la perfección de nuestros Productos. Cada Dia buscamos solucionar los problemas de nuestros clientes
                Mediante Soluciones Innovadoras asi como apetitosas.
            </h5>
          </div>
        </div>
        <div className="separator separator-primary"></div>
        <div className="section-story-overview">
          <div className="row">
            <div className="col-md-6">
              <div className="image-container image-left" style={{ backgroundImage:`url(${"/img/818572-gorgerous-bakery-wallpapers-1920x1200-xiaomi.jpg"})` }}>
                <p className="blockquote blockquote-success text-bake">"No importa el que, ni el cuando , Sinó el ahora. Que esperas para comenzar a actuar"
                  <br/>
                  <br/>
                  <small></small>
                </p>
              </div>
            </div>
            <div className="col-md-5" >

              <div className="image-container image-right"><img src="/img/baking-wallpapers-28205-8677103.jpg" alt="Bakerys" /></div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="section section-team text-center">
      <div className="container">
        <h2 className="title mt-2">Innovación Por sobre todas las cosas</h2>
        <div className="team">
          <div className="row">
            <div className="col-md-6">
              <div className="team-player">
                <img src="/img/birthday-cake-cupcakes-with-chocolate-frosting-fb-ig-3.jpg" alt="Bakerys" className="rounded-circle img-fluid img-raised"/>
                <h4 className="title">Ideas</h4>
                <p className="category text-info">Innovamos Cada Dia</p>       
              </div>
            </div>
            <div className="col-md-6">
              <div className="team-player">
                <img src="/img/374080.jpg" alt="Pasteleria" className="rounded-circle img-fluid img-raised"/>
                <h4 className="title">Confianza</h4>
                <p className="category text-info">Te Acercamos a tus conocidos</p>
                <p className="description"></p>            
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="section section-contact-us text-center">
      <div className="container">
        <h2 className="title">Contactanos</h2>
        <div className="row">
          <div className="col-lg-6 text-center col-md-8 ml-auto mr-auto">
            <div className="input-group input-lg">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="now-ui-icons users_circle-08"></i>
                </span>
              </div>
              <input type="text" className="form-control" placeholder="Nombre"/>
            </div>
            <div className="input-group input-lg">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="now-ui-icons ui-1_email-85"></i>
                </span>
              </div>
              <input type="text" className="form-control" placeholder="Email..."/>
            </div>
            <div className="textarea-container">
              <textarea className="form-control" name="name" rows="4" cols="80" placeholder="Deja un Mensaje..."></textarea>
            </div>
            <div className="send-button">
              <a href="#pablo" className="btn btn-primary btn-round btn-block btn-lg">Enviar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
            </div>
        )
    }
}
