import React, { useState, useEffect } from 'react';
import useFetch from '../../../hooks/useFetch'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const WorkProfession = () => {

    const { data: workprofession, isLoading, error } = useFetch('https://localhost:7152/api/WorkAndProfession');


    const [modalTitle, setModalTitle] = useState('');

    const [id, setId] = useState();
    const [location, setLocation] = useState('');
    const [divisionName, setDivisionName] = useState('');
    const [departmentName, setDepartmentName] = useState('');
    const [unitName, setUnitName] = useState('');
    const [jobName, setJobName] = useState('');
    const [personalId, setPersonalId] = useState();
    const [email, setEmail] = useState('');
    const [teamName, setTeamName] = useState('');

    const handleLocationChange = (value) => {
        setLocation(value);
    }

    const handleDivisionNameChange = (value) => {
        setDivisionName(value);
    }

    const handleDepartmentNameChange = (value) => {
        setDepartmentName(value);
    }

    const handleUnitNameChange = (value) => {
        setUnitName(value);
    }
    const handleJobNameChange = (value) => {
        setJobName(value);
    }
    const handlePersonalIdChange = (value) => {
        setPersonalId(value);
    }
    const handleEmailChange = (value) => {
        setEmail(value);
    }

    const handleTeamNameChange = (value) => {
        setTeamName(value);
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

    const editClick = (ID, l, div, dep, un, jn, pid, e, tn) => {
        setId(ID);
        setLocation(l)
        setDepartmentName(dep)
        setDivisionName(div)
        setEmail(e)
        setJobName(jn)
        setPersonalId(pid)
        setTeamName(tn)
        setUnitName(un)
        setModalTitle('Update Work Profession');
        handleShow()
    }
    const addClick = () => {
        setModalTitle('Add WorkProfession')
        handleShow()
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const infos = { location, divisionName, departmentName, unitName, jobName, personalId, email, teamName };

        fetch('https://localhost:7152/api/WorkAndProfession', {
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

        const infos = { location: location, divisionName: divisionName, departmentName: departmentName, unitName: unitName, jobName: jobName, personalId: personalId, email: email, teamName:teamName };

        fetch('https://localhost:7152/api/WorkAndProfession/' + id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(infos)
        }).then(() => {
            console.log("updated")
        })
    }

    const handleDelete = (e) => {
        e.preventDefault();

        fetch('https://localhost:7152/api/WorkAndProfession/' + id, {
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
                    <h3>Work And Profession</h3>
                    <button className='bg-primary border-0 rounded p-2 text-white' onClick={addClick}>Add WorkProfession</button>
                </div>

                {/* Modal for Create and Update */}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form >
                            <div>
                                <small>Location: </small>
                                <input type="text" onChange={(e) => handleLocationChange(e.target.value)} value={location} className="form-control" placeholder={modalTitle == 'Update Work Profession' ? location : "Enter the location"} />
                            </div>

                            <div>
                                <small>DivisionName: </small>
                                <input type="text" onChange={(e) => handleDivisionNameChange(e.target.value)} value={divisionName} className="form-control" placeholder={modalTitle == 'Update Work Profession' ? divisionName : "Enter the division name"} />
                            </div>

                            <div>
                                <small>Department Name: </small>
                                <input type="text" onChange={(e) => handleDepartmentNameChange(e.target.value)} value={departmentName} name="holidaye" className="form-control" placeholder={modalTitle == 'Update Work Profession' ? departmentName : "Enter the departemnt name"} />
                            </div>

                            <div>
                                <small>Unit Name: </small>
                                <input type="text" onChange={(e) => handleUnitNameChange(e.target.value)} value={unitName} className="form-control" placeholder={modalTitle == 'Update Work Profession' ? unitName : "Enter the unit name"} />
                            </div>

                            <div>
                                <small>Job Name: </small>
                                <input type="text" onChange={(e) => handleJobNameChange(e.target.value)} value={jobName} className="form-control" placeholder={modalTitle == 'Update Work Profession' ? jobName : "Enter the job name"} />
                            </div>

                            <div>
                                <small>Personal Id: </small>
                                <input type="number" onChange={(e) => handlePersonalIdChange(e.target.value)} value={personalId} className="form-control" placeholder={modalTitle == 'Update Work Profession' ? personalId : "Enter the personal ID"} />
                            </div>

                            <div>
                                <small>Email: </small>
                                <input type="text" onChange={(e) => handleEmailChange(e.target.value)} value={email} className="form-control" placeholder={modalTitle == 'Update Work Profession' ? email : "Enter the email"} />
                            </div>

                            <div>
                                <small>Team Name: </small>
                                <input type="text" onChange={(e) => handleTeamNameChange(e.target.value)} value={teamName} className="form-control" placeholder={modalTitle == 'Update Work Profession' ? teamName : "Enter the team name"} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        {modalTitle == 'Add WorkProfession' ? <Button variant="primary" onClick={handleSubmit}>
                            Add WorkProfession
                        </Button> : <Button variant="primary" onClick={handleEdit}>
                            Update WorkProfession
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

                    {workprofession &&

                        <section className='scroll-table mt-5'>
                            <table className='table table-bordered text-center'>
                                <thead>
                                    <tr>
                                        <th>Location</th>
                                        <th>Division Name</th>
                                        <th>Department Name</th>
                                        <th>Unit Name</th>
                                        <th>Job Name</th>
                                        <th>Personal Id</th>
                                        <th>email</th>
                                        <th>Team Name</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {workprofession.map(wp => (
                                        <tr key={wp.Id}>
                                            <td>{wp.Location}</td>
                                            <td>{wp.DivisionName}</td>
                                            <td>{wp.DepartmentName}</td>
                                            <td>{wp.UnitName}</td>
                                            <td>{wp.JobName}</td>
                                            <td>{wp.PersonalId}</td>
                                            <td>{wp.Email}</td>
                                            <td>{wp.TeamName}</td>

                                            <td><button className='btn btn-success' onClick={(e) => editClick(wp.Id,wp.Location, wp.DivisionName, wp.DepartmentName, wp.UnitName, wp.JobName, wp.PersonalId, wp.Email, wp.TeamName)}>Edit</button></td>
                                            <td><button className='btn btn-danger' onClick={(e) => handleShowD(wp.Id)}>Delete</button></td>
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

export default WorkProfession