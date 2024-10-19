

import React, { useEffect, useContext } from 'react'
import {  useNavigate } from "react-router-dom"; 
import { AuthContext } from "../auth/provider/AuthContext";
import sessionService from '@/services/session-service';



export const AuthRoute = props => {
  const { userInfo,setUserInfo } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionService.get('token')
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);


  return <>{props.children}</>
}
