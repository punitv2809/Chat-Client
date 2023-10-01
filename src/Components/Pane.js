import React from 'react';
import { AiOutlineMinus, AiOutlineClose, AiOutlineBorder } from 'react-icons/ai';

const Pane = () => {
    return (
        <div className={`title-bar h-[5vh] p-2 flex items-center justify-between bg-secondary dark:bg-primary text-primary-dark dark:text-white`} style={{ WebkitAppRegion: 'drag' }}>
            <div className="app-title">{process.env.REACT_APP_NAME}</div>
            <div className="window-controls" style={{ WebkitAppRegion: 'no-drag' }}>
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
                    <AiOutlineBorder />
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
