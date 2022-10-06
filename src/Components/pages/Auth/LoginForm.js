import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './style/login.scss'
import person from '../../../assets/person.svg'
import lock from '../../../assets/lock.svg'
import eye from '../../../assets/eye.svg';
import axios from 'axios';


const LoginForm = () => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState("");


  const handleNameChange = (value) => {
    setName(value);
  }
  const handlePasswordChange = (value) => {
    setPassword(value);
  }

  const handleLogIn = () => {
    console.log("hello")
  }


  return (
    <div className='form-container'>
      <h6 className='form-title'>
        Log In
      </h6>
      <p className='welcome-text'>
        Welcome back user, fill in the brackets your info.
      </p>

      <form action="">
        <div className="input-container">
          <label htmlFor="">
            UserName
          </label>
          <div className="inner-input-container">
            <span className="email-icon" style={{ content: `url(${person})` }}></span>
            <input
              type="name"
              name='name'
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder='Enter your username'
              className='form-input'
            />
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="">
            Password
          </label>
          <div className="inner-input-container">
            <span className="lock-icon" style={{ content: `url(${lock})` }}></span>
            <input
              type="password"
              name='password'
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder='Enter your email'
              className='form-input'
            />
            <span className="eye-icon" style={{ content: `url(${eye})` }}></span>
          </div>
        </div>

        <div className='agree-terms'>
          <div className='inner-row'>
            <input type='checkbox' name='keep-logged' id='keep-logged' />
            <label htmlFor='keep-logged' className='form-label-checkbox'>
              Remember me
            </label>
          </div>
          <Link to='/' className='link'>
            Forgot Password?
          </Link>
        </div>

        <div className='button-container'>
          <button type='submit' className='submit-button' onClick={() => handleLogIn()}>
            Log In
          </button>
        </div>

        <div className="signup-link">
          <p>
            SMP
          </p>
          <Link to='/SignUp'>
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginForm