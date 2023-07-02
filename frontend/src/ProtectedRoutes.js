import { Navigate, Outlet } from 'react-router-dom'
import jwt_decode from "jwt-decode";
const ProtectedRoutes = () => {
  const user1 = JSON.parse(localStorage.getItem("user"));


  const dt = jwt_decode(user1.token);

  const roles = dt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  if(roles === 'Admin'){
    var userAdmin = 'Admin';
  }
  return (
    userAdmin ? <Outlet /> : <Navigate to='/LogIn' />
  )
}

export default ProtectedRoutes