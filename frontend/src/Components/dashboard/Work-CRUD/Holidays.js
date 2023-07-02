import React, { useState, useEffect } from 'react';
import useFetch from '../../../hooks/useFetch'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Holidays = () => {

    const { data: holidays, isLoading, error } = useFetch('https://localhost:7152/api/Holiday');


    const [modalTitle, setModalTitle] = useState('');

    const [id, setId] = useState();
    const [holidayType, setHolidayType] = useState('');
    const [holidayStartDate, setholidayStartDate] = useState('');
    const [holidayEndDate, setholidayEndDate] = useState('');

    const handleholidayTypeChange = (value) => {
        setHolidayType(value);
    }

    const handleholidayStartDateChange = (value) => {
        setholidayStartDate(value);
    }

    const handleholidayEndDateChange = (value) => {
        setholidayEndDate(value);
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

    const editClick = (ID, ht, hs, he) => {
        setId(ID);
        setHolidayType(ht)
        setholidayStartDate(hs)
        setholidayEndDate(he)
        setModalTitle('Update holiday');
        handleShow()
    }
    const addClick = () => {
        setModalTitle('Add new Holiday')
        handleShow()
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const infos = { holidayType, holidayStartDate, holidayEndDate };

        fetch('https://localhost:7152/api/Holiday', {
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

        const infos = { holidayType: holidayType, holidayStartDate: holidayStartDate, holidayEndDate: holidayEndDate };

        fetch('https://localhost:7152/api/Holiday/' + id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(infos)
        }).then(() => {
            console.log("updated")
        })
    }

    const handleDelete = (e) => {
        e.preventDefault();

        fetch('https://localhost:7152/api/Holiday/' + id, {
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
                    <h3>Holidays</h3>
                    <button className='bg-primary border-0 rounded p-2 text-white' onClick={addClick}>Add Holiday</button>
                </div>

                {/* Modal for Create and Update */}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form >
                            <div className="holiday-type">
                                <small>HolidayType: </small>
                                <input type="text" onChange={(e) => handleholidayTypeChange(e.target.value)} value={holidayType} name="holidayt" className="form-control" placeholder={modalTitle == 'Update holiday' ? holidayType : "Enter the holiday type"} />
                            </div>

                            <div className="start-date">
                                <small>Holiday Start Date: </small>
                                <input type="text" onChange={(e) => handleholidayStartDateChange(e.target.value)} value={holidayStartDate} name="holidays" className="form-control" placeholder={modalTitle == 'Update holiday' ? holidayStartDate : "Enter the holiday start date"} />
                            </div>

                            <div className="aend-date">
                                <small>Holiday End Date: </small>
                                <input type="text" onChange={(e) => handleholidayEndDateChange(e.target.value)} value={holidayEndDate} name="holidaye" className="form-control" placeholder={modalTitle == 'Update holiday' ? holidayEndDate : "Enter the holiday end date"} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        {modalTitle == 'Add new Holiday' ? <Button variant="primary" onClick={handleSubmit}>
                            Add Holiday
                        </Button> : <Button variant="primary" onClick={handleEdit}>
                            Update Holiday
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

                    {holidays &&

                        <section className='scroll-table mt-5'>
                            <table className='table table-bordered text-center'>
                                <thead>
                                    <tr>
                                        <th>Holiday Type</th>
                                        <th>Holiday Start Date</th>
                                        <th>Holiday End Date</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {holidays.map(hol => (
                                        <tr key={hol.Id}>
                                            <td>{hol.HolidayType}</td>
                                            <td>{hol.HolidayStartDate}</td>
                                            <td>{hol.HolidayEndDate}</td>

                                            <td><button className='btn btn-success' onClick={(e) => editClick(hol.Id, hol.HolidayType, hol.HolidayStartDate, hol.HolidayEndDate)}>Edit</button></td>
                                            <td><button className='btn btn-danger' onClick={(e) => handleShowD(hol.Id)}>Delete</button></td>
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

export default Holidays