import { React, useState, useEffect } from 'react';
import { getDeck } from './../scripts/decks';
import { getDueCards } from './../scripts/study';
import { PiCardsFill } from "react-icons/pi";
import { FaTrash, FaPlus, FaArrowsAlt } from 'react-icons/fa';
import { RiShareForwardFill } from "react-icons/ri";
import AddDeck from './AddDeck';
import RenameDeck from './RenameDeck';
import RemoveDeck from './RemoveDeck';
import AddCard from './AddCard';
import { HiMiniPencilSquare } from "react-icons/hi2";
import { BiSolidEditAlt } from "react-icons/bi";
import { useAuth } from './../authContext';


const Deck = ({ id, indent = 0, refreshParent }) => {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState(0);
  const [cardsDue, setCardsDue] = useState(0);
  const [showSubDecks, setShowSubDecks] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const fetchDeck = async (iid) => {
    const ls = localStorage.getItem(iid);
    if (ls) {
      return JSON.parse(ls);
    }

    return await getDeck(localStorage.getItem('token'), iid);
  }

  const refresh = () => {
    const fd = async () => {
      const deck = await fetchDeck(id);
      setDeck(deck);
    }
    fd();

    setCardsDue([1]);
    refreshParent();
  }

  const sequence = (n) => {
    const seq = [];
    for (let i = 0; i < n; i++) {
      seq.push(i);
    }
    return seq;
  };

  useEffect(refresh, [id]);

  const toggleSubDecks = () => {
    setShowSubDecks(!showSubDecks);
  }

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showRenamePopup, setShowRenamePopup] = useState(false);
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [showAddCardPopup, setShowAddCardPopup] = useState(false);

  const study = () => {
    window.location.href = `/study/${id}`;
  }

  return (
    <>
      <div className="h-12 select-none flex justify-between transition hover:bg-[rgb(0,0,0)]/6 cursor-pointer pl-2 pr-4" onClick={toggleSubDecks} onMouseEnter={() => setShowActions(true)} onMouseLeave={() => setShowActions(false)}>
        <div className='flex items-center'>
          <div className='flex items-end h-10'>
            {sequence(indent).map((el) => (
              <div className='flex' key={el}>
                <div className='border-r border-gray-600 w-3 h-14 m-0'>
                </div>
                <div className='w-3 h-14 m-0'>
                </div>
              </div>
            ))}
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" className={` mr-2 h-6 w-6 transition ${showSubDecks ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7" />
          </svg>
          <div className="text-lg font-semibold text-gray-800">{deck.name}</div>
        </div>
        
        
      
        <div className='text-primary flex items-center space-x-15'>
          
          {
            showActions && (
              <div className='hidden sm:flex items-center space-x-3 text-xl'>
                <FaPlus className="text-gray-600 hover:text-gray-800 cursor-pointer" title="Novo sub-baralho" onClick={(e) => {e.stopPropagation(); setShowAddPopup(true);}}/>
                <HiMiniPencilSquare  className="text-gray-600 hover:text-gray-800 cursor-pointer" title="Renomear baralho"  onClick={(e) => {e.stopPropagation(); setShowRenamePopup(true);}}/>
                <RiShareForwardFill className="text-gray-600 hover:text-gray-800 cursor-pointer" title="Mover baralho" onClick={(e) => {e.stopPropagation()}}/>
                <FaTrash className="text-gray-600 hover:text-gray-800 cursor-pointer" title="Deletar baralho" onClick={(e) => {e.stopPropagation(); setShowRemovePopup(true);}}/>
              </div>
            )
          }
          {
            showActions && (
              <div className='flex hidden sm:block items-center space-x-3  text-gray-900'>
                <button className='transition outline-primary  text-primary font-semibold hover:bg-gray-300 rounded-md px-3 py-1 cursor-pointer' onClick={(e) => {e.stopPropagation(); setShowAddCardPopup(true)}}>
                  Adicionar cards
                </button>
              </div>
            )
          }
          <div className='flex items-center space-x-3'>
            {
              showActions && (
                <button onClick={(e) => {e.stopPropagation(); study();}} className={`${cardsDue.length ? "transition outline-primary bg-primary text-white font-semibold hover:text-primary  hover:bg-transparent  cursor-pointer" : "font-normal outline-gray-300 bg-gray-300 text-gray-500" } flex items-center space-x-3 outline rounded-md px-3 py-1 `}>
                  Estudar
                </button>
              )
            }
            <div className={` ${cardsDue.length ? "font-bold" : "text-gray-500"}`}>{`${cardsDue.length === undefined ? '...' : cardsDue.length}`}</div>
          </div>
        </div>
      </div>

      {showSubDecks && 
        <div>
          {deck.subDecks.map((id, index) => (<Deck id={id} indent={indent + 1} key={index} refreshParent={() => refresh()}/>))}
        </div>
      }

      {showAddPopup && (
        <AddDeck parentDeck={id} parentName={deck.name} close={() => setShowAddPopup(false)} refresh={() => refresh()}/>
      )}

      {showRenamePopup && (
        <RenameDeck id={id} name={deck.name} close={() => setShowRenamePopup(false)} refresh={() => refresh()}/>
      )}

      {showRemovePopup && (
        <RemoveDeck parentDeck={id} parentName={deck.name} close={() => setShowRemovePopup(false)} refresh={() => refreshParent()}/>
      )}

      {showAddCardPopup && (
        <AddCard parentDeck={id} parentName={deck.name} close={() => setShowAddCardPopup(false)} refresh={() => refresh()}/>
      )}
    </>
  );
}; 

export default Deck;