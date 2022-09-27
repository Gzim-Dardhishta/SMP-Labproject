import React,{Component, useState} from 'react';
import {variables} from './Variables.js';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import {Container} from 'react-bootstrap';

export class WorkAndProfession extends Component{
    
    
    constructor(props){
        super(props);

        this.state={
            workandprofession:[],
            modalTitle:"",
            RowId:0,
            Location:"",
            DivisionName:"",
            DepartmentName:"",
            UnitName:"",
            JobName:"",
            PersonalId:"",
            Email:"",
            TeamName:""
        }
    }

    refreshList(){
        fetch('http://localhost:5191/api/WorkAndProfession')
        .then(response=>response.json())
        .then(data=>{
            this.setState({workandprofession:data});
        });
    }
          

    componentDidMount(){
        this.refreshList();
    }
    
    changePersonalId =(e)=>{
        this.setState({PersonalId:e.target.value});
    }
    changeLocation =(e)=>{
        this.setState({Location:e.target.value});
    }
    changeDivisionId =(e)=>{
        this.setState({DivisionName:e.target.value});
    }
    changeJobId =(e)=>{
        this.setState({JobName:e.target.value});
    }
    changeDepartmentId =(e)=>{
        this.setState({DepartmentName:e.target.value});
    }
    changeUnitId =(e)=>{
        this.setState({UnitName:e.target.value});
    }
    changeEmail =(e)=>{
        this.setState({Email:e.target.value});
    }
    changeTeamId =(e)=>{
        this.setState({TeamName:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Work And profession Data",       
            RowId:0,
            Location:"",
            DivisionName:"",
            DepartmentName:"",
            UnitName:"",
            JobName:"",
            PersonalId:"",
            Email:"",
            TeamName:"",
        });
    }
    editClick(wp){
        this.setState({
            modalTitle:"Edit Personal Data",
            RowId:wp.ROW_ID,
            Location:wp.LOCATION,
            DivisionName:wp.DIVISION_NAME,
            DepartmentName:wp.DEPARTMENT_NAME,
            UnitName:wp.UNIT_NAME,
            JobName:wp.JOB_NAME,
            PersonalId:wp.PERSONAL_ID,
            Email:wp.EMAIL,
            TeamName:wp.TEAM_NAME
        });
    }

    createClick(){
        fetch('http://localhost:5191/api/WorkAndProfession',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
            Location:this.state.Location,
            DivisionName:this.state.DivisionName,
            DepartmentName:this.state.DepartmentName,
            UnitName:this.state.UnitName,
            JobName:this.state.JobName,
            PersonalId:this.state.PersonalId,
            Email:this.state.Email,
            TeamName:this.state.TeamName
                
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
        fetch('http://localhost:5191/api/WorkAndProfession',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                RowId:this.state.RowId,
                Location:this.state.Location,
                DivisionName:this.state.DivisionName,
                DepartmentName:this.state.DepartmentName,
                UnitName:this.state.UnitName,
                JobName:this.state.JobName,
                PersonalId:this.state.PersonalId,
                Email:this.state.Email,
                TeamName:this.state.TeamName
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
        fetch('http://localhost:5191/api/WorkAndProfession/'+Id,{
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
            workandprofession,
            modalTitle,
            RowId,
            Location,
            DivisionName,
            DepartmentName,
            UnitName,
            JobName,
            PersonalId,
            Email,
            TeamName

        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Work And profession Data
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
            PersonalId
      
        </th>
        <th>
            Location
        </th>
        <th>
            DivisionName
        </th>
        <th>
            DepartmentName
        </th>
        <th>
            UnitName
        </th>
        <th>
            JobName
        </th>
        <th>
            Email
        </th>
        <th>
            TeamName
        </th>
    </tr>
    </thead>
    <tbody>
       
        {workandprofession.map(wp=>
            <tr key={wp.ROW_ID}>
                <td>{wp.PERSONAL_ID}</td>
                <td>{wp.LOCATION}</td>
                <td>{wp.DIVISION_NAME}</td>
                <td>{wp.DEPARTMENT_NAME}</td>
                <td>{wp.UNIT_NAME}</td>
                <td>{wp.JOB_NAME}</td>
                <td>{wp.EMAIL}</td>
                <td>{wp.TEAM_NAME}</td>


                
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(wp)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(wp.ROW_ID)}>
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
        <span className="input-group-text">Personal Id</span>
        <input type="text" className="form-control"
        value={PersonalId}
        onChange={this.changePersonalId}/>
       </div>
       
       
       <div className="input-group mb-3">
        <span className="input-group-text">Location</span>
        <input type="text" className="form-control"
        value={Location}
        onChange={this.changeLocation}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">Division Name</span>
        <input type="text" className="form-control"
        value={DivisionName}
        onChange={this.changeDivisionId}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">Department Name</span>
        <input type="text" className="form-control"
        value={DepartmentName}
        onChange={this.changeDepartmentId}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">Unit Name</span>
        <input type="text" className="form-control"
        value={UnitName}
        onChange={this.changeUnitId}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">Job Name</span>
        <input type="text" className="form-control"
        value={JobName}
        onChange={this.changeJobId}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">Email</span>
        <input type="text" className="form-control"
        value={Email}
        onChange={this.changeEmail}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">TeamName</span>
        <input type="text" className="form-control"
        value={TeamName}
        onChange={this.changeTeamId}/>
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