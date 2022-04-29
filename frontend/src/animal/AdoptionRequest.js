import React from "react";
import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from "../layouts/sidebar";
import { MDBDataTable } from 'mdbreact';
import { Card} from 'react-bootstrap';
import Swal from 'sweetalert2'
import { getToken} from '../login/helpers';

function Adopter() {
 
    const [fetchAllAnimalRequest, setfetchAllAnimalRequest] = useState([]);

    const AllAnimalRequest= () => {
        axios.get(`/api/animal/all/request`,{
          headers: {
              authorization: `Bearer ${getToken()}`
          }
      }).then(response => {
            setfetchAllAnimalRequest(response.data.animal_request);
      }).catch((err) => console.log(err));
    };
  
    useEffect(() => {
        AllAnimalRequest();
    },[]);


    
const fetchAnimalAdoptionData = () => {
    const data = {
        columns: [
            {
                label: 'ID',
                field: 'id',
                sort: 'asc'
            },
            {
              label: 'Image',
              field: 'user_image',
          },
            {
                label: 'Name',
                field: 'name',
            
            },
            {
              label: 'Email',
              field: 'email',
           
          },
              {
                label: 'Address',
                field: 'address',
            
            },
            {
              label: 'Animal Picture',
              field: 'animal_picture',
          
          },
            {
                  label: 'Animal Name',
                  field: 'animal_name',
              
              },
              {
                label: 'Animal Type',
                field: 'animal_type',
            
            },
            {
              label: 'Adoption Status',
              field: 'status',
          
          },
            
          {
            label: 'Actions',
            field: 'actions',
        },
           
        ],
        rows: []
    }
 
    fetchAllAnimalRequest.forEach(animal => {
    
    //  console.log(animal.adoption_request.request_status)
    animal.adoption_request.user_id.forEach(user => {
      // console.log(user.name);
        data.rows.push({
          
          id: user._id,
          user_image: <img className="brand-image img-square elevation-3" width='80' height='70'  src={user.profile_picture.url} />,
          name: user.name,
          email: user.email,
          address: user.address,
          animal_picture: animal.animal_image.map(animalimage => {
            return <img key={animal._id} className="brand-image img-square elevation-3" width='80' height='70'  src={animalimage.url} />
          }),
          animal_name: animal.animal_name,
          animal_type: animal.animal_type,
          status: <b key={animal._id} style={{color: 'green'}}>{animal.adoption_request.request_status.toUpperCase()}</b>,
          actions: <div><button  onClick={() => AcceptAdoptRequest(animal._id)} className="btn btn-success py-1 px-2 ml-2" >
         ACCEPT</button>
          <button  className="btn btn-danger py-1 px-2 ml-2"  onClick={() => DeleteAdoptRequest(animal._id)}>
          DELETE</button>
          </div>
      }) 
     })

      
        })

        return data;
    }

    //delete adopt request

    const DeleteAdoptRequest = _id => {
      // console.log(_id)
      Swal.fire({
        title: 'Are you sure you want to delete adoption request?',
        icon: 'warning',
        imageUrl: 'https://media0.giphy.com/media/8JrkAsk9CeJHi/giphy.gif?cid=ecf05e478vyjure32i4juid8ne6q1iveyplov3y8vv0w4ona&rid=giphy.gif&ct=g',
        showCancelButton: true,
        confirmButtonColor: '#967259',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {

          axios({
            method: "put",
            url: `/api/animal/cancel/${_id}`,
              headers: {
                  authorization: `Bearer ${getToken()}`
              },
          }).then(response => {
            AllAnimalRequest();
            Swal.fire({
              title: 'You have successfully delete the adoption request.',
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

    //accept adopt request

    const AcceptAdoptRequest = _id => {

        Swal.fire({
          title: 'Are you sure you want to accept adoption request?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#967259',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {

            let formData = new FormData();

            formData.set("request_status", 'approved');
        
            axios({
              method: "put",
              url: `/api/animal/accept/request/${_id}`,
                headers: {
                    authorization: `Bearer ${getToken()}`
                },
              data: formData
            }).then(response => {
              AllAnimalRequest();
              Swal.fire({
                title: 'Success!',
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
        <h1>ADOPTION REQUEST</h1>
        <hr />
        <SideBar  setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} /> 

        <Card style={{ background: '#f3f3f3' }}>
        <Card.Body>
            <MDBDataTable   maxHeight="40vh"  hover striped entriesOptions={[4, 10, 20]} entries={4} data={fetchAnimalAdoptionData()} /> 
        </Card.Body>
        </Card>



        </div>
    );

}

export default Adopter;