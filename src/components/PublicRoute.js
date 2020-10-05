import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import NavigationIndex from './menus/NavigationIndex';


const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            sessionStorage.getItem("isLoggedIn") && restricted ?
            
                <Redirect to="/Dashboard" />
    
            : <div>
                <NavigationIndex/> <Component {...props}/>
            </div>
        )} />
    );
};

export default PublicRoute;