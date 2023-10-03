import React, { useContext } from 'react'
import Search from './Search'
import MemberTile from './Chat/MemberTile'
import ChatContext from './Context/ChatContext';
import { AnimatePresence } from 'framer-motion';

const SideBar = () => {
    const { currentChatId, setCurrentChatId, users, setUsers } = useContext(ChatContext);
    const add = () => {
        const newMember = {
            id: members[members.length - 1].id + 1,
            avatar: "https://i.giphy.com/media/Rlwz4m0aHgXH13jyrE/giphy.webp",
            name: "John Doe",
            recentMessage: "Hey, how's it going?",
            recentMessageTime: "2m ago",
            unseenCount: 500,
            active: false,
            status: 'online'
        };

        setMember(prevMembers => [newMember, ...prevMembers]);
    }
    return (
        <div className={'col-span-3 h-[95vh] flex flex-col bg-primary-darker'}>
            <div className={'p-3'}>
                <Search />
            </div>
            <div className={'members-tile space-y-2 p-3 grow overflow-x-hidden scroll-smooth overflow-auto'}>
                <AnimatePresence>
                    {
                        users.map(
                            member => (
                                <MemberTile
                                    key={member.id}
                                    avatar={member.avatar}
                                    name={member.name}
                                    recentMessage={member.recentMessage}
                                    recentMessageTime={member.recentMessageTime}
                                    unseenCount={member.unseenCount}
                                    active={currentChatId === member.id}
                                    status={member.status ?? 'offline'}
                                    setCurrentChatId={() => setCurrentChatId(member.id)}
                                />)
                        )
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

export default SideBar
