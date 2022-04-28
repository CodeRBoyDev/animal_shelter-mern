import React from "react";
import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from "../layouts/sidebar";
import { Card} from 'react-bootstrap';
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto'

function Dashboard() {
 

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


    const [RescuedDateStart, setRescuedDateStart] = useState({rescued_start: "2022-02-16"});
    const [RescuedDateEnd, setRescuedDateEnd] = useState({rescued_end:"2022-12-30"});
    const [AdoptedDateStart, setAdoptedDateStart] = useState({adopted_start: "2022-02-16"});
    const [AdoptedDateEnd, setAdoptedDateEnd] = useState({adopted_end:"2022-12-30"});

    const [TotalRescued, setTotalRescued] = useState();
    const [RescuedDate, setRescuedDate] = useState();
    const [TotalAdopted, setTotalAdopted] = useState();
    const [AdoptedDate, setAdoptedDate] = useState();

    const [TotalNumRescue, setTotalNumRescue] = useState();
    const [TotalNumAdopt, setTotalNumAdopt] = useState();
    const [TotalAdopters, setTotalAdopters] = useState();

        const RescuedStartDate = e => {
            
            setRescuedDateStart({ ...RescuedDateStart,[e.target.name]: e.target.value});
            fetchDateAnimals();
        };
        const RescuedEndDate = e => {
            
            setRescuedDateEnd({ ...RescuedDateEnd,[e.target.name]: e.target.value});
            fetchDateAnimals();
        };

        const AdoptedStartDate = e => {
            
          setAdoptedDateStart({ ...AdoptedDateStart,[e.target.name]: e.target.value});
          fetchDateAnimals();
      };
      const AdoptedEndDate = e => {
          
        setAdoptedDateEnd({ ...AdoptedDateEnd,[e.target.name]: e.target.value});
        fetchDateAnimals();
      };

      // console.log(AdoptedDate, TotalAdopted)

        const fetchDateAnimals = () => {

        
              let formData = new FormData();

              formData.append("rescued_start", RescuedDateStart.rescued_start);
              formData.append("rescued_end", RescuedDateEnd.rescued_end);

              formData.append("adopted_start", AdoptedDateStart.adopted_start);
              formData.append("adopted_end", AdoptedDateEnd.adopted_end);

    
              axios({
                method: "post",
                url: `${process.env.REACT_APP_API}/dashboard/rescued`,
                data: formData
              }).then(response => {

                // console.log(response.data.total_animalsss)

                setTotalNumRescue(response.data.total_animalsss)
                setTotalNumAdopt(response.data.total_adoptedss)
                setTotalAdopters(response.data.userssss)

                const monthRescued = response.data.rescued_animaldate.map((month, key) => {
                    return {
                      months: month._id
                    }
                })
               
                    let all_month = monthRescued.map(function(monthssss){
                  return monthssss.months
                  })

                  const totalRescuedMonth = response.data.rescued_animaldate.map((month, key) => {
                    return {
                      months: month.Total
                    }
                })
               
                    let totalRescuedPerMonth= totalRescuedMonth.map(function(monthssss){
                  return monthssss.months
                  })

                  //convert number to month name
                  function toMonthName(monthNumber) {
                    const date = new Date();
                    date.setMonth(monthNumber - 1);
                  
               
                    return date.toLocaleString([], {
                      month: 'long',
                    });
                  }
                  let allMonthName = [];
                  for (var j = 0; j < all_month.length; j++) {
                    allMonthName.push(toMonthName(all_month[j]))
                
                
                  }

                  //set to state rescued animal
                  setRescuedDate(allMonthName);
                 setTotalRescued(totalRescuedPerMonth);


                //  console.log(response.data.adopted_animaldate)
                 const monthAdopted = response.data.adopted_animaldate.map((month, key) => {
                  return {
                    months: month._id
                      }
                  })
             
                  let all_adoptedmonth = monthAdopted.map(function(monthssss){
                return monthssss.months
                })

                const totalAdoptedMonth = response.data.adopted_animaldate.map((month, key) => {
                  return {
                    months: month.Total
                  }
              })
             
                  let totalAdoptedPerMonth= totalAdoptedMonth.map(function(monthssss){
                return monthssss.months
                })

                 //convert number to month name
                 function toMonthNames(monthNumber) {
                  const date = new Date();
                  date.setMonth(monthNumber - 1);
                
             
                  return date.toLocaleString([], {
                    month: 'long',
                  });
                }
                let allAdoptedMonthName = [];
                for (var j = 0; j < all_adoptedmonth.length; j++) {
                  allAdoptedMonthName.push(toMonthNames(all_adoptedmonth[j]))
                }

                setAdoptedDate(allAdoptedMonthName);
                 setTotalAdopted(totalAdoptedPerMonth);

                
            }).catch((err) => console.log(err));
          };
        //  console.log(TotalRescued, RescuedDate)
            useEffect(() => {
              fetchDateAnimals();
            },[RescuedDateStart, RescuedDateEnd, AdoptedDateStart, AdoptedDateEnd]);
            
        //   console.log(RescuedDate);
        const rescued_data = {
                labels: RescuedDate,
                datasets: [
                  {
                    label: 'RESCUED ANIMALS',
                    backgroundColor: "#987554",
                    borderColor: "#d2b48c",
                    borderWidth: 2,
                    data: TotalRescued
                  }
                ]
              }


              const adopted_data = {
                labels: AdoptedDate,
                datasets: [
                  {
                    label: 'ADOPTED ANIMALS',
                    backgroundColor: "#987554",
                    borderColor: "#d2b48c",
                    borderWidth: 2,
                    data: TotalAdopted
                  }
                ]
              }

         


    return (
        <div style={contentStyle}>
        <br />
        <h1>DASHBOARD</h1>
        <hr />
        <SideBar  setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} /> 

        <div className="card-deck">
            <div className="card">
              <div className="card-body">
                <h5 className="centerdash">Total Rescued Animals</h5>
                <h4 className="centerdash"><i className="fa fa-briefcase-medical"></i></h4>
                <h2 className="centerdash" style={{'font-size':'65px'}}><b>{TotalNumRescue}</b></h2>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="centerdash">Total Adopted Animals</h5>
                <h4 className="centerdash"><i className="fa fa-house-user"></i></h4>
                <h2 className="centerdash" style={{'font-size':'65px'}}><b>{TotalNumAdopt}</b></h2>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="centerdash">Total Adopters</h5>
                <h4 className="centerdash"><i className="fa fa-users"></i></h4>
              <h2 className="centerdash" style={{'font-size':'65px'}}> <b>{TotalAdopters}</b></h2>
              </div>
            </div>
          </div><br></br>
          <div className="row">
            <div className="col-6">
            <Card style={{ background: '#f3f3f3' }}>
          <br></br>
          <h3>&nbsp;RESCUED ANIMALS</h3>
        <Card.Body>
            {/* <MDBDataTable   maxHeight="40vh"  hover striped entriesOptions={[4, 10, 20]} entries={4} data={fetchAnimalAdoptionData()} />  */}
        <b>FROM:&nbsp;<input type="date" name="rescued_start" value={RescuedDateStart.rescued_start} onChange={RescuedStartDate}/></b>
        <b>&nbsp;TO:&nbsp;<input type="date" name="rescued_end" value={RescuedDateEnd.rescued_end} onChange={RescuedEndDate}/></b>
        <Bar
          data={rescued_data}
          options={{
            title:{
              display:true,
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
        </Card.Body>
        </Card>
            </div>
            <div className="col-6">
            <Card style={{ background: '#f3f3f3' }}>
          <br></br>
          <h3>&nbsp;ADOPTED ANIMALS</h3>
        <Card.Body>
            {/* <MDBDataTable   maxHeight="40vh"  hover striped entriesOptions={[4, 10, 20]} entries={4} data={fetchAnimalAdoptionData()} />  */}
        <b>FROM:&nbsp;<input type="date" name="adopted_start" value={AdoptedDateStart.adopted_start} onChange={AdoptedStartDate}/></b>
        <b>&nbsp;TO:&nbsp;<input type="date" name="adopted_end" value={AdoptedDateEnd.adopted_end} onChange={AdoptedEndDate}/></b>
        <Bar
          data={adopted_data}
          options={{
            title:{
              display:true,
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
        </Card.Body>
        </Card>
            </div>
          </div>

        </div>
    );

}

export default Dashboard;