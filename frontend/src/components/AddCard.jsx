import { React, useState, useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from './../authContext';
import { addCard } from '../scripts/cards';

const AddCard = ({ parentDeck, parentName, close, refresh }) => {
    const { user, isLoggedIn, logout } = useAuth();
    const [name, setName] = useState('');
    const [type, setType] = useState('Básico');
    
    const handleAddCard = async (e) => {
        e.preventDefault();
        addCard(localStorage.getItem('token'), parentDeck, type, front.value, back.value).then(() => refresh());
        close();
    };

    const cycleType = () => {
        if(type === "Básico") setType('Oclusão de imagem');
        else if(type === "Oclusão de imagem") setType('Omissão de palavra');
        else setType("Básico");
    }
    
    return (
        <>
            <div className='fixed inset-0 backdrop-blur-sm' style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}} onClick={() => close()}>
            </div>
            <form className="fixed top-1/2 left-1/2 -translate-1/2 w-full sm:w-1/2 p-6 bg-gray-50 backdrop-blur-xl border border-gray-200 sm:rounded-xl shadow-lg" onSubmit={handleAddCard}>
                <IoCloseOutline className='absolute right-5.5 top-5.5 text-3xl cursor-pointer text-gray-600 hover:text-black' onClick={() => close()}/>
                <div className='flex space-x-20 items-center mb-2'>
                    <h1 className="text-xl sm:text-2xl w-5/6 sm:w-full font-bold text-gray-900">Novo card para <span className='text-primary'>{parentName ? parentName : "" }</span></h1>
                </div>
                <div className='flex space-x-2.5 mb-5 font-medium'>
                    <button onClick={cycleType} name="cardType" id="cardType" className='transition hover:bg-primary hover:text-white font-semibold px-2 rounded-md border border-primary text-primary cursor-pointer text-center appearance-none'>
                        {type}
                    </button>
                </div>
                <div>Frente</div>
                <textarea
                    id='front'
                    name='front'
                    className="p-2 border border-gray-300 rounded-lg w-full mb-4"
                    style={{minHeight:"2.7em", maxHeight:"13em"}}
                />

                <div>Verso</div>
                <textarea
                    id='back'
                    name='back'
                    className="p-2 border border-gray-300 rounded-lg w-full mb-6"
                    style={{minHeight:"2.7em", maxHeight:"13em"}}
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

export default AddCard;