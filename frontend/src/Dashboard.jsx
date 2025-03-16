import { React, useState, useEffect } from 'react';
import { getUser } from './scripts/auth';
import Deck from './components/Deck';
import Navbar from './components/Navbar';
import { useAuth } from './authContext';
import { getDeck } from './scripts/decks';
import AddDeck from './components/AddDeck';
import { getDueCards } from './scripts/study';
import Fade from './components/Fade'

const Dashboard = () => {
  const { user, isLoggedIn } = useAuth();
  const [deck, setDeck] = useState({});
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [cardsDue, setCardsDue] = useState([]);

  useEffect(() => {
    if(isLoggedIn === false) window.location.href = '/';
    refresh();
  }, [isLoggedIn]);


  const refresh = async () => {
    const fetchDeck = async () => {
      try {
        setDeck(await getDeck(localStorage.getItem('token'), user.rootDeckId));
      }
      catch {
        console.log("err");
        setDeck(null);
      }
    }

    fetchDeck();

    const fetchCards = async () => {
      try {
        setCardsDue(await getDueCards(localStorage.getItem('token'), user.rootDeckId));
      }
      catch {
        setCardsDue([]);
      }
    }

    fetchCards();
  }

  const study = () => {
    if(cardsDue.length === 0) return;
    window.location.href = `/study/${user.rootDeckId}`;
  }
  
  return (
    <div className=''>
      <Fade />
      <Navbar destination='dashboard'/> 
      <div className="flex justify-center">
        <div className="w-2/3 p-8">
          <div className='flex flex-col mb-14 items-center'>
            <div className={`text-center text-3xl ${cardsDue.length === 0 ? "text-gray-500" : "text-primary font-bold"}`}>
              {cardsDue.length}
            </div>
            <div className={`text-center text-gray-900 mb-2`}>
              {cardsDue.length === 1 ? "card" : "cards"} para revisão
            </div>
            <button onClick={study} className={`h-10 w-1/2 ${cardsDue.length ? "ring ring-primary transition bg-primary text-white font-semibold hover:text-primary  hover:bg-transparent  cursor-pointer" : "font-normal bg-gray-300 text-gray-500" } rounded-md px-3 py-1 `}>
              Estudar
            </button>
          </div>
          
          <div className='flex items-center justify-between mb-5'>
            
            <div className='text-4xl font-bold text-gray-900'>
              Meus estudos
            </div>
            <button onClick={() => setShowAddPopup(true)} className='cursor-pointer text-primary font-semibold py-1 px-3 rounded-lg outline outline-primary  hover:bg-primary hover:text-white transition'>
              Adicionar baralho
            </button>
          </div>

          <div className='shadow-xl border border-gray-200 bg-gray-50 rounded-lg overflow-hidden'>
            {deck.subDecks?.map((id, index) => (<Deck id={id} indent={0} key={index} refreshParent={() => refresh()}/>))}
          </div>
        </div>
      </div>

      {
        showAddPopup && (
          <AddDeck parentDeck={user.rootDeckId} close={() => {setShowAddPopup(false)}} refresh={() => refresh()}/>
        )
      }
    </div>

    
  );
};

export default Dashboard;