import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/navbar.scss'
import clsx from 'clsx'
import LogOut from './LogOut';
import MobileNav from './MobileNav';

const Navbar = (props) => {
    const [isSticky, setIsSticky] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedUser = localStorage.getItem("user");

        if (loggedUser) {
            setIsLoggedIn(true)
        }
    });

    useEffect(() => {
        const nav = document.querySelector(".navbar");
        const navHeight = nav.scrollHeight;

        const handleScroll = () => {
            const scrollHeight = window.pageYOffset;
            setIsSticky(scrollHeight > 20 ? true : false);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div id='navbar' className={clsx(`navbar ${props.styles}`, isSticky ? "nav__sticky" : "")}>
            <div className="logo">
                <h1>
                    <Link to='/'>SMP</Link>
                </h1>
            </div>
            <div className="auth">
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

            <MobileNav />
        </div>
    )
}

export default Navbar