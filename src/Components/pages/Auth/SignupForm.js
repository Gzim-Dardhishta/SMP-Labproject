import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style/signup.scss'
import email from '../../../assets/email.svg'
import lock from '../../../assets/lock.svg'
import eye from '../../../assets/eye.svg'
import person from '../../../assets/person.svg'
import suggest from '../../../assets/suggest.svg';
import axios from 'axios';
import { useSignup } from '../../../hooks/useSignup';

const SignupForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");

    const handleNameChange = (value) => {
        setName(value);
    }
    const handleEmailChange = (value) => {
        setEmail(value);
    }
    const handlePasswordChange = (value) => {
        setPassword(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const user = {
            name: name,
            email: email,
            password: password
        };

        axios.post(`https://localhost:7152/api/Authenticate/register`, { user })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })

    }





    return (
        <div className='signup-form-container'>
            <h6 className='form-title'>
                Sign Up
            </h6>
            <p className='welcome-text'>
                Fill the brackets down below with your information
            </p>

            <form action="" className='signup-form' onSubmit={handleSubmit}>
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
                    {/* <div className="last-name">
                        <label htmlFor="">
                            Last name
                        </label>
                        <div className="inner-input-container">
                            <span className="person-icon" style={{ content: `url(${person})` }}></span>
                            <input
                                type="name"
                                name='name'
                                placeholder='Enter your last name'
                                className='form-input'
                                onChange={(e) => handleLastNameChange(e.target.value)}
                            />
                        </div>
                    </div> */}
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
                    {/* <div className="confirm-password">
                        <label htmlFor="">
                            Confirm Password
                        </label>
                        <div className="inner-input-container">
                            <span className="lock-icon" style={{ content: `url(${lock})` }}></span>
                            <input
                                type="password"
                                name='password'
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Confirm your password'
                                className='form-input'
                            />
                            <span className="eye-icon" style={{ content: `url(${eye})` }}></span>
                        </div>
                    </div> */}
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
                    <button type='submit' className='submit-button'>
                        Sign Up
                    </button>
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