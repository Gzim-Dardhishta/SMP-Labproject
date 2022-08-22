import React from 'react'
import SignupForm from '../../Components/pages/Auth/SignupForm'
import Navbar from '../../Components/shared/Navbar'
import Footer from '../../Components/shared/Footer'

const SignUp = () => {
  return (
    <div>
        <Navbar />
        <SignupForm />
        <Footer />
    </div>
  )
}

export default SignUp