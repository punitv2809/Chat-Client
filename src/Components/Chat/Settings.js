import React, { useContext } from 'react';
import ChatContext from '../Context/ChatContext';
import { FaCaretRight } from 'react-icons/fa';

const Settings = ({ isOpened = false }) => {
    const { settingsContent, isSettingsOpen, setSettingsOpen } = useContext(ChatContext);
    return (
        isOpened ? (
            <div className="block space-y-2 p-3 col-span-3 h-[95vh] bg-primary-darker">
                <div>
                    <button onClick={() => setSettingsOpen(!isSettingsOpen)} className='text-2xl text-white/50 hover:bg-primary-lighter active:scale-90 bg-primary-lighter p-2 rounded-md'>
                        <FaCaretRight className='text-sm' />
                    </button>
                </div>
                {settingsContent}
            </div>
        ) : null
    );
};

export default Settings;
