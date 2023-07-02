import React, { useState, useEffect } from 'react';
import useFetch from '../../../hooks/useFetch'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Countries = () => {

    const { data: countries, isLoading, error } = useFetch('https://localhost:7152/api/Countries');


    const [modalTitle, setModalTitle] = useState('');

    const [id, setId] = useState();
    const [name, setName] = useState('');
    const [iso, setISO] = useState('');

    const handleNameChange = (value) => {
        setName(value);
    }

    const handleIsoChange = (value) => {
        setISO(value);
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

    const editClick = (ID, n, iso) => {
        setId(ID);
        setName(n)
        setISO(iso)
        setModalTitle('Update Country');
        handleShow()
    }
    const addClick = () => {
        setModalTitle('Add new Country')
        handleShow()
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const infos = { name, iso };

        fetch('https://localhost:7152/api/Countries', {
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

        const infos = { name: name, iso: iso };

        fetch('https://localhost:7152/api/Countries/' + id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(infos)
        }).then(() => {
            console.log("updated")
        })
    }

    const handleDelete = (e) => {
        e.preventDefault();

        fetch('https://localhost:7152/api/Countries/' + id, {
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
                    <h3>Countries</h3>
                    <button className='bg-primary border-0 rounded p-2 text-white' onClick={addClick}>Add a new Country</button>
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
                                <input type="text" onChange={(e) => handleNameChange(e.target.value)} value={name} className="form-control" placeholder={modalTitle == 'Update Country' ? name : "Enter the name"} />
                            </div>

                            <div className="start-date">
                                <small>ISO: </small>
                                <input type="number" onChange={(e) => handleIsoChange(e.target.value)} value={iso} className="form-control" placeholder={modalTitle == 'Update Country' ? iso : "Enter the ISO"} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        {modalTitle == 'Add new Country' ? <Button variant="primary" onClick={handleSubmit}>
                            Add new Country
                        </Button> : <Button variant="primary" onClick={handleEdit}>
                            Update Country
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

                    {countries &&

                        <section className='scroll-table mt-5'>
                            <table className='table table-bordered text-center'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>ISO</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {countries.map((c) => (
                                        <tr key={c.ID}>
                                            <td>{c.NAME}</td>
                                            <td>{c.ISO}</td>

                                            <td><button className='btn btn-success' onClick={(e) => editClick(c.ID, c.NAME, c.ISO)}>Edit</button></td>
                                            <td><button className='btn btn-danger' onClick={(e) => handleShowD(c.ID)}>Delete</button></td>
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

export default Countries