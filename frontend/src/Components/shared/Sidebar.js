import React, { useState, useEffect } from 'react';
import {CgClose} from 'react-icons/cg'
import { Link } from 'react-router-dom'
import LogOut from './LogOut'

const Sidebar = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedUser = localStorage.getItem("user");

        if (loggedUser) {
            setIsLoggedIn(true)
        }
    }); 


    return (
        <div className='mobile-sidebar'>
            <div className="sidebar-logo-row">
                <Link to='/'>
                    <div className="mobile-logo-container"></div>
                    <h6>SMP</h6>
                </Link>
                <button onClick={props.click}><CgClose /></button>
            </div>

            <div className='mobile-auth'>
                {isLoggedIn ? (
                    <LogOut />
                ) : (
                    <div className="auth-btn">
                        <div className="log-in">
                            <Link to='/LogIn'>Log In</Link>
                        </div>
                        <div className="sign-up">
                            <Link to='/SignUp'>Sign Up</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Sidebar