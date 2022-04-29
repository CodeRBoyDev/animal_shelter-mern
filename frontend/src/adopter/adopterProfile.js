import React from "react";
import './adopter.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../layouts/headerhome";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { getToken, getUser, logout} from '../login/helpers';
import { Card, Modal, Button, Form } from 'react-bootstrap';

function Login() {
    const [fetchAdopterss, setfetchAdopter] = useState([]);
    const [profilepicss, setprofilepicss] = useState([]);
    const [UserAnimalAdoptionPending, setUserAnimalAdoptionPending] = useState([]);
    const [UserAnimalAdoptionApproved, setUserAnimalAdoptionApproved] = useState([]);

    const [profileeditPreview, seteditProfilePreview] = useState('profile_picture/jttdi63mt8a6e4ndt3icdsads')
    const [profile_imageEdit, setEditImage] = useState('')

    const [getUserssss, setgetUser] = useState({
      name: '',
      age: '',
      phone: '',
      address: '',
      email: '',
  });  
  
  const { name, age, phone, address, email }  = getUserssss;

  let navigate = useNavigate();

// console.log(getUser());
    const fetchAdopter = () => {
        axios.get(`/api/user/${getUser()}`,{
          headers: {
              authorization: `Bearer ${getToken()}`
          }
      }).then(response => {
            setprofilepicss(response.data.profile_picture);
          setfetchAdopter(response.data.user);
          setUserAnimalAdoptionPending(response.data.animal_pending);
          setUserAnimalAdoptionApproved(response.data.animal_approved);
      }).catch((err) => console.log(err));
    };
  
    useEffect(() => {
        fetchAdopter();
    },[]);

    //update user

    const updateGetUser = _id => {
        // console.log(_id)
        handleUpdateShow()
        axios
        .get(`/api/user/${_id}`,{
          headers: {
              authorization: `Bearer ${getToken()}`
          }
      }).then(response => {
            //   console.log(response.data.user);
              setgetUser(response.data.user);
              seteditProfilePreview(response.data.user.profile_picture.url)
          }).catch((err) => console.log(err));
        };

        const onChangeedit = e => {
          const {name, value} = e.target;
          if (e.target.name === 'profile_picture') {
    
              const reader = new FileReader();
    
              reader.onload = () => {
                  if (reader.readyState === 2) {
                    seteditProfilePreview(reader.result)
                    setEditImage(reader.result)
                  }
              }
              reader.readAsDataURL(e.target.files[0])
          } 
          else {
            setgetUser((prevInput) => {
              return {
                  ...prevInput,
                  [name]: value
              }
          })
            
        }
      }


      const submitupdateEmployeess = _id => {

        // console.log(getUserssss,profile_imageEdit);
  
        let formData = new FormData();

    

        formData.set("name", getUserssss.name);
        formData.set("age", getUserssss.age);
        formData.set("phone", getUserssss.phone);
        formData.set("address", getUserssss.address);
        formData.set("email", getUserssss.email);
        formData.set("password", getUserssss.password);
        formData.set("profile_picture",profile_imageEdit);
    
        axios({
            method: "put",
            url: `/api/user/adopter/${_id}`,
              headers: {
                  authorization: `Bearer ${getToken()}`
              },
            data: formData
          }).then(response => {
            // console.log(response);
            handleUpdateClose();
            fetchAdopter();
            Swal.fire({
              title: 'Success!',
              text: 'You have successfully updated your profile.',
              imageUrl: 'https://media1.giphy.com/media/jJT08co7tJmcaQhK2V/giphy.gif?cid=ecf05e47v6kbo49mwxm6ie9s5yx18monij6hykk8q5xnmt7u&rid=giphy.gif&ct=s',
              icon: 'success',
              imageWidth: 200,
              imageHeight: 200,
              imageAlt: 'Custom image',
              confirmButtonColor: '#967259',
              })
          }).catch(error => {
                            console.log(error.response);
                            alert(error.response.data.error);
                        });   
      }

      //cancel adoption request

      const cancelAdoption = _id => {
        // console.log(_id)
        Swal.fire({
          title: 'Are you sure you want to cancel your adoption request?',
          icon: 'warning',
          imageUrl: 'https://media0.giphy.com/media/8JrkAsk9CeJHi/giphy.gif?cid=ecf05e478vyjure32i4juid8ne6q1iveyplov3y8vv0w4ona&rid=giphy.gif&ct=g',
          showCancelButton: true,
          confirmButtonColor: '#967259',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {

            let formData = new FormData();

            formData.set("request_status", 'pending');
            formData.set("user_id", getUser());
        
            axios({
              method: "put",
              url: `/api/animal/cancel/${_id}`,
                headers: {
                    authorization: `Bearer ${getToken()}`
                },
              data: formData
            }).then(response => {
              fetchAdopter();
              Swal.fire({
                title: 'You have successfully cancel your adoption request.',
                imageUrl: 'https://media1.giphy.com/media/ySM2PakMSmw7u/giphy.gif?cid=ecf05e476il4erpcer6od7d2cah1r9ndtubl478wolmoq201&rid=giphy.gif&ct=g',
                icon: 'success',
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'Custom image',
                confirmButtonColor: '#967259',
                })

            }).catch((err) => console.log(err));

           
          }
        })
        
        };


    const [showupdate, setShowUpdate] = useState(false);

    const handleUpdateClose = () => {
        setShowUpdate(false); 
        seteditProfilePreview('profile_picture/jttdi63mt8a6e4ndt3icdsads')
      } 

    const handleUpdateShow = () => setShowUpdate(true);
    
// console.log(UserAnimalAdoption);
  return (
    <div>
       <div></div>
         <Header />

           
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-4 mb-5 mb-lg-0 wow fadeIn">
                    <div className="card border-0 shadow">
                    <div className="card shadow-sm">
          <div className="card-header bg-transparent text-center">
            <img className="profile_img" src={profilepicss} alt=""/>
            <h2>{fetchAdopterss.name}</h2>
            <a href="#"  onClick={() => updateGetUser(fetchAdopterss._id)} data-bs-toggle="modal" data-bs-target="#editadopterModals" id="editbtn" data-id='+data.user.id+'><span className="text-primary"><i className="far fa-edit"> Edit Profile</i></span></a>
          </div>
          
          <div className="card-body">
            <h5 className="mb-0"><strong className="pr-1">Age:</strong>{fetchAdopterss.age}</h5>
            <h5 className="mb-0"><strong className="pr-1">Address:</strong>{fetchAdopterss.address}</h5>
            <h5 className="mb-0"><strong className="pr-1">Email:</strong>{fetchAdopterss.email}</h5>
            <h5 className="mb-0"><strong className="pr-1">Phone:</strong>{fetchAdopterss.phone}</h5>
          </div>
        </div>       
                            <div className="panel-body text-center">
                            <button  onClick={() => logout(() => navigate('/'))} type="button" className="btn btn-danger"><i className="fas fa-sign-out-alt">log out</i></button>
                            </div>
              
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="ps-lg-1-6 ps-xl-5">
                        <div className="mb-5 wow fadeIn">

                    
                            <div className="text-start mb-1-6 wow fadeIn">
                                <h2 className="mb-0 text-primary">#Adopted Animals</h2>
                            </div><br></br>
                            <div className="works"></div>
                            <div className="row">
                              <div className="col">
                            { UserAnimalAdoptionApproved.map(approvedanimal => {  
                            
                            return <div key={approvedanimal._id} className="blog-post">
                            <div   className="prjt-grid"><Card >
                             
                            { approvedanimal.animal_image.map(animalimage => {
                           return <Card.Img key={approvedanimal._id} className="example-image"  style={{ width: '100%' , height: '17.5vh' }} variant="top" src={animalimage.url} />   
                            })
                           }
                             
                           
                           <Card.Body key={approvedanimal._id} style={{ background: '#f3f3f3', width: '100%' , height: '12.5vh' }}>       
                            <div key={approvedanimal._id} className="project-info">
                            <p >Name: <b style={{color: 'black'}}> {approvedanimal.animal_name.toUpperCase()}</b></p>
                            <p>Type: <b style={{color: 'black'}}> {approvedanimal.animal_type.toUpperCase()}</b></p>
                            <div className="cancelrequestito" style={{style:'padding:10%', fontSize:'110%', margin:'auto'}}><i  style={{color: 'green'}} className="fas fa-thumbs-up"><i>&nbsp;ADOPTED</i></i></div>
                            </div></Card.Body></Card></div></div>
                          })} 
                          {UserAnimalAdoptionApproved.length === 0 &&
                            <div key={UserAnimalAdoptionApproved._id}>
                            <h1>NONE</h1>
                          </div>
                          }
                           </div></div>
                          <br></br>

                          <div >
                              <h2 className="mb-0 text-primary">#Animal Adoption Request</h2>
                          </div><br></br>
                          <div className="row">
                              <div className="col">
                            { UserAnimalAdoptionPending.map(pendinganimal => {  
                            
                          return <div key={pendinganimal._id} className="blog-post">
                          <div   className="prjt-grid"><Card >
                           
                          { pendinganimal.animal_image.map(animalimage => {
                         return <Card.Img key={pendinganimal._id} className="example-image"  style={{ width: '100%' , height: '17.5vh' }} variant="top" src={animalimage.url} />   
                          })
                         }
                           
                         
                         <Card.Body  style={{ background: '#f3f3f3', width: '100%' , height: '12.5vh' }}>       
                          <div className="project-info">
                          <p >Name: <b style={{color: 'black'}}> {pendinganimal.animal_name.toUpperCase()}</b></p>
                          <p>Type: <b style={{color: 'black'}}> {pendinganimal.animal_type.toUpperCase()}</b></p>
                          <a href="#" className="cancelrequestito" onClick={() => cancelAdoption(pendinganimal._id)}  style={{style:'padding:10%', fontSize:'110%', margin:'auto'}}><i  style={{color: 'red'}} className="fas fa-retweet"><i>Cancel Request</i></i></a>
                          </div></Card.Body></Card></div></div>
                        })} 

                        {UserAnimalAdoptionPending.length === 0 &&
                          <div>
                          <h1>NONE</h1>
                        </div>
                        }
                         </div> </div> 


                        </div>
                    </div>
                </div>
                
            </div>
        </div>



        <Modal show={showupdate} onHide={handleUpdateClose} animation={true}>
        <Modal.Header>
          <Modal.Title>UPDATE EMPLOYEE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" >
            <Card style={{ width: '37%',margin: 'auto', height: '27vh' }}>
              <Card.Img className="frame"  style={{ width: '100%' , height: '18vh' }} variant="top" src={profileeditPreview} />
              <Card.Body style={{ background: '#f3f3f3' }}>
              <Form.Control
                 onChange={onChangeedit}
                  type="file"
                  name="profile_picture"
                //   value= {disease_name}
                  accept="iamges/*"
                  autoFocus
                />
              </Card.Body>
            </Card>
                </Form.Group>
                
                <Form.Group className="mb-3" >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                onChange={onChangeedit}
                    type="text"
                    name="name"
                    value= {name}
                    placeholder="name..."
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                onChange={onChangeedit}
                    type="number"
                    name="age"
                    value= {age}
                    placeholder="age..."
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                onChange={onChangeedit}
                    type="number"
                    name="phone"
                    value= {phone}
                    placeholder="phone..."
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                onChange={onChangeedit}
                    type="text"
                    name="address"
                    value= {address}
                    placeholder="address..."
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                onChange={onChangeedit}
                    type="email"
                    name="email"
                    value= {email}
                    placeholder="email..."
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                onChange={onChangeedit}
                    type="password"
                    name="password"
                    placeholder="password..."
                    autoFocus
                  />
                </Form.Group>
            
              </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleUpdateClose}>
            Close
          </Button>
          <Button variant="dark" onClick={() => submitupdateEmployeess(getUserssss._id)}>
            Update Profile
          </Button>
        </Modal.Footer>
      </Modal>

            </div>

         
       
  );
}

export default Login;
