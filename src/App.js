import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
//Tippy
import 'tippy.js/dist/tippy.css'; // Estilos para el tooltip
import 'tippy.js/animations/shift-away.css'; // Animaciones para el tooltip
//DataTables
import 'datatables.net/js/jquery.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.css';
//Routes
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
//Routes--Signin
//Auth-Index
import CreateUser from './components/authentications/CreateUser';
import AdminDashboard from './components/AdminDashboard';
import ClientDashboard from './components//ClientDashboard';
import loginUser from './components/authentications/loginUser';
///Session user info
import UserInfo from './components/authentications/UserInfo';
//index
import Inicio from './components/Inicio';
//Routes--Session
//articles
import Articulos from './components/Articles/Articulos';
import FormArticulo from './components/Articles/forms/Form';
//Categories
import Categories from './components/categories/Categories';
import EditCategories from './components/categories/edit/EditCategories';
//Perfiles
import Perfils from './components/Perfiles/Perfils';
import Form from './components/Perfiles/forms/form';
//Clientes
import Clientes from './components/Clients/Clientes';
//Users - admin control
import Usuarios from './components/Usuarios/Usuarios';
//Main Store
import MainStore from './components/Store/MainStore';
import addToCart from './components/Store/addToCart';
import Cart from './components/Store/Cart';
import Orders from './components/Store/Orders';
import FormEditUser from './components/authentications/Forms/FormEditUser';
//Problem Reports
import Problem from './components/Store/forms/Problem';
import supportTicketAdmin from './components/Support/supportTicketAdmin';

import supportTicketClient from './components/Support/supportTicketClient';

import NotFound from './components/NotFound/NotFound';

class App extends Component{

  constructor(props){
    super();
    this.state={
      admin:props
    }
  }

  // Metodo render
 render(){
    if(sessionStorage.getItem('isLoggedInAdmin')){
    return(
      <Router>
              <PublicRoute restricted={true} exact path="/" component={Inicio}/>
              <PublicRoute restricted={true} exact path="/user" component={CreateUser}/>
              <PublicRoute restricted={true} exact path="/login" component={loginUser}/>
              {/*Categorias*/}
              <PrivateRoute exact path="/Categoria" component={Categories}/>
              <PrivateRoute exact path="/addCategories" component={EditCategories}/>
              <PrivateRoute exact path="/editCategories/:id" component={EditCategories}/>
              {/*Tienda-Index Dashboard*/}
              <PrivateRoute component={AdminDashboard} path="/Dashboard" exact />
              {/*Articulos*/}
              <PrivateRoute exact path="/Articulo" component={Articulos}/>
              <PrivateRoute exact path="/addArticulo" component={FormArticulo}/>
              <PrivateRoute exact path="/edit/:id" component={FormArticulo}/>
              {/*Perfiles*/}
              <PrivateRoute exact path="/Perfiles" component={Perfils}/>
              <PrivateRoute exact path="/addPerfil" component={Form}/>
              <PrivateRoute exact path="/EditPerfils/:id" component={Form}/>
              {/*Clientes */}
              <PrivateRoute exact path="/Clientes" component={Clientes}/>
              {/*Usuarios */}
              <PrivateRoute exact path="/Usuarios" component={Usuarios}/> 
              {/*Informacion del usuario*/}
              <PrivateRoute exact path="/userInfo" component={UserInfo}/>    
              <PrivateRoute exact path="/editUser/:id" component={FormEditUser}/>  


              <PrivateRoute component={ClientDashboard} path="/ClientDashboard" exact />
              {/*Main Store*/}
              <PrivateRoute exact path="/tiendaOnline" component={MainStore}/>
              {/*Preview Art*/}
              <PrivateRoute exact path="/addToCart/:id" component={addToCart}/>
              {/*Cart*/}
              <PrivateRoute exact path="/Cart" component={Cart}/>         
              {/*Orders*/}
              <PrivateRoute exact path="/Pedidos" component={Orders}/>    
              {/*Informacion del usuario*/}  
              <PrivateRoute exact path="/editUser/:id" component={FormEditUser}/> 
              {/*Modulo de reporte de pedidos*/}
              <PrivateRoute exact path="/Problem/:id" component={Problem}/>
              <PrivateRoute exact path="/supportTicketAdmin" component={supportTicketAdmin}/>
              {/*Not found route */}
              <Route path="*" component={NotFound}></Route>
              

      </Router>
      
    )   
    }if(sessionStorage.getItem('isLoggedInClient')){
      return(
        <Router>
              <PrivateRoute component={ClientDashboard} path="/ClientDashboard" exact />
              {/*Main Store*/}
              <PrivateRoute exact path="/tiendaOnline" component={MainStore}/>
              {/*Preview Art*/}
              <PrivateRoute exact path="/addToCart/:id" component={addToCart}/>
              {/*Cart*/}
              <PrivateRoute exact path="/Cart" component={Cart}/>         
              {/*Orders*/}
              <PrivateRoute exact path="/Pedidos" component={Orders}/>  
              {/*Support Cliente*/}
              <PrivateRoute exact path="/SupportClient" component={supportTicketClient}/>  
              {/*Modulo de reporte de pedidos*/}
              <PrivateRoute exact path="/Problem/:id" component={Problem}/> 
              {/*Informacion del usuario*/}
              <PrivateRoute exact path="/userInfo" component={UserInfo}/>    
              <PrivateRoute exact path="/editUser/:id" component={FormEditUser}/>     
              
        </Router>
          
      )
    }else{
      return(
        <Router>
          {/*Rutas de acceso publico (Usuario que no esta con la session iniciada) */}
              <PublicRoute restricted={true} exact path="/" component={Inicio}/>
              <PublicRoute restricted={true} exact path="/user" component={CreateUser}/>
              <PublicRoute restricted={true} exact path="/login" component={loginUser}/>
              
        </Router>     
      )
    }

  }
 
}

export default App;
