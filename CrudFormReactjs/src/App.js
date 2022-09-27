import logo from './logo.svg';
import './App.css';
import {Department} from './Department';
import {BrowserRouter, Route, Routes,NavLink} from 'react-router-dom';
import {PersonalData} from './PersonalData';
import {AddressAndContact} from './AddressAndContact';
import {WorkAndProfession} from './WorkAndProfession';
import { ManageUsers } from './ManageUsers';
import { EmployeeSalary } from './EmployeeSalary';
import { Interns } from './Interns';
import { FullTime } from './FullTime';
//run this >>>> npm i react-datepicker

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        CRUD Forms
      </h3>
        
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="./PersonalData">
            Personal Data
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="./addressandcontact">
              Address And Contact 
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="./workandprofession">
              Work And Profession 
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="./manageusers">
              Manage Users 
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="./employeesalary">
              Employee Salary
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="./interns">
              Interns
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="./fulltime">
              Full time Employees
            </NavLink>
          </li>
          <li className="nav-item- m-1">
          </li>
        </ul>
      </nav>
        <Route path='/PersonalData' component={PersonalData}/>
        <Route path='/addressandcontact' component={AddressAndContact}/>
        <Route path='/workandprofession' component={WorkAndProfession}/>
        <Route path='/manageusers' component={ManageUsers}/>
        <Route path='/employeesalary' component={EmployeeSalary}/>
        <Route path='/interns' component={Interns}/>
        <Route path='/fulltime' component={FullTime}/>
        
      
    </div>
    </BrowserRouter>
  );
}

export default App;
