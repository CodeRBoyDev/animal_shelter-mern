import React from "react";
import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from "../layouts/sidebar";
import { MDBDataTable } from 'mdbreact';
import { Card, Modal, Button, Form } from 'react-bootstrap';
import { getToken } from '../login/helpers';


function Employee() {

    const [usersss, setUser] = useState({
        name: '',
        age: '',
        phone: '',
        address: '',
        email: '',
        password: '',
    })

    const [getUser, setgetUser] = useState({
      name: '',
      age: '',
      phone: '',
      address: '',
      email: '',
  });  

  const { name, age, phone, address, email } = getUser;

    const [profile_image, setImage] = useState('')
    const [profile_imageEdit, setEditImage] = useState('')
    const [profilePreview, setProfilePreview] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4TKmLL_Yab3zrnGsM-6FzOgBGSm3lcXkndb1E5xQagw5YlZ9ClcBcC46v3Eq9vfBSIQ&usqp=CAU')
    const [profileeditPreview, seteditProfilePreview] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4TKmLL_Yab3zrnGsM-6FzOgBGSm3lcXkndb1E5xQagw5YlZ9ClcBcC46v3Eq9vfBSIQ&usqp=CAU')

    const [fetchUser, setfetchUser] = useState([]);

    //fetch employee
    const fetchUserss = () => {
      axios.get(`${process.env.REACT_APP_API}/user`,{
        headers: {
            authorization: `Bearer ${getToken()}`
        }
    }).then(response => {
        // console.log(response.data.user);
        setfetchUser(response.data.user);
    }).catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUserss();
  },[]);


  const fetchAnimalData = () => {
    const data = {
        columns: [
            {
                label: 'ID',
                field: 'id',
                sort: 'asc'
            },
            {
              label: 'Image',
              field: 'image',
          },
            {
                label: 'Name',
                field: 'name',
            
            },
            {
              label: 'Age',
              field: 'age',
           
          },
              {
                label: 'Phone',
                field: 'phone',
            
            },
            {
                  label: 'Address',
                  field: 'address',
              
              },
              {
                label: 'Email',
                field: 'email',
            
            },
          {
            label: 'Actions',
            field: 'actions',
        },
           
        ],
        rows: []
    }

    fetchUser.forEach(user => {
      
        data.rows.push({
          id: user._id,
          image: <img className="brand-image img-square elevation-3" alt="a2" width='80' height='70'  src={user.profile_picture.url} />,
          name: user.name,
          age: user.age,
          phone: user.phone,
          address: user.address,
          email: user.email ,
          actions: <div><button  className="btn btn-warning py-1 px-2 ml-2" onClick={() => updateGetUser(user._id)}>
          <i className="fa fa-pencil"></i></button>
          <button  className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteConfirm(user._id)}>
          <i className="fa fa-trash" ></i></button>
          </div>
      })

 
        })

        return data;
    }

    //update employee

    const updateGetUser = _id => {
        // console.log(_id)
        handleUpdateShow()
        axios
            .get(`${process.env.REACT_APP_API}/user/${_id}`,{
              headers: {
                  authorization: `Bearer ${getToken()}`
              }
          }).then(response => {
              // console.log(response.data.user);
              setgetUser(response.data.user);
              seteditProfilePreview(response.data.user.profile_picture.url)
          }).catch((err) => console.log(err));
        };


        const onChangeedit = e => {
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
            setgetUser({ ...getUser, [e.target.name]: e.target.value })
            
        }
      }

      const submitupdateEmployeess = _id => {

        // console.log(getUser,profile_imageEdit);
  
        let formData = new FormData();

    

        formData.set("name", getUser.name);
        formData.set("age", getUser.age);
        formData.set("phone", getUser.phone);
        formData.set("address", getUser.address);
        formData.set("email", getUser.email);
        formData.set("profile_picture",profile_imageEdit);
    
        axios({
            method: "put",
            url: `${process.env.REACT_APP_API}/user/${_id}`,
              headers: {
                  authorization: `Bearer ${getToken()}`
              },
            data: formData
          }).then(response => {
            // console.log(response);
            handleUpdateClose();
            fetchUserss();
            // // window.location.reload(false);\
            setgetUser({name: '',
            age: '',
            phone: '',
            address: '',
            email: '',
            password: '',});
            seteditProfilePreview('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4TKmLL_Yab3zrnGsM-6FzOgBGSm3lcXkndb1E5xQagw5YlZ9ClcBcC46v3Eq9vfBSIQ&usqp=CAU');
          }).catch(error => {
                            console.log(error.response);
                            alert(error.response.data.error);
                        });   
      }

    //delete employee

    const deleteConfirm = _id => {
      let answer = window.confirm('Are you sure you want to delete this injury?' + _id );
      if (answer) {
          // console.log('hi');
          deleteUser(_id);
      }
    };

    const deleteUser = _id => {
      // console.log(_id);
      axios
          .delete(`${process.env.REACT_APP_API}/user/${_id}`,{
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        })
          .then(response => {
            fetchUserss();
          })
          .catch(error => alert('Error deleting post'));
   };  


    //add employee

    const onChange = e => {
      if (e.target.name === 'profile_picture') {

          const reader = new FileReader();

          reader.onload = () => {
              if (reader.readyState === 2) {
                setProfilePreview(reader.result)
                  setImage(reader.result)
              }
          }
          reader.readAsDataURL(e.target.files[0])
      } 
      else {
        setUser({ ...usersss, [e.target.name]: e.target.value })
        
    }
  }


  const addUserss = ()=>{
    // console.log(title);
    // console.log(profile_image, usersss);

  
    let formData = new FormData();

    

    formData.set("name", usersss.name);
    formData.set("age", usersss.age);
    formData.set("phone", usersss.phone);
    formData.set("address", usersss.address);
    formData.set("email", usersss.email);
    formData.set("password",usersss.password);
    formData.set("profile_picture",profile_image);
    formData.set("role",'employee');
    formData.set("status",'active');

    axios({
        method: "post",
        url: `${process.env.REACT_APP_API}/user/new`,
          headers: {
              authorization: `Bearer ${getToken()}`
          },
        data: formData
      }).then(response => {
        // console.log(response);
        handleClose();
        fetchUserss();
        // window.location.reload(false);\
        setUser({name: '',
        age: '',
        phone: '',
        address: '',
        email: '',
        password: '',});
        setProfilePreview('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4TKmLL_Yab3zrnGsM-6FzOgBGSm3lcXkndb1E5xQagw5YlZ9ClcBcC46v3Eq9vfBSIQ&usqp=CAU');
      }).catch(error => {
                        console.log(error.response);
                        alert(error.response.data.error);
                    });   
}


const [sideNavExpanded, setSideNavExpanded] = React.useState(true);

function handleResize() {

  if (window.innerWidth <= 375) {
    setSideNavExpanded(false);

  }
}

React.useEffect(() => {
  window.addEventListener("resize", handleResize);

  handleResize(); // on-component-mount, check already to see if user has a small device

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []); // initialize event listeners on-mount & clean on-unmount

const contentStyle = {
  marginLeft: sideNavExpanded ? "250px" : "70px", // arbitrary values
  transition: "margin 0.2s ease"
};


 // add modal
 const [show, setShow] = useState(false);
 const [showupdate, setShowUpdate] = useState(false);
 
 const handleUpdateClose = () => {
  setShowUpdate(false); 
  setgetUser({
    name: '',
    age: '',
    phone: '',
    address: '',
    email: '',
    });  
    seteditProfilePreview('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4TKmLL_Yab3zrnGsM-6FzOgBGSm3lcXkndb1E5xQagw5YlZ9ClcBcC46v3Eq9vfBSIQ&usqp=CAU')
} 

 const handleClose =() => {
    setShow(false);
    setUser({name: '',
        age: '',
        phone: '',
        address: '',
        email: '',
        password: '',});
        setProfilePreview('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4TKmLL_Yab3zrnGsM-6FzOgBGSm3lcXkndb1E5xQagw5YlZ9ClcBcC46v3Eq9vfBSIQ&usqp=CAU');
  } 

  const handleUpdateShow = () => setShowUpdate(true);
  const handleShow = () => setShow(true);

    return (
        <div style={contentStyle}>
        <br />
        <h1>EMPLOYEE CRUD</h1>
        <hr />
        <SideBar  setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} /> 

        <Card style={{ background: '#f3f3f3' }}>
        <Card.Body>
        <Button variant="secondary" onClick={handleShow}>
            Add Employee
            </Button>
            <MDBDataTable   maxHeight="40vh"  hover striped entriesOptions={[4, 10, 20]} entries={4} data={fetchAnimalData()} /> 
        
        </Card.Body>
        </Card>

        <Modal show={show} onHide={handleClose} animation={true}>
            <Modal.Header>
              <Modal.Title>Add Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
            <Form.Group className="mb-3" >
            <Card style={{ width: '37%',margin: 'auto', height: '27vh' }}>
              <Card.Img className="frame"  style={{ width: '100%' , height: '18vh' }} alt="a34" variant="top" src={profilePreview} />
              <Card.Body style={{ background: '#f3f3f3' }}>
              <Form.Control
                 onChange={onChange}
                  type="file"
                  name="profile_picture"
                  // value= {disease_name}
                  placeholder="disease name..."
                  accept="iamges/*"
                  autoFocus
                />
              </Card.Body>
            </Card>
                </Form.Group>
                
                <Form.Group className="mb-3" >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                onChange={onChange}
                    type="text"
                    name="name"
                    // value= {createInjury.injury_name}
                    placeholder="employee name..."
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                onChange={onChange}
                    type="number"
                    name="age"
                    // value= {createInjury.injury_name}
                    placeholder="employee age..."
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                onChange={onChange}
                    type="number"
                    name="phone"
                    // value= {createInjury.injury_name}
                    placeholder="employee phone..."
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                onChange={onChange}
                    type="text"
                    name="address"
                    // value= {createInjury.injury_name}
                    placeholder="employee address..."
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                onChange={onChange}
                    type="email"
                    name="email"
                    // value= {createInjury.injury_name}
                    placeholder="employee email..."
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
              onChange={onChange}
                    type="password"
                    name="password"
                    // value= {createInjury.injury_name}
                    placeholder="password..."
                    autoFocus
                  />
                </Form.Group>

               
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
              <Button variant="dark" onClick={()=>addUserss()}>
                Add Employee
              </Button>
            </Modal.Footer>
          </Modal>


          <Modal show={showupdate} onHide={handleUpdateClose} animation={true}>
        <Modal.Header>
          <Modal.Title>UPDATE EMPLOYEE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" >
            <Card style={{ width: '37%',margin: 'auto', height: '27vh' }}>
              <Card.Img className="frame"  style={{ width: '100%' , height: '18vh' }} alt="a31" variant="top" src={profileeditPreview} />
              <Card.Body style={{ background: '#f3f3f3' }}>
              <Form.Control
                 onChange={onChangeedit}
                  type="file"
                  name="profile_picture"
                  // value= {disease_name}
                  placeholder="disease name..."
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
                    placeholder="employee name..."
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
                    placeholder="employee age..."
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
                    placeholder="employee phone..."
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
                    placeholder="employee address..."
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
                    placeholder="employee email..."
                    autoFocus
                  />
                </Form.Group>
            
              </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleUpdateClose}>
            Close
          </Button>
          <Button variant="dark" onClick={() => submitupdateEmployeess(getUser._id)}>
            Update Disease
          </Button>
        </Modal.Footer>
      </Modal>


        </div>
    );

}

export default Employee;