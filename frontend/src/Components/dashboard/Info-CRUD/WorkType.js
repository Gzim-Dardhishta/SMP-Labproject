import React, { useState, useEffect } from 'react';
import useFetch from '../../../hooks/useFetch'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const WorkType = () => {

    const { data: workTypes, isLoading, error } = useFetch('https://localhost:7152/api/WorkType');


    const [modalTitle, setModalTitle] = useState('');

    const [id, setId] = useState();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [typeOfWork, setTypeOfWork] = useState('');

    const handleNameChange = (value) => {
        setName(value);
    }

    const handleEmailChange = (value) => {
        setEmail(value);
    }

    const handleTypeOfWorkChange = (value) => {
        setTypeOfWork(value);
    }

    const [show, setShow] = useState(false);
    const [showD, setShowD] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (ID) => {
        setShow(true)
    };

    const handleCloseD = () => setShowD(false);
    const handleShowD = (ID) => {
        setId(ID)
        setShowD(true)
    };

    const editClick = (ID, n, e, tw) => {
        setId(ID);
        setName(n)
        setEmail(e)
        setTypeOfWork(tw)
        setModalTitle('Update TypeOfWork');
        handleShow()
    }
    const addClick = () => {
        setModalTitle('Add new TypeOfWork')
        handleShow()
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const infos = { name, email, typeOfWork };

        fetch('https://localhost:7152/api/WorkType', {
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

        const infos = { name: name, email: email, typeOfWork: typeOfWork };

        fetch('https://localhost:7152/api/WorkType/' + id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(infos)
        }).then(() => {
            console.log("updated")
        })
    }

    const handleDelete = (e) => {
        e.preventDefault();

        fetch('https://localhost:7152/api/WorkType/' + id, {
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
            <main className='mx-auto mt-5' style={{ width: "90%" }}>
                <div className='d-flex justify-content-between'>
                    <h3>Types Of Work</h3>
                    <button className='bg-primary border-0 rounded p-2 text-white' onClick={addClick}>Add A Type of Work</button>
                </div>

                {/* Modal for Create and Update */}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form >
                            <div className="holiday-type">
                                <small>Name: </small>
                                <input type="text" onChange={(e) => handleNameChange(e.target.value)} value={name} className="form-control" placeholder={modalTitle == 'Update TypeOfWork' ? name : "Enter the name"} />
                            </div>

                            <div className="start-date">
                                <small>Email: </small>
                                <input type="text" onChange={(e) => handleEmailChange(e.target.value)} value={email} className="form-control" placeholder={modalTitle == 'Update TypeOfWork' ? email : "Enter the email"} />
                            </div>

                            <div className="aend-date">
                                <small>Type of Work: </small>
                                <input type="text" onChange={(e) => handleTypeOfWorkChange(e.target.value)} value={typeOfWork} className="form-control" placeholder={modalTitle == 'Update TypeOfWork' ? typeOfWork : "Enter the type of work"} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        {modalTitle == 'Add new TypeOfWork' ? <Button variant="primary" onClick={handleSubmit}>
                        Add new TypeOfWork
                        </Button> : <Button variant="primary" onClick={handleEdit}>
                            Update TypeOfWork
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

                    {workTypes &&

                        <section className='scroll-table mt-5'>
                            <table className='table table-bordered text-center'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>TypeOfWork</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {workTypes.map(tw => (
                                        <tr key={tw.Id}>
                                            <td>{tw.Name}</td>
                                            <td>{tw.Email}</td>
                                            <td>{tw.TypeOfWork}</td>

                                            <td><button className='btn btn-success' onClick={(e) => editClick(tw.Id, tw.Name, tw.Email, tw.TypeOfWork)}>Edit</button></td>
                                            <td><button className='btn btn-danger' onClick={(e) => handleShowD(tw.Id)}>Delete</button></td>
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

export default WorkType