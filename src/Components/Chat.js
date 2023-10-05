import React, { useContext, useEffect, useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { AiOutlineEllipsis } from 'react-icons/ai'
import Message from './Chat/Message'
import Prompt from './Chat/Prompt'
import ChatContext from './Context/ChatContext'

const Chat = ({ name, messages, tabKey }) => {
    const { isSettingsOpen } = useContext(ChatContext);
    const chatViewRef = useRef(null);
    const [prevMessageCount, setPrevMessageCount] = useState(messages.length);

    useEffect(() => {
        if (chatViewRef.current && prevMessageCount !== messages.length) {
            chatViewRef.current.scrollTop = chatViewRef.current.scrollHeight;
            setPrevMessageCount(messages.length);
        }
    }, [messages.length, prevMessageCount]);

    return (
        <div className={`chat-1 relative h-[95vh] flex flex-col items-center ${isSettingsOpen ? 'col-span-6' : 'col-span-9'} bg-primary text-xl text-white`}>
            {/* chat tab header */}
            <div className='flex w-full p-3'>
                <img src='https://i.giphy.com/media/Rlwz4m0aHgXH13jyrE/giphy.webp' className='mr-4 w-12 h-12 rounded-full' />
                <div className="flex-grow">
                    <h3 className="font-bold">{name}</h3>
                    <p className="truncate text-sm text-black/50 dark:text-white/50">9 members, 4 online</p>
                </div>
                <div className='flex items-center justify-center space-x-4'>
                    <BsSearch className={'text-2xl text-white/50'} />
                    <AiOutlineEllipsis className={'text-2xl text-white/50'} />
                </div>
            </div>
            {/* chat view */}
            <div ref={chatViewRef} className='chat-view grow overflow-x-hidden overflow-y-scroll w-full p-3'>
                {messages.map((messageData, index) => (
                    <Message
                        key={index}
                        isCurrentUser={messageData.isCurrentUser}
                        content={messageData.content}
                        reply={messageData.reply}
                    />
                ))}
            </div>
            <Prompt shouldShrink={!false} key={name} tabKey={tabKey} />
        </div>
    )
}

export default Chat