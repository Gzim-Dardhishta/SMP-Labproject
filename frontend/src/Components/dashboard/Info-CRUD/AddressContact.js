import React, { useState, useEffect } from 'react';
import useFetch from '../../../hooks/useFetch'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AddressContact = () => {

    const { data: addressContact, isLoading, error } = useFetch('https://localhost:7152/api/AddressAndContact');


    const [modalTitle, setModalTitle] = useState('');

    const [id, setId] = useState();
    const [address, setAddress] = useState('');
    const [workPhoneN, setWorkPhoneN] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [privatePhoneP, setPrivatePhoneN] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [personalEmail, setPersonalEmail] = useState('');

    const handleAddressChange = (value) => {
        setAddress(value);
    }

    const handleWorkPhoneNChange = (value) => {
        setWorkPhoneN(value);
    }

    const handlePrivatePhoneNChange = (value) => {
        setPrivatePhoneN(value);
    }

    const handleZipCodeChange = (value) => {
        setZipCode(value);
    }
    const handleCityChange = (value) => {
        setCity(value);
    }
    const handleCountryChange = (value) => {
        setCountry(value);
    }
    const handlePersonalEmailChange = (value) => {
        setPersonalEmail(value);
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

    const editClick = (ID, a, wp, ppn, zc, c, co, pe) => {
        setId(ID);
        setAddress(a)
        setWorkPhoneN(wp)
        setPrivatePhoneN(ppn)
        setPersonalEmail(pe)
        setCity(c)
        setCountry(co)
        setZipCode(zc)
        setModalTitle('Update AddressContact');
        handleShow()
    }
    const addClick = () => {
        setModalTitle('Add AddressContact')
        handleShow()
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const infos = { address, workPhoneN, privatePhoneP, zipCode, city, country, personalEmail };

        fetch('https://localhost:7152/api/AddressAndContact', {
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

        const infos = { address: address, workPhoneNumber: workPhoneN, privatePhoneNumber: privatePhoneP, zipCode: zipCode, city: city, country:country, personalEmail: personalEmail };

        fetch('https://localhost:7152/api/AddressAndContact/' + id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(infos)
        }).then(() => {
            console.log("updated")
        })
    }

    const handleDelete = (e) => {
        e.preventDefault();

        fetch('https://localhost:7152/api/AddressAndContact/' + id, {
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
                    <h3>Address and Contacts</h3>
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
                                <small>Address: </small>
                                <input type="text" onChange={(e) => handleAddressChange(e.target.value)} value={address} className="form-control" placeholder={modalTitle == 'Update AddressContact' ? address : "Enter the address"} />
                            </div>

                            <div>
                                <small>Work Phone Number: </small>
                                <input type="number" onChange={(e) => handleWorkPhoneNChange(e.target.value)} value={workPhoneN} className="form-control" placeholder={modalTitle == 'Update AddressContact' ? workPhoneN : "Enter the work phone number"} />
                            </div>

                            <div>
                                <small>Private Phone Number: </small>
                                <input type="number" onChange={(e) => handlePrivatePhoneNChange(e.target.value)} value={privatePhoneP} name="holidaye" className="form-control" placeholder={modalTitle == 'Update Work AddressContact' ? privatePhoneP : "Enter the private phone number"} />
                            </div>

                            <div>
                                <small>Zip Code: </small>
                                <input type="number" onChange={(e) => handleZipCodeChange(e.target.value)} value={zipCode} className="form-control" placeholder={modalTitle == 'Update AddressContact' ? zipCode : "Enter the zip code"} />
                            </div>

                            <div>
                                <small>City: </small>
                                <input type="text" onChange={(e) => handleCityChange(e.target.value)} value={city} className="form-control" placeholder={modalTitle == 'Update AddressContact' ? city : "Enter the city"} />
                            </div>

                            <div>
                                <small>Country: </small>
                                <input type="text" onChange={(e) => handleCountryChange(e.target.value)} value={country} className="form-control" placeholder={modalTitle == 'Update AddressContact' ? country : "Enter the country"} />
                            </div>

                            <div>
                                <small>Perosonal Email: </small>
                                <input type="email" onChange={(e) => handlePersonalEmailChange(e.target.value)} value={personalEmail} className="form-control" placeholder={modalTitle == 'Update AddressContact' ? personalEmail : "Enter the perosnal email"} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        {modalTitle == 'Add AddressContact' ? <Button variant="primary" onClick={handleSubmit}>
                            Add AddressContact
                        </Button> : <Button variant="primary" onClick={handleEdit}>
                            Update AddressContact
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

                    {addressContact &&

                        <section className='scroll-table mt-5'>
                            <table className='table table-bordered text-center'>
                                <thead>
                                    <tr>
                                        <th>Address</th>
                                        <th>Work Phone Number</th>
                                        <th>Private Phone Number</th>
                                        <th>Zip Code</th>
                                        <th>City</th>
                                        <th>Country</th>
                                        <th>Perosnal Email</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {addressContact.map(ac => (
                                        <tr key={ac.Id}>
                                            <td>{ac.Address}</td>
                                            <td>{ac.WorkPhoneNumber}</td>
                                            <td>{ac.PrivatePhoneNumber}</td>
                                            <td>{ac.ZipCode}</td>
                                            <td>{ac.City}</td>
                                            <td>{ac.Country}</td>
                                            <td>{ac.PersonalEmail}</td>

                                            <td><button className='btn btn-success' onClick={(e) => editClick(ac.Id, ac.Address, ac.WorkPhoneNumber, ac.PrivatePhoneNumber, ac.ZipCode, ac.City, ac.Country, ac.PersonalEmail)}>Edit</button></td>
                                            <td><button className='btn btn-danger' onClick={(e) => handleShowD(ac.Id)}>Delete</button></td>
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

export default AddressContact