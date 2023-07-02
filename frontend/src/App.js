import {
  Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import LogIn from './Pages/Auth/LogIn';
import SignUp from './Pages/Auth/SignUp';
import React from 'react';
import Dashboard from './Pages/Dashboard';
import ProtectedRoutes from './ProtectedRoutes';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path='/LogIn' element={<LogIn />} />
          <Route path='/SignUp' element={<SignUp />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
