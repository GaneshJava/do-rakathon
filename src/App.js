import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from 'utils/PrivateRoute';
import LoginIndex from 'components/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  useEffect(() => {
    console.log('fromEnv => ', process.env.REACT_APP_API_URL || null);
  }, [])
  return (
    <div>
      <ToastContainer autoClose ={2000}/>
      <Routes>
        <Route path="/" element={<PrivateRoutes />} />
        <Route path="/login" element={<LoginIndex />} />
        <Route path="*" element={<PrivateRoutes />} />
      </Routes>
    </div>
  );
}

export default App; 