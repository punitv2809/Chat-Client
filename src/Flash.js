import React from 'react';
import { AiOutlineMinus, AiOutlineClose, AiOutlineBorder } from 'react-icons/ai';
import { TiArrowMaximiseOutline } from 'react-icons/ti';

const Flash = () => {
    return (
        <div className='text-xl flex-col flex gap-4 items-center uppercase font-black justify-center w-screen h-screen bg-primary text-white/50'>
            <p>the flash_message</p>
            <button onClick={() => electron.flashMessageApi.show()} className='bg-ternary-darker rounded-md p-3'>send a flash Message</button>
        </div>
    );
}

export default Flash;
