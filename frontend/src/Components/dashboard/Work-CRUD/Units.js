import React, { useState, useEffect } from 'react';
import useFetch from '../../../hooks/useFetch'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Units = () => {

    const { data: units, isLoading, error } = useFetch('https://localhost:7152/api/Units');


    const [modalTitle, setModalTitle] = useState('');

    const [id, setId] = useState();
    const [unitName, setUnitName] = useState('');
    const [unitDescription, setUnitDescription] = useState('');
    const [createdDate, setCreatedDate] = useState('');

    const handleUnitNameChange = (value) => {
        setUnitName(value);
    }

    const handleUnitDescriptionChange = (value) => {
        setUnitDescription(value);
    }

    const handleCreatedDateChange = (value) => {
        setCreatedDate(value);
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

    const editClick = (ID, n, ud, cd) => {
        setId(ID);
        setUnitName(n)
        setUnitDescription(ud)
        setCreatedDate(cd)
        setModalTitle('Update Unit');
        handleShow()
    }
    const addClick = () => {
        setModalTitle('Add new Unit')
        handleShow()
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const infos = { unitName, unitDescription, createdDate };

        fetch('https://localhost:7152/api/Units', {
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

        const infos = { unitName: unitName, unitDescription: unitDescription, createdDate: createdDate };

        fetch('https://localhost:7152/api/Units/' + id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(infos)
        }).then(() => {
            console.log("updated")
        })
    }

    const handleDelete = (e) => {
        e.preventDefault();

        fetch('https://localhost:7152/api/Units/' + id, {
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
                    <h3>Units</h3>
                    <button className='bg-primary border-0 rounded p-2 text-white' onClick={addClick}>Add Unit</button>
                </div>

                {/* Modal for Create and Update */}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form >
                            <div className="holiday-type">
                                <small>Unit Name: </small>
                                <input type="text" onChange={(e) => handleUnitNameChange(e.target.value)} value={unitName} className="form-control" placeholder={modalTitle == 'Update Unit' ? unitName : "Enter the unit name"} />
                            </div>

                            <div className="start-date">
                                <small>Unit Description: </small>
                                <input type="text" onChange={(e) => handleUnitDescriptionChange(e.target.value)} value={unitDescription} className="form-control" placeholder={modalTitle == 'Update Unit' ? unitDescription : "Enter the unit description"} />
                            </div>

                            <div className="aend-date">
                                <small>Created Date: </small>
                                <input type="text" onChange={(e) => handleCreatedDateChange(e.target.value)} value={createdDate} className="form-control" placeholder={modalTitle == 'Update Unit' ? createdDate : "Enter the created date"} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        {modalTitle == 'Add new Unit' ? <Button variant="primary" onClick={handleSubmit}>
                            Add Unit
                        </Button> : <Button variant="primary" onClick={handleEdit}>
                            Update Unit
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

                    {units &&

                        <section className='scroll-table mt-5'>
                            <table className='table table-bordered text-center'>
                                <thead>
                                    <tr>
                                        <th>Unit Name</th>
                                        <th>Unit Description</th>
                                        <th>Created Date</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {units.map(un => (
                                        <tr key={un.Id}>
                                            <td>{un.UnitName}</td>
                                            <td>{un.UnitDescription}</td>
                                            <td>{un.CreatedDate}</td>

                                            <td><button className='btn btn-success' onClick={(e) => editClick(un.Id, un.UnitName, un.UnitDescription, un.CreatedDate)}>Edit</button></td>
                                            <td><button className='btn btn-danger' onClick={(e) => handleShowD(un.Id)}>Delete</button></td>
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

export default Units