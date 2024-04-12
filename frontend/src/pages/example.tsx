// ExampleComponent.tsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../slices/authSlice';
import { userState } from '@/store';
import { Button } from '@chakra-ui/react';

function ExampleComponent() {
  const dispatch = useDispatch();
  const userstate = useSelector((state: userState) => state.auth.user);

  const handleLogin = () => {
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  //@ts-ignore

  return (
    <div>
      <h1>
        
     {
     JSON.stringify(userstate)
     }
      </h1>

      // logout 

      <Button style={{
        marginTop: '10px',
      
        backgroundColor: '#f00',
      }} onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default ExampleComponent;
