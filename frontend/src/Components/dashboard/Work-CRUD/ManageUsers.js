import React, { useState, useEffect } from 'react';
import useFetch from '../../../hooks/useFetch'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ManageUsers = () => {

    const { data: users, isLoading, error } = useFetch('https://localhost:7152/api/ManageUsers');


    const [modalTitle, setModalTitle] = useState('');

    const [id, setId] = useState();
    const [passportNumber, setPassportNumber] = useState();
    const [phoneNumber, setPhonenumber] = useState();
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [workEmail, setWorkEmail] = useState('');
    const [fulltime, setFullTime] = useState('');
    const [isIntern, setIsIntern] = useState('');

    const handlePassportNChange = (value) => {
        setPassportNumber(value)
    }
    const handlePhoneNumberChange = (value) => {
        setPhonenumber(value)
    }
    const handleNameChange = (value) => {
        setName(value);
    }

    const handleLastNameChange = (value) => {
        setLastName(value);
    }

    const handleWorkEmailChange = (value) => {
        setWorkEmail(value);
    }

    const handleFullTimeChange = (value) => {
        setFullTime(value);
    }

    const handleIsInternChange = (value) => {
        setIsIntern(value);
    }

    const [show, setShow] = useState(false);
    const [showD, setShowD] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };

    const handleCloseD = () => setShowD(false);
    const handleShowD = (ID) => {
        setId(ID)
        setShowD(true)
    };

    const editClick = (ID,pn, p, n, ln, we, ft, it) => {
        setId(ID);
        setName(n)
        setLastName(ln)
        setFullTime(ft)
        setIsIntern(it)
        setPassportNumber(pn)
        setPhonenumber(p)
        setWorkEmail(we)
        setModalTitle('Update User');
        handleShow()
    }
    const addClick = () => {
        setModalTitle('Add new User')
        handleShow()
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const infos = { passportNumber: passportNumber, phoneNumber: phoneNumber, firstName: name, lastName: lastname, workEmail: workEmail, fullTime: fulltime, isIntern: isIntern };

        fetch('https://localhost:7152/api/ManageUsers', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(infos)
        }).then(() => {
            console.log("added")
            window.location.reload(true);
        })
    }

    const handleEdit = (e) => {
        e.preventDefault();

        const infos = { passportNumber: passportNumber, phoneNumber: phoneNumber, firstName: name, lastName: lastname, workEmail: workEmail, fullTime: fulltime, isIntern: isIntern };

        fetch('https://localhost:7152/api/ManageUsers/' + id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(infos)
        }).then(() => {
            console.log("updated")
            window.location.reload(true);
        })
    }

    const handleDelete = (e) => {
        e.preventDefault();

        fetch('https://localhost:7152/api/ManageUsers/' + id, {
            method: 'DELETE'
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Something went wrong')
                }
                window.location.reload(true);
            })
            .catch((e) => {
                console.log(e)
            });
    }

    return (
        <>
            <main className='mx-auto mt-5' style={{ width: "100%" }}>
                <div className='d-flex justify-content-between'>
                    <h3>Units</h3>
                    <button className='bg-primary border-0 rounded p-2 text-white' onClick={addClick}>Add New User</button>
                </div>

                {/* Modal for Create and Update */}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form >
                            <div>
                                <small>Passport Number: </small>
                                <input type="number" onChange={(e) => handlePassportNChange(e.target.value)} value={passportNumber} className="form-control" placeholder={modalTitle == 'Update User' ? passportNumber : "Enter the passport number"} />
                            </div>

                            <div>
                                <small>Phone Number: </small>
                                <input type="number" onChange={(e) => handlePhoneNumberChange(e.target.value)} value={phoneNumber} className="form-control" placeholder={modalTitle == 'Update User' ? phoneNumber : "Enter the phone number"} />
                            </div>

                            <div>
                                <small>Name: </small>
                                <input type="text" onChange={(e) => handleNameChange(e.target.value)} value={name} className="form-control" placeholder={modalTitle == 'Update User' ? name : "Enter the name"} />
                            </div>

                            <div>
                                <small>Last Name: </small>
                                <input type="text" onChange={(e) => handleLastNameChange(e.target.value)} value={lastname} className="form-control" placeholder={modalTitle == 'Update User' ? lastname : "Enter the lastname"} />
                            </div>

                            <div>
                                <small>Work Email: </small>
                                <input type="email" onChange={(e) => handleWorkEmailChange(e.target.value)} value={workEmail} className="form-control" placeholder={modalTitle == 'Update User' ? workEmail : "Enter the work email"} />
                            </div>

                            <div>
                                <small>Full time: </small>
                                <input type="text" onChange={(e) => handleFullTimeChange(e.target.value)} value={fulltime} className="form-control" placeholder={modalTitle == 'Update User' ? fulltime : "Enter full time"} />
                            </div>

                            <div>
                                <small>Is Intern: </small>
                                <input type="text" onChange={(e) => handleIsInternChange(e.target.value)} value={isIntern} className="form-control" placeholder={modalTitle == 'Update User' ? isIntern : "Enter isIntern"} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        {modalTitle == 'Add new User' ? <Button variant="primary" onClick={handleSubmit}>
                            Add User
                        </Button> : <Button variant="primary" onClick={handleEdit}>
                            Update User
                        </Button>}
                    </Modal.Footer>
                </Modal>

                {/* Delete Modal */}
                <Modal show={showD} onHide={handleCloseD}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseD}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Holiday Table */}
                <div>
                    {error && <div>{error}</div>}
                    {isLoading && <div>Loading...</div>}

                    {users &&

                        <section className='scroll-table mt-5'>
                            <table className='table table-bordered text-center'>
                                <thead>
                                    <tr>
                                        <th>Passport Number</th>
                                        <th>Phone Number</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Work Email</th>
                                        <th>Full Time</th>
                                        <th>Is Intern</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.Id}>
                                            <td>{user.PassportNumber}</td>
                                            <td>{user.PhoneNumber}</td>
                                            <td>{user.FirstName}</td>
                                            <td>{user.LastName}</td>
                                            <td>{user.WorkEmail}</td>
                                            <td>{user.FullTime}</td>
                                            <td>{user.IsIntern}</td>

                                            <td><button className='btn btn-success' onClick={(e) => editClick(user.Id, user.PassportNumber, user.PhoneNumber, user.FirstName, user.LastName, user.WorkEmail, user.FullTime, user.IsIntern)}>Edit</button></td>
                                            <td><button className='btn btn-danger' onClick={(e) => handleShowD(user.Id)}>Delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    }
                </div>
            </main>
        </>
    )
}

export default ManageUsers