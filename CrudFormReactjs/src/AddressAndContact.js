import React,{Component, useState} from 'react';
import {variables} from './Variables.js';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import {Container} from 'react-bootstrap';

export class AddressAndContact extends Component{
    
    
    constructor(props){
        super(props);

        this.state={
            addressandcontact:[],
            modalTitle:"",
            RowId:0,
            Address:"",
            WorkPhoneNumber:"",
            PrivatePhoneNumber:"",
            ZipCode:"",
            City:"",
            Country:"",
            PersonalEmail:"",
            EmployeeId:"",
        }
    }

    refreshList(){
        fetch('http://localhost:5191/api/AddressAndContact')
        .then(response=>response.json())
        .then(data=>{
            this.setState({addressandcontact:data});
        });
    }
          

    componentDidMount(){
        this.refreshList();
    }
    
    changeEmployeeId =(e)=>{
        this.setState({EmployeeId:e.target.value});
    }
    changeAddress =(e)=>{
        this.setState({Address:e.target.value});
    }
    changeWorkPhoneNumber =(e)=>{
        this.setState({WorkPhoneNumber:e.target.value});
    }
    changePrivatePhoneNumber =(e)=>{
        this.setState({PrivatePhoneNumber:e.target.value});
    }
    changeZipCode =(e)=>{
        this.setState({ZipCode:e.target.value});
    }
    changeCity =(e)=>{
        this.setState({City:e.target.value});
    }
    changeCountry=(e)=>{
        this.setState({Country:e.target.value});
    }
    changePersonalEmail=(e)=>{
        this.setState({PersonalEmail:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Address and Contact ",       
            RowId:0,
            Address:"",
            WorkPhoneNumber:"",
            PrivatePhoneNumber:"",
            ZipCode:"",
            City:"",
            Country:"",
            PersonalEmail:"",
            EmployeeId:"",
        });
    }
    editClick(ad){
        this.setState({
            modalTitle:"Edit Address and Contact",
            RowId:ad.ROW_ID,
            Address:ad.ADDRESS,
            WorkPhoneNumber:ad.WORK_PHONE_NUMBER,
            PrivatePhoneNumber:ad.PRIVATE_PHONE_NUMBER,
            ZipCode:ad.ZIP_CODE,
            City:ad.CITY,
            Country:ad.COUNTRY,
            PersonalEmail:ad.PERSONAL_EMAIL,
            EmployeeId:ad.EMPLOYEE_ID
        });
    }

    createClick(){
        fetch('http://localhost:5191/api/AddressAndContact',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Address:this.state.Address,
                WorkPhoneNumber:this.state.WorkPhoneNumber,
                PrivatePhoneNumber:this.state.PrivatePhoneNumber,
                ZipCode:this.state.ZipCode,
                City:this.state.City,
                Country:this.state.Country,
                PersonalEmail:this.state.PersonalEmail,
                EmployeeId:this.state.EmployeeId
                
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
        fetch('http://localhost:5191/api/AddressAndContact/',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                RowId:this.state.RowId,
                Address:this.state.Address,
                WorkPhoneNumber:this.state.WorkPhoneNumber,
                PrivatePhoneNumber:this.state.PrivatePhoneNumber,
                ZipCode:this.state.ZipCode,
                City:this.state.City,
                Country:this.state.Country,
                PersonalEmail:this.state.PersonalEmail,
                EmployeeId:this.state.EmployeeId
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
        fetch('http://localhost:5191/api/AddressAndContact/'+Id,{
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
            modalTitle,
            addressandcontact,
            RowId,
            Address,
            WorkPhoneNumber,
            PrivatePhoneNumber,
            ZipCode,
            City,
            Country,
            PersonalEmail,
            EmployeeId
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Address And Contact
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
            EmployeeId
      
        </th>
        <th>
            Address
        </th>
        <th>
           WorkPhoneNumber
        </th>
        <th>
            PrivatePhoneNumber
        </th>
        <th>
            ZipCode
        </th>
        <th>
            City
        </th>
        <th>
            Country
        </th>
        <th>
            PersonalEmail
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
       
        {addressandcontact.map(ad=>
            <tr key={ad.ROW_ID}>
                <td>{ad.ROW_ID}</td>
                <td>{ad.EMPLOYEE_ID}</td>
                <td>{ad.ADDRESS}</td>
                <td>{ad.WORK_PHONE_NUMBER}</td>
                <td>{ad.PRIVATE_PHONE_NUMBER}</td>
                <td>{ad.ZIP_CODE}</td>
                <td>{ad.CITY}</td>
                <td>{ad.COUNTRY}</td>
                <td>{ad.PERSONAL_EMAIL}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(ad)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(ad.ROW_ID)}>
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
        <span className="input-group-text">EmployeeId</span>
        <input type="text" className="form-control"
        value={EmployeeId}
        onChange={this.changeEmployeeId}/>
       </div>
       
       
       <div className="input-group mb-3">
        <span className="input-group-text">Address</span>
        <input type="text" className="form-control"
        value={Address}
        onChange={this.changeAddress}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">WorkPhoneNumber</span>
        <input type="text" className="form-control"
        value={WorkPhoneNumber}
        onChange={this.changeWorkPhoneNumber}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">PrivatePhoneNumber</span>
        <input type="text" className="form-control"
        value={PrivatePhoneNumber}
        onChange={this.changePrivatePhoneNumber}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">ZipCode</span>
        <input type="text" className="form-control"
        value={ZipCode}
        onChange={this.changeZipCode}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">City</span>
        <input type="text" className="form-control"
        value={City}
        onChange={this.changeCity}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">Country</span>
        <input type="text" className="form-control"
        value={Country}
        onChange={this.changeCountry}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">PersonalEmail</span>
        <input type="text" className="form-control"
        value={PersonalEmail}
        onChange={this.changePersonalEmail}/>
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