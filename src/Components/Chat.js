import React, { useContext, useEffect, useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { LiaTimesSolid } from 'react-icons/lia'
import Message from './Chat/Message'
import Prompt from './Chat/Prompt'
import ChatContext from './Context/ChatContext'
import Search from './Search'
import MemberSettings from './MemberSettings'

const Chat = ({ chatTabId, name, messages, tabKey, typing }) => {
    const { setSettingsContent, isSettingsOpen, users, setSettingsOpen } = useContext(ChatContext);
    const chatViewRef = useRef(null);
    const [prevMessageCount, setPrevMessageCount] = useState(messages.length);
    const [isSearching, setIsSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredMessages = messages.filter((message) =>
        message.content.some((segment) =>
            segment.type === "text" && segment.value.includes(searchTerm)
        )
    );

    const [reply, setReply] = useState({ name: 'punit' });

    useEffect(() => {
        if (chatViewRef.current && prevMessageCount !== messages.length) {
            chatViewRef.current.scrollTop = chatViewRef.current.scrollHeight;
            setPrevMessageCount(messages.length);
        }
    }, [messages.length, prevMessageCount]);
    const getInitials = (name) => {
        let words = null;
        let value = name.split(' ').filter(w => w.trim());
        if (value.length > 1) {
            words = value[0][0] + value[1][0];
        } else if (value.length === 1 && value[0].length > 1) {
            words = value[0][0] + value[0][1];
        }
        return words
    }
    const renderAvatar = () => {
        const avatar = users.find(user => user._id === tabKey).avatar;
        console.log(tabKey)
        if (avatar.type === "image") {
            return <img src={avatar.data} alt="member avatar" className="mr-4 w-12 h-12 rounded-full" />;
        } else if (avatar.type === "gradient") {
            // return <div style={{ backgroundImage: avatar.data }} className="w-12 h-12 rounded-full">
            return <div className='initials bg-contain bg-center w-12 h-12 rounded-full flex items-center justify-center text-xl font-black tracking-wider uppercase' style={
                {
                    backgroundImage: avatar.data,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center'
                }
            }>
                <p>{getInitials(conversationName)}</p>
            </div>;
        }
        return null;
    };
    const getTyping = (typing) => {
        if (!typing) return '';

        if (typing.length === 1) {
            return typing[0] + ' is typing';
        } else if (typing.length === 2) {
            return typing.join(' & ') + ' are typing';
        } else if (typing.length > 2) {
            const othersCount = typing.length - 2;
            return typing.slice(0, 2).join(', ') + ` & ${othersCount} others are typing`;
        }
        return typing.join(' & ') + ' are typing';
    }

    return (
        <div className={`chat-1 relative h-[95vh] flex flex-col items-center ${isSettingsOpen ? 'col-span-6' : 'col-span-9'} bg-primary text-xl text-white`}>
            {/* chat tab header */}
            <div className='flex w-full p-3'>
                {renderAvatar()}
                <div className="flex-grow cursor-pointer max-w-fit" onClick={() => {
                    if (isSearching) {
                        setIsSearching(!isSearching)
                    }
                    setSettingsContent(<MemberSettings member={users.find(user => user._id === tabKey)} />)
                    setSearchTerm('');
                    if (!isSettingsOpen) {
                        setSettingsOpen(true);
                    }
                }}>
                    <h3 className="font-bold">{name}</h3>
                    <p className="truncate text-sm text-black/50 dark:text-white/50">
                        9 members, 4 online
                        <span className='typing italic ml-2 text-orange-400'>{getTyping(typing)}</span>
                    </p>
                </div>
                <div className='grow'></div>
                <div className='flex items-center justify-center space-x-4'>
                    {!isSearching && <BsSearch onClick={() => {
                        if (isSettingsOpen) {
                            setSettingsOpen(!isSettingsOpen);
                        }
                        setIsSearching(!isSearching)
                    }} className={'text-xl cursor-pointer text-white/50'} />}
                    {isSearching && <LiaTimesSolid onClick={() => {
                        if (isSettingsOpen) {
                            setSettingsOpen(!isSettingsOpen);
                        }
                        setSearchTerm('');
                        setIsSearching(!isSearching)
                    }} className={'text-xl cursor-pointer text-white/50'} />}
                    {isSearching && <Search
                        padding='p-2'
                        showIcon={false}
                        textClass='text-sm'
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm} />}
                    <AiOutlineEllipsis className={'text-xl text-white/50'} />
                </div>
            </div>
            {/* chat view */}
            <div ref={chatViewRef} className='chat-view grow overflow-x-hidden overflow-y-scroll w-full p-3'>
                {filteredMessages.map((messageData, index) => (
                    <Message
                        chatTabId={chatTabId}
                        messageId={messageData._id}
                        key={index}
                        isCurrentUser={messageData.isCurrentUser}
                        content={messageData.content}
                        reactions={messageData.reactions}
                        reply={messageData.reply}
                        replyState={setReply}
                    />
                ))}
            </div>
            <Prompt reply={reply} replyState={setReply} shouldShrink={!false} key={name} tabKey={tabKey} />
        </div>
    )
}

export default Chat