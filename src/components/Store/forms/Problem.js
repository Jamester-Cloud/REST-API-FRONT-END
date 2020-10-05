import React, { Component } from 'react'
import $ from 'jquery';
import axios from 'axios';
import Complements from '../../complementary/Complements';

export default class Problem extends Component {
   
    onChange = e =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    state = {
        tituloTicketSoporte:'',
        idFactura:0,
        descripcion:'',
        causa:''
    }

    componentDidMount(){
      this.Messages=Complements.bind(this);
        // Escondiendo el input
        $("#divOtro").css('display','none');
         //segunda funcion que desaparece el input
        $("#formTicket input[type=radio]").on('click', ()=>{
           let otro=$("#otro").is(':checked');
           if(otro){
                $("#divOtro").show('fadeIn')
           }else{
                $("#divOtro").hide('fadeOut',()=>{
                    $("#inputOtro").val("");
                    $("#divOtro").css('display','none');
                })
                
           }
        })
    } // fin del componentDidMount

    handleOptionChange = e => {
        if(e.target.checked){
          this.setState({
            [e.target.name]:e.target.value
          })
        }
      };

    onSubmit= e =>{
      // Previniendo el comportamiento del formulario por defecto
      e.preventDefault();
      //Variable de validacion
      let banderavalidacion=true;
      //titulo del ticket
      let tituloTicket = $("#tituloTicketSoporte").val();
      // Descripcion
      let descripcionTicket = $("#descripcion").val();
      // checkboxs de datos
      let check =$("input[name=causa]").is(':checked');
      //Otro
      let otraCausa =$("#inputOtro").val();


      if(otraCausa.length===0 && otraCausa){

        $("#inputOtro")
          .closest('.form-group')
          .find('span')
          .remove();

        $("#inputOtro")
          .closest('.form-group')
          .addClass('text-danger ml-3')
          .append('<span>Campo requerido</span>');
          banderavalidacion=false;
      }else{
        $("#inputOtro")
          .closest('.form-group')
          .find('span')
          .remove();
        //  

      }

      if(tituloTicket.length === 0){
        // removiendo si hay spans
        $("#tituloTicketSoporte")
          .closest('.form-group')
          .find('span')
          .remove();
        //Agregando si hay spans
        $("#tituloTicketSoporte")
          .closest('.form-group')
          .addClass('text-danger ml-3')
          .append('<span>Campo requerido</span>');
        banderavalidacion=false;
      }else{
        $("#tituloTicketSoporte").closest('.form-group').find('span').remove(); 
      }

      if(descripcionTicket.length === 0){
        // removiendo si hay spans
        $("#descripcion")
          .closest('.form-group')
          .find('span')
          .remove();
        //Agregando si hay spans
        $("#descripcion")
          .closest('.form-group')
          .addClass('text-danger ml-3')
          .append('<span>Campo requerido</span>');
          banderavalidacion=false;
      }else{
        $("#descripcion")
        .closest('.form-group')
        .find('span')
        .remove(); 
      }

      
      if(check){
        $("input[name=causa]")
          .closest('.form-check-label')
          .removeClass('text-danger')
          .find('span')
          .remove();
      }else{
        // removiendo span
        $("input[name=causa]")
          .closest('.form-check-label')
          .find('span')
          .remove();
        // agregando span
        $("input[name=causa]")
        .closest('.form-check-label')
        .addClass('text-danger ml-3')
        .append('<span>Seleccione una opcion</span>')
      }

      if(banderavalidacion){ // si es verdadero procede a hacer el envio del formulario segun el campo
        
        e.preventDefault();
        // se envia una informacion general con los checkbox
          if($("#inputOtro").val() === "" ){
            axios.post("http://localhost:4000/api/store/supportTicket",{
              idFactura:this.props.match.params.id,
              tituloTicketSoporte:this.state.tituloTicketSoporte,
              descripcionTicketSoporte:this.state.descripcion,
              causaTicketSoporte:this.state.causa
            }).then((res)=>{
              if(res.statusText === "OK"){
                this.Messages('Ticket registrado exitosamente')
                window.location.href="/Pedidos";
              }
              
            })
  
          // se envia una informacion general con el input en caso de ser otra la causa
          }else{
            axios.post("http://localhost:4000/api/store/supportTicket",{
              idFactura:this.props.match.params.id,
              tituloTicketSoporte:this.state.tituloTicketSoporte,
              descripcionTicketSoporte:this.state.descripcion,
              causaTicketSoporte:$("#inputOtro").val()
            }).then((res)=>{
                if(res.statusText==='OK'){
                  this.Messages('Ticket registrado exitosamente')
                  window.location.href="/Pedidos";
                }          
            })
  
          }

      }

      

      // validacion si existe el campo input text area otro



        
    } 

    render() {
        return (
     <div className="content mt-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <h3 className="text-left ">Reportar un problema</h3>
            <div className="text-right"><button className=" btn btn-round btn-icon btn-info"><i className="fa fa-arrow-left"></i></button></div>
          </div>
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-md-12 mx-auto">
                <form id="formTicket" onSubmit={this.onSubmit}>
                <div className="form-row">
                  <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="perfils" className="error">Ingrese el titulo de su ticket:</label>
                            <input 
                               
                              type="text" 
                              className="form-control campoObligatorio" 
                              onChange={this.onChange} 
                              value={this.state.tituloTicketSoporte}
                              name="tituloTicketSoporte" 
                              id="tituloTicketSoporte"
                              placeholder="titulo del ticket" 
                            />
                    </div>
                    <div className="form-group">
                        <textarea type="text" 
                          className="form-control" 
                          name="descripcion"  
                          id="descripcion"
                          onChange={this.onChange}
                          value={this.state.descripcion}
                          placeholder="Descripcion" 
                        />                        
                    </div>
                  </div>
                  <div className="col-md-12">
                    <p> Causa del problema:</p>
                    <div className="form-check form-check-radio">
                        <label className="form-check-label">
                                <input 
                                  type="radio" 
                                  className="form-check-input checkCausa" 
                                  name="causa"
                                  
                                  value="Condiciones del producto precarias"
                                  onChange={this.handleOptionChange}
                                  placeholder="Ingrese el nombre del perfil" 
                                />
                                
                                Condiciones del producto precarias
                                <div className="form-check-sign">
                                    <span className="check"></span>
                                </div>
                        </label>      
                    </div>
                    <div className="form-check form-check-radio">
                        <label className="form-check-label">
                                <input 
                                  type="radio" 
                                  className="form-check-input checkCausa" 
                                  name="causa" 
                                  value="Mala atencion del personal"
                                  onChange={this.handleOptionChange}
                                />
                                Mala atencion del personal
                                <div className="form-check-sign">
                                    <span className="check"></span>
                                </div>
                        </label>      
                    </div>
                    <div className="form-check form-check-radio">
                        <label className="form-check-label">
                            <input 
                              type="radio" 
                              className="form-check-input checkCausa" 
                              name="causa" 
                              value="No fue el producto que solicite" 
                              placeholder="Ingrese el nombre del perfil" 
                              onChange={this.handleOptionChange}
                            />
                              
                                No fue el producto que solicite
                                <div className="form-check-sign">
                                    <span className="check"></span>
                                </div>
                        </label>      
                    </div>
                    <div className="form-check form-check-radio">
                        <label className="form-check-label">
                            <input type="radio" className="form-check-input checkCausass"  
                              name="causa" 
                              value="otro" 
                              id="otro"  
                              placeholder="Ingrese el nombre del perfil" 
                            />
                            Otra.
                                <div className="form-check-sign">
                                    <span className="check"></span>
                                </div>
                        </label>      
                    </div>
                    <div className="form-group mt-2" id="divOtro">
                        
                        <textarea type="text" className="form-control checkCausass  campoObligatorio"  name="inputOtro" id="inputOtro"  placeholder="Ingrese el motivo" />
                                
                    </div>
                  </div>
                  
                  <button type="submit" className="btn btn-success btn-block mt-5" >Agregar</button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
        )
    }
}
