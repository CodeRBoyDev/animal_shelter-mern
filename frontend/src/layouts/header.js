import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Header = () => {
    let navigate = useNavigate();
    
    return(
        <nav>
    
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="#"className="nav-link" data-widget="pushmenu" role="button"><i className="fas fa-bars"></i></a>
          </li>
        </ul>
      

    <ul className="navbar-nav ml-auto">
      <li className="nav-item dropdown">
        <a href="#" className="nav-link" >
          Logout <i className="nav-icon fas fa-sign-out-alt"></i> 
          <span className="badge badge-warning navbar-badge"></span>
        </a>
      </li>
    </ul>
    </nav>
        
)
            };

export default Header;