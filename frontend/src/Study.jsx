import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { useAuth } from './authContext'; 
import { getDueCards, getTimes, putStudy } from './scripts/study';
import { getDeck } from './scripts/decks';
import { useParams } from 'react-router-dom';
import RemoveCard from './components/RemoveCard';
import EditCard from './components/EditCard';
import confetti from 'canvas-confetti';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import Fade from './components/Fade'

const FeedbackButton = ({ color, text, time, onClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{color: hover ? color : 'white', backgroundColor: hover ? 'transparent' : color, outline:`solid 1px ${color}`}} className={`w-30 py-3 rounded-md text-white transition hover:bg-white cursor-pointer font-semibold`}>
      <p>{text}</p>
      <p className='text-base -mt-1 font-normal'>{time}</p>
    </button>
  )
}

const Study = () => {
  const { user, isLoggedIn } = useAuth();
  const [ deck, setDeck ] = useState({});
  const [ cardsDue, setCardsDue ] = useState([]);
  const { id } = useParams();
  const [ cardsEnded, setCardsEnded ] = useState(false);
  const [ showAnswer, setShowAnswer ] = useState(false);
  const [ times, setTimes ] = useState([]);

  useEffect(() => {
    if(isLoggedIn === false) window.location.href = '/login';
    if(isLoggedIn === true) refresh();
  }, [isLoggedIn]);


  const refresh = async () => {
    const fetchDeck = async () => {
      try {
        setDeck(await getDeck(localStorage.getItem('token'), id));
      }
      catch {
        console.log("err");
        setDeck(null);
      }
    }

    fetchDeck();

    const fetchCards = async () => {
      try {
        let cd = await getDueCards(localStorage.getItem('token'), id)
        setCardsDue(cd);
        console.log(cd);
        if(cd.length === 0) {
          setCardsEnded(true);
        }
        else {
          setTimes(await getTimes(localStorage.getItem('token'), cd[0]._id));
        }

        return cd.length;
      }
      catch {
        setCardsDue([]);
      }

      return false;
    }
    
    return await fetchCards();
  }

  const nextCard = async () => {
    cardsDue.shift();
    setCardsDue(cardsDue);

    if(cardsDue.length === 0) {
      const qtd = await refresh();
      if(qtd == 0) {
        confetti({
          particleCount: 200,
          spread: 700,
          origin: {
            y: 0.6
          }
        });
      }
    }
    else {
      setTimes(await getTimes(localStorage.getItem('token'), cardsDue[0]._id));
    }
  }

  const handleShowAnswer = async () => {
    setShowAnswer(true);
  }

  const timeString = (time) => {
    if(time < 60) return `${time} min(s)`
    else if(time < 1440) return `${Math.floor(time/60)} hora(s)`
    else if(time < 43200) return `${Math.floor(time/1440)} dias(s)`
    else return `${Math.floor(time/43200)} mes(es)`

  }

  const handleStudy = async function(difficulty) {
    putStudy(localStorage.getItem('token'), cardsDue[0]._id, difficulty)
    setShowAnswer(false);
    nextCard();
  }
  
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleClickOutside = (event) => {
    setShowOptions(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
  }, []);

  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleDelete = () => {
    setShowRemovePopup(true);
  }

  const handleEdit = () => {
    setShowEditPopup(true);
  }

  const sendDashboard = () => {
    window.location.href = '/dashboard';
  }

  return (
    <>
      <Navbar />
      <Fade />
      <div className='flex justify-center'>
        <div className='flex flex-col w-full py-5'>
          {
            cardsEnded ? (
              <div className='flex items-center justify-center flex-col mt-23 rounded-lg text-center text-xl'>
                <MdVerified className='text-[10em] text-green-500'/>
                <p className='font-bold text-4xl text-gray-900'>
                  Parabéns, você concluiu a revisão!
                </p>
                <p className='text-lg'>
                  Em breve novos cards estarão disponíveis
                </p>
              </div>
            ) 
            : (
              <>
                <div className='flex items-center flex-col h-80 rounded-lg text-center text-xl'>
                  <div className='break-words w-2/3'>{cardsDue[0]?.front}</div>
                  { showAnswer && (
                    <>
                      <div className='mx-10 my-5 w-full border-gray-300 border-t'>
                      </div>
                      <div className='break-words w-2/3'>{cardsDue[0]?.back}</div>
                    </>
                  )}
                </div>
              </>

            )
          }
        </div>
      </div>
      {
        
        <div className='fixed flex items-center px-8 justify-between w-full bottom-0 h-30 border-t bg-gray-100 border-gray-200' style={{boxShadow: '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'}}>
          <div className='w-24 h-10'>

          </div>
          {
            
            cardsEnded ? (<>
              <button onClick={sendDashboard} className='ring ring-primary py-5 text-xl font-semibold px-16 transition bg-primary text-white cursor-pointer hover:bg-transparent hover:text-primary rounded-lg'>
                Continuar
              </button>
            </>) :
            showAnswer ? (
              <div className='flex space-x-2 rounded-2xl p-3 text-lg'>
                {
                  [
                    { text: "De novo", color: "oklch(0.577 0.245 27.325)" }, 
                    { text: "Difícil", color: "oklch(0.75 0.183 55.934)" }, 
                    { text: "Bom", color: "oklch(0.627 0.194 149.214)" }, 
                    { text: "Fácil", color: "oklch(0.623 0.214 259.815)" }
                  ].map((el, index) => (
                    <FeedbackButton onClick={() => handleStudy(index + 1)} key={index} color={el.color} text={el.text} time={timeString(times[index])}/>
                    
                  ))
                }
                
              </div>
            ) : (
              <button onClick={handleShowAnswer} className='ring ring-primary py-5 text-xl font-semibold px-16 transition bg-primary text-white cursor-pointer hover:bg-transparent hover:text-primary rounded-lg'>
                Mostrar resposta
              </button>
            )
          }
          <div className='relative' onClick={(e) => e.stopPropagation()}>
            {cardsEnded ? (<div className='w-24 h-10'></div>) : (<button onClick={toggleOptions} className='ring ring-primary w-24 py-1 font-semibold transition hover:bg-primary hover:text-white cursor-pointer bg-transparent text-primary rounded-lg'>
              Opções ▴
            </button>)}
            {showOptions && (
              <div className='absolute right-0 bottom-10 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden'>
                <ul>
                  <li onClick={handleEdit} className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Editar card</li>
                  <li onClick={handleDelete} className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Deletar card</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        
      }
      {showRemovePopup && (
        <RemoveCard id={cardsDue[0]._id} close={() => setShowRemovePopup(false)} refresh={() => nextCard()}/>
      )}

      {showEditPopup && (
        <EditCard id={cardsDue[0]._id} close={() => setShowEditPopup(false)} refresh={() => refresh()}/>
      )}
    </>
  );
};

export default Study;