import React,{Component, useState} from 'react';
import {variables} from './Variables.js';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import {Container} from 'react-bootstrap';

export class EmployeeSalary extends Component{
    
    
    constructor(props){
        super(props);

        this.state={
            employeesalary:[],
            modalTitle:"",
            RowId:0,
            EmployeeId:"",
            FirstName:"",
            LastName:"",
            JobName:"",
            Salary:"",
            CurrencyType:"",
            AfterHoursBonus:""
        
        }
    }

    refreshList(){
        fetch('http://localhost:5191/api/EmployeeSalary')
        .then(response=>response.json())
        .then(data=>{
            this.setState({employeesalary:data});
        });
    } 

    componentDidMount(){
        this.refreshList();
    }
    
    changeEmployeelId=(e)=>{
        this.setState({EmployeeId:e.target.value});
    }
    changeFirstName =(e)=>{
        this.setState({FirstName:e.target.value});
    }
    changeLastName =(e)=>{
        this.setState({LastName:e.target.value});
    }
    changeJobName =(e)=>{
        this.setState({JobName:e.target.value});
    }
    changeSalary =(e)=>{
        this.setState({Salary:e.target.value});
    }
    changeCurrencyType =(e)=>{
        this.setState({CurrencyType:e.target.value});
    }
    changeAfterHoursBonus =(e)=>{
        this.setState({AfterHoursBonus:e.target.value});
    }
    addClick(){
        this.setState({
            modalTitle:"Add Personal Data",       
            RowId:0,
            EmployeeId:"",
            FirstName:"",
            LastName:"",
            JobName:"",
            Salary:"",
            CurrencyType:"",
            AfterHoursBonus:""
        });
    }
    editClick(es){
        this.setState({
            modalTitle:"Edit Personal Data",
            RowId:es.ROW_ID,
            EmployeeId:es.EMPLOYEE_ID,
            FirstName:es.FIRST_NAME,
            LastName:es.LAST_NAME,
            JobName:es.JOB_NAME,
            Salary:es.SALARY,
            CurrencyType:es.CURRENCY_TYPE,
            AfterHoursBonus:es.AFTER_HOURS_BONUS
            
        });
    }

    createClick(){
        fetch('http://localhost:5191/api/EmployeeSalary',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmployeeId:this.state.EmployeeId,
                FirstName:this.state.FirstName,
                LastName:this.state.LastName,
                JobName:this.state.JobName,
                Salary:this.state.Salary,
                CurrencyType:this.state.CurrencyType,
                AfterHoursBonus:this.state.AfterHoursBonus
                
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }


    updateClick(){
        fetch('http://localhost:5191/api/EmployeeSalary',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                RowId:this.state.RowId,
                EmployeeId:this.state.EmployeeId,
                FirstName:this.state.FirstName,
                LastName:this.state.LastName,
                JobName:this.state.JobName,
                Salary:this.state.Salary,
                CurrencyType:this.state.CurrencyType,
                AfterHoursBonus:this.state.AfterHoursBonus
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(Id){
        if(window.confirm('Are you sure?')){
        fetch('http://localhost:5191/api/EmployeeSalary/'+Id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }

    render(){
        const {
            employeesalary,
            modalTitle,
            RowId,
            EmployeeId,
            Salary,
            FirstName,
            LastName,
            JobName,
            AfterHoursBonus,
            CurrencyType
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Employee Salary Data
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            <div className="d-flex flex-row">
            </div>
            RowId
        </th>
        <th>
        <div className="d-flex flex-row">
            </div>
            EmployeeId Id
      
        </th>
        <th>
            First Name
        </th>
        <th>
            Last Name
        </th>
        <th>
           Job Name
        </th>
        <th>
           Salary
        </th>
        <th>
            CurrencyType
        </th>
        <th>
            AfterHoursBonus
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
       
        {employeesalary.map(es=>
            <tr key={es.ROW_ID}>
                <td>{es.ROW_ID}</td>
                <td>{es.EMPLOYEE_ID}</td>
                <td>{es.FIRST_NAME}</td>
                <td>{es.LAST_NAME}</td>
                <td>{es.JOB_NAME}</td>
                <td>{es.SALARY}</td>
                <td>{es.CURRENCY_TYPE}</td>
                <td>{es.AFTER_HOURS_BONUS}</td>


                
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(es)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(es.ROW_ID)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>
    
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>

   <div className="modal-body">
       <div className="input-group mb-3">
        <span className="input-group-text">Employee Id</span>
        <input type="text" className="form-control"
        value={EmployeeId}
        onChange={this.changeEmployeelId}/>
       </div>
       

       <div className="input-group mb-3">
        <span className="input-group-text">First Name</span>
        <input type="text" className="form-control"
        value={FirstName}
        onChange={this.changeFirstName}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">Last Name</span>
        <input type="text" className="form-control"
        value={LastName}
        onChange={this.changeLastName}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">JobName</span>
        <input type="text" className="form-control"
        value={JobName}
        onChange={this.changeJobName}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">Salary</span>
        <input type="text" className="form-control"
        value={Salary}
        onChange={this.changeSalary}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">CurrencyType</span>
        <input type="text" className="form-control"
        value={CurrencyType}
        onChange={this.changeCurrencyType}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">AfterHoursBonus</span>
        <input type="text" className="form-control"
        value={AfterHoursBonus}
        onChange={this.changeAfterHoursBonus}/>
       </div>


        {RowId==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {RowId!=0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Update</button>
        :null}
   </div>

</div>
</div> 
</div>


</div>

        )
    
    }
}