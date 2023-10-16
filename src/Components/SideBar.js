import React, { useContext, useState } from 'react'
import Search from './Search'
import MemberTile from './Chat/MemberTile'
import ChatContext from './Context/ChatContext';
import { AnimatePresence } from 'framer-motion';
import { BiGroup } from 'react-icons/bi';
import { AiFillSetting } from 'react-icons/ai';
import Modal from './Modal';

const SideBar = () => {
    const { showGroupModal, setShowGroupModal, currentChatId, setCurrentChatId, users, setUsers, isSettingsOpen, setSettingsOpen } = useContext(ChatContext);
    console.log(users)
    return (
        <>
            <div className={'col-span-3 h-[95vh] flex flex-col bg-primary-darker'}>
                <div className={'p-3'}>
                    <Search />
                </div>
                <div className='p-3 flex items-center justify-start gap-2'>
                    <button onClick={() => setShowGroupModal(!showGroupModal)} className='text-2xl text-white/50 hover:bg-primary-lighter active:scale-90 bg-primary-lighter/75 p-2 rounded-md'>
                        <BiGroup />
                    </button>
                    <button onClick={() => { setSettingsOpen(!isSettingsOpen) }} className='text-2xl text-white/50 hover:bg-primary-lighter active:scale-90 bg-primary-lighter/75 p-2 rounded-md'>
                        <AiFillSetting />
                    </button>
                </div>
                <div className={'members-tile space-y-2 p-3 grow overflow-x-hidden scroll-smooth overflow-auto'}>
                    <AnimatePresence>
                        {
                            users.map(
                                member => (
                                    <MemberTile
                                        id={member._id}
                                        key={member._id}
                                        avatar={member.avatar}
                                        conversationName={member.conversationName}
                                        recentMessageTime={member.recentMessageTime}
                                        active={currentChatId === member._id}
                                        status={member.status ?? 'offline'}
                                        seen={member.seen}
                                        setCurrentChatId={() => setCurrentChatId(member._id)}
                                    />)
                            )
                        }
                    </AnimatePresence>
                </div>
            </div>
        </>
    )
}

export default SideBar
