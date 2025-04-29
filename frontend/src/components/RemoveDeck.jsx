import { React, useState, useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from './../authContext';
import { deleteDeck } from '../scripts/decks';

const RemoveDeck = ({ parentDeck, parentName, close, refresh }) => {
    const { user, isLoggedIn, logout } = useAuth();
    const [name, setName] = useState('');
    
    const handleDeleteDeck = async (e) => {
        e.preventDefault();
        const d = JSON.parse(localStorage.getItem(parentDeck));
        localStorage.removeItem(parentDeck);
        const parentD = JSON.parse(localStorage.getItem(d.parentDeckId));
        parentD.subDecks = parentD.subDecks.filter(deck => deck !== parentDeck);
        localStorage.setItem(d.parentDeckId, JSON.stringify(parentD));
        refresh();
        close();

        await deleteDeck(localStorage.getItem('token'), parentDeck);
    };
    
    return (
        <>
            <div className='fixed inset-0 backdrop-blur-sm' style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}} onClick={() => close()}>
            </div>
            <div className="fixed top-1/2 left-1/2 -translate-1/2 w-full sm:w-1/2 p-6 bg-gray-50 backdrop-blur-xl border border-gray-200 sm:rounded-xl shadow-lg">
                <IoCloseOutline className='absolute right-5.5 top-5.5 text-3xl cursor-pointer text-gray-600 hover:text-black' onClick={() => close()}/>
                <h1 className="text-xl sm:text-2xl font-bold w-5/6 sm:w-full text-gray-900 mb-4">Deletar <span className='text-primary'>{parentName ? parentName : "" }</span>?</h1>
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