import { React, useState } from 'react';
import './styles/requestform.scss'
import email from '../../../assets/email.svg'
import person from '../../../assets/person.svg'
import axios from 'axios';
import { useNavigate } from 'react-router';

const RequestForm = () => {

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

    const navigateLogIn = useNavigate();

    const usert = JSON.parse(localStorage.getItem("user"));

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!usert) {
            alert("You are not Logged In")
            navigateLogIn('/LogIn')
        } else {
            const url = 'https://localhost:7152/api/Message';

            try {
                const resp = await axios.post(url, { Name: name, LastName: lastname, Email: email, EmployeeMessage: message });
                console.log(resp.data);
                window.alert("Message was sent successfully!")
                window.location.reload(true);
            } catch (error) {
                console.log(error.response)
            }
        }
    }

    return (
        <div className='request-form'>
            <div className="text">
                <h4>Send your message to your manager here.</h4>
            </div>

            <div className="form">
                <h4 className='form-title'>
                    Fill the brackets down below with your information
                </h4>

                <form action="" onSubmit={handleSubmit}>
                    <div className="name-input-container">
                        <div className="name">
                            <label htmlFor="">
                                Name
                            </label>
                            <div className="inner-input-container">
                                <span className="person-icon" style={{ content: `url(${person})` }}></span>
                                <input
                                    type="name"
                                    name='name'
                                    placeholder='Enter your name'
                                    className='form-input'
                                    onChange={(e) => handleNameChange(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="last-name">
                            <label htmlFor="">
                                Last name
                            </label>
                            <div className="inner-input-container">
                                <span className="person-icon" style={{ content: `url(${person})` }}></span>
                                <input
                                    type="lastname"
                                    name='lastname'
                                    placeholder='Enter your last name'
                                    className='form-input'
                                    onChange={(e) => handleLastNameChange(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="email">
                        <div className="input-container">
                            <label htmlFor="">
                                Email
                            </label>
                            <div className="inner-input-container">
                                <span className="email-icon" style={{ content: `url(${email})` }}></span>
                                <input
                                    type="email"
                                    name='email'
                                    placeholder='Enter your email'
                                    className='form-input'
                                    onChange={(e) => handleEmailChange(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="message-box">
                        <div className="input-container">
                            <label htmlFor="">
                                Message
                            </label>
                            <div className="inner-input-container">
                                <input
                                    type="message"
                                    name="message" id="message"
                                    placeholder='Type your message here'
                                    onChange={(e) => handleMessageChange(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='send-btn'>
                        <input type="submit" id='submit' value="Send Message" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RequestForm