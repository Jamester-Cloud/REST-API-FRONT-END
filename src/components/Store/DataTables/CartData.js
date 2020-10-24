import React, { Component } from 'react'
import axios from 'axios';
import {format}from 'timeago.js';
import Swal from 'sweetalert2'; 
import $ from 'jquery';
//Loading
import PageLoading from '../../PageLoading';
//Errors
import PageError from '../../PageError';
//Funciones varias
import fechaES from '../../complementary/fechaFormat';
import { Link} from 'react-router-dom';


export default class CartData extends Component {

    signal = axios.CancelToken.source();

    state={
		//ids de ingreso
        idCliente:0,
        idArticulo:0,
		stock:0,
		cantidad:0,
		//informacion del producto
		nombre:'',
		precio:0,
		fechaIngreso:'',
        categoria:'',
        error:null,
        loading:true
		//redirect
	}

	Messages(M){
		const Toasted = Swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			onOpen: (toast) => {
			  toast.addEventListener('mouseenter', Swal.stopTimer)
			  toast.addEventListener('mouseleave', Swal.resumeTimer)
			},
		  })
		  Toasted.fire(M,'','success');
	}
	/// Add to cart function
	onSubmit=e=>{
		e.preventDefault(); // Quitando el comportamiento del formulario
		axios.put('https://bakery-backend.herokuapp.com/api/store', {
			idArticulo:this.state.idArticulo,
			idCliente:this.state.idCliente,
			stock:this.state.stock,
			cantidad:parseInt(this.state.cantidad)
		}, {cancelToken: this.signal.token}).then(res =>{
			if(res.statusText==='OK'){
				if(this.state.cantidad >1 ){
					this.Messages('Articulos Agregados al carrito')
				}else{
					this.Messages('Articulo Agregado al carrito')
				}
				window.history.back();
			}
		}).catch(err=>{
            this.setState({loading:false, error:err });
        })
	}

	onChange = e =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    async getData(){   
        await axios.post('https://bakery-backend.herokuapp.com/api/articulos/getArt',{
            idArticulo:this.props.id
          }, {cancelToken: this.signal.token})
        .then(res=>{
            //console.log(res.data)
			this.setState({
				stock:res.data[0].stock,
				idArticulo:res.data[0].idArticulo,
				idCliente:parseInt(sessionStorage.getItem('Cliente')),
				//
				nombre:res.data[0].nombre,
				precio:parseInt(res.data[0].precio),
				fechaIngreso:res.data[0].fechaIngreso,
                categoria:res.data[0].categoria,
                loading:false
			})

        }).catch(err=>{
            this.setState({loading:false, error:err });
        }) 
    }

    async componentDidMount(){
		this.fechaES=fechaES.bind();
		this.getData();
		this.fechaES();
        // removiendo el modal en su totalidad
        $('.modal-backdrop').remove();
	}

    componentWillUnmount() {
      this.signal.cancel('Api is being canceled');
    }
    
	updateTextInput(val) { // Haciendo visible el valor
        document.getElementById('textInput').value=val;
    }
    render() {
        if(this.state.loading === true){
            return (
                <div className="row justify-content-center fadeIn">
                        <div className="col-bg-12">
                            <PageLoading />
                        </div>
                </div> 
            );
		}
		if(this.state.error){
            return (
                <div className="row justify-content-center fadeIn">
                        <div className="col-bg-12">
                            <PageError errors={this.state.error} />
                        </div>
                </div> 
            );
          }
        return (
            <div className="card-body">
                <div className="row">
			        <div className="col-md-4 p-4">
				        <img src="/img/icons/product.png" alt="Productos"/>
				        <hr/>
				        <form onSubmit={this.onSubmit} >
                            <input type="hidden" value="{{users.idCliente}}" name="idCliente"/>
                            <input type="hidden" value="{{art.idArticulo}}" name="idArticulo"/>
                            <h6>-Disponibles</h6>
                            <label htmlFor="rangeInput">Cantidad a comprar</label>
                            <input type="range" name="cantidad" id="cantidad" className="form-control-range" onChange={this.onChange} max={this.state.stock}/>
                            <input type="text" value={this.state.cantidad} required={true} id="textInput" className="form-control" readOnly={true}/>
                            <hr/>
                            <div className="text-center">
                                <Link to="/tiendaOnline" className="mr-5 btn btn-round btn-info btn-icon"> <div className="fa fa-arrow-left"></div> </Link>
                                <input type="submit" onSubmit={this.onSubmit} value="Agregar al Carrito" className="btn btn-round btn-success"/>	
                            </div>	
				        </form>
			        </div>
                    <div className="col-md-6 mt-5">
                        <h5>Nombre: {this.state.nombre}</h5>
                            <hr/>
                            <h5>Categoria: {this.state.categoria}</h5>
                            <hr/>
                        <h5>Precio: {this.state.precio}</h5>
                            <hr/>
                        <h5>Actualizado: {format(this.state.fechaIngreso, 'my-locale')}</h5>
                        <hr/>
                    </div>
	            </div>
            </div>
        )
    }
}
