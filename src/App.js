import Chat from './Components/Chat'
import Pane from './Components/Pane'
import ChatLayout from './Components/ChatLayout'
import ThemeToggle from './Components/ThemeToggle'
import React, { useEffect, useState } from 'react'
import { socket } from './Components/Context/Socket';
import ChatContext from './Components/Context/ChatContext'

const App = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);

    const [currentChatId, setCurrentChatId] = useState(null);

    const [users, setUsers] = useState([
        {
            id: 1,
            avatar: "https://i.giphy.com/media/Rlwz4m0aHgXH13jyrE/giphy.webp",
            name: "John Doe",
            recentMessage: "Hey, how's it going?",
            recentMessageTime: "2m ago",
            unseenCount: 5,
            active: true,
            status: 'online'
        },
        {
            id: 2,
            avatar: "https://i.giphy.com/media/qghdusmfvfjri/giphy.webp",
            name: "Ostrich",
            recentMessage: "Hey, how's it going?",
            recentMessageTime: "2m ago",
            unseenCount: 7,
            active: true,
            status: 'online'
        }
    ]);

    const [chatTabs, setChatTabs] = useState([
        {
            id: 1,
            name: "Cool Group",
            userId: 1
        },
        {
            id: 2,
            name: "New Group",
            userId: 2
        },
    ]);

    const [messages, setMessages] = useState({
        1: [
            {
                isCurrentUser: false,
                content: [
                    { type: "text", value: "user@98" },
                ],
            }, {
                isCurrentUser: false,
                content: [
                    { type: "text", value: "this is the username" },
                ],
            }
        ],
        2: [
            {
                isCurrentUser: false,
                content: [
                    { type: "text", value: "Hey " },
                ],
            },
        ],
    });


    useEffect(() => {
        function onConnect(data) {
            console.log(data)
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

        return () => {
            socket.off('connect_error', onConnect);
            socket.off('connected', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('new-message', onMessage);
        };
    }, []);

    return (
        <ChatContext.Provider value={{ socket, messages, setMessages, chatTabs, setChatTabs, users, setUsers, currentChatId, setCurrentChatId }}>
            <Pane />
            <ThemeToggle />
            {/* <Register /> */}
            <ChatLayout />
        </ChatContext.Provider>
    )
}

export default App;
