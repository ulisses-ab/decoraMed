import React, { useState } from 'react';
import logo2 from './assets/logo2.png';
import { sendRegistration } from './scripts/auth';
import EmailSent from './components/EmailSent';
import Fade from './components/Fade';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState(false);

  const [emailSent, setEmailSent] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    setErrorName(false);
    setErrorEmail(false);
    setErrorPassword(false);
    setErrorPasswordConfirm(false);
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorPassword(true);
      setErrorPasswordConfirm('As senhas não correspondem');
      return;
    }

    if (formData.password.length < 8) {
      setErrorPassword('A senha deve ter no mínimo 8 caracteres');
      return;
    }

    try {
      await sendRegistration(formData.name, formData.email, formData.password);
    }
    catch (error) {
      console.log(error);
      if(error.status === 409) {
        setErrorEmail('Este email já está em uso');
      }
      else {
        setErrorName(true);
        setErrorEmail(true);
        setErrorPassword(true);
        setErrorPasswordConfirm('Ocorreu um erro ao criar a conta');
      }
      return;
    }

    setEmailSent(true);
  };

  return (
    <div>
      <Fade/>
      <img 
        src={logo2} 
        className='h-10 fixed top-6 left-1/2 -translate-x-1/2' 
        style={{filter: "brightness(0) saturate(100%) invert(12%) sepia(68%) saturate(4969%) hue-rotate(241deg) brightness(92%) contrast(110%)"}}
      />

      <main className='min-h-screen flex items-center justify-center'>
        {emailSent ? (<EmailSent name={formData.name} email={formData.email} password={formData.password} send={sendRegistration}/>) : (
          <div className='w-full max-w-md lg:max-w-lg p-6 space-y-8 rounded-lg'>
            <form className='space-y-6 ' onSubmit={onSubmit}>
              <div className='text-center text-4xl font-bold text-gray-900'>
                <span>Crie sua conta</span>
              </div>

              <div className='relative'>
                <input
                  id='name'
                  name='name'
                  type='text'
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${errorName ? 'border-red-500' : 'border-gray-400 focus:border-primary'} focus:border-primary rounded-md focus:outline-none`}
                  placeholder='Nome'
                  value={formData.name}
                  onChange={onChange}
                />
                {errorName ? <p className='text-red-500 text-sm absolute right-0'>{errorName}</p> : null}
                {errorName && errorName != true ? <div className='h-2 w-2'></div> : null}
              </div>

              <div className='relative'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${errorEmail ? 'border-red-500' : 'border-gray-400 focus:border-primary'} rounded-md focus:outline-none`}
                  placeholder='Email'
                  value={formData.email}
                  onChange={onChange}
                />
                {errorEmail ? <p className='text-red-500 text-sm absolute right-0'>{errorEmail}</p> : null}
                {errorEmail && errorEmail != true ? <div className='h-2 w-2'></div> : null}
              </div>

              <div className='relative'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${errorPassword ? 'border-red-500' : 'border-gray-400 focus:border-primary'} rounded-md focus:outline-none`}
                  placeholder='Senha'
                  value={formData.password}
                  onChange={onChange}
                />
                {errorPassword ? <p className='text-red-500 text-sm absolute right-0'>{errorPassword}</p> : null}
                {errorPassword && errorPassword != true ? <div className='h-2 w-2'></div> : null}
              </div>

              <div className='relative'>
                <input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${errorPasswordConfirm ? 'border-red-500' : 'border-gray-400 focus:border-primary'} rounded-md focus:outline-none`}
                  placeholder='Confirme a senha'
                  value={formData.confirmPassword}
                  onChange={onChange}
                />
                {errorPasswordConfirm ? <p className='text-red-500 text-sm absolute right-0'>{errorPasswordConfirm}</p> : null}
                {errorPasswordConfirm && errorPasswordConfirm != true ? <div className='h-2 w-2'></div> : null}
              </div>


              <button
                type='submit'
                className='w-full flex justify-center cursor-pointer py-2 px-4 bg-primary text-white rounded-md
                font-semibold outline outline-primary hover:bg-transparent hover:text-primary transition'
              >
                Registrar
              </button>
            </form>

            <div className='text-center text-sm'>
              <span className='text-gray-600'>Já tem uma conta? </span>
              <a onClick={() => {window.location.href = '/login';}} href='#' className='font-medium text-primary hover:text-primary-dark'>
                Entrar
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Register