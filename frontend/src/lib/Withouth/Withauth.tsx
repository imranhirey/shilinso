import { Auth } from '@/api/auth';
import { login } from '@/slices/authSlice';
import Router from "next/router";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function WithAuth(props: { children: React.ReactNode }) {
  const [authstatus, setAuthStatus] = useState("checking");
  const [authCheckCompleted, setAuthCheckCompleted] = useState(false);
  const dispatch = useDispatch();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const checkAuth = async () => {
      const authinstance = new Auth();
      try {
        if (token) {
          const response = await authinstance.getuserithToken(token);
          if (!response.iserror) {
            dispatch(login({
              user: response.data,
            }));
            setAuthStatus("authenticated");
            // If the user is already authenticated and trying to access the login page, redirect them to the example page
            if (window.location.pathname === '/auth/login') {
              await Router.push('/dashboard');
            }
          } else {
            setAuthStatus("unauthenticated");
            await Router.push('/auth/login');
          }
        } else {
          setAuthStatus("unauthenticated");
       
        }
      } catch (error) {
        setAuthStatus("unauthenticated");
        await Router.push('/auth/login');
      }
      setAuthCheckCompleted(true);
    };

    checkAuth();
  }, [dispatch, token]);

  if (!authCheckCompleted) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {props.children}
    </div>
  );
}

export default WithAuth;