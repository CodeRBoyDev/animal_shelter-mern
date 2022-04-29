import React from "react";
import './App.css';
import './show.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from "./layouts/headerhome";
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'; 
import { getUser, getToken } from './login/helpers';
import { Carousel, Card, Modal, Button } from 'react-bootstrap';
import Pagination from "./layouts/Pagination";
import Swal from 'sweetalert2'
import Footer from "./layouts/footer";

function App() {

  const [fetchAnimal, setfetchAnimal] = useState([]);
  const [AnimalComment, setAnimalComment] = useState([]);
  const [AnimalImage, setAnimalImage] = useState([]);
  const [AddComment, setAddComment] = useState({ comment: ''});
  const [AnimalAllComment, setAnimalAllComment] = useState([]);

  

 
  const fetchAnimals = () => {
    axios.get(`api/home/animal`).then(response => {
      // console.log(response.data);
      setfetchAnimal(response.data.animal);
    }).catch((err) => console.log(err));
  };

    useEffect(() => {
      fetchAnimals();
    },[]);

    const [searchss, setSearch] = useState({search: ""});
    const [genderss, setGender] = useState({gender:""});
    const [typess, setType] = useState({type:""});
    const [agesss, setAge] = useState({age:""});
    const [breedss, setBreed] = useState({breed:""});

    const onchange = e => {
      setSearch({ search: e.target.value});
      setGender({
        gender: ""
      });
      setType({
        type: ""
      });
      setAge({
        age: ""
      })
      setBreed({ breed:""});
    };

    const onAll = () => {
      setSearch({ search: ""});
      setGender({
        gender: ""
      });
      setType({
        type: ""
      });
      setAge({
        age: ""
      })
      setBreed({ breed:""});
    };


    const onMale = () => {
      setGender({
        gender: "male"
      });
    };
  
    const onFemale = () => {
      setGender({
        gender: "female"
      });
    };

    const onCat = () => {
      setType({
        type: "cat"
      });
    };
  
    const onDog = () => {
      setType({
        type: "dog"
      });
    };

  
    const onAge = age => {
        setAge({
          age: age
        })
    };

    const onBreed = e => {
      setBreed({ breed: e.target.value});
    
    };


    const onAddComment = e => {
      const {name, value} = e.target;
      setAddComment((prevInput) => {
        return {
            ...prevInput,
            [name]: value
        }
    })

    }
    
    const handleAddComment = (_id, index) => {
      
    
      // console.log(_id, AddComment, getUser());
      let formData = new FormData();

      formData.set("comment", AddComment.comment);
      formData.set("user_id", getUser());
  
      axios({
          method: "put",
          url: `api/animal/comment/${_id}`,
          headers: {
            authorization: `Bearer ${getToken()}`
        },
          data: formData
        }).then(response => {
          setAddComment({ comment: ""})
          // const oldAnimalComment = [...AnimalAllComment];
          // console.log(response.data.allcomments);

          document.querySelector("#commentfield").value = "";

          axios
          .get(`api/home/animal/comment/${_id}`,{
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        }).then(response => {
            // console.log(response.data);
            setAnimalComment(response.data.animal);
            response.data.animal_image.map(animals =>{
              setAnimalImage(animals.url)
            })
          
              setAnimalAllComment( response.data.allcomments);
              
            


        }).catch((err) => console.log(err));

        }).catch(error => {
                          console.log(error.response);
                          alert(error.response.data.error);
                      });  
                       
              };

// console.log(AddComment);

      const { search} = searchss;
      const { gender} = genderss;
      const { type} = typess;
      const { age} = agesss;
      const { breed} = breedss;

      let genderssss = new RegExp('\\b('+gender+')\\b');
      let agesssss = new RegExp('\\b('+age+')\\b');

      const filteredAnimalss = fetchAnimal.filter(animals => {
        const ageanimal = animals.animal_age.toString();

        return animals.animal_name.toLowerCase().indexOf(search) !== -1 && animals.animal_sex.toLowerCase().match(genderssss)
        && animals.animal_type.toLowerCase().match(type) && ageanimal.match(agesssss) && animals.animal_breed.toLowerCase().match(breed)
        
      });


      const [currentPage, setCurrentPage] = useState(1);
      const [postsPerPage] = useState(6);
    
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const filteredAnimal = filteredAnimalss.slice(indexOfFirstPost, indexOfLastPost);
      
      const paginate = pageNumber => setCurrentPage(pageNumber);

      const [show, setShow] = useState(false);
      const handleClose =() => {
              setShow(false);
              setAnimalComment([]);
              setAnimalImage([]);
            } 

     const handleComment = _id => {
      handleShow()
      // console.log(_id);
              axios
                  .get(`api/home/animal/comment/${_id}`,{
                    headers: {
                        authorization: `Bearer ${getToken()}`
                    }
                }).then(response => {
                    // console.log(response.data);
                    setAnimalComment(response.data.animal);
                    response.data.animal_image.map(animals =>{
                      setAnimalImage(animals.url)
                    })
                  
                      setAnimalAllComment( response.data.allcomments);
                      
                    


                }).catch((err) => console.log(err));
              };

        const handleAdoptRequest = _id => {

          if(getUser() === false){
            Swal.fire({
              title: 'login first!',
              imageUrl: 'https://media3.giphy.com/media/UGWUXLZbv4Y9FIvx9Z/giphy.gif?cid=ecf05e477b5yybqwdkfi4c38lq8jzhrtrj4ndjhs9i4aeejc&rid=giphy.gif&ct=s',
              icon: 'error',
              imageWidth: 200,
              imageHeight: 200,
              imageAlt: 'Custom image',
              confirmButtonColor: '#967259',
              })
          }else{

            Swal.fire({
              title: 'Are you sure you want to send adoption request?',
              icon: 'warning',
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
                  url: `api/animal/request/${_id}`,
                  headers: {
                        authorization: `Bearer ${getToken()}`
                    },
                  data: formData
                }).then(response => {
                  fetchAnimals();
                  Swal.fire({
                    title: 'Thank you!',
                    text: 'Your adoption request has been sent.',
                    imageUrl: 'https://media0.giphy.com/media/kHsGLiKj413gadulPB/giphy.gif?cid=ecf05e474g1qw9m5t4fk22cxntiral36qntwvs7wnn8ilht9&rid=giphy.gif&ct=s',
                    icon: 'success',
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                    confirmButtonColor: '#967259',
                    })

                }).catch((err) => console.log(err));

               
              }
            })
          }

          
          
             
                      };

                     

    const handleShow = () => setShow(true);


  return (
    <div>
       <div></div>
         <Header />

         
            <div className="project-sec">
              <div className="container">


              <h2>Adopt to save a life</h2>
              
                <Carousel fade >
                { fetchAnimal.map(animal => {  
         
              return <Carousel.Item key={animal._id}>
                { animal.animal_image.map(animalimage => {
               return  <img key={animal._id}
                  className="d-block w-100"
                  src={animalimage.url} width="500" height="500"
                  alt="First slide"
                /> })}
             <Carousel.Caption>
                  <h3>Hi, My name is {animal.animal_name}</h3>
                  <p>Adopt me ❤️!</p>
                </Carousel.Caption>
              </Carousel.Item>
                })}
            </Carousel>

            <br/>
            <h2>Pets available for Adoption</h2>
                
            <div className="works"></div>
    
            <div className="col">
          
            <div className="container-btn">
            <div className="searchbar">
              <div className="search">
                <input type="text" onChange={onchange} placeholder="Search"/>
              </div>
            </div>
                 <div className="vl"></div>
                 <div className="btn-group">
                <button className="button" onClick={onAll}> All</button>
                </div>
                <div className="vl"></div>
                <div className="btn-group">
                <button className="button" onClick={onMale}> Male</button>
                <button className="button" onClick={onFemale}> Female</button>
                </div>
                <div className="vl"></div>
                <div className="btn-group">
                <button className="button" onClick={onCat}> Cat</button>
                <button className="button" onClick={onDog}> Dog</button>
               
                </div>
                <div className="vl"></div>
                <h5 style={{ marginTop:'20px',marginLeft:'-10px',width:'55px',backgroundColor:'EF5350'}}>AGE:</h5>
                <div className='slider'  style={{ marginTop:'7px',marginLeft:'0px',width:'150px',backgroundColor:'EF5350'}} >
                      <Slider
                              min={0}
                              max={15}
                              value={age}
                              onChange={onAge}
                          />
                      </div>
                 <b style={{ marginTop:'20px',marginLeft:'4px',width:'3px',backgroundColor:'EF5350'}}>{age}</b>
                 <div className="vl"></div>
                 <div className="btn-group">
                <select onChange={onBreed} className="button">
                 <option value="" selected disabled>Choose breed</option>
                  <option value="bulldog">Bulldog</option>
                  <option value="beagle">Beagle</option>
                  <option value="labrador">Labrador</option>
                  <option value="golden retriever">Golden Retriever</option>
                  <option value="husky">Husky</option>
                  <option value="pug">Pug</option>
                  <option value="terrier">Terrier</option>
                  <option value="siamese">Siamese</option>
                  <option value="persian">Persian</option>
                  <option value="short hair">Short Hair</option>
                </select>
          </div>

                <h5 style={{ marginTop:'0px',marginLeft:'20px',width:'200px',backgroundColor:'EF5350'}}>Filtered by: {search+ gender +','+ type +","+age+","+breed}</h5>
                

          
              
              </div>
                </div>
              
             
                <div className="row">
                              <div className="col">
            { filteredAnimal.map(animal => {
             
  
            if(!animal){
              return <h1>None</h1>
             
            }else{
              return <div key={animal._id} className="blog-post">
              <div  key={animal._id} className="prjt-grid"><Card >
               
              <a href="#" onClick={() => handleComment(animal._id)}>
              { animal.animal_image.map(animalimage => {
             return <Card.Img key={animal._id} className="example-image"  style={{ width: '100%' , height: '27.5vh' }} variant="top" src={animalimage.url} />   
              })
             }
               
                </a>
             <Card.Body key={animal._id} style={{ background: '#f3f3f3' }}>       
              <div className="project-info">
              <p><strong>Name: {animal.animal_name.toUpperCase()}</strong></p>
              <p>Type: {animal.animal_type.toUpperCase()}</p>
              <p>Breed: {animal.animal_breed.toUpperCase()}</p>
              <p>Age: {animal.animal_age}</p>
              <p>Gender: {animal.animal_sex.toUpperCase()}</p>
              <p >Health Status: <b style={{color: 'green'}}> BETTER</b></p>
              <p>Adoption Status: <b style={{color: 'green'}}> AVAILABLE</b></p>
              <a  onClick={() => handleAdoptRequest(animal._id)} href="#"><div className="submit-btn" ><input type="submit" value="ADOPT ME!"/></div></a>
              </div></Card.Body></Card></div></div>
            }
           
             })}
             {filteredAnimal.length === 0 &&
                <div>
                <div className="gifsss">
                  <img src="https://media0.giphy.com/media/XO0oHadwnjUC589moQ/giphy.gif?cid=ecf05e47c5f5nbcnxj3jmxi397jmp9wsmwpdn4ib8ypvgtrv&rid=giphy.gif&ct=s" alt="gif_ing" />
                </div>
                <div className="contentsss">
                  <h1 className="main-headingsss">No Result</h1><br/><br/><br/><br/><br/>
                  
                </div>
              </div>
              }
                </div>
                </div>
                <br></br>
                <div className="centernatin">
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={filteredAnimalss.length}
                  paginate={paginate}
                />
                </div>
             </div>

            </div>

            

            <Modal size='lg' show={show} onHide={handleClose} animation={true}>
            <Modal.Header style={{background:'#664229'}}>
              <Modal.Title style={{color:'#ffff'}}>ANIMAL INFORMATION</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background:'#d2b48c'}}>
            <div className="panel panel-default">
      <div className="panel-body text-center">

          
            <div className="panel">
            <div className="panel" style={{background:'#e5d3b3'}}>
            <div className="wrapper">

                  <div className="img-area">
                    <div className="inner-area">
                          <img src={AnimalImage} alt=""/>
                    </div>
                  </div>
                  <div className="name">{AnimalComment.animal_name}</div>
                  <p >Health Status: <b style={{color: 'green'}}> BETTER</b></p>
                   <p>Adoption Status: <b style={{color: 'green'}}> AVAILABLE</b></p>
                  <div className="social-share">
                      <span>Type: {AnimalComment.animal_type}</span><div className="vl"></div>
                      <span>Gender: {AnimalComment.animal_sex}</span><div className="vl"></div>
                      <span>Breed: {AnimalComment.animal_breed}</span>
                  </div>
                </div>
                </div>
            <div className="panel-heading" style={{background:'#987554'}}>
                <h3 className="panel-title" style={{color:'#ffff'}}>Comments ...</h3>
            </div>
            {/* {console.log(getUser() )} */}
            <div className="panel-content panel-activity" >
                {getUser() === false ?
                 <div id="parent">
                 <Link to="/login" ><h4 className="child" style={{color:'red'}}><b>Sign-in</b></h4></Link>&nbsp;
                 <h4 className="child">|</h4>&nbsp;
                 <Link to="/register" ><h4 className="child" style={{color:'green'}}><b>Sign-up</b></h4></Link>&nbsp;
                 <h4 className="child" style={{color:'black'}}>to leave a comment.</h4>
             </div>
                 :

                 <div  className="panel-activity__status">
                 
                 <textarea onChange={onAddComment} name="comment" id="commentfield" placeholder="Share what you've been up to..." className="form-control"></textarea>
               
                    
                 <div className="actions">
                         <div className="btn-group">
                             <button type="button" className="btn-link" >
                             
                             </button>
                         </div>
                         <button style={{background:'#987554', color:'white'}} onClick={() => handleAddComment(AnimalComment._id)}  type="submit" className="btn btn-sm btn-rounded btn-info">
                             Post
                         </button>
                     </div>
                 </div>
                
                }
               

                <div className='scrollscomment'>
                    { AnimalAllComment.map(commentss => {
                     
                     

                   return <ul key={commentss._id} className="panel-activity__list">
                       <li>
                        <i className="activity__list__icon fa fa-question-circle-o"></i>
                       { commentss.user_id.map(commentssss => {
                          return  <div key={commentss._id} className="activity__list__header">
                          <img src={commentssss.profile_picture.url} alt="" />
                          <a href="#">{commentssss.name}</a>&nbsp;&nbsp;Date Posted:{commentss.createdAt}<a href="#">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                         </div>
                      })}
                      
                        <div className="activity__list__body entry-content">
                        <p>
                        <strong>{commentss.comment}</strong>
                        </p>
                        </div>
                        </li><hr/>
                        </ul>

                    })}
                    {AnimalAllComment.length === 0 && <h3><br></br>There aren't any comments for this animal yet!</h3>}
                    
                    </div>

                    {/* {AnimalAllComment && AnimalAllComment.length > 0 && (
                        <ListReviews reviews={AnimalAllComment} />
                    )} */}

            </div>
        </div>

            </div>    </div>
            </Modal.Body>
            <Modal.Footer style={{background:'#987554'}}>
              <Button style={{background:'#e5d3b3', color:'black'}} variant="light" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          

          <Footer/>

            </div>

         
       
  );
}

export default App;
