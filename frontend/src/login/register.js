import React from "react";
import './login.css';
import { useState } from 'react';
import axios from 'axios';
import Header from "../layouts/headerhome";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function Register() {

  const [error, setError] = useState({  
    name: '',
    age: '',
    phone: '',
    address: '',
    email: '',
    password: '',
    });

    const [usersss, setUser] = useState({
        name: '',
        age: '',
        phone: '',
        address: '',
        email: '',
        password: '',
    })

    const onChange = e => {
          setUser({ ...usersss, [e.target.name]: e.target.value })
    }
    let navigate = useNavigate();
    
    const addUserss = ()=>{
        console.log(usersss)
 
      
        let formData = new FormData();

        formData.set("name", usersss.name);
        formData.set("age", usersss.age);
        formData.set("phone", usersss.phone);
        formData.set("address", usersss.address);
        formData.set("email", usersss.email);
        formData.set("password",usersss.password);
        formData.set("role",'adopter');
        formData.set("status",'active');
       
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API}/user/newadopter`,
            data: formData
          }).then(response => {
            console.log(response);
            setUser({name: '',
            age: '',
            phone: '',
            address: '',
            email: '',
            password: '',});
            navigate(`/login`);
            Swal.fire({
                title: 'You have successfully registered!',
                text: 'You can now login.',
                imageUrl: 'https://media2.giphy.com/media/LrQgAP6SkPvYqG0QJN/giphy.gif?cid=ecf05e47m4ale8qdx7wljsjx9ttilp2m1podj55swsqw4f4e&rid=giphy.gif&ct=s',
                icon: 'success',
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'Custom image',
                confirmButtonColor: '#967259',
              })
           
          }).catch(error => {
                            
                            setError(error.response.data);
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
			<div className="user_cardss">
				<div className="d-flex justify-content-center">
					<div className="brand_logo_container">
						<img src="https://e7.pngegg.com/pngimages/974/35/png-clipart-dog-cat-animal-rescue-group-animal-shelter-dog-blue-animals.png" className="brand_logo" alt="Logo"/>
					
                    </div>
				</div>
				<div className="d-flex justify-content-center form_container">
					<form id="signupuserform"><p className="errorss">{error.name}</p>
						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-pencil-alt"></i></span>
							</div>
							<input type="text" name="name" onChange={onChange} className="form-control input_user"  placeholder="Name"/>
						</div><p className="errorss">{error.age}</p>
						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-sort-numeric-up-alt"></i></span>
							</div>
							<input type="number" name="age" onChange={onChange} className="form-control input_user"  placeholder="Age"/>
						</div><p className="errorss">{error.phone}</p>
						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-phone"></i></span>
							</div>
							<input type="number" name="phone" onChange={onChange} className="form-control input_user"  placeholder="Phone"/>
						</div><p className="errorss">{error.address}</p>
						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-address-card"></i></span>
							</div>
							<input type="text" name="address" onChange={onChange} className="form-control input_user"  placeholder="Address"/>
						</div><p className="errorss">{error.email}</p>
						
						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-user"></i></span>
							</div>
							<input type="email" name="email" onChange={onChange} className="form-control input_user"  placeholder="email"/>
						</div><p className="errorss">{error.password}</p>
						<div className="input-group mb-2">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-key"></i></span>
							</div>
							<input type="password" name="password" onChange={onChange} className="form-control input_pass"  placeholder="password"/>
						</div>
					
							<div className="d-flex justify-content-center mt-3 login_container">
                            <button onClick={()=>addUserss()} type="button"  className="btn login_btn">Register</button>
				   </div>
					</form>
				</div>
		
				<div className="mt-4">
					<div className="d-flex justify-content-center links">
					Already have an account? <Link to="/login"><p  className="ml-2" style={{color: '#664229'}}>Sign in here!</p></Link>
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

export default Register;
