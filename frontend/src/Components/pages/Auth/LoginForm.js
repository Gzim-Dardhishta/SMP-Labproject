import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style/login.scss'
import person from '../../../assets/person.svg'
import lock from '../../../assets/lock.svg'
import eye from '../../../assets/eye.svg';
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";


const LoginForm = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)


  const handleNameChange = (value) => {
    setName(value);
  }
  const handlePasswordChange = (value) => {
    setPassword(value);
  }

  useEffect(() => {
    const loggedUser = localStorage.getItem('user')

    if (loggedUser) {
      setLoggedIn(true)
    }
  })

  const handleLogIn = (e) => {
    e.preventDefault();

    fetch('https://localhost:7152/api/Authenticate/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: name,
        password: password
      })
    })
      .then(async response => {
        if (response.ok) {

          const data = await response.json();
          const user = {
            name: name
          }

          if (data.token) {
            localStorage.setItem("user", JSON.stringify(data));
          }
          if (data) {
            localStorage.setItem("userInfo", JSON.stringify(user));
          }

          console.log('Token:', data.token);
          // console.log('Expiration:', data.expiration);
          const token = data.token;

          // Decode the token to extract the claims
          const decodedToken = jwt_decode(token);

          // Access the roles claim
          const roles = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
          console.log(roles)

          if (roles == 'Admin') {
            navigate("/dashboard");
          } else if (roles == 'Manager') {
            navigate('/dashboard')
          } else if (roles == 'User') {
            navigate('/')
          }
        } else {
          throw new Error('Authentication failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div className='form-container'>
      <h6 className='form-title'>
        Log In
      </h6>
      <p className='welcome-text'>
        Welcome back user, fill in the brackets your info.
      </p>

      <form onSubmit={handleLogIn}>
        <div className="input-container">
          <label htmlFor="">
            UserName
          </label>
          <div className="inner-input-container">
            <span className="email-icon" style={{ content: `url(${person})` }}></span>
            <input
              type="name"
              name='username'
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
              placeholder='Enter your password'
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
          {loggedIn ? (<p className='mess'>You are logged in</p>) : (<button className='submit-button'>Log in</button>)}
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