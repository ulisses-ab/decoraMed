import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { use } from 'react';
import { useAuth } from './authContext';
import StudyComponent from './components/StudyComponent';
import ChartComponent from './components/ChartComponent';
import ChartComponent2 from './components/ChartComponent2';
import Footer from './components/Footer'
import run from './scripts/particles'
import SlidingCardsComponent from './components/SlidingCardsComponent';

const Home = () => {
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    if(isLoggedIn) {
      window.location.href = '/dashboard';
    }
  }, [isLoggedIn]);

  window.addEventListener('load', () => run());

  return (
    <>
      <Navbar />
      <canvas id='particle-canvas' className='absolute w-full h-100 -z-1'></canvas>

      <div className='flex flex-col items-left space-x-10 mt-10 h-100 bg-linear-to-t from-gray-200 to-transparent px-20'>
        <main  className="mt-10">
          <div className="max-w-3xl text-gray-900">
            <h1 className="text-4xl md:text-6xl font-bold ">Aprenda a não esquecer</h1>
            <p className="mt-4 text-xl font-normal">
              São mais de 6.200 flashcards com todo o conteúdo necessário para que você seja aprovado na sua residência médica dos sonhos.
            </p>

            <button onClick={() => {window.location.href = '/register'}} className='text-xl py-3.5 px-5 bg-primary mt-10 rounded-lg text-white font-semibold cursor-pointer outline outline-primary hover:bg-transparent hover:text-primary transition'>
              <span className='align-[2px]'>Comece agora</span>
            </button>
          </div>
        </main>
      </div>
      <main className='bg-gray-200 -z-1'>      
        <SlidingCardsComponent />
      </main>
      {/*<main className='flex flex-col items-center bg-gray-200 -z-1'>      
        <div className='shadow-2xl relative h-70 w-1/2 border-gray-300 border bg-white rounded-lg mt-40'>
          <StudyComponent />
        </div>
      </main>*/}

      <main className='flex flex-col items-center pt-25 pb-40 bg-linear-to-b from-gray-200 via-transparent via-58% to-transparent'>
        <div className='text-5xl md:text-[2.8em] font-bold mb-12 text-gray-900'>O seu cérebro foi feito para esquecer</div>
        <div className='flex justify-center sm:flex-col md:flex-row space-x-20 w-full mb-20 px-25'>
          <div className='w-170'>
            <div className='w-full h-130 flex flex-col items-center text-base relative'>
              <ChartComponent />
            </div>
          </div>
          <div className='h-1 md:w-1/2 sm:w-5/6 text-gray-900 text-xl break-words text-justify'>
            A curva do esquecimento é um conceito proposto pelo psicólogo alemão Hermann Ebbinghaus no final do século XIX. Ela descreve a tendência natural do ser humano de esquecer informações ao longo do tempo, especialmente nos estágios iniciais após o aprendizado.
            <br/><br/><span className='font-bold'>1. Aprendizado Inicial: </span>Após aprender algo novo, você retém parte desse conhecimento na memória de curto prazo.
            <br/><br/><span className='font-bold'>2. Decaimento Rápido: </span>Nos primeiros dias após o aprendizado, ocorre uma rápida perda de conhecimento. Se a informação não for revisada ou praticada ativamente, a retenção diminuirá significativamente em um curto espaço de tempo.
            <br/><br/><span className='font-bold'>3. Estabilização da Curva: </span>Após o período de decaimento rápido, a curva do esquecimento tende a se estabilizar. Isso significa que a taxa de esquecimento diminui gradualmente ao longo do tempo.
          </div>
        </div>
        <div className='text-5xl md:text-[2.8em] font-bold mb-12 text-gray-900'>Efeito da revisão repetida e espaçada</div>
        <div className='flex justify-center space-x-20 w-full px-25'>
          <div className='h-1 w-1/2 text-gray-900 text-xl break-words text-justify'>
            Ao revisar informações em intervalos específicos, o aluno ativa repetidamente a memória associada àquelas informações, fortalecendo as conexões neurais e obtendo:
            <div className='leading-7  mt-5 font-semibold'>
            • Retenção de conteúdo a longo prazo<br/>
            • Consolidação do conhecimento<br/>
            • Economia de tempo<br/>
            • Redução do stress<br/>
            </div>
          </div>
          <div className='w-170'>
            <div className='w-full h-80 flex flex-col items-center text-base relative'>
              <ChartComponent2 />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;