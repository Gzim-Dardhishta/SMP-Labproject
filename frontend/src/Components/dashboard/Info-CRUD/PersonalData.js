import React, { useState, useEffect } from 'react';
import useFetch from '../../../hooks/useFetch'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const PersonalData = () => {

    const { data: personalData, isLoading, error } = useFetch('https://localhost:7152/api/PersonalData');

    const [modalTitle, setModalTitle] = useState('');

    const [id, setId] = useState();
    const [personalId, setPersonalId] = useState();
    const [passportNumber, setPassportNumber] = useState();
    const [phoneNumber, setPhonenumber] = useState();
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [workEmail, setWorkEmail] = useState('');
    const [personalEmail, setPersonalEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState()
    const [stateOfBirth, setStateOfBirth] = useState()
    const [birthPlace, setBirthPlace] = useState()
    const [gender, setGender] = useState()
    const [nationality, setNationality] = useState()
    const [martialStatus, setMartialStatus] = useState()
    const [fulltime, setFullTime] = useState('');
    const [isIntern, setIsIntern] = useState('');

    const handlePersonaIDChange = (value) => {
        setPersonalId(value)
    }
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
    const handlePersonalEmailChange = (value) => {
        setPersonalEmail(value);
    }
    const handleDateOfBirthChange = (value) => {
        setDateOfBirth(value);
    }
    const handleStateOfBirthChange = (value) => {
        setStateOfBirth(value);
    }
    const handleBirthPlaceChange = (value) => {
        setBirthPlace(value);
    }
    const handleNationalityChange = (value) => {
        setNationality(value);
    }
    const handleGenderChange = (value) => {
        setGender(value);
    }
    const handleMartialStatusChange = (value) => {
        setMartialStatus(value);
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

    const editClick = (ID, pid, pn, p, n, ln, we, pm, db, sb, bp, g, nat, ms, ft, it) => {
        setId(ID);
        setName(n)
        setLastName(ln)
        setFullTime(ft)
        setIsIntern(it)
        setPassportNumber(pn)
        setPhonenumber(p)
        setWorkEmail(we)
        setPersonalEmail(pm)
        setBirthPlace(bp)
        setStateOfBirth(sb)
        setDateOfBirth(db)
        setGender(g)
        setNationality(nat)
        setPersonalId(pid)
        setMartialStatus(ms)
        setModalTitle('Update Data');
        handleShow()
    }
    const addClick = () => {
        setModalTitle('Add Persoanal Data')
        handleShow()
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const infos = { 
            passportNumber: passportNumber, 
            phoneNumber: phoneNumber, 
            firstName: name, 
            lastName: lastname, 
            workEmail: workEmail, 
            personalEmail: personalEmail,
            personalId: personalId,
            dateOfBirth: dateOfBirth,
            stateOfBirth: stateOfBirth,
            birthPlace: birthPlace,
            gender: gender,
            nationality: nationality,
            martialStatus: martialStatus,
            fullTime: fulltime, 
            isIntern: isIntern 
        };

        fetch('https://localhost:7152/api/PersonalData', {
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

        const infos = { 
            personalId: personalId,
            passportNumber: passportNumber, 
            phoneNumber: phoneNumber, 
            firstName: name, 
            lastName: lastname, 
            workEmail: workEmail, 
            personalEmail: personalEmail,
            dateOfBirth: dateOfBirth,
            stateOfBirth: stateOfBirth,
            birthPlace: birthPlace,
            gender: gender,
            nationality: nationality,
            martialStatus: martialStatus,
            fullTime: fulltime, 
            isIntern: isIntern 
        };

        fetch('https://localhost:7152/api/PersonalData/' + id, {
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

        fetch('https://localhost:7152/api/PersonalData/' + id, {
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
                    <h3>Personal Data</h3>
                    <button className='bg-primary border-0 rounded p-2 text-white' onClick={addClick}>Add Personal Data</button>
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
                                <input type="number" onChange={(e) => handlePassportNChange(e.target.value)} value={passportNumber} className="form-control" placeholder={modalTitle == 'Update Data' ? passportNumber : "Enter the passport number"} />
                            </div>

                            <div>
                                <small>Phone Number: </small>
                                <input type="number" onChange={(e) => handlePhoneNumberChange(e.target.value)} value={phoneNumber} className="form-control" placeholder={modalTitle == 'Update Data' ? phoneNumber : "Enter the phone number"} />
                            </div>

                            <div>
                                <small>Personal ID: </small>
                                <input type="number" onChange={(e) => handlePersonaIDChange(e.target.value)} value={personalId} className="form-control" placeholder={modalTitle == 'Update Data' ? personalId : "Enter the perosnal ID"} />
                            </div>

                            <div>
                                <small>Name: </small>
                                <input type="text" onChange={(e) => handleNameChange(e.target.value)} value={name} className="form-control" placeholder={modalTitle == 'Update Data' ? name : "Enter the name"} />
                            </div>

                            <div>
                                <small>Last Name: </small>
                                <input type="text" onChange={(e) => handleLastNameChange(e.target.value)} value={lastname} className="form-control" placeholder={modalTitle == 'Update Data' ? lastname : "Enter the lastname"} />
                            </div>

                            <div>
                                <small>Work Email: </small>
                                <input type="email" onChange={(e) => handleWorkEmailChange(e.target.value)} value={workEmail} className="form-control" placeholder={modalTitle == 'Update Data' ? workEmail : "Enter the work email"} />
                            </div>

                            <div>
                                <small>Personal Email: </small>
                                <input type="email" onChange={(e) => handlePersonalEmailChange(e.target.value)} value={personalEmail} className="form-control" placeholder={modalTitle == 'Update Data' ? personalEmail : "Enter the personal email"} />
                            </div>

                            <div>
                                <small>Gender: </small>
                                <input type="text" onChange={(e) => handleGenderChange(e.target.value)} value={gender} className="form-control" placeholder={modalTitle == 'Update Data' ? gender : "Enter the gender"} />
                            </div>

                            <div>
                                <small>Nationality: </small>
                                <input type="text" onChange={(e) => handleNationalityChange(e.target.value)} value={nationality} className="form-control" placeholder={modalTitle == 'Update Data' ? nationality : "Enter the lastname"} />
                            </div>

                            <div>
                                <small>Birth Date: </small>
                                <input type="number" onChange={(e) => handleDateOfBirthChange(e.target.value)} value={dateOfBirth} className="form-control" placeholder={modalTitle == 'Update Data' ? dateOfBirth : "Enter the date of birth"} />
                            </div>

                            <div>
                                <small>Birth Place: </small>
                                <input type="text" onChange={(e) => handleBirthPlaceChange(e.target.value)} value={birthPlace} className="form-control" placeholder={modalTitle == 'Update Data' ? birthPlace : "Enter the birth place"} />
                            </div>

                            <div>
                                <small>State of Birth: </small>
                                <input type="text" onChange={(e) => handleStateOfBirthChange(e.target.value)} value={stateOfBirth} className="form-control" placeholder={modalTitle == 'Update Data' ? stateOfBirth : "Enter the state of birth"} />
                            </div>

                            <div>
                                <small>Martial Status: </small>
                                <input type="text" onChange={(e) => handleMartialStatusChange(e.target.value)} value={martialStatus} className="form-control" placeholder={modalTitle == 'Update Data' ? martialStatus : "Enter the martial status"} />
                            </div>

                            <div>
                                <small>Full time: </small>
                                <input type="text" onChange={(e) => handleFullTimeChange(e.target.value)} value={fulltime} className="form-control" placeholder={modalTitle == 'Update Data' ? fulltime : "Enter full time"} />
                            </div>

                            <div>
                                <small>Is Intern: </small>
                                <input type="text" onChange={(e) => handleIsInternChange(e.target.value)} value={isIntern} className="form-control" placeholder={modalTitle == 'Update User' ? isIntern : "Enter isIntern"} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        {modalTitle == 'Add Persoanal Data' ? <Button variant="primary" onClick={handleSubmit}>
                            Add Personal Data
                        </Button> : <Button variant="primary" onClick={handleEdit}>
                            Update Data
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

                    {personalData &&

                        <section className='scroll-table mt-5'>
                            <table className='table table-bordered text-center'>
                                <thead>
                                    <tr>
                                        <th>Perosnal ID</th>
                                        <th>Passport Number</th>
                                        <th>Phone Number</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Work Email</th>
                                        <th>Personal Email</th>
                                        <th>Date of Birth</th>
                                        <th>State of Birth</th>
                                        <th>Birth Place</th>
                                        <th>Gender</th>
                                        <th>Nationality</th>
                                        <th>Martial Status</th>
                                        <th>Full Time</th>
                                        <th>Is Intern</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {personalData.map(pd => (
                                        <tr key={pd.Id}>
                                            <td>{pd.PersonalId}</td>
                                            <td>{pd.PassportNumber}</td>
                                            <td>{pd.PhoneNumber}</td>
                                            <td>{pd.FirstName}</td>
                                            <td>{pd.LastName}</td>
                                            <td>{pd.WorkEmail}</td>
                                            <td>{pd.PersonalEmail}</td>
                                            <td>{pd.DateOfBirth}</td>
                                            <td>{pd.StateOfBirth}</td>
                                            <td>{pd.BirthPlace}</td>
                                            <td>{pd.Gender}</td>
                                            <td>{pd.Nationality}</td>
                                            <td>{pd.MartialStatus}</td>
                                            <td>{pd.FullTime}</td>
                                            <td>{pd.IsIntern}</td>

                                            <td><button className='btn btn-success' onClick={(e) => editClick(pd.Id,pd.PersonalId,pd.PassportNumber,pd.PhoneNumber,pd.FirstName,pd.LastName,pd.WorkEmail,pd.PersonalEmail,pd.DateOfBirth,pd.StateOfBirth,pd.BirthPlace,pd.Gender,pd.Nationality,pd.MartialStatus,pd.FullTime, pd.IsIntern)}>Edit</button></td>
                                            <td><button className='btn btn-danger' onClick={(e) => handleShowD(pd.Id)}>Delete</button></td>
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

export default PersonalData