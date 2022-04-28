import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../login/helpers';
import { useNavigate } from "react-router-dom";

const Header = () => {
	let navigate = useNavigate();
    
    return(
        <nav>
            <div>
       <div className="header-top">
	 <div className="container">
		 <div className="logo">			
				 <h1><a href="#!" onClick={()  => navigate('/')}><i style={{color: '#664229' }} className="nav-icon fas fa-paw">PET SOCIETY</i></a></h1>			
		 </div>
		 <div className="details">				 
				<div className="locate">
					 <div className="detail-grid">
						 <div className="lctr">
								<img src="" alt=""/>
						 </div>
						 <p style={{color: '#664229'}}>Adoption Inquiries,
						 <span>petsociety0708@gmail.com</span></p>
						 <div className="clearfix"></div>
					 </div>
					 <div className="detail-grid">
						 <div className="lctr">
								<img src="" alt=""/>
						 </div>
						 <p style={{color: 'rgb(64, 47, 47)'}}>Tel:1115550001</p>
						 <div className="clearfix"></div>
					 </div>
				</div>
		 </div>
		 <div className="clearfix"></div>
	 </div>
     <div className="header">
	 <div className="container">
		 <div className="top-menu">
			 <span className="menu"><img src="" alt=""  /></span>
			 <ul className="nav1">
			 	 <li  className="btnss"><Link to="/">Home</Link></li>
				  {getUser() === false ? <li  className="btnss"><Link to="/login">Login</Link></li> 
				  :  <li  className="btnss"><Link to="/adopter/profile">UserProfile</Link></li>
				  }
				
				 {/* <li
                    onClick={() => logout(() => navigate('/'))}
                    className="nav-item ml-auto pr-3 pt-3 pb-3"
                    style={{ cursor: 'pointer' }}
                >
                    Logout
                </li> */}
			 </ul>
		 </div>
		
		 <div className="clearfix"></div>
	 </div>
</div>
</div>
</div>
    </nav>
        
)
            };

export default Header;