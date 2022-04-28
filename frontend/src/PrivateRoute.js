import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser, getRole } from './login/helpers';

const PrivateRoute = ({isAdmin, isEmployee, children, redirectTo }) => {
    // console.log(children.type.name)
    if(getUser() === false){
        return <Navigate to="/login" />
    }
    if(isAdmin === true && getRole() !== 'admin' && isEmployee === true && getRole() !== 'employee'){
        return <Navigate to="/" />
    }
    return children
    
      
} ;

export default PrivateRoute;