'use client'

import React, { useEffect } from 'react'
import Header from '../components/shared/Header'
import { useUser } from '@clerk/nextjs'
import axios from 'axios';

const Provider = ({ children }) => {

  const { user } = useUser();

  const checkIsNewUser = async () => {
    const response = await axios.post('/api/user', {
      user: user
    });
  }
 
  useEffect(() => {
    user&& checkIsNewUser();
  }, [user])
  return (
    <div>
      <Header />
        <div>
            { children }
        </div>
    </div>
  )
}

export default Provider