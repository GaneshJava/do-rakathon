import React from 'react';
import Loginform from './loginform';
import { useSelector } from 'react-redux';
import { authState } from 'store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginIndex = () => {
  const { isAuthenticated } = useSelector(authState);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated)
      navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <div className='flex justify-center items-center min-h-screen'>
        <Loginform /> 
    </div>
  );
};

export default LoginIndex;
