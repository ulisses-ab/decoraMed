import { React, useState, useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from './../authContext';
import { getCard, editCard } from '../scripts/cards';
import { useRef } from 'react';

const EditCard = ({ id, close, refresh }) => {
    const { user, isLoggedIn, logout } = useAuth();
    const [name, setName] = useState('');
    const [type, setType] = useState('Básico');

    
    const frontRef = useRef(null)
    const backRef = useRef(null)
    
    const handleEditCard = async (e) => {
        e.preventDefault();
        console.log(front.value, back.value);
        editCard(localStorage.getItem('token'), id, front.value, back.value).then(() => refresh());
        close();
    };



    const fetchCard = async () => {
        try {
            const card = await getCard(localStorage.getItem('token'), id);
            frontRef.current.value = card.front;
            backRef.current.value = card.back;
            setType(card.type);
        }
        catch {
            console.log("err");
        }
    }

    const cycleType = () => {
        if(type === "Básico") setType('Oclusão de imagem');
        else if(type === "Oclusão de imagem") setType('Omissão de palavra');
        else setType("Básico");
    }
    
    useEffect(() => {
        fetchCard();
    }, []);

    return (
        <>
            <div className='fixed inset-0 backdrop-blur-sm' style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}} onClick={() => close()}>
            </div>
            <form className="fixed top-1/2 left-1/2 -translate-1/2 w-1/2 p-8 bg-gray-50 backdrop-blur-xl border border-gray-200 rounded-xl shadow-lg" onSubmit={handleEditCard}>
                <IoCloseOutline className='absolute right-5.5 top-5.5 text-3xl cursor-pointer text-gray-600 hover:text-black' onClick={() => close()}/>
                <div className='flex space-x-20 items-center mb-5'>
                    <h1 className="text-2xl font-bold text-gray-900">Editar card</h1>
                </div>
                <div>Frente</div>
                <textarea
                    ref={frontRef}
                    id='front'
                    name='front'
                    className="p-2 border border-gray-300 rounded-lg w-full mb-4"
                    style={{minHeight:"2.7em", maxHeight:"13em"}}
                />

                <div>Verso</div>
                <textarea
                    ref={backRef}
                    id='back'
                    name='back'
                    className="p-2 border border-gray-300 rounded-lg w-full mb-6"
                    style={{minHeight:"2.7em", maxHeight:"13em"}}
                />
                <button
                    type='submit'
                    className="transition font-semibold bg-primary cursor-pointer ring ring-primary hover:bg-transparent hover:text-primary text-white px-3 py-1.5 rounded-lg"
                >
                    Editar
                </button>
            </form>
        </>
        
    );
};

export default EditCard;