import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style/signup.scss'
import email from '../../../assets/email.svg'
import lock from '../../../assets/lock.svg'
import eye from '../../../assets/eye.svg'
import person from '../../../assets/person.svg'
import suggest from '../../../assets/suggest.svg';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleNameChange = (value) => {
        setName(value);
    }
    const handleEmailChange = (value) => {
        setEmail(value);
    }
    const handlePasswordChange = (value) => {
        setPassword(value);
    }


    const handleSignup = (e) => {
        e.preventDefault();

        fetch('https://localhost:7152/api/Authenticate/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Username: name,
                Email: email,
                Password: password
            })
        })
            .then(response => {
                if (response.ok) {
                    alert('User created succesfully')

                    navigate('/LogIn')
                } else {
                    throw new Error('Registartion failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div className='signup-form-container'>
            <h6 className='form-title'>
                Sign Up
            </h6>
            <p className='welcome-text'>
                Fill the brackets down below with your information
            </p>

            <form onSubmit={handleSignup} className='signup-form'>
                <div className="name-input-container">
                    <div className="name">
                        <label htmlFor="">
                            UserName
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
                                onChange={(e) => handleEmailChange(e.target.value)}
                                placeholder='Enter your email'
                                className='form-input'
                            />
                        </div>
                    </div>
                </div>

                <div className="password-input-container">
                    <div className="password">
                        <label htmlFor="">
                            Password
                        </label>
                        <div className="inner-input-container">
                            <span className="lock-icon" style={{ content: `url(${lock})` }}></span>
                            <input
                                type="password"
                                name='password'
                                onChange={(e) => handlePasswordChange(e.target.value)}
                                placeholder='Enter your password'
                                className='form-input'
                            />
                            <span className="eye-icon" style={{ content: `url(${eye})` }}></span>
                        </div>
                    </div>
                </div>

                <Link to='/' className="suggest-password">
                    <span className="suggest-icon" style={{ content: `url(${suggest})` }}></span>
                    <p>
                        Suggest password
                    </p>
                </Link>

                <div className='agree-terms'>
                    <div className='inner-row'>
                        <input type='checkbox' name='agreed' id='agreed' />
                        <label htmlFor='agreed-check' className='form-label-checkbox'>
                            <Link to='/'>Terms & Conditions</Link>
                        </label>
                    </div>
                </div>

                <div className='button-container'>
                    <button className='submit-button'>
                        Sign Up
                    </button>
                    {/* <input type="submit" value='SignUp' onClick={() => handleSubmit} /> */}
                </div>

                <div className="login-link">
                    <p>
                        Already have an account?
                    </p>
                    <Link to='/LogIn'>
                        Log In
                    </Link>
                </div>
            </form>
        </div>
    )
}
export default SignupForm