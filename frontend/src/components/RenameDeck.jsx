import { React, useState, useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from './../authContext';
import { renameDeck } from '../scripts/decks';

const RenameDeck = ({ id, name, close, refresh }) => {
    const { user, isLoggedIn, logout } = useAuth();
    
    const handleRenameDeck = async (e) => {
        e.preventDefault();
        let deck = localStorage.getItem(id);
        deck = JSON.parse(deck);
        deck.name = deckName.value;
        localStorage.setItem(id, JSON.stringify(deck));
        refresh();
        close();
        await renameDeck(localStorage.getItem('token'), id, deckName.value);
    };

    useEffect(() => {
        deckName.value = name;
    }, []);
    
    return (
        <>
            <div className='fixed inset-0 backdrop-blur-sm' style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}} onClick={() => close()}>
            </div>
            <form className="fixed top-1/2 left-1/2 -translate-1/2 w-full sm:w-1/2 p-6 bg-gray-50 backdrop-blur-xl border border-gray-200 sm:rounded-xl shadow-lg" onSubmit={handleRenameDeck}>
                <IoCloseOutline className='absolute right-5.5 top-5.5 text-3xl cursor-pointer text-gray-600 hover:text-black' onClick={() => close()}/>
                <h1 className="text-xl sm:text-2xl w-5/6 sm:w-full font-bold text-gray-900 mb-4">Renomear <span className='text-primary'>{name}</span></h1>
                <input
                    type="text"
                    id='deckName'
                    name='deckName'
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg w-full mb-4"
                    placeholder="Nome"
                />
                <button
                    type='submit'
                    className="transition font-semibold bg-primary cursor-pointer ring ring-primary hover:bg-transparent hover:text-primary text-white px-3 py-1.5 rounded-lg"
                >
                    Renomear
                </button>
            </form>
        </>
        
    );
};

export default RenameDeck;