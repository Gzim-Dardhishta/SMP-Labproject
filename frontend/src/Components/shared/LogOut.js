import React from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const LogOut = () => {
    const navigateHome = useNavigate();

    const userl = JSON.parse(localStorage.getItem("userInfo"));
    const username = userl.name

    const handleLogOut = () => {
        localStorage.removeItem("user");

        navigateHome('/')
        window.location.reload(true);
    }
    return (
        <div className='logout'>
            <p className='username'>Hello, {username}</p>
            <Link className="dashboard" to='/dashboard'>Dashboard</Link>
            <button className='logout-btn' onClick={handleLogOut}>LogOut</button>
        </div>
    )
}

export default LogOut