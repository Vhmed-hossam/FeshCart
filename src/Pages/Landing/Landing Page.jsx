import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AcmeLogo } from '../Login/login';
import { Button } from '@heroui/react';

export function verifyToken() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({data:{decoded}}) => {
      return decoded;
    })
    .catch((err) => {
      console.log("Token verification failed:", err);
      throw err;
    });
}

export default function LandingPage() {
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    verifyToken()
      .then((decoded) => {
        setMessage(decoded);
        setUserName(decoded.name);
      })
      .catch(() => {
        setMessage('Token verification failed.');
      });
  }, []);
  return(
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center">
  
      <header className="  py-20 w-full text-primary">
       <div className='w-fit mx-auto'><AcmeLogo /></div> 
        <h1 className="text-4xl font-bold">Hello {userName}</h1>
        <h1 className="text-4xl font-bold ">Welcome to FeshCart</h1>
        <p className="mt-2 text-lg">An innovative E-commerce platform built with passion</p>
      </header>
      
    
      <section className="p-12 bg-gray/25 rounded-lg">
        <h2 className="text-2xl font-semibold">About the Developer</h2>
        <p className="mt-2">Hi, I'm Vhmed, a passionate front-end developer dedicated to crafting amazing user experiences.</p>
        <div className="mt-4 flex justify-between">
         <a href='https://github.com/Vhmed-hossam' target='_blank'> <Button color='primary' className='px-6' variant='ghost'>GitHub</Button></a>
         <a href='https://www.linkedin.com/in/ahmed-hossam-81260634a/' target='_blank'> <Button color='primary' className='px-6' variant='ghost'>LinkedIn</Button></a>
         <a href='https://www.behance.net/Ahmed_Hossam16' target='_blank'> <Button color='primary' className='px-6' variant='ghost'>Behance</Button></a>
        </div>
      </section>
    </div>
  )
}
