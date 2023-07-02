import React, { useState, useEffect } from 'react';
import useFetch from '../../../hooks/useFetch'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Department = () => {

    const { data: departments, isLoading, error } = useFetch('https://localhost:7152/api/Department');


    const [modalTitle, setModalTitle] = useState('');

    const [id, setId] = useState();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const handleNameChange = (value) => {
        setName(value);
    }

    const handleDescriptionChange = (value) => {
        setDescription(value);
    }

    const handleLocationChange = (value) => {
        setLocation(value);
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

    const editClick = (ID, n, l, d) => {
        setId(ID);
        setName(n)
        setDescription(d)
        setLocation(l)
        setModalTitle('Update Department');
        handleShow()
    }
    const addClick = () => {
        setModalTitle('Add new Department')
        handleShow()
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const infos = { name, location, description };

        fetch('https://localhost:7152/api/Department', {
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

        const infos = { name: name, location: location, description: description };

        fetch('https://localhost:7152/api/Department/' + id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(infos)
        }).then(() => {
            console.log("updated")
        })
    }

    const handleDelete = (e) => {
        e.preventDefault();

        fetch('https://localhost:7152/api/Department/' + id, {
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
                    <h3>Department</h3>
                    <button className='bg-primary border-0 rounded p-2 text-white' onClick={addClick}>Add Department</button>
                </div>

                {/* Modal for Create and Update */}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form >
                            <div className="holiday-type">
                                <small>Department Name: </small>
                                <input type="text" onChange={(e) => handleNameChange(e.target.value)} value={name} className="form-control" placeholder={modalTitle == 'Update Department' ? name : "Enter the department name"} />
                            </div>

                            <div className="start-date">
                                <small>Department Location: </small>
                                <input type="text" onChange={(e) => handleLocationChange(e.target.value)} value={location} className="form-control" placeholder={modalTitle == 'Update Department' ? location : "Enter the department location"} />
                            </div>

                            <div className="aend-date">
                                <small>Department Description: </small>
                                <input type="text" onChange={(e) => handleDescriptionChange(e.target.value)} value={description} className="form-control" placeholder={modalTitle == 'Update Department' ? description : "Enter the department description"} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        {modalTitle == 'Add new Department' ? <Button variant="primary" onClick={handleSubmit}>
                            Add Department
                        </Button> : <Button variant="primary" onClick={handleEdit}>
                            Update Department
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

                    {departments &&

                        <section className='scroll-table mt-5'>
                            <table className='table table-bordered text-center'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Location</th>
                                        <th>Description</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {departments.map(d => (
                                        <tr key={d.ID}>
                                            <td>{d.Name}</td>
                                            <td>{d.Location}</td>
                                            <td>{d.Description}</td>

                                            <td><button className='btn btn-success' onClick={(e) => editClick(d.ID, d.Name, d.Location, d.Description)}>Edit</button></td>
                                            <td><button className='btn btn-danger' onClick={(e) => handleShowD(d.Id)}>Delete</button></td>
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

export default Department