import React from "react";
import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from "../layouts/sidebar";
import { MDBDataTable } from 'mdbreact';
import { Card, Modal, Button, Form } from 'react-bootstrap';
import { getToken} from '../login/helpers';

function Disease() {

  const [createDisease, setcreateDisease] = useState({
    disease_name: '',
    disease_description: '',
    });

  const [getDisease, setgetDisease] = useState({
    disease_name: '',
    disease_description: '',
    _id:''
  });

  const [error, setError] = useState({  disease_name: '',
  disease_description: '',});

  const [diseases, setDisease] = useState([]);

  const { _id, disease_name, disease_description } = getDisease;

  const handleChanges = name => event => {
    // console.log('name', name, 'event', event.target.value);
    setgetDisease({ ...getDisease, [name]: event.target.value });
};

  function handleChange(event) {
    const {name, value} = event.target;
    setcreateDisease((prevInput) => {
      return {
        ...prevInput,
        [name]:value,
      };
    });
    // console.log(createDisease);

  }
  

  //add disease

  function addDiseasess(event) {
    event.preventDefault();
   
    const newCreateDisease = {
      disease_name: createDisease.disease_name,
      disease_description: createDisease.disease_description
    }

        axios
            .post(`${process.env.REACT_APP_API}/disease/new`, newCreateDisease,{
              headers: {
                  authorization: `Bearer ${getToken()}`
              }
          })
            .then(response => {
                              // console.log(response);
                              setcreateDisease({ disease_name: '', disease_description: ''});
                              fetchDisease();
                              handleClose();
                          })
              .catch(error => {
                              // console.log(error.response);
                              setError(error.response.data);
                             
                          });
                  
  }

  const updateGetDisease = _id => {
    // console.log(_id)
    handleUpdateShow()
    axios
        .get(`${process.env.REACT_APP_API}/disease/${_id}`,{
          headers: {
              authorization: `Bearer ${getToken()}`
          }
      }).then(response => {
          // console.log(response.data);
          setgetDisease(response.data);
      }).catch((err) => console.log(err));
    };
  
  const submitupdateDiseasess = _id => {
    const newUpdateDisease = {
      disease_name: disease_name,
      disease_description: disease_description
    }
    // console.log(newUpdateDisease);

    axios
    .put(`${process.env.REACT_APP_API}/disease/${_id}`, newUpdateDisease,{
      headers: {
          authorization: `Bearer ${getToken()}`
      }
  }).then(response => {
      // console.log(response);
      setgetDisease({ disease_name: '', disease_description: ''});
      handleUpdateClose();
      fetchDisease();
      // alert(`Disease titled ${response.data.disease.disease_name} is updated`);

      })
  .catch(error => {
      console.log(error.response);
      alert(error.response.data.error);
  });
  }

  const deleteConfirm = _id => {
    let answer = window.confirm('Are you sure you want to delete this disease?' + _id );
    if (answer) {
      deleteDisease(_id);
    }
  };

  const deleteDisease = _id => {
    // console.log(_id);
    axios
        .delete(`${process.env.REACT_APP_API}/disease/${_id}`,{
          headers: {
              authorization: `Bearer ${getToken()}`
          }
      })
        .then(response => {
            fetchDisease();
        })
        .catch(error => alert('Error deleting post'));
  };

    const fetchDisease = () => {
      axios.get(`${process.env.REACT_APP_API}/disease`,{
        headers: {
            authorization: `Bearer ${getToken()}`
        }
    }).then(response => {
        // console.log(response.data.disease);
        setDisease(response.data.disease);
    }).catch((err) => console.log(err));
  };
  

  useEffect(() => {
    fetchDisease();
  },[]);


   const setDiseasessss = () => {
    const data = {
        columns: [
            {
                label: 'ID',
                field: 'id',
                sort: 'asc'
            },
            {
                label: 'Name',
                field: 'name',
            
            },
            {
              label: 'Description',
              field: 'description',
           
          },
          {
            label: 'Actions',
            field: 'actions',
        },
           
        ],
        rows: []
    }

    diseases.forEach(disease => {
        data.rows.push({
            id: disease._id,
            name: disease.disease_name,
            description: disease.disease_description.substring(0, 50) + '...',
            actions: <div><button onClick={() => updateGetDisease(disease._id)} className="btn btn-warning py-1 px-2 ml-2" >
            <i className="fa fa-pencil"></i></button>
            <button onClick={() => deleteConfirm(disease._id)} className="btn btn-danger py-1 px-2 ml-2" >
            <i className="fa fa-trash"></i></button>
            </div>
        })
    })

    return data;
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

const [show, setShow] = useState(false);
const [showupdate, setShowUpdate] = useState(false);

const handleUpdateShow = () => setShowUpdate(true);
const handleUpdateClose = () => {
  setShowUpdate(false); 
  setgetDisease({ disease_name: '', disease_description: ''});

} 
const handleClose =() => {
  setShow(false);
  setcreateDisease({ disease_name: '', disease_description: ''});
  setError({ disease_name: '', disease_description: ''});

} 
const handleShow = () => setShow(true);


  return (
    
   <div style={contentStyle}>
    <br />
    <h1>DISEASE CRUD</h1>
    <hr />

<SideBar  setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} />      
     
<Card style={{ background: '#f3f3f3' }}>
  <Card.Body>
  <Button variant="secondary" onClick={handleShow}>
       Add Disease
      </Button>
     <MDBDataTable scrollY  maxHeight="50vh"  hover striped entriesOptions={[5, 10, 20]} entries={5} data={setDiseasessss()} /> 
  
  </Card.Body>
</Card>



      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header>
          <Modal.Title>DISEASE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Disease Name</Form.Label>
              <Form.Control
               onChange={handleChange}
                type="email"
                name="disease_name"
                value= {createDisease.disease_name}
                placeholder="disease name..."
                autoFocus
              /> <p className="errorss">{error.disease_name}</p>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Disease Description</Form.Label>
              <Form.Control 
              onChange={handleChange}
              name="disease_description"
              value= {createDisease.disease_description}
              as="textarea" rows={3} /><p className="errorss">{error.disease_description}</p>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={addDiseasess}>
            Add Disease
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showupdate} onHide={handleUpdateClose} animation={true}>
        <Modal.Header>
          <Modal.Title>UPDATE DISEASE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Disease Name</Form.Label>
              <Form.Control
               onChange={handleChanges('disease_name')}
                type="email"
                name="disease_name"
                value= {disease_name}
                placeholder="disease name..."
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Disease Description</Form.Label>
              <Form.Control 
              onChange={handleChanges('disease_description')}
              name="disease_description"
              value= {disease_description}
              as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleUpdateClose}>
            Close
          </Button>
          <Button variant="dark" onClick={() => submitupdateDiseasess(_id)}>
            Update Disease
          </Button>
        </Modal.Footer>
      </Modal>
 


    </div>

  


  
  );
}

export default Disease;
