import React, { useState, useEffect } from 'react';
import useFetch from '../../../hooks/useFetch'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Tasks = () => {

    const { data: tasks, isLoading, error } = useFetch('https://localhost:7152/api/Tasks');


    const [modalTitle, setModalTitle] = useState('');

    const [id, setId] = useState();
    const [taskType, setTaskType] = useState('');
    const [status, setStatus] = useState('');
    const [dueDate, setDueDate] = useState();

    const handleTaskTypeChange = (value) => {
        setTaskType(value);
    }

    const handleStatusChange = (value) => {
        setStatus(value);
    }

    const handleDueDateChange = (value) => {
        setDueDate(value);
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

    const editClick = (ID, tt, s, dd) => {
        setId(ID);
        setTaskType(tt)
        setStatus(s)
        setDueDate(dd)
        setModalTitle('Update Task');
        handleShow()
    }
    const addClick = () => {
        setModalTitle('Add new Task')
        handleShow()
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const infos = { taskType, status, dueDate };

        fetch('https://localhost:7152/api/Tasks', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(infos)
        }).then(() => {
            console.log("added")
            // window.location.reload(true);
        })
    }

    const handleEdit = (e) => {
        e.preventDefault();

        const infos = { taskType: taskType, status: status, dueDate: dueDate };

        fetch('https://localhost:7152/api/Tasks/' + id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(infos)
        }).then(() => {
            console.log("updated")
        })
    }

    const handleDelete = (e) => {
        e.preventDefault();

        fetch('https://localhost:7152/api/Tasks/' + id, {
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
                    <h3>Tasks</h3>
                    <button className='bg-primary border-0 rounded p-2 text-white' onClick={addClick}>Add a new Task</button>
                </div>

                {/* Modal for Create and Update */}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form >
                            <div className="holiday-type">
                                <small>Task Type: </small>
                                <input type="text" onChange={(e) => handleTaskTypeChange(e.target.value)} value={taskType} className="form-control" placeholder={modalTitle == 'Update Task' ? taskType : "Enter the task type"} />
                            </div>

                            <div className="start-date">
                                <small>Status: </small>
                                <input type="text" onChange={(e) => handleStatusChange(e.target.value)} value={status} className="form-control" placeholder={modalTitle == 'Update Task' ? status : "Enter the status"} />
                            </div>

                            <div className="aend-date">
                                <small>Due Date: </small>
                                <input type="text" onChange={(e) => handleDueDateChange(e.target.value)} value={dueDate} className="form-control" placeholder={modalTitle == 'Update Task' ? dueDate : "Enter the due date"} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        {modalTitle == 'Add new Task' ? <Button variant="primary" onClick={handleSubmit}>
                        Add new Task
                        </Button> : <Button variant="primary" onClick={handleEdit}>
                            Update Task
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

                    {tasks &&

                        <section className='scroll-table mt-5'>
                            <table className='table table-bordered text-center'>
                                <thead>
                                    <tr>
                                        <th>Task Type</th>
                                        <th>Status</th>
                                        <th>Due Date</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {tasks.map((t) => (
                                        <tr key={t.Id}>
                                            <td>{t.TaskType}</td>
                                            <td>{t.Status}</td>
                                            <td>{t.DueDate}</td>

                                            <td><button className='btn btn-success' onClick={(e) => editClick(t.Id, t.TaskType, t.Status, t.DueDate)}>Edit</button></td>
                                            <td><button className='btn btn-danger' onClick={(e) => handleShowD(t.Id)}>Delete</button></td>
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

export default Tasks