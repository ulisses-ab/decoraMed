import React, { useEffect, useRef, useState } from 'react';
import logo2 from './../assets/logo2.png';
import { useAuth } from './../authContext';
import { FaUserCircle, FaUser } from 'react-icons/fa';
import { IoIosArrowDown } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar({ destination = '' }) {
  const { user, isLoggedIn, logout } = useAuth();
  const dropdownRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const actionButtons = [
    { 
      name: 'Entrar', 
      href: 'login',
      classNames: 'hover:text-white hover:bg-primary bg-transparent -m-2'
    },
    {
      name: 'Comece agora',
      href: 'register',
      classNames: 'text-white bg-primary hover:bg-transparent hover:text-primary'
    }
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleClickOutside = (event) => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const sendHome = () => {
    window.location.href = `/${destination}`;
  }

  return (
    <>
      <div className='h-16'></div>
      <nav className="text-primary p-3 border border-gray-300 bg-white z-10 fixed top-0 w-full shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <a onClick={sendHome} className="text-2xl font-bold flex items-center cursor-pointer">
            <img 
              src={logo2} 
              className='h-10 mr-2' 
              style={{filter: "brightness(0) saturate(100%) invert(12%) sepia(68%) saturate(4969%) hue-rotate(241deg) brightness(92%) contrast(110%)"}}
            />
            <div className='invisible sm:visible'>
              DecoraMed
            </div>

          </a>
          
          <div>
            {isLoggedIn ? (
              <div className='relative select-none' onClick={(e) => e.stopPropagation()}>
                <div 
                  className='flex space-x-2 items-center cursor-pointer'
                  onClick={toggleDropdown}
                >
                  <p className='font-semibold text-gray-900'>{user.name}</p>
                  <IoIosArrowDown className='text-gray-900'/>
                </div>
                {dropdownOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md cursor-pointer overflow-hidden shadow-lg'>
                    <a onClick={() => { logout(); window.location.href = '/';}} className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Sair</a>
                  </div>
                )}
              </div>
            ) : (
              <ul className="flex space-x-6">
                {actionButtons.map((button) => (
                  <li key={button.name}>
                    <a 
                      href={button.href}
                      className={`transition font-medium py-2.5 px-3.5 rounded-md outline outline-primary ${button.classNames}`}
                    >
                      <span className='align-[1px]'>{button.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white z-10 border-b border-gray-300 shadow-lg">
          {isLoggedIn ? (
            <div className="p-4">
              <p className="font-semibold text-gray-900 mb-2">{user.name}</p>
              <a 
                onClick={() => { 
                  logout(); 
                  window.location.href = '/';
                  setMobileMenuOpen(false);
                }} 
                className="block py-2 text-gray-800 hover:text-primary cursor-pointer"
              >
                Sair
              </a>
            </div>
          ) : (
            <div className="p-4 flex flex-col space-y-4">
              {actionButtons.map((button) => (
                <a 
                  key={button.name}
                  href={button.href}
                  className={`transition font-medium py-2.5 px-3.5 rounded-md outline outline-primary text-center ${button.classNames}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className='align-[1px]'>{button.name}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
