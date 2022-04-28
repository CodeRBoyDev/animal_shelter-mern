import React from "react";
import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from "../layouts/sidebar";
import { MDBDataTable } from 'mdbreact';
import { Card, Modal, Button, Form } from 'react-bootstrap';
import { getToken} from '../login/helpers';

function Adopter() {
 
    const [fetchUser, setfetchUser] = useState([]);

    const [getUserss, setgetUser] = useState({});  

    const [getUserStatus, setgetUserStatus] = useState({status:""});  
    //fetch employee
    const fetchUserss = () => {
      axios.get(`${process.env.REACT_APP_API}/useradopter`,{
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

// console.log(fetchUser);
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
              label: 'Status',
              field: 'status',
          
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
          image: <img className="brand-image img-square elevation-3" width='80' height='70'  src={user.profile_picture.url} />,
          name: user.name,
          age: user.age,
          phone: user.phone,
          address: user.address,
          email: user.email ,
          status:   <div>
          {user.status === "active"? <b key={user._id} style={{color: 'green'}}>{user.status.toUpperCase()}</b>: <b key={user._id} style={{color: 'red'}}>{user.status.toUpperCase()}</b> }
      </div>,
          actions: <div><button onClick={() => updateGetUser(user._id)} className="btn btn-warning py-1 px-2 ml-2" >
          <i className="fa fa-pencil"></i>EDIT STATUS</button>
          </div>
      })

 
        })

        return data;
    }

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

        }).catch((err) => console.log(err));
      };

      const onStatus = e => {
        setgetUserStatus({ status: e.target.value});
      
      };

      const submitupdateAdopter = _id => {

        let formData = new FormData();
        formData.set("status", getUserStatus.status);
    
        axios({
            method: "put",
            url: `${process.env.REACT_APP_API}/user/status/${_id}`,
              headers: {
                  authorization: `Bearer ${getToken()}`
              },
            data: formData
          }).then(response => {
            // console.log(response);
            handleUpdateClose();
            fetchUserss();
           
          }).catch(error => {
                            console.log(error.response);
                            alert(error.response.data.error);
                        });   
  
     
      }



    const [showupdate, setShowUpdate] = useState(false);
    
    const handleUpdateClose = () => {
     setShowUpdate(false); 
     setgetUserStatus({status:""});  
   
   } 
   
     const handleUpdateShow = () => setShowUpdate(true);




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



    return (
        <div style={contentStyle}>
        <br />
        <h1>ADOPTER STATUS</h1>
        <hr />
        <SideBar  setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} /> 

        <Card style={{ background: '#f3f3f3' }}>
        <Card.Body>
            <MDBDataTable   maxHeight="40vh"  hover striped entriesOptions={[4, 10, 20]} entries={4} data={fetchAnimalData()} /> 
        </Card.Body>
        </Card>


        <Modal show={showupdate} onHide={handleUpdateClose} animation={true}>
        <Modal.Header>
          <Modal.Title>UPDATE STATUS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
                
                <Form.Group className="mb-3" >
                  <Form.Label>Status</Form.Label><br></br>
                  {getUserss.status=== "active" ? 
                  <Form.Select onChange={onStatus} className="smallentryfield" stylearia-label="Default select example">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Form.Select>
                  : 
                  <Form.Select onChange={onStatus} className="smallentryfield" stylearia-label="Default select example">
                      <option value="inactive">Inactive</option>
                      <option value="active">Active</option>
                    </Form.Select>
                  }
                  
                  
                              </Form.Group>
            
              </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleUpdateClose}>
            Close
          </Button>
          <Button variant="dark" onClick={() => submitupdateAdopter(getUserss._id)}>
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>

        </div>
    );

}

export default Adopter;