import React from 'react'
import Banner1 from '../Components/pages/Home/Banner1'
import RequestForm from '../Components/pages/Home/RequestForm'
import Footer from '../Components/shared/Footer'
import Navbar from '../Components/shared/Navbar'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Banner1 />
        <RequestForm />
        <Footer />
    </div>
  )
}

export default Home