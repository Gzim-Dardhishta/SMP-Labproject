import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import axios from 'axios';

const Message = () => {

  const { data: messages, isLoading, error } = useFetch('https://localhost:7152/api/Message');

  const [id, setId] = useState();
  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleNameChange = (value) => {
    setName(value);
  }
  const handleLastNameChange = (value) => {
    setLastName(value);
  }
  const handleEmailChange = (value) => {
    setEmail(value);
  }
  const handleMessageChange = (value) => {
    setMessage(value);
  }

  const [show, setShow] = useState(false);
  const [showD, setShowD] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (ID, n,l,e,m) => {
    setName(n)
    setLastName(l)
    setEmail(e)
    setMessage(m)
    setId(ID)
    setShow(true)
  };
  const handleCloseD = () => setShowD(false);
  const handleShowD = (ID) => {
    setId(ID)
    setShowD(true)
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const infos = { Name: name, LastName: lastname, Email: email, EmployeeMessage: message };

    fetch('https://localhost:7152/api/Message/' + id, {
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

    fetch('https://localhost:7152/api/Message/' + id, {
      method: 'DELETE'
    })
      .then((response) => {
        window.location.reload(true);
        if (!response.ok) {
          throw new Error('Something went wrong')
        }
      })
      .catch((e) => {
        console.log(e)
      });
  }

  return (
    <div className='message-table'>
      <h2 className='messages-dashboard'>Messages</h2>

      <Modal show={showD} onHide={handleCloseD}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this message?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseD}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Update Messages</Modal.Title>
        </Modal.Header>

        <div className="modal-body">
          <form >
            <div className="name">
              <small>Name: </small>
              <input type="text" onChange={(e) => handleNameChange(e.target.value)} value={name} name="name" className="form-control" placeholder={name} />
            </div>

            <div className="lastname">
              <small>LastName: </small>
              <input type="text" onChange={(e) => handleLastNameChange(e.target.value)} value={lastname} name="lastname" className="form-control" placeholder={lastname} />
            </div>

            <div className="address">
              <small>Email: </small>
              <input type="email" onChange={(e) => handleEmailChange(e.target.value)} value={email} name="email" className="form-control" placeholder={email} />
            </div>

            <div className="city">
              <small>Message: </small>
              <input type="text" onChange={(e) => handleMessageChange(e.target.value)} value={message} name="message" className="form-control" placeholder={message} />
            </div>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleEdit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </div>
      </Modal>

      {/* Contact Table */}
      <div>
        {error && <div>{error}</div>}
        {isLoading && <div>Loading...</div>}

        {messages &&

          <section className='mt-5'>
            <table className='table table-bordered text-center'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {messages.map(mes => (
                  <tr key={mes.Id}>
                    <td>{mes.Name}</td>
                    <td>{mes.LastName}</td>
                    <td>{mes.Email}</td>
                    <td>{mes.EmployeeMessage}</td>

                    <td><button className='btn btn-success' onClick={(e) => handleShow(mes.Id, mes.Name, mes.LastName, mes.Email, mes.EmployeeMessage)}>Edit</button></td>
                    <td><button
                      className='btn btn-danger'
                      onClick={(e) => handleShowD(mes.Id)}
                    >Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        }
      </div>
    </div>
  )
}

export default Message