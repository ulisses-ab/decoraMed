import React, { useState } from 'react';
import StudyComponent from './StudyComponent';

const SlidingCardsComponent = () => {
    const cards = [
        {
            type: "Básico",
            front: "Qual é o antídoto utilizado na intoxicação por heparina não fracionada?",
            back: "Sulfato de protamina",
        },
        {
          type: "Básico",
          front: "Qual é o agente etiológico do linfogranuloma venéreo?",
          back: "Chlamydia trachomatis",
        },
        {
          type: "Básico",
          front: "Quais são as estruturas clampeadas na manobra de Pringle?",
          back: `1. Veia porta\n2. Artéria hepática\n3. Colédoco`,
        },
        {
          type: "Básico",
          front: "Como são as calcificações cerebrais na infecção congênita por zika?",
          back: "Calcificações periventriculares",
        },
        {
            type: "Básico",
            front: "Como são as calcificações cerebrais na infecção congênita por zika?",
            back: "Calcificações periventriculares",
        },
        {
            type: "Básico",
            front: "Como são as calcificações cerebrais na infecção congênita por zika?",
            back: "Calcificações periventriculares",
        },
        {
            type: "Básico",
            front: "Como são as calcificações cerebrais na infecção congênita por zika?",
            back: "Calcificações periventriculares",
        },
        {
            type: "Básico",
            front: "Como são as calcificações cerebrais na infecção congênita por zika?",
            back: "Calcificações periventriculares",
        },
        {
            type: "Básico",
            front: "Como são as calcificações cerebrais na infecção congênita por zika?",
            back: "Calcificações periventriculares",
        },
        {
            type: "Básico",
            front: "Como são as calcificações cerebrais na infecção congênita por zika?",
            back: "Calcificações periventriculares",
        },
        {
            type: "Básico",
            front: "Como são as calcificações cerebrais na infecção congênita por zika?",
            back: "Calcificações periventriculares",
        },
    ]
    const [displacement, setDisplacement] = useState(-120);

    document.addEventListener('scroll', (e) => {
        setDisplacement(-window.scrollY * 2 - 120);
    })  

    return (<>
        <div className='relative h-93 overflow-x-hidden'>
            <div className='absolute' style={{left: `${displacement}px`, top: '2%',}}>
                <div className='flex space-x-5'> 
                    {cards.map((card, index) => (
                        <div className='bg-gray-50 w-100 h-80 shadow-xl rounded-lg border border-gray-200' key={index}> 
                            <StudyComponent cards={[card]} />
                        </div>
                    ))}
                </div>
            </div>
        </div>


    </>)
};

export default SlidingCardsComponent