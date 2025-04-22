import { React, useState, useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from './../authContext';
import { deleteCard } from '../scripts/cards';

const RemoveCard = ({ id, close, refresh }) => {
    const { user, isLoggedIn, logout } = useAuth();

    const handleDeleteCard = async (e) => {
        e.preventDefault();
        deleteCard(localStorage.getItem('token'), id).then(() => refresh());
        close();
    };
    
    return (
        <>
            <div className='fixed inset-0 backdrop-blur-sm' style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}} onClick={() => close()}>
            </div>
            <div className="fixed top-1/2 left-1/2 -translate-1/2 w-full sm:w-1/2 p-6 bg-gray-200 backdrop-blur-xl border border-gray-200 sm:rounded-xl shadow-lg">
                <IoCloseOutline className='absolute right-5.5 top-5.5 text-3xl cursor-pointer text-gray-600 hover:text-black' onClick={() => close()}/>
                <h1 className="text-xl sm:text-2xl sm:w-full w-5/6 font-bold text-gray-900 mb-5">Deletar card?</h1>
                <div className='flex space-x-4'>
                    <button
                        className="transition font-semibold bg-red-500 cursor-pointer ring ring-red-500 hover:bg-transparent hover:text-red-500 text-white px-3 py-1.5 rounded-lg"
                        onClick={handleDeleteCard}
                    >
                        Deletar
                    </button>
                    <button
                        className="transition font-semibold bg-green-500 cursor-pointer ring ring-green-500 hover:bg-transparent hover:text-green-500 text-white px-3 py-1.5 rounded-lg"
                        onClick={() => close()}
                    >
                        Manter
                    </button>
                </div>
            </div>
        </>
        
    );
};

export default RemoveCard;