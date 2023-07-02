import React, {useEffect} from 'react'
import Footer from '../Components/shared/Footer'
import Navbar from '../Components/shared/Navbar'
import AdminDashboard from '../Components/dashboard/AdminDashboard'

const Dashboard = () => {

  useEffect(() => {
    document.title = 'Dashboard';
  }, []);
  return (
    <div>
        <Navbar />
        <AdminDashboard />
        <Footer />
    </div>
  )
}

export default Dashboard