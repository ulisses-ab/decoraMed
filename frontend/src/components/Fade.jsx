import React from 'react';

export default function Fade() {
    return (
        <div className='fixed h-full w-full -z-1'>
            <div className='bg-white h-1/4 w-full'>
            </div>
            <div className='bg-linear-to-t from-gray-200 to-transparent h-1/2 w-full'>
            </div>
            <div className='bg-gray-200 h-1/4 w-full'>
            </div>
        </div>
    )
}