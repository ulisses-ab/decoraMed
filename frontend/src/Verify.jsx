import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { verify } from './scripts/auth';
import { IoIosCheckmarkCircle } from "react-icons/io";
import logo2 from './assets/logo2.png';
import { MdVerified } from "react-icons/md";
import { MdError } from "react-icons/md";
import { BiSolidErrorAlt } from "react-icons/bi";
import Fade from './components/Fade'

const Verify = () => {
    const { token } = useParams();
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(() => {
        const ver = async () => {
            try {
                const loginToken = await verify(token);
                localStorage.setItem('token', loginToken);
                const expiration = new Date();
                expiration.setDate(expiration.getDate() + 28);
                localStorage.setItem('expiration', expiration);
                setError(false);
            }
            catch (error) {
                console.log(error)
                if(error.status === 409) {
                    setErrorMessage('Esta conta já foi verificada. Tente fazer login.');
                }
                else setErrorMessage('Houve um erro ao verificar sua conta. Por favor, tente novamente.')
                setError(true);
            }
        } 
        
        ver();
    }, [])

    return (<>
        <Fade />
        <img 
        src={logo2} 
        className='h-10 fixed top-6 left-1/2 -translate-x-1/2' 
        style={{filter: "brightness(0) saturate(100%) invert(12%) sepia(68%) saturate(4969%) hue-rotate(241deg) brightness(92%) contrast(110%)"}}
        />
        <main className='min-h-screen flex items-center justify-center'>
            {
                error === false ? (
                    <div className='flex items-center justify-center flex-col mt-10 rounded-lg text-center text-xl'>
                        <MdVerified className='text-[10em] text-green-500'/>
                        <p className='font-bold text-4xl text-gray-900 mb-4'>
                            Conta verificada
                        </p>
                        <p className='w-2/3 break-words text-lg'>
                            Parabéns! Sua conta foi criada com sucesso. Você agora pode iniciar seus estudos com os flashcards.
                        </p>
                        <button onClick={() => {window.location.href = '/dashboard'}} className='ring ring-primary py-5 text-xl font-semibold px-16 transition bg-primary text-white cursor-pointer hover:bg-transparent hover:text-primary rounded-lg mt-10'>
                            Ir para o dashboard
                        </button>
                    </div>

                ) : null
            }
            {
                error === true ? (
                    <div className='flex items-center justify-center flex-col mt-10 rounded-lg text-center text-xl'>
                        <MdError className='text-[10em] text-red-500'/>
                        <p className='font-bold text-4xl text-gray-900 mb-4'>
                            Erro
                        </p>
                        <p className='w-2/3 break-words text-lg'>
                            {errorMessage}
                        </p>
                    </div>

                ) : null
            }
        </main>
    </>)
}

export default Verify