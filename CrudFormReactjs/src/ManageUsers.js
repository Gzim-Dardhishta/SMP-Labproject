import React,{Component, useState} from 'react';
import {variables} from './Variables.js';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import {Container} from 'react-bootstrap';

export class ManageUsers extends Component{
    
    
    constructor(props){
        super(props);

        this.state={
            personaldata:[],
            modalTitle:"",
            RowId:0,
            PersonalId:"",
            PassportNumber:"",
            PhoneNumber:"",
            FirstName:"",
            LastName:"",
            WorkEmail:"",
            PersonalEmail:"",
            DateOfBirth:"",
            StateOfBirth:"",
            BirthPlace:"",
            Gender:"",
            Nationality:"",
            MartialStatus:"",
            RowIdFilter:"",
            PassportNumberFilter:"",
            FullTime:0,
            IsIntern:0,
            personaldatawithoutfilter:[]
        }
    }

    refreshList(){
        fetch('http://localhost:5191/api/PersonalData')
        .then(response=>response.json())
        .then(data=>{
            this.setState({personaldata:data,personaldatawithoutfilter:data});
        });
    }
          

    componentDidMount(){
        this.refreshList();
    }
    
    changePersonalId =(e)=>{
        this.setState({PersonalId:e.target.value});
    }
    changePassportNumber =(e)=>{
        this.setState({PassportNumber:e.target.value});
    }
    changeFirstName =(e)=>{
        this.setState({FirstName:e.target.value});
    }
    changeLastName =(e)=>{
        this.setState({LastName:e.target.value});
    }
    changeWorkEmail =(e)=>{
        this.setState({WorkEmail:e.target.value});
    }
    changePersonalEmail =(e)=>{
        this.setState({PersonalEmail:e.target.value});
    }
    changeDateOfBirth =(e)=>{
        this.setState({DateOfBirth:e.target.value});
    }
    changeStateOfBirth =(e)=>{
        this.setState({StateOfBirth:e.target.value});
    }
    changeBirthPlace =(e)=>{
        this.setState({BirthPlace:e.target.value});
    }
    changeGender =(e)=>{
        this.setState({Gender:e.target.value});
    }
    changeNationality =(e)=>{
        this.setState({Nationality:e.target.value});
    }
    changeMartialStatus =(e)=>{
        this.setState({MartialStatus:e.target.value});
    }
    changeIsIntern =(e)=>{
        this.setState({IsIntern:e.target.value});
    }
    changeFullTime =(e)=>{
        this.setState({FullTime:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Personal Data",       
            RowId:0,
            PersonalId:"",
            PassportNumber:"",
            FirstName:"",
            LastName:"",
            WorkEmail:"",
            PersonalEmail:"",
            DateOfBirth:"",
            StateOfBirth:"",
            BirthPlace:"",
            Gender:"",
            Nationality:"",
            MartialStatus:"",
            IsIntern:"",
            FullTime:""
        });
    }
    editClick(pd){
        this.setState({
            modalTitle:"Edit Personal Data",
            RowId:pd.ROW_ID,
            PersonalId:pd.PERSONAL_ID,
            PassportNumber:pd.PASSPORT_NUMBER,
            FirstName:pd.FIRST_NAME,
            LastName:pd.LAST_NAME,
            WorkEmail:pd.WORK_EMAIL,
            PersonalEmail:pd.PERSONAL_EMAIL,
            DateOfBirth:pd.DATE_OF_BIRTH,
            StateOfBirth:pd.STATE_OF_BIRTH,
            BirthPlace:pd.BIRTH_PLACE,
            Gender:pd.GENDER,
            Nationality:pd.NATIONALITY,
            MartialStatus:pd.MARTIAL_STATUS,
            FullTime:pd.FULL_TIME,
            IsIntern:pd.IS_INTERN
        });
    }

    createClick(){
        fetch('http://localhost:5191/api/PersonalData',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                PersonalId:this.state.PersonalId,
                PassportNumber:this.state.PassportNumber,
                FirstName:this.state.FirstName,
                LastName:this.state.LastName,
                WorkEmail:this.state.WorkEmail,
                PersonalEmail:this.state.PersonalEmail,
                DateOfBirth:this.state.DateOfBirth,
                StateOfBirth:this.state.StateOfBirth,
                BirthPlace:this.state.BirthPlace,
                Gender:this.state.Gender,
                Nationality:this.state.Nationality,
                MartialStatus:this.state.MartialStatus,
                FullTime:this.state.FullTime,
                IsIntern:this.state.IsIntern
                
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
        fetch('http://localhost:5191/api/PersonalData',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                PersonalId:this.state.PersonalId,
                PassportNumber:this.state.PassportNumber,
                FirstName:this.state.FirstName,
                LastName:this.state.LastName,
                WorkEmail:this.state.WorkEmail,
                PersonalEmail:this.state.PersonalEmail,
                DateOfBirth:this.state.DateOfBirth,
                StateOfBirth:this.state.StateOfBirth,
                BirthPlace:this.state.BirthPlace,
                Gender:this.state.Gender,
                Nationality:this.state.Nationality,
                MartialStatus:this.state.MartialStatus,
                FullTime:0,
                IsIntern:0
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
        fetch('http://localhost:5191/api/PersonalData/'+Id,{
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
            personaldata,
            modalTitle,
            RowId,
            PersonalId,
            FirstName,
            LastName,
            WorkEmail,
            IsIntern,
            FullTime
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Personal Data
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
            Personal Id
      
        </th>
        <th>
            First Name
        </th>
        <th>
            Last Name
        </th>
        <th>
            Work Email
        </th>
        <th>
            Intern
        </th>
        <th>
            FullTime
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
       
        {personaldata.map(pd=>
            <tr key={pd.ROW_ID}>
                <td>{pd.ROW_ID}</td>
                <td>{pd.PERSONAL_ID}</td>
                <td>{pd.FIRST_NAME}</td>
                <td>{pd.LAST_NAME}</td>
                <td>{pd.WORK_EMAIL}</td>
                <td>{pd.IS_INTERN}</td>
                <td>{pd.FULL_TIME}</td>
               


                
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(pd)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(pd.ROW_ID)}>
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
        <span className="input-group-text">WorkEmail</span>
        <input type="text" className="form-control"
        value={WorkEmail}
        onChange={this.changeWorkEmail}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">IsIntern</span>
        <input type="text" className="form-control"
        value={IsIntern}
        onChange={this.changeIsIntern}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">FullTime</span>
        <input type="text" className="form-control"
        value={FullTime}
        onChange={this.changeFullTime}/>
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