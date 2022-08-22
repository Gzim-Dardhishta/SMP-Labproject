import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './styles/navbar.scss'
import clsx from 'clsx'

const Navbar = (props) => {

    const [isSticky, setIsSticky] = useState(false);
   
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
            <div className="log-in">
                <Link to='/LogIn'>Log In</Link>
            </div>
            <div className="sign-up">
                <Link to='/SignUp'>Sign Up</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar