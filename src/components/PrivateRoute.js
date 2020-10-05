import React from 'react';
import { Route, Redirect } from 'react-router-dom';
//Menus
import NavigationAdmin from './menus/NavigationAdmin';
import Footer from './Footer';
import Sidebar from './menus/Sidebar';
import SidebarClient from './menus/SidebarClient';

export default function PrivateRoute ({component: Component, ...rest}){
 
          
    return (
        // Show the component only when the user is logged in and is an Administrator
        // OR Show the component only when the user is logged in and is Client
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
                sessionStorage.getItem("isLoggedIn") && sessionStorage.getItem('isLoggedInAdmin')
                ?   <div>
                        <Sidebar/>
                        <div className="main-panel" id="main-panel">
                            <NavigationAdmin/>
                            <Component {...props}/>
                            <Footer/>
                        </div>
                    </div>
                :sessionStorage.getItem("isLoggedIn") && sessionStorage.getItem('isLoggedInClient')
                ?
                    <div>
                        <SidebarClient/>
                        <div className="main-panel" id="main-panel">
                            <NavigationAdmin/>
                            <Component {...props}/>
                            <Footer/>
                        </div>
                    </div>
                :( 
                    <Redirect to={{
                        pathname:"/login",
                        state:{from:props.location}
                    }} />
                )
            )
        } />
    );
}
