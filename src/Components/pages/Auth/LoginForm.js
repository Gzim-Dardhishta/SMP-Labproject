import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style/login.scss'
import email from '../../../assets/email.svg'
import lock from '../../../assets/lock.svg'
import eye from '../../../assets/eye.svg'

const LoginForm = () => {

  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState("");
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
            Email
          </label>
          <div className="inner-input-container">
            <span className="email-icon" style={{ content: `url(${email})` }}></span>
            <input
              type="email"
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
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
              onChange={(e) => setPassword(e.target.value)}
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
          <button type='submit' className='submit-button'>
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