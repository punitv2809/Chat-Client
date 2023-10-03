import React from 'react';
import { AiOutlineMinus, AiOutlineClose, AiOutlineBorder } from 'react-icons/ai';
import { TiArrowMaximiseOutline } from 'react-icons/ti';

const Pane = () => {
    return (
        <div className={`title-bar border-b border-secondary/25 h-[5vh] grid grid-cols-12 bg-secondary dark:bg-primary text-primary-dark dark:text-white`} style={{ WebkitAppRegion: 'drag' }}>
            <div className="col-span-3 flex items-center justify-start pl-2 bg-primary-darker app-title font-black uppercase text-purple-400 italic font-mono">
                <p>{process.env.REACT_APP_NAME}</p>
            </div>
            <div className='col-span-6'></div>
            <div className="col-span-3 flex items-center justify-end window-controls" style={{ WebkitAppRegion: 'no-drag' }}>
                <button
                    className="minimize-btn p-2 hover:bg-secondary-lighter dark:hover:bg-primary-lighter"
                    onClick={() => electron.windowApi.minimize()}
                >
                    <AiOutlineMinus />
                </button>
                <button
                    className="maximize-btn p-2 hover:bg-secondary-lighter dark:hover:bg-primary-lighter"
                    onClick={() => electron.windowApi.toggleMaximize()}
                >
                    <div className='w-3 h-3 rounded-full bg-ternary-darker'></div>
                </button>
                <button
                    className="close-btn p-2 text-ternary hover:bg-secondary-lighter dark:hover:bg-primary-lighter dark:text-ternary-dark"
                    onClick={() => electron.windowApi.close()}
                >
                    <AiOutlineClose />
                </button>
            </div>
        </div>
    );
}

export default Pane;
