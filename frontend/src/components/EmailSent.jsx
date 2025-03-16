import React from 'react';
import { SiMinutemailer } from "react-icons/si";

const EmailSent = ({name, email, password, send}) => {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-gray-900 text-5xl font-bold mb-2'>Email de verificação enviado</h1>
            <SiMinutemailer className='text-[10em] text-primary mb-3' />
            <p className='text-xl break-words w-2/3 text-center font-medium text-gray-900 mb-15'>Obrigado por se registrar! Um email de verificação foi enviado para o seu endereço de email. Por favor, verifique sua caixa de entrada e siga as instruções para verificar sua conta.</p>
            <p>Se você não recebeu o email, por favor verifique sua pasta de spam ou <a onClick={() => send(name, email, password)} className='text-primary cursor-pointer hover:underline'>reenvie o email de verificação</a>.</p>
        </div>
    );
}

export default EmailSent; 