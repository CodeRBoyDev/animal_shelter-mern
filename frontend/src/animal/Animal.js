import React from "react";
import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from "../layouts/sidebar";
import { MDBDataTable} from 'mdbreact';
import { Card, Col, Row, Modal, Button, Form } from 'react-bootstrap';
import { getToken} from '../login/helpers';

function Animal() {

  const [error, setError] = useState({  
    animal_name: '',
    animal_type: '',
    animal_sex: '',
    animal_breed: '',
    animal_age: '',
    rescued_date: '',
    animal_image: ''
    });

    const [animalsss, setAnimal] = useState({
        animal_name: '',
        animal_type: 'cat',
        animal_sex: 'male',
        animal_breed: '',
        animal_age: '',
        rescued_date: '2022-04-07'
    })

    const [getAnimal, setgetAnimal] = useState({
      animal_name: '',
      animal_type: '',
      animal_sex: '',
      animal_breed: '',
      animal_age: '',
      rescued_date: '',
      animal_image: ''
    });

    const { animal_name, animal_type, animal_sex, animal_breed, animal_age, rescued_date } = getAnimal;

    const [AllDisease, setAllDisease] = useState([]);
    const [AllInjury, setAllInjury] = useState([]);

    const [editAllDisease, seteditAllDisease] = useState([]);
    const [editAllInjury, seteditAllInjury] = useState([]);

    const [editcheckAllDisease, seteditcheckAllDisease] = useState([]);
    const [editcheckAllInjury, seteditcheckAllInjury] = useState([]);

    const [fetchAnimal, setfetchAnimal] = useState([]);

    const [checkedItems, setCheckedItems] = useState({disease_id: []});
    const [checkedItemss, setCheckedItemss] = useState({injury_id: []});

    const [checkededitItems, seteditCheckedItems] = useState({editdisease_id: []});
    const [checkededitItemss, seteditCheckedItemss] = useState({editinjury_id: []});

    const { disease_id } = checkedItems;
    const { injury_id } = checkedItemss;

    // const { editdisease_id } = checkededitItems;
    // const { editinjury_id } = checkededitItemss;

    const [animal_images, setImage] = useState('')
    const [avatarPreview, setImagePreview] = useState('https://res.cloudinary.com/du7wzlg44/image/upload/v1649676030/animals/ADD_YOUR_PHOTO_HERE_1_yrzv8w.png')

    const [animal_imageEdit, setEditImage] = useState('')
    const [editavatarPreview, editsetImagePreview] = useState('https://res.cloudinary.com/du7wzlg44/image/upload/v1649676030/animals/ADD_YOUR_PHOTO_HERE_1_yrzv8w.png')




    const handleChangess = id => {
      const selectedCheckboxes = checkedItems.disease_id;
  
      // Find index
      const findIdx = selectedCheckboxes.indexOf(id);
  

      if (findIdx > -1) {
        selectedCheckboxes.splice(findIdx, 1);
      } else {
        selectedCheckboxes.push(id);
      }
  
      setCheckedItems({
        disease_id: selectedCheckboxes
      });
    };

    const edithandleChangess = e => {
      const { value, checked } = e.target;

      const selectedCheckboxes = checkededitItems.editdisease_id;

    // console.log(`${value} is ${checked}`);

    if (checked) {
        const findIdx = selectedCheckboxes.indexOf(value);
        selectedCheckboxes.push(value);
  
      seteditCheckedItems({
        editdisease_id: selectedCheckboxes
      });

    

    } else {
      seteditCheckedItems({
        editdisease_id: selectedCheckboxes.filter((e) => e !== value)
      });

    }
  
    };

    const edithandleChangessss = e => {
      const { value, checked } = e.target;

      const selectedCheckboxesinjury = checkededitItemss.editinjury_id;

    // console.log(`${value} is ${checked}`);

    if (checked) {
 
        const findIdxs = selectedCheckboxesinjury.indexOf(value);

        selectedCheckboxesinjury.push(value);
  
      seteditCheckedItemss({
        editinjury_id: selectedCheckboxesinjury
      });

    } else {

      seteditCheckedItemss({
        editinjury_id: selectedCheckboxesinjury.filter((e) => e !== value)
      });
    }
  
    };


    const handleChangesss = id => {
      const selectedCheckboxes = checkedItemss.injury_id;
  
      // Find index
      const findIdx = selectedCheckboxes.indexOf(id);
  

      if (findIdx > -1) {
        selectedCheckboxes.splice(findIdx, 1);
      } else {
        selectedCheckboxes.push(id);
      }
  
      setCheckedItemss({
        injury_id: selectedCheckboxes
      });
    };

    
 



    //add animal data

    const onChange = e => {
        if (e.target.name === 'animal_image') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                  setImagePreview(reader.result)
                    setImage(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } 
        else {
          setAnimal({ ...animalsss, [e.target.name]: e.target.value })
          
      }
    }

   
    const addAnimalssss = ()=>{
        // console.log(title);
        // console.log(checkedItems, checkedItemss);

      
        let formData = new FormData();

        

        formData.set("animal_image", animal_images);
        formData.set("animal_name", animalsss.animal_name);
        formData.set("animal_type", animalsss.animal_type);
        formData.set("animal_sex", animalsss.animal_sex);
        formData.set("animal_breed", animalsss.animal_breed);
        formData.set("animal_age",animalsss.animal_age);
        formData.set("rescued_date",animalsss.rescued_date);

        for (var i = 0; i < checkedItems.disease_id.length; i++) {
          formData.append('disease_id', checkedItems.disease_id[i]);
        }
        for (var j = 0; j < checkedItemss.injury_id.length; j++) {
          formData.append('injury_id', checkedItemss.injury_id[j]);
        }
        const totalInjury = checkedItemss.injury_id.length + 0;
        const totalDisease = checkedItems.disease_id.length + 0;

        if(totalInjury === 0){
         const totalInjurys = 0;
         formData.append('totalInjurys', totalInjurys);
        //  console.log(totalInjurys)
           
        }else{
          const totalInjurys = totalInjury;
          formData.append('totalInjurys', totalInjurys);
          // console.log(totalInjurys)
        }

        if(totalDisease === 0){
          const totalDiseases = 0;
          formData.append('totalDiseases', totalDiseases);
          // console.log(totalDiseases)
            
         }else{
           const totalDiseases = totalDisease;
           formData.append('totalDiseases', totalDiseases);
          //  console.log(totalDiseases)
         }

        
        axios({
            method: "post",
            url: `api/animal/new`,
            headers: {
                  authorization: `Bearer ${getToken()}`
              },
            data: formData
          }).then(response => {
            // console.log(response);
            // fetchAnimals();
            window.location.reload(false);
            handleClose();
            setAnimal({animal_name: '',animal_type: 'cat',animal_sex: 'male',animal_breed: '',animal_age: '',rescued_date: '2022-04-07'});
            setImagePreview('https://res.cloudinary.com/du7wzlg44/image/upload/v1649676030/animals/ADD_YOUR_PHOTO_HERE_1_yrzv8w.png');
          }).catch(error => {
            setError(error.response.data);
                        });   
    }

  //fetch to datatable 

  const fetchAnimals = () => {
      axios.get(`api/animal`,{
        headers: {
            authorization: `Bearer ${getToken()}`
        }
    }).then(response => {
        // console.log(response.data.animal);
        setfetchAnimal(response.data.animal);
    }).catch((err) => console.log(err));
  };


  useEffect(() => {
    fetchAnimals();
  },[]);

  const fetchAnimalData = () => {
    const data = {
        columns: [
            {
                label: 'ID',
                field: 'id',
                sort: 'desc'
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
              label: 'Type',
              field: 'type',
           
          },
              {
                label: 'Gender',
                field: 'gender',
            
            },
            {
                  label: 'Breed',
                  field: 'breed',
              
              },
              {
                label: 'Age',
                field: 'age',
            
            },
            {
              label: 'Health Status',
              field: 'health',
          
          },  
          {
            label: 'Adoption Status',
            field: 'status',
        
        },  
          {
            label: 'Date Rescued',
            field: 'rescued_date',
        
        },
          {
            label: 'Actions',
            field: 'actions',
        },
           
        ],
        rows: []
    }

    fetchAnimal.forEach(animal => {
      
        // console.log(animal.disease_id);
        animal.animal_image.forEach(animal2 => {
          
        data.rows.push({
          id: animal._id,
          image: <img className="brand-image img-square elevation-3" width='80' height='70'  src={animal2.url} />,
          name: animal.animal_name,
          type: animal.animal_type,
          gender: animal.animal_sex,
          breed: animal.animal_breed,
          age: animal.animal_age ,
        //   disease: 
        //   animal.disease_id.map(function(animal3){
        //     return animal3.disease_name === 'null' ? 'none' : <li key={animal3._id}>{animal3.disease_name}</li> ;
        //     // console.log(animal.disease_id);
        //   //   if(animal.disease_id == null){
        //   //     return (<li>none</li>)
        //   //   }
        //   //   return (
        //   // <li>{animal3.disease_name}</li>    )
        // }),
        health: animal.animal_image.map(function(animal3){
          if(animal.health_status === 'better'){
            return <b key={animal3._id} style={{color: 'green'}}>BETTER</b>
          }else if(animal.health_status === 'bad' ){
            return <b key={animal3._id } style={{color: '#ad8611'}}>BAD</b>
          }else{
            return <b key={animal3._id} style={{color: 'red'}}>WORST</b>
          }
        }),
        status: animal.animal_image.map(function(animal4){
          if(animal.adoption_status === 'available'){
            return <b key={animal4._id} style={{color: 'green'}}>AVAILABLE</b>
          }else if(animal.adoption_status === 'not available' ){
            return <b key={animal4._id } style={{color: 'red'}}>NOT AVAILABLE</b>
          }else{
            return <b key={animal4._id} style={{color: '#ad8611'}}>ADOPTED</b>
          }
        }),
        rescued_date: animal.rescued_date.substring(0, 10),
          actions: animal.adoption_status === 'adopted' ? <b style={{color: 'black'}}>ADOPTED</b> : <div><button  onClick={() => updateGetAnimal(animal._id)} className="btn btn-warning py-1 px-2 ml-2" >
          <i className="fa fa-pencil"></i></button>
          <button  className="btn btn-danger py-1 px-2 ml-2" >
          <i className="fa fa-trash" onClick={() => deleteConfirm(animal._id)} ></i></button>
          </div>
      })

 
      })
      
        })

        return data;
    }

    //update animal

    const updateGetAnimal = _id => {
      // console.log(_id)
      handleUpdateShow()
      axios
          .get(`api/animal/${_id}`,{
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        }).then(response => {
            // console.log(response.data.animal_image);
            setgetAnimal(response.data.animal)
            response.data.animal_image.map(function(animal3){
              return editsetImagePreview(animal3.url)
            })
            seteditAllDisease(response.data.disease);
            seteditAllInjury(response.data.injury);

          
              seteditcheckAllDisease(response.data.checkdiseasekanimal);
              // console.log(response.data.checkdiseasekanimal);

              seteditcheckAllInjury(response.data.checkinjurykanimal);
              // console.log(response.data.checkinjurykanimal);
              seteditCheckedItems({
                editdisease_id: [response.data.checkdiseasekanimal]
              });


              //set to state all check disease of animal
              const diseaseidanimal = response.data.checkdiseasekanimal.map((disease_id, key) => {
                return {
                  disease_ids: disease_id
                }
            })
           
                let all_checkdisease = diseaseidanimal.map(function(animaldiseaseid){
              return animaldiseaseid.disease_ids
              })
              
              seteditCheckedItems({
                editdisease_id: all_checkdisease
              });

               //set to state all check injury of animal

               const injuryidanimal = response.data.checkinjurykanimal.map((injury_id, key) => {
                return {
                  injury_ids: injury_id
                }
            })
           
                let all_checkinjury = injuryidanimal.map(function(animalinjuryid){
              return animalinjuryid.injury_ids
              })
              
              seteditCheckedItemss({
                editinjury_id: all_checkinjury
              });



        }).catch((err) => console.log(err));

      
      };

   
      const onChangeedit = e => {
        if (e.target.name === 'animal_image') {
  
            const reader = new FileReader();
  
            reader.onload = () => {
                if (reader.readyState === 2) {
                  editsetImagePreview(reader.result)
                  setEditImage(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } 
        else {
          setgetAnimal({ ...getAnimal, [e.target.name]: e.target.value });
          
      }
    }


    const submitupdateAnimalss = _id => {

      // console.log(checkededitItems, checkededitItemss, animal_imageEdit);

      let formData = new FormData();

    

      formData.set("animal_name", animal_name);
      formData.set("animal_type", animal_type);
      formData.set("animal_sex", animal_sex);
      formData.set("animal_breed", animal_breed);
      formData.set("animal_age", animal_age);
      formData.set("rescued_date", rescued_date);
      formData.set("animal_image",animal_imageEdit);

      for (var i = 0; i < checkededitItems.editdisease_id.length; i++) {
        formData.append('disease_id', checkededitItems.editdisease_id[i]);
      }
      for (var j = 0; j < checkededitItemss.editinjury_id.length; j++) {
        formData.append('injury_id', checkededitItemss.editinjury_id[j]);
      }
      const totalInjury = checkededitItemss.editinjury_id.length + 0;
      const totalDisease = checkededitItems.editdisease_id.length + 0;

      if(totalInjury === 0){
       const totalInjurys = 0;
       formData.append('totalInjurys', totalInjurys);
      //  console.log(totalInjurys)
         
      }else{
        const totalInjurys = totalInjury;
        formData.append('totalInjurys', totalInjurys);
        // console.log(totalInjurys)
      }

      if(totalDisease === 0){
        const totalDiseases = 0;
        formData.append('totalDiseases', totalDiseases);
        // console.log(totalDiseases)
          
       }else{
         const totalDiseases = totalDisease;
         formData.append('totalDiseases', totalDiseases);
        //  console.log(totalDiseases)
       }

  
      axios({
          method: "put",
          url: `api/animal/${_id}`,
            headers: {
                authorization: `Bearer ${getToken()}`
            },
          data: formData
        }).then(response => {
          // console.log(response);
          window.location.reload(false);
          handleUpdateClose();
          // fetchUserss();
          // // // window.location.reload(false);\
          // setgetUser({name: '',
          // age: '',
          // phone: '',
          // address: '',
          // email: '',
          // password: '',});
          // seteditProfilePreview('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4TKmLL_Yab3zrnGsM-6FzOgBGSm3lcXkndb1E5xQagw5YlZ9ClcBcC46v3Eq9vfBSIQ&usqp=CAU');
        }).catch(error => {
                          console.log(error.response);
                          alert(error.response.data.error);
                      });   
    }


    //delete animal


      const deleteConfirm = _id => {
        let answer = window.confirm('Are you sure you want to delete this injury?' + _id );
        if (answer) {
            // console.log('hi');
            deleteAnimal(_id);
        }
      };

    const deleteAnimal = _id => {
        // console.log(_id);
        axios
            .delete(`api/animal/${_id}`,{
              headers: {
                  authorization: `Bearer ${getToken()}`
              }
          })
            .then(response => {
              fetchAnimals();
            })
            .catch(error => alert('Error deleting post'));
     };  

//---------------------------


  const [sideNavExpanded, setSideNavExpanded] = React.useState(true);

  function handleResize() {
    // iPhone X width, for example
    if (window.innerWidth <= 375) {
      setSideNavExpanded(false);

      // write other logic here such as disabling hamburger button
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


  const handleUpdateClose = () => {
    setShowUpdate(false); 
    // setgetDisease({ disease_name: '', disease_description: ''});
    setgetAnimal({animal_name: '',
    animal_type: '',
    animal_sex: '',
    animal_breed: '',
    animal_age: '',
    rescued_date: '',
    animal_image: ''})
    editsetImagePreview('https://res.cloudinary.com/du7wzlg44/image/upload/v1649676030/animals/ADD_YOUR_PHOTO_HERE_1_yrzv8w.png')
    seteditAllDisease([]);
    seteditcheckAllDisease([]);
    seteditcheckAllInjury([]);
    seteditAllInjury([]);
  } 

  const handleClose =() => {
    setShow(false);
    setAnimal({animal_name: '',animal_type: 'cat',animal_sex: 'male',animal_breed: '',animal_age: '', rescued_date: '2022-04-07'});
    setImagePreview('https://res.cloudinary.com/du7wzlg44/image/upload/v1649676030/animals/ADD_YOUR_PHOTO_HERE_1_yrzv8w.png');
  } 

  const handleUpdateShow = () => setShowUpdate(true);
  const handleShow = () => {
    setShow(true);
    axios.get(`api/animal/create`,{
      headers: {
          authorization: `Bearer ${getToken()}`
      }
  }).then(response => {
      // console.log(response.data.disease);
      setAllDisease(response.data.disease);
      setAllInjury(response.data.injury);
    })
    
  }



  return (

    <div style={contentStyle}>
    <br />
    <h1>ANIMAL CRUD</h1>
    <hr />

      <SideBar  setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} />      
         
      <Card style={{ background: '#f3f3f3' }}>
        <Card.Body>
        <Button variant="secondary" onClick={handleShow}>
           Add Animal
          </Button>
          <MDBDataTable  maxHeight="200px"  hover striped entriesOptions={[4, 10, 20]} entries={4} data={fetchAnimalData()} /> 
          {/* <MDBTable scrollY striped bordered maxHeight="500px">
          <MDBTableHead columns={fetchAnimalData().columns} />
          <MDBTableBody rows={fetchAnimalData().rows} />
        </MDBTable> */}
        </Card.Body>
      </Card>



    <Modal size="lg" show={show} onHide={handleClose} animation={true}>
        <Modal.Header>
          <Modal.Title>ANIMAL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>

        <Row >
        <Col sm>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Card style={{ width: '110%' , height: '35vh' }}>
            <Card.Img className="frame"  style={{ width: '100%' , height: '26vh' }} variant="top" src={avatarPreview} />
            <Card.Body style={{ background: '#f3f3f3' }}>
            <Form.Control
                onChange={onChange}
                type="file"
                name="animal_image"
                // value= {disease_name}
                placeholder="disease name..."
                accept="iamges/*"
                autoFocus
              />
            </Card.Body>
          </Card>
            </Form.Group>

           </Col> 

           <Col sm>
             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
              //  onChange={handleChange}
                type="email"
                name="animal_name"
                value= {animalsss.animal_name}
                placeholder="animal name..."
                onChange={onChange}
                autoFocus
              />
            </Form.Group><p className="errorss">{error.animal_name}</p>

          <Row>

          <Col sm>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Type</Form.Label><br></br>
            <Form.Check 
                inline
                label="Cat"
                name="animal_type"
                type="radio"
                value="cat"
                checked={animalsss.animal_type === "cat"}
                onChange={onChange}

              />
              <i className="fa fa-cat" />
              <Form.Check
                inline
                label="Dog"
                name="animal_type"
                type="radio"
                value="dog"
                checked={animalsss.animal_type === "dog"}
                onChange={onChange}
              />
               <i className="fa fa-dog" />
              
            </Form.Group><p className="errorss">{error.animal_type}</p>
            </Col>
            

            <Col sm>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Gender</Form.Label><br></br>
            <Form.Check
                inline
                label="male"
                name="animal_sex"
                type="radio"
                value="male"
                checked={animalsss.animal_sex === "male"}
                onChange={onChange}
              />
              <i className="fa fa-mars" />
              <Form.Check
                inline
                label="female"
                name="animal_sex"
                type="radio"
                value="female"
                checked={animalsss.animal_sex === "female"}
                onChange={onChange}
              />
              <i className="fa fa-venus" />
              
            </Form.Group><p className="errorss">{error.animal_sex}</p>
            </Col>


            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Disease</Form.Label><br></br>
            <div className='scrollsss'>
            { AllDisease.map(disease => {
               return <Col key={disease._id}><Form.Check
                inline
                label={disease.disease_name}
                name='_id'
                type="checkbox"
                value={disease._id}
                // checked={checkedItems[disease._id]}
                onChange={() => handleChangess(disease._id)}
                selected={disease_id.includes(disease._id)}
                
                
              /></Col>
              })
            }
          </div>  
            </Form.Group>


            </Row>

            </Col>
            

            <Col sm>
            <Row>
            <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Breed</Form.Label>
              <Form.Control
              //  onChange={handleChange}
                type="text"
                name="animal_breed"
                placeholder="animal breed..."
                value={animalsss.animal_breed}
                onChange={onChange}
              />
            </Form.Group><p className="errorss">{error.animal_breed}</p>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Age</Form.Label>
                <Form.Control
                //  onChange={handleChange}
                  type="number"
                  name="animal_age"
                  placeholder="age..."
                  value={animalsss.animal_age}
                  onChange={onChange}
                  />
              </Form.Group><p className="errorss">{error.animal_age}</p>
            </Col>
            </Row>

            <Row>

            

            <Col>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Rescued Date</Form.Label>
                <Form.Control
                //  onChange={handleChange}
                  type="date"
                  name="rescued_date"
                  value={animalsss.rescued_date}
                  onChange={onChange}
                  />
              </Form.Group><p className="rescued_date">{error.animal_type}</p>
            </Col>
              </Row>
              
              <Form.Group style={{position: 'relative',top: '11px'}} className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Injury</Form.Label><br></br>
            <div className='scrolls'>
            { AllInjury.map(injury => {
               return <Col key={injury._id}><Form.Check
                inline
                label={injury.injury_name}
                name="_id"
                value={injury._id}
                type="checkbox"
                onChange={() => handleChangesss(injury._id)}
                selected={injury_id.includes(injury._id)}


                
              /></Col>
              })
            }
         </div>
              
            </Form.Group>
            
            
            </Col>
            
            

            

          </Row>


       

            {/* <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>upload image </Form.Label>
              <Form.Control
                onChange={onChange}
                type="file"
                name="animal_image"
                // value= {disease_name}
                placeholder="disease name..."
                accept="iamges/*"
                autoFocus
              />
            </Form.Group> */}
     

          </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={()=>addAnimalssss()}>
            Add Animal
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal size="lg" show={showupdate} onHide={handleUpdateClose} animation={true}>
        <Modal.Header>
          <Modal.Title>UPDATE ANIMAL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>

          <Row >
          <Col sm>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Card style={{ width: '110%' , height: '35vh' }}>
              <Card.Img className="frame"  style={{ width: '100%' , height: '26vh' }} variant="top" src={editavatarPreview} />
              <Card.Body style={{ background: '#f3f3f3' }}>
              <Form.Control
                 onChange={onChangeedit}
                  type="file"
                  name="animal_image"
                  // value= {disease_name}
                  placeholder="disease name..."
                  accept="iamges/*"
                  autoFocus
                />
              </Card.Body>
            </Card>
              </Form.Group>

            </Col> 

            <Col sm>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                //  onChange={handleChange}
                  type="email"
                  name="animal_name"
                  value= {animal_name}
                  placeholder="animal name..."
                  onChange={onChangeedit}
                  autoFocus
                />
              </Form.Group>

            <Row>

            <Col sm>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Type</Form.Label><br></br>
              <Form.Check 
                  inline
                  label="Cat"
                  name="animal_type"
                  type="radio"
                  value="cat"
                  checked={animal_type === 'cat'}
                  onChange={onChangeedit}

                />
                <i className="fa fa-cat" />
                <Form.Check
                  inline
                  label="Dog"
                  name="animal_type"
                  type="radio"
                  value="dog"
                  checked={animal_type === 'dog'}
                  onChange={onChangeedit}
                />
                <i className="fa fa-dog" />
                
              </Form.Group>
              </Col>
           

              <Col sm>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Gender</Form.Label><br></br>
              <Form.Check
                  inline
                  label="male"
                  name="animal_sex"
                  type="radio"
                  value="male"
                  checked={animal_sex === "male"}
                  onChange={onChangeedit}
                  
                />
                <i className="fa fa-mars" />
                <Form.Check
                  inline
                  label="female"
                  name="animal_sex"
                  type="radio"
                  value="female"
                  checked={animal_sex === "female"}
                  onChange={onChangeedit}
                />
                <i className="fa fa-venus" />
                
              </Form.Group>
              </Col>


              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Disease</Form.Label><br></br>
              <div className='scrollsss'>
              {/* <InfiniteScroll
                  dataLength={AllDisease.length} //This is important field to render the next data
                  next={fetchData()}
                  hasMore={true}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }
                > */}
              { editAllDisease.map(function(disease, index) {
                
                  // getAnimal
              
                    return <Col key={disease._id}><Form.Check
                    inline
                    label={disease.disease_name}
                    name={disease._id}
                    type="checkbox"
                    value={disease._id}
                    defaultChecked={editcheckAllDisease[index]}
                    onChange={edithandleChangess}
                    // selected={editdisease_id.includes(disease._id)}
                    
                    
                  /></Col>
               
                
                })
              }
            {/* </InfiniteScroll> */}
            </div>  
              </Form.Group>


              </Row>

              </Col>
              

              <Col sm>
              <Row>
              <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Breed</Form.Label>
                <Form.Control
                //  onChange={handleChange}
                  type="text"
                  name="animal_breed"
                  placeholder="animal breed..."
                  value={animal_breed}
                  onChange={onChangeedit}
                />
              </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                  //  onChange={handleChange}
                    type="number"
                    name="animal_age"
                    placeholder="age..."
                    value={animal_age}
                    onChange={onChangeedit}
                    />
                </Form.Group>
              </Col>
              </Row>

              <Row>

              

              <Col>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Rescued Date</Form.Label>
                  <Form.Control
                  //  onChange={handleChange}
                    type="date"
                    name="rescued_date"
                    value={rescued_date.substring(0, 10)}
                    onChange={onChangeedit}
                    />
                </Form.Group>
              </Col>
                </Row>
                
                <Form.Group style={{position: 'relative',top: '11px'}} className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Injury</Form.Label><br></br>
              <div className='scrolls'>
              { editAllInjury.map(function(injury, index){
          
                  return <Col key={injury._id}><Form.Check
                  inline
                  label={injury.injury_name}
                  name={injury._id}
                  type="checkbox"
                  value={injury._id}
                  defaultChecked ={editcheckAllInjury[index]}
                  onChange={edithandleChangessss}
                 
                  
                  
                /></Col>
                
                })
              }
          </div>
                
              </Form.Group>
              
              
              </Col>
              
              

              

            </Row>




    {/* <Form.Group
      className="mb-3"
      controlId="exampleForm.ControlTextarea1"
    >
      <Form.Label>upload image </Form.Label>
      <Form.Control
        onChange={onChange}
        type="file"
        name="animal_image"
        // value= {disease_name}
        placeholder="disease name..."
        accept="iamges/*"
        autoFocus
      />
    </Form.Group> */}


  </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleUpdateClose}>
            Close
          </Button>
          <Button variant="dark" onClick={() => submitupdateAnimalss(getAnimal._id)}>
            Update Animal
          </Button>
        </Modal.Footer>
      </Modal>
       
    </div>
     
  );
}

export default Animal;
