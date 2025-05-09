import React, { useState, useEffect } from 'react';
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
    ];
    
    const [displacement, setDisplacement] = useState(-120);
    const [isMobile, setIsMobile] = useState(false);

    // Check if device is mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        // Initial check
        checkIfMobile();
        
        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile);
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    // Scroll effect for desktop
    useEffect(() => {
        const handleScroll = () => {
            if (!isMobile) {
                setDisplacement(-window.scrollY * 2 - 120);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMobile]);


    return (
        <>
            {/* Desktop version - horizontal scrolling cards */}
            {!isMobile && (
                <div className='relative h-93 overflow-x-hidden'>
                    <div className='absolute' style={{left: `${displacement}px`, top: '2%'}}>
                        <div className='flex space-x-5'> 
                            {cards.map((card, index) => (
                                <div className='bg-gray-50 w-100 h-80 shadow-xl rounded-lg border border-gray-200' key={index}> 
                                    <StudyComponent cards={[card]} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile version - single card with navigation */}
            {isMobile && (
                <div className='py-8 px-4'>
                    <div className='bg-gray-50 w-full h-80 shadow-xl rounded-lg border border-gray-200 mb-4'> 
                        <StudyComponent cards={cards.slice(0, 4)} />
                    </div>
                </div>
            )}
        </>
    );
};

export default SlidingCardsComponent;
