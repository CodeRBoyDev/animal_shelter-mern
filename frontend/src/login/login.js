import React from "react";
import './login.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../layouts/headerhome";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { authenticate, getUser } from './helpers';

function Login() {

	const [usersss, setUser] = useState({
        email: '',
        password: '',
    })

    const onChange = e => {
          setUser({ ...usersss, [e.target.name]: e.target.value })
    }

	let navigate = useNavigate();
	
	const submitLogin = ()=>{
        console.log(usersss)
 
      
        let formData = new FormData();

        formData.set("email", usersss.email);
        formData.set("password",usersss.password);
       
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API}/login`,
            data: formData,
          }).then(response => {
			  
            if(response.data.message === 'Please enter email & password'){
				Swal.fire({
					title: 'Please enter email & password!',
					imageUrl: 'https://media3.giphy.com/media/mnqtecB0WxitIEsE8v/giphy.gif?cid=ecf05e47vbw3vjmcq7m1wkirgt2491ljcxl7zuzco7qaztd5&rid=giphy.gif&ct=s',
					icon: 'error',
					imageWidth: 200,
					imageHeight: 200,
					imageAlt: 'Custom image',
					confirmButtonColor: '#967259',
				  })
			}else if(response.data.message === 'The email is not exist'){
				Swal.fire({
					title: 'The email is not exist!',
					imageUrl: 'https://media3.giphy.com/media/UGWUXLZbv4Y9FIvx9Z/giphy.gif?cid=ecf05e477b5yybqwdkfi4c38lq8jzhrtrj4ndjhs9i4aeejc&rid=giphy.gif&ct=s',
					icon: 'error',
					imageWidth: 200,
					imageHeight: 200,
					imageAlt: 'Custom image',
					confirmButtonColor: '#967259',
				  })

			}else if(response.data.message === 'Wrong password'){
				Swal.fire({
					title: 'Wrong password!',
					imageUrl: 'https://media2.giphy.com/media/rMDYCRgyTpOAiGTuw3/giphy.gif?cid=ecf05e47e0nzwu0ljjq6i3sv0awxglqhjcs77qjp2fkhe79p&rid=giphy.gif&ct=s',
					icon: 'error',
					imageWidth: 200,
					imageHeight: 200,
					imageAlt: 'Custom image',
					confirmButtonColor: '#967259',
				  })
			}else if(response.data.message === 'inactive'){
				Swal.fire({
					title: 'Your account is temporary deactivated!',
					imageUrl: 'https://media2.giphy.com/media/LkV0XjZTGlGDJtOZSB/giphy.gif?cid=ecf05e47w1kpkv2yjynvcsrkygfj1t0qww18jfjvk0js3v6y&rid=giphy.gif&ct=s',
					icon: 'error',
					imageWidth: 200,
					imageHeight: 200,
					imageAlt: 'Custom image',
					confirmButtonColor: '#967259',
				  })
			}else{
				
				if(response.data.user.role === 'admin'){
					authenticate(response, () => navigate("/animal"));
					Swal.fire({
						title: 'Well done!',
						text: 'You have successfully logged in.',
						imageUrl: 'https://media1.giphy.com/media/jJT08co7tJmcaQhK2V/giphy.gif?cid=ecf05e47v6kbo49mwxm6ie9s5yx18monij6hykk8q5xnmt7u&rid=giphy.gif&ct=s',
						icon: 'success',
						imageWidth: 200,
						imageHeight: 200,
						imageAlt: 'Custom image',
						confirmButtonColor: '#967259',
					  })
				}else if((response.data.user.role === 'adopter')){
					authenticate(response, () => navigate("/adopter/profile"));
					Swal.fire({
						title: 'Well done!',
						text: 'You have successfully logged in.',
						imageUrl: 'https://media1.giphy.com/media/jJT08co7tJmcaQhK2V/giphy.gif?cid=ecf05e47v6kbo49mwxm6ie9s5yx18monij6hykk8q5xnmt7u&rid=giphy.gif&ct=s',
						icon: 'success',
						imageWidth: 200,
						imageHeight: 200,
						imageAlt: 'Custom image',
						confirmButtonColor: '#967259',
					  })
				}else if((response.data.user.role === 'employee')){
					authenticate(response, () => navigate("/animal"));
					Swal.fire({
						title: 'Well done!',
						text: 'You have successfully logged in.',
						imageUrl: 'https://media1.giphy.com/media/jJT08co7tJmcaQhK2V/giphy.gif?cid=ecf05e47v6kbo49mwxm6ie9s5yx18monij6hykk8q5xnmt7u&rid=giphy.gif&ct=s',
						icon: 'success',
						imageWidth: 200,
						imageHeight: 200,
						imageAlt: 'Custom image',
						confirmButtonColor: '#967259',
					  })
				}
				
				//   console.log(response);
			}
            // setUser({name: '',
            // age: '',
            // phone: '',
            // address: '',
            // email: '',
            // password: '',});
            // navigate(`/login`);
           
           
          }).catch(error => {
                            console.log(error.response);
                            alert(error.response.data.error);
                        });   
    }
  return (
    <div>
       <div></div>
         <Header />

         
            <div className="project-sec">
              <div className="container">
              <div className="contact-text">
				 <div className="container h-100">
		<div className="d-flex justify-content-center h-100">
			<div className="user_card">
				<div className="d-flex justify-content-center">
					<div className="brand_logo_container">
						<img src="https://e7.pngegg.com/pngimages/974/35/png-clipart-dog-cat-animal-rescue-group-animal-shelter-dog-blue-animals.png" className="brand_logo" alt="Logo"/>
					</div>
				</div>
				<div className="d-flex justify-content-center form_container">
					<form id="loginuserform">
						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-user"></i></span>
							</div>
							<input type="email" name="email" onChange={onChange}  className="form-control input_user"  placeholder="email"/>
						</div>
						<div className="input-group mb-2">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-key"></i></span>
							</div>
							<input type="password" name="password" onChange={onChange}  className="form-control input_pass"  placeholder="password"/>
						</div>
					
							<div className="d-flex justify-content-center mt-3 login_container">
                            <button id="signupusersubmit" type="button" onClick={()=>submitLogin()} name="button" className="btn login_btn">Login</button>
				   </div>
					</form>
				</div>
		
				<div className="mt-4">
					<div className="d-flex justify-content-center links">
						Don't have an account? <Link to="/register" ><p className="ml-2" style={{color: '#664229'}}>Sign Up</p></Link>
					</div>
				</div>
			</div>
		</div>
	</div>					
				
			 </div>
            
            </div>
        </div>

            </div>

         
       
  );
}

export default Login;
