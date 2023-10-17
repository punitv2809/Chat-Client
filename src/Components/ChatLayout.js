import React, { useContext, useState } from 'react'
import SideBar from './SideBar'
import Settings from './Chat/Settings'
import ChatContext from './Context/ChatContext';
import Chat from './Chat';
import Modal from './Modal';

const ChatLayout = () => {
    const { chatTabs, currentChatId, messages, isSettingsOpen } = useContext(ChatContext);
    const chatTab = chatTabs.find(chat => chat.id === currentChatId);
    console.log(chatTab && chatTab.id);

    return (
        <>
            {/* <Modal /> */}
            <div className={'w-screen h-[95vh] grid grid-cols-12'}>
                {/* <button onClick={() => setSettingsOpen(!isSettingsOpen)} className='fixed top-0 z-30 bg-rose-500 m-14'>Settings</button> */}
                <SideBar />
                {
                    (chatTab && <Chat key={chatTab.id} typing={chatTab.typing} name={chatTab.name} tabKey={chatTab.id} messages={messages[chatTab.id] ?? []} />)
                    ?? <div className={`${isSettingsOpen ? 'col-span-6' : 'col-span-9'} flex items-center justify-center bg-primary`}>
                        <div className='rounded-md text-white/50 p-3'>
                            <p>Open any chat from the side bar</p>
                        </div>
                    </div>}
                <Settings isOpened={isSettingsOpen} />
            </div>
        </>
    )
}

export default ChatLayout
