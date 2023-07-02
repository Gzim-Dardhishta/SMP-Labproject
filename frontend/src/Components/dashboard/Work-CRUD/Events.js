import React, { useState, useEffect } from 'react';
import useFetch from '../../../hooks/useFetch'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Events = () => {

    const { data: events, isLoading, error } = useFetch('https://localhost:7152/api/Events');


    const [modalTitle, setModalTitle] = useState('');

    const [id, setId] = useState();
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventStartDate, setEventStartDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [status, setStatus] = useState('');

    const handleEventNameChange = (value) => {
        setEventName(value);
    }

    const handleEventDescriptionChange = (value) => {
        setEventDescription(value);
    }

    const handleEventStartDateChange = (value) => {
        setEventStartDate(value);
    }
    const handleEventEndDateChange = (value) => {
        setEventEndDate(value);
    }
    const handleStatusChange = (value) => {
        setStatus(value);
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

    const editClick = (ID, n, d, es, e, s) => {
        setId(ID);
        setEventName(n)
        setEventDescription(d)
        setEventStartDate(es)
        setEventEndDate(e)
        setStatus(s)
        setModalTitle('Update Event');
        handleShow()
    }
    const addClick = () => {
        setModalTitle('Add new Event')
        handleShow()
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const infos = { eventName, eventDescription, eventStartDate, eventEndDate, status };

        fetch('https://localhost:7152/api/Events', {
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

        const infos = { eventName: eventName, eventDescription: eventDescription, eventStartDate: eventStartDate, eventEndDate: eventEndDate, status: status };

        fetch('https://localhost:7152/api/Events/' + id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(infos)
        }).then(() => {
            console.log("updated")
        })
    }

    const handleDelete = (e) => {
        e.preventDefault();

        fetch('https://localhost:7152/api/Events/' + id, {
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
            <main className='mx-auto mt-5' style={{ width: "80%" }}>
                <div className='d-flex justify-content-between'>
                    <h3>Events</h3>
                    <button className='bg-primary border-0 rounded p-2 text-white' onClick={addClick}>Add Event</button>
                </div>

                {/* Modal for Create and Update */}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form >
                            <div className="holiday-type">
                                <small>Event Name: </small>
                                <input type="text" onChange={(e) => handleEventNameChange(e.target.value)} value={eventName} name="eventn" className="form-control" placeholder={modalTitle == 'Update Event' ? eventName : "Enter the event name"} />
                            </div>

                            <div className="start-date">
                                <small>Event Description: </small>
                                <input type="text" onChange={(e) => handleEventDescriptionChange(e.target.value)} value={eventDescription} name="eventd" className="form-control" placeholder={modalTitle == 'Update Event' ? eventDescription : "Enter the event description"} />
                            </div>

                            <div className="aend-date">
                                <small>Event Start Date: </small>
                                <input type="text" onChange={(e) => handleEventStartDateChange(e.target.value)} value={eventStartDate} name="events" className="form-control" placeholder={modalTitle == 'Update Event' ? eventStartDate : "Enter the event startdate"} />
                            </div>

                            <div className="aend-date">
                                <small>Event End Date: </small>
                                <input type="text" onChange={(e) => handleEventEndDateChange(e.target.value)} value={eventEndDate} name="eventd" className="form-control" placeholder={modalTitle == 'Update Event' ? eventEndDate : "Enter the event enddate"} />
                            </div>

                            <div className="aend-date">
                                <small>Event End Date: </small>
                                <input type="text" onChange={(e) => handleStatusChange(e.target.value)} value={status} name="status" className="form-control" placeholder={modalTitle == 'Update Event' ? status : "Enter the event status"} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        {modalTitle == 'Add new Event' ? <Button variant="primary" onClick={handleSubmit}>
                            Add Event
                        </Button> : <Button variant="primary" onClick={handleEdit}>
                            Update Event
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

                    {events &&

                        <section className='scroll-table mt-5'>
                            <table className='table table-bordered text-center'>
                                <thead>
                                    <tr>
                                        <th>Event Name</th>
                                        <th>Event Description</th>
                                        <th>Event Start Date</th>
                                        <th>Event End Date</th>
                                        <th>Event Status</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {events.map(ev => (
                                        <tr key={ev.Id}>
                                            <td>{ev.EventName}</td>
                                            <td>{ev.EventDescription}</td>
                                            <td>{ev.EventStartDate}</td>
                                            <td>{ev.EventEndDate}</td>
                                            <td>{ev.Status}</td>

                                            <td><button className='btn btn-success' onClick={(e) => editClick(ev.Id, ev.EventName, ev.EventDescription, ev.EventStartDate, ev.EventEndDate, ev.Status)}>Edit</button></td>
                                            <td><button className='btn btn-danger' onClick={(e) => handleShowD(ev.Id)}>Delete</button></td>
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

export default Events