import React, { useState, useEffect } from 'react';
import useFetch from '../../../hooks/useFetch'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const NewHires = () => {

    const { data: newHires, isLoading, error } = useFetch('https://localhost:7152/api/NewHires');


    const [modalTitle, setModalTitle] = useState('');

    const [id, setId] = useState();
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [dateJoined, setDateJoined] = useState();
    const [jobPosition, setJobPosition] = useState('');

    const handleNameChange = (value) => {
        setName(value);
    }

    const handleLastNameChange = (value) => {
        setLastname(value);
    }

    const handleDateJoinedChange = (value) => {
        setDateJoined(value);
    }
    const handleJobPositionChange = (value) => {
        setJobPosition(value);
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

    const editClick = (ID, n, l, dj, jp) => {
        setId(ID);
        setName(n)
        setLastname(l)
        setJobPosition(jp)
        setDateJoined(dj)
        setModalTitle('Update New Hire');
        handleShow()
    }
    const addClick = () => {
        setModalTitle('Add new Hires')
        handleShow()
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const infos = { name, lastname, dateJoined, jobPosition };

        fetch('https://localhost:7152/api/NewHires', {
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

        const infos = { name: name, lastName: lastname, dateJoined: dateJoined, jobPosition: jobPosition };

        fetch('https://localhost:7152/api/NewHires/' + id, {
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

        fetch('https://localhost:7152/api/NewHires/' + id, {
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
                    <button className='bg-primary border-0 rounded p-2 text-white' onClick={addClick}>Add New Hires</button>
                </div>

                {/* Modal for Create and Update */}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form >
                            <div>
                                <small>Name: </small>
                                <input type="text" onChange={(e) => handleNameChange(e.target.value)} value={name} className="form-control" placeholder={modalTitle == 'Update new Hire' ? name : "Enter the name"} />
                            </div>

                            <div>
                                <small>Last Name: </small>
                                <input type="text" onChange={(e) => handleLastNameChange(e.target.value)} value={lastname} className="form-control" placeholder={modalTitle == 'Update new Hire' ? lastname : "Enter the lastname"} />
                            </div>

                            <div>
                                <small>Date Joined: </small>
                                <input type="number" onChange={(e) => handleDateJoinedChange(e.target.value)} value={dateJoined} className="form-control" placeholder={modalTitle == 'Update new Hire' ? dateJoined : "Enter the date joined"} />
                            </div>

                            <div>
                                <small>Job Postion: </small>
                                <input type="text" onChange={(e) => handleJobPositionChange(e.target.value)} value={jobPosition} className="form-control" placeholder={modalTitle == 'Update new Hire' ? jobPosition : "Enter the job position"} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        {modalTitle == 'Add new Hires' ? <Button variant="primary" onClick={handleSubmit}>
                            Add New Hires
                        </Button> : <Button variant="primary" onClick={handleEdit}>
                            Update New Hires
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

                    {newHires &&

                        <section className='scroll-table mt-5'>
                            <table className='table table-bordered text-center'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Last Name</th>
                                        <th>Date Joined</th>
                                        <th>Job Position</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {newHires.map(nh => (
                                        <tr key={nh.Id}>
                                            <td>{nh.Name}</td>
                                            <td>{nh.LastName}</td>
                                            <td>{nh.DateJoined}</td>
                                            <td>{nh.JobPosition}</td>

                                            <td><button className='btn btn-success' onClick={(e) => editClick(nh.Id, nh.Name, nh.LastName, nh.DateJoined, nh.JobPosition)}>Edit</button></td>
                                            <td><button className='btn btn-danger' onClick={(e) => handleShowD(nh.Id)}>Delete</button></td>
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

export default NewHires