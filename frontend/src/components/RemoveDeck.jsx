import { React, useState, useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from './../authContext';
import { deleteDeck } from '../scripts/decks';

const RemoveDeck = ({ parentDeck, parentName, close, refresh }) => {
    const { user, isLoggedIn, logout } = useAuth();
    const [name, setName] = useState('');
    
    const handleDeleteDeck = async (e) => {
        e.preventDefault();
        deleteDeck(localStorage.getItem('token'), parentDeck).then(() => refresh());
        close();
    };
    
    return (
        <>
            <div className='fixed inset-0 backdrop-blur-sm' style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}} onClick={() => close()}>
            </div>
            <div className="fixed top-1/2 left-1/2 -translate-1/2 w-1/2 p-8 bg-gray-50 backdrop-blur-xl border border-gray-200 rounded-xl shadow-lg">
                <IoCloseOutline className='absolute right-5.5 top-5.5 text-3xl cursor-pointer text-gray-600 hover:text-black' onClick={() => close()}/>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Deletar <span className='text-primary'>{parentName ? parentName : "" }</span>?</h1>
                <div className='mb-5'>Todos os cards e sub-baralhos também serão deletados</div>
                <div className='flex space-x-4'>
                    <button
                        className="transition font-semibold bg-red-500 cursor-pointer ring ring-red-500 hover:bg-transparent hover:text-red-500 text-white px-3 py-1.5 rounded-lg"
                        onClick={handleDeleteDeck}
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

export default RemoveDeck;