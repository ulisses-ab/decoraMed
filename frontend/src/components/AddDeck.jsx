import { React, useState, useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from './../authContext';
import { newDeck } from '../scripts/decks';

const AddDeck = ({ parentDeck, parentName, close, refresh }) => {
    const { user, isLoggedIn, logout } = useAuth();
    const [name, setName] = useState('');
    
    const handleAddDeck = async (e) => {
        e.preventDefault();
        newDeck(localStorage.getItem('token'), parentDeck, deckName.value).then(() => refresh());
        close();
    };
    
    return (
        <>
            <div className='fixed inset-0 backdrop-blur-sm' style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}} onClick={() => close()}>
            </div>
            <form className="fixed top-1/2 left-1/2 -translate-1/2 w-1/2 p-8 bg-gray-50 backdrop-blur-xl border border-gray-200 rounded-xl shadow-lg" onSubmit={handleAddDeck}>
                <IoCloseOutline className='absolute right-5.5 top-5.5 text-3xl cursor-pointer text-gray-600 hover:text-black' onClick={() => close()}/>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{parentName ? `Novo sub-baralho de ` : "Novo baralho"}<span className='text-primary'>{parentName ? parentName : "" }</span></h1>
                <input
                    type="text"
                    id='deckName'
                    name='deckName'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg w-full mb-4"
                    placeholder="Nome"
                />
                <button
                    type='submit'
                    className="transition font-semibold bg-primary cursor-pointer ring ring-primary hover:bg-transparent hover:text-primary text-white px-3 py-1.5 rounded-lg"
                >
                    Adicionar
                </button>
            </form>
        </>
        
    );
};

export default AddDeck;