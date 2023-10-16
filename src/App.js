import Pane from './Components/Pane'
import ChatLayout from './Components/ChatLayout'
import ThemeToggle from './Components/ThemeToggle'
import React, { useEffect, useState } from 'react'
import { socket } from './Components/Context/Socket';
import ChatContext from './Components/Context/ChatContext'
import Modal from './Components/Modal'

const App = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [isSettingsOpen, setSettingsOpen] = useState(false);
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [currentChatId, setCurrentChatId] = useState(null);
    const [user, setUser] = useState({
        _id: "651c64153e249ed2dcab1460",
        name: "punit verma",
        username: "punitverma"
    });

    const [users, setUsers] = useState([
        {
            _id: "652d5f9cabf9119a0fc9a375",
            userId: "651c64153e249ed2dcab1460",
            conversationName: "Sample Group",
            avatar: {
                type: "image",
                data: "https://i.giphy.com/media/xT39DgKMixPKDrwzf2/giphy.webp"
            },
            type: "group",
            recentMessage: null,
            recentMessageTime: null,
            unseenCount: 0,
            status: null
        },
        {
            _id: "652d5f9cabf9119a0fc9a376",
            userId: "651c64153e249ed2dcab1461",
            conversationName: "Ideas 💡",
            avatar: {
                type: "image",
                data: "https://i.giphy.com/media/LLYMoDblVhhjvjRBtj/giphy.webp"
            },
            type: "group",
            recentMessage: null,
            recentMessageTime: null,
            unseenCount: 0,
            status: null
        }
    ]);

    const [chatTabs, setChatTabs] = useState([
        {
            id: '652d5f9cabf9119a0fc9a375',
            name: "Sample Group",
            userId: 1
        },
        {
            id: '652d5f9cabf9119a0fc9a376',
            name: "Ideas 💡",
            userId: 2
        },
    ]);

    const [messages, setMessages] = useState({
        "652d5f9cabf9119a0fc9a375": [
            {
                at: "15:34",
                isCurrentUser: false,
                content: [
                    { type: "text", value: "user@98" },
                ],
                seen: ["651c64153e249ed2dcab1463"],
            }, {
                at: "19:03",
                isCurrentUser: false,
                content: [
                    { type: "text", value: "this is the username" },
                ],
                seen: ["651c64153e249ed2dcab1461"],
            }
        ],
        "652d5f9cabf9119a0fc9a376": [
            {
                at: "10:11",
                isCurrentUser: false,
                content: [
                    { type: "text", value: "Hey " },
                ],
                seen: ["651c64153e249ed2dcab1460"],
            },
        ],
    });

    const formatGroupData = (data) => {
        data.forEach(member => {
            member.recentMessage = null;
            member.recentMessageTime = null;
            member.unseenCount = 0;
            member.status = null;
        })
    }
    useEffect(() => {
        function onConnect(data) {
            // console.log(data)
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onMessage(newMessage) {
            console.log(newMessage)
            setMessages(prevMessages => {
                const updatedMessages = { ...prevMessages };
                if (!updatedMessages[1]) {
                    updatedMessages[1] = [];
                }
                updatedMessages[1].push(newMessage);
                return updatedMessages;
            });
        }
        socket.on("connect_error", err => console.log(err.data))
        socket.on('connected', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('new-message', onMessage);

        socket.emit('fetch-recent-data', {}, (result) => {
            const final = result.data;
            formatGroupData(final);
            console.log(final)
            setUsers(prev => [...prev, ...final])
            // setChatTabs(prev => [...prev, {
            //     id: 5,
            //     name: groupCreateData.groupName,
            //     userId: 1
            // }])
        });

        return () => {
            socket.off('connect_error', onConnect);
            socket.off('connected', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('new-message', onMessage);
        };
    }, []);

    return (
        <ChatContext.Provider value={{ socket, isSettingsOpen, setSettingsOpen, user, messages, setMessages, chatTabs, setChatTabs, users, setUsers, currentChatId, setCurrentChatId, showGroupModal, setShowGroupModal }}>
            <Modal isOpen={showGroupModal} setIsOpen={setShowGroupModal} />
            <Pane />
            <ThemeToggle />
            {/* <Register /> */}
            <ChatLayout />
        </ChatContext.Provider>
    )
}

export default App;
