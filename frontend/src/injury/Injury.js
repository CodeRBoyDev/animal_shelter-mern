import React from "react";
import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from "../layouts/sidebar";
import { MDBDataTable } from 'mdbreact';
import { Card, Modal, Button, Form } from 'react-bootstrap';
import { getToken} from '../login/helpers';

function Injury() {

    const [createInjury, setcreateInjury] = useState({
        injury_name: '',
        injury_description: '',
        });

    const [getInjury, setgetInjury] = useState({
        injury_name: '',
        injury_description: '',
        _id:''
    });    


    const [injurys, setInjury] = useState([]);

    const { _id, injury_name, injury_description } = getInjury;


    //fetch to datatable

    const fetchInjury = () => {
        axios.get(`api/injury`,{
          headers: {
              authorization: `Bearer ${getToken()}`
          }
      }).then(response => {
        //   console.log(response.data.injury);
          setInjury(response.data.injury);
      }).catch((err) => console.log(err));
    };
    
  
    useEffect(() => {
        fetchInjury();
    },[]);


    const setInjuryssss = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'desc'
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
    
        injurys.forEach(injury => {
            data.rows.push({
                id: injury._id,
                name: injury.injury_name,
                description: injury.injury_description.substring(0, 50) + '...',
                actions: <div><button onClick={() => updateGetInjury(injury._id)} className="btn btn-warning py-1 px-2 ml-2" >
                <i className="fa fa-pencil"></i></button>
                <button  onClick={() => deleteConfirm(injury._id)} className="btn btn-danger py-1 px-2 ml-2" >
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

      // add injury

    //   function handleChange(event) {
    //     const {name, value} = event.target.value;
    //     setcreateInjury((prevInput) => {
    //       return {
    //         ...prevInput,
    //         [name]:value,
    //       };
    //     });
    //     console.log(createInjury);
    
    //   }

      const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setcreateInjury({ ...createInjury, [name]: event.target.value });
    };

    function addInjuryss(event) {
        event.preventDefault();

        const newCreateInjury = {
            injury_name: createInjury.injury_name,
            injury_description: createInjury.injury_description
          }
        //   console.log(newCreateInjury);

        axios
        .post(`api/injury/new`, newCreateInjury,{
          headers: {
              authorization: `Bearer ${getToken()}`
          }
      })
        .then(response => {
                        //   console.log(response);
                          setcreateInjury({ injury_name: '', injury_description: ''});
                          fetchInjury();
                          handleClose();
                      })
          .catch(error => {
                          console.log(error.response);
                          alert(error.response.data.error);
                      });


    }

    //update injury

    const updateGetInjury = _id => {
        // console.log(_id)
        handleUpdateShow()
        axios
            .get(`api/injury/${_id}`,{
              headers: {
                  authorization: `Bearer ${getToken()}`
              }
          }).then(response => {
            //   console.log(response.data);
              setgetInjury(response.data);
          }).catch((err) => console.log(err));
        };

    function handleUpdate(event){
        const {name, value} = event.target;
        setgetInjury((prevInput) => {
            return {
                ...prevInput,
                [name]: value
            }
        })
        // console.log(getInjury)

    }

    const submitupdateInjuryss = _id => {
        // console.log(_id);
        const newUpdateInjury = {
            injury_name: injury_name,
            injury_description: injury_description
          }
          // console.log(newUpdateInjury);

          axios.put(`api/injury/${_id}`, newUpdateInjury,{
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        }).then(response => {
                // console.log(response);
                setgetInjury({ injury_name: '', injury_description: ''});
                handleUpdateClose();
                fetchInjury();
                // alert(`Disease titled ${response.data.disease.disease_name} is updated`);

                })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });

    }


    //delete injury

    const deleteConfirm = _id => {
        let answer = window.confirm('Are you sure you want to delete this injury?' + _id );
        if (answer) {
            // console.log('hi');
            deleteInjury(_id);
        }
      };

    const deleteInjury = _id => {
        // console.log(_id);
        axios
            .delete(`api/injury/${_id}`,{
              headers: {
                  authorization: `Bearer ${getToken()}`
              }
          })
            .then(response => {
                fetchInjury();
            })
            .catch(error => alert('Error deleting post'));
     };  

      
      // add modal
      const [show, setShow] = useState(false);
      const [showupdate, setShowUpdate] = useState(false);


      const handleClose =() => {
        setShow(false);
        setcreateInjury({ injury_name: '', injury_description: ''});
      } 

      const handleUpdateClose = () => {
        setShowUpdate(false); 
        setgetInjury({ injury_name: '', injury_description: ''});
      
      } 

      const handleUpdateShow = () => setShowUpdate(true);
      const handleShow = () => setShow(true);

    return (
        <div style={contentStyle}>
        <br />
        <h1>INJURY CRUD</h1>
        <hr />
    
    <SideBar  setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} />      
         
    <Card style={{ background: '#f3f3f3' }}>
      <Card.Body>
      <Button variant="secondary" onClick={handleShow}>
           Add Injury
          </Button>
         <MDBDataTable scrollY  maxHeight="40vh"  hover striped entriesOptions={[5, 10, 20]} entries={5} data={setInjuryssss()} /> 
      
      </Card.Body>
    </Card>
    
    
    
          <Modal show={show} onHide={handleClose} animation={true}>
            <Modal.Header>
              <Modal.Title>Injury</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Injury Name</Form.Label>
                  <Form.Control
                   onChange={handleChange('injury_name')}
                    type="email"
                    name="injury_name"
                    value= {createInjury.injury_name}
                    placeholder="injury name..."
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Injury Description</Form.Label>
                  <Form.Control 
                  onChange={handleChange('injury_description')}
                  name="injury_description"
                  value= {createInjury.injury_description}
                  as="textarea" rows={3} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
              <Button variant="dark" onClick={addInjuryss} >
                Add Injury
              </Button>
            </Modal.Footer>
          </Modal>
    
          <Modal show={showupdate} onHide={handleUpdateClose} animation={true}>
            <Modal.Header>
              <Modal.Title>UPDATE INJURY</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Injury Name</Form.Label>
                  <Form.Control
                   onChange={handleUpdate}
                    type="email"
                    name="injury_name"
                    value= {injury_name}
                    placeholder="injury name..."
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Injury Description</Form.Label>
                  <Form.Control 
                  onChange={handleUpdate}
                  name="injury_description"
                  value= {injury_description}
                  as="textarea" rows={3} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleUpdateClose}>
                Close
              </Button>
              <Button variant="dark" onClick={() => submitupdateInjuryss(_id)} >
                Update Injury
              </Button>
            </Modal.Footer>
          </Modal>
     
    
    
        </div>
    );

}    

export default Injury;
