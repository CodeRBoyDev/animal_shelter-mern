import React from "react";
import SideNav, {
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useNavigate } from 'react-router-dom';
import { logout, getName,getRole } from '../login/helpers';

export const SideBar = ({ sideNavExpanded, setSideNavExpanded }) => {
  let navigate = useNavigate();


  return (
    <>
      <SideNav
      style={{ background: 'rgb(64 47 47)' }}
      onToggle={() => {
        setSideNavExpanded(!sideNavExpanded);
      }}
        expanded={sideNavExpanded}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="none">
        <NavItem eventKey="profile">
            <NavIcon>
              <i className="fa fa-fw fa-user" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>{getName().toUpperCase()}</NavText>
          </NavItem>

          <hr/>
          <NavItem eventKey="home" onClick={()  => navigate('/dashboard')}>
            <NavIcon>
              <i className="fa fa-fw fa-tachometer-alt" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Dashboard</NavText>
          </NavItem>
          <NavItem eventKey="Animal" onClick={()  => navigate('/animal')}>
            <NavIcon>
              <i className="fa fa-fw fa-paw" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Animal</NavText>
          </NavItem>
            {getRole() === 'admin' && 
            <NavItem eventKey="Employee" onClick={()  => navigate('/employee')}>
                        <NavIcon>
                          <i className="fa fa-fw fa-address-card" style={{ fontSize: "1.75em" }} />
                        </NavIcon>
                        <NavText>Employee</NavText>
                      </NavItem>}
        

          <NavItem eventKey="Adopter" onClick={()  => navigate('/adopter')}>
            <NavIcon>
              <i className="fa fa-user-friends" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Adopter</NavText>
          </NavItem>
          <NavItem eventKey="Disease" onClick={()  => navigate('/disease')}>
            <NavIcon>
              <i className="fa fa-disease" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Disease</NavText>
          </NavItem>
          <NavItem eventKey="Injury" onClick={()  => navigate('/injury')}>
            <NavIcon>
              <i className="fa fa-crutch" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Injury</NavText>
          </NavItem>
          <NavItem eventKey="adoption_request" onClick={()  => navigate('/adoption/request')}>
            <NavIcon>
              <i className="fa fa-dog" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Adoption Request</NavText>
          </NavItem> <hr/>
          <NavItem eventKey="logout" onClick={() => logout(() => navigate('/'))} >
            <NavIcon >
              <i className="fa  fa-sign-out-alt" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Logout</NavText>
          </NavItem><hr/>
          {/* <NavItem eventKey="charts">
            <NavIcon>
              <i
                className="fa fa-fw fa-clinic-medical"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText>Illness</NavText>
            <NavItem eventKey="charts/linechart">
              <NavText> <i
                className="fa fa-fw fa-crutch"
                style={{ fontSize: "1.75em" }}/> 
                <Link to="/disease">Disease</Link></NavText>
            </NavItem>
            <NavItem eventKey="charts/barchart">
              <NavText><i
                className="fa fa-fw fa-disease"
                style={{ fontSize: "1.75em" }}/> Injury</NavText>
            </NavItem>
          </NavItem> */}
        </SideNav.Nav>
      </SideNav>
    </>
  );
};

export default SideBar;
