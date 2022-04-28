import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Disease from './disease/Disease';
import Injury from './injury/Injury';
import Animal from './animal/Animal';
import AdoptionRequest from './animal/AdoptionRequest';
import Login from './login/login';
import Register from './login/register';
import Employee from './employee/Employee';
import Adopter from './adopter/Adopter';
import AdopterProfile from './adopter/adopterProfile';
import PrivateRoute from './PrivateRoute';
import Dashboard from './dashboard/Dashboard';

const RoutedApp = () => {
    return (
        <Router>
            
            <Routes>
                <Route path="/" exact="true" element={<App />} />

                <Route path="/employee" exact="true"  element={
                     <PrivateRoute isAdmin={true} isEmployee={true}>
                         <Employee />
                      </PrivateRoute>
                    } />
                <Route path="/disease" exact="true"  element={
                     <PrivateRoute isAdmin={true} isEmployee={true}>
                         <Disease />
                      </PrivateRoute>
                    } />
                <Route path="/injury" exact="true"  element={
                     <PrivateRoute isAdmin={true} isEmployee={true}>
                         <Injury />
                      </PrivateRoute>
                    } />
                <Route path="/animal" exact="true"  element={
                     <PrivateRoute isAdmin={true} isEmployee={true}>
                         <Animal />
                      </PrivateRoute>
                    } />
                <Route path="/dashboard" exact="true"  element={
                     <PrivateRoute isAdmin={true} isEmployee={true}>
                         <Dashboard />
                      </PrivateRoute>
                    } />    
                <Route path="/adoption/request" exact="true"  element={
                     <PrivateRoute isAdmin={true} isEmployee={true}>
                         <AdoptionRequest />
                      </PrivateRoute>
                    } />     
                <Route path="/login" exact="true" element={<Login />} />
                <Route path="/register" exact="true" element={<Register />} />
                <Route path="/adopter" exact="true"  element={
                     <PrivateRoute isAdmin={true} isEmployee={true}>
                         <Adopter />
                      </PrivateRoute>
                    } />
                <Route path="/adopter/profile" exact="true"  element={
                     <PrivateRoute >
                         <AdopterProfile />
                      </PrivateRoute>
                    } />

                
            </Routes>
        </Router>
    );
};
export default RoutedApp;