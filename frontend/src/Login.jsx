import React, { useState } from 'react';
import logo2 from './assets/logo2.png';
import { useAuth } from './authContext';
import { use } from 'react';
import { sendLogin } from './scripts/auth';
import Fade from './components/Fade'

const Login = () => {
  const { user } = useAuth();
  const [error, setError] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await sendLogin(email.value, password.value);
      localStorage.setItem('token', token);
      const expiration = new Date();
      expiration.setDate(expiration.getDate() + 28);
      localStorage.setItem('expiration', expiration);
      window.location.href = '/dashboard';
    }
    catch (error) {
      console.log(error);
      if(error.status === 404 || error.status === 401) {
        setError(true);
      }
    }
  }

  return (
    <>
      <Fade />
      <img 
        src={logo2} 
        className='h-10 fixed top-6 left-1/2 -translate-x-1/2' 
        style={{filter: "brightness(0) saturate(100%) invert(12%) sepia(68%) saturate(4969%) hue-rotate(241deg) brightness(92%) contrast(110%)"}}
      />
      <main className='min-h-screen flex items-center justify-center'>
        <div className='w-full max-w-md lg:max-w-lg p-6 space-y-8 rounded-lg'>
          <form className='space-y-6 ' onSubmit={onSubmit}>
            <div className='text-center text-4xl font-bold text-gray-900'>
              <span>Olá novamente</span>
            </div>

            <input
              id='email'
              name='email'
              type='email'
              required
              className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300 focus:border-primary'} rounded-md focus:outline-none`}
              placeholder='Email'
            />

            <div className='relative'>
              <input
                id='password'
                name='password'
                type='password'
                required
                className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300 focus:border-primary'} rounded-md focus:outline-none`}
                placeholder='Senha'
              />
              {error ? <p className='text-red-500 text-sm absolute right-0'>Email ou senha incorretos</p> : null}
            </div>
            
            
            <div className='flex items-center justify-between'>
              <a href='#' className='text-sm font-medium text-primary hover:text-primary-dark'>
                Esqueceu a senha?
              </a>
            </div>

            <button
              type='submit'
              className='w-full flex justify-center cursor-pointer py-2 px-4 bg-primary text-white rounded-md
              font-semibold outline outline-primary hover:bg-transparent hover:text-primary transition'
            >
              Entrar
            </button>
          </form>

          <div className='text-center text-sm'>
            <span className='text-gray-600'>Não tem uma conta? </span>
            <a onClick={() => {window.location.href = '/register'}} href='#' className='font-medium text-primary hover:text-primary-dark'>
              Cadastre-se
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;