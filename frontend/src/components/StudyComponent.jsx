import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const FeedbackButton = ({ color, text, time, onClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{color: hover ? color : 'white', backgroundColor: hover ? 'transparent' : color, outline:`solid 1px ${color}`}} className={`w-21 h-12 py-1 rounded-md text-white transition hover:bg-white cursor-pointer font-semibold`}>
      <p>{text}</p>

    </button>
  )
}

const StudyComponent = ({ cards }) => {
  const [ cardsDue, setCardsDue ] = useState(cards);
  const [ cardsEnded, setCardsEnded ] = useState(false);
  const [ showAnswer, setShowAnswer ] = useState(false);
  const [ times, setTimes ] = useState([1, 30, 720, 6000]);
  let lastDiff = 3;

  const nextCard = async () => {
    const card = cardsDue[0];
    cardsDue.shift();
    console.log(lastDiff)
    if(lastDiff === 1) {
      cardsDue.push(card);
    }
    setCardsDue(cardsDue);

    if(cardsDue.length === 0) {
        setCardsEnded(true);
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
    lastDiff = difficulty;
    setShowAnswer(false);
    nextCard();
  }

  return (
    <div className='relative w-full h-full'>
        <div className='flex justify-center'>
          <div className='flex card flex-col w-full'>
            {
              cardsEnded ? (
                <div className='flex h-full w-full items-center justify-center text-green-500 absolute'>
                  <div className='flex flex-col items-center text-xl font-semibold text-gray-900 text-center'>
                    <FaCheck className='text-[7em] text-primary mb-2'/>
                    <div className='block sm:hidden'>
                      Comece agora<br/>para mais flashcards como esses
                    </div>
                  </div>
                </div>
              ) 
              : (
                <>
                  <div className='mt-5 flex items-center flex-col rounded-lg text-center text-xl'>
                    <div className='break-words w-5/6'>{cardsDue[0]?.front}</div>
                    { showAnswer && (
                      <>
                        <div className='mx-10 my-5 w-full border-gray-300 border-t'>
                        </div>
                        <div className='break-words w-5/6' style={{whiteSpace: "pre-line"}}>{cardsDue[0]?.back}</div>
                      </>
                    )}
                  </div>
                </>

              )
            }
          </div>
        </div>
        {
          !cardsEnded && (
            <div className='absolute bottom-0 w-full h-20 border-t border-gray-300'>
              
              {
                showAnswer ? (
                  <div className='flex items-center justify-center h-full space-x-2 rounded-2xl p-3 text-lg'>
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
                  <div className='flex flex-col items-center justify-center h-full'>
                    <button onClick={handleShowAnswer} className='ring ring-primary py-2 text-xl font-semibold px-16 transition hover:bg-primary hover:text-white cursor-pointer text-primary rounded-lg'>
                      Mostrar resposta
                    </button>
                  </div>
                )
              }
            </div>
          )
        }
    </div>
  );
};

export default StudyComponent;