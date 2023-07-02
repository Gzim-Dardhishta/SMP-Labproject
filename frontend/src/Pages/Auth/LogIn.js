import React from 'react'
import LoginForm from '../../Components/pages/Auth/LoginForm'
import Navbar from '../../Components/shared/Navbar'
import Footer from '../../Components/shared/Footer'

const LogIn = () => {
  return (
    <div>
        <Navbar />
        <LoginForm/>
        <Footer />
    </div>
  )
}

export default LogIn