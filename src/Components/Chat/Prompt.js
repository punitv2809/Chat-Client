import React, { useContext, useRef, useState } from 'react';
import { TiAttachmentOutline } from 'react-icons/ti';
import { BiSubdirectoryRight } from 'react-icons/bi';
import { motion } from 'framer-motion';
import ChatContext from '../Context/ChatContext';
import Message from '../../Models/Message';

const Prompt = ({ reply = {}, tabKey }) => {
    console.log("prompt : ", reply);
    const { messages, setMessages, socket, isSettingsOpen } = useContext(ChatContext)

    const inputRef = useRef();

    const sendMessage = () => {
        const msg = String(inputRef.current.value).trim();
        if (!msg) return;

        const newMessage = {
            isCurrentUser: true,
            content: [
                { type: "text", value: msg },
            ]
        }
        console.log("tab key", tabKey)

        setMessages(prevMessages => {
            const updatedMessages = { ...prevMessages };
            if (!updatedMessages[tabKey]) {
                updatedMessages[tabKey] = [];
            }
            updatedMessages[tabKey].push(newMessage);
            return updatedMessages;
        });
        console.log(socket)

        socket.emit('new-message', new Message({
            id: "12345",
            content: msg,
            senderId: 1,
            recipientId: 2,
            recipientType: "user",
            timestamp: "2023-10-01T12:00:00.000Z",
            isEdited: true,
            isDeleted: false,
            contentType: "text",
            metadata: {
                fontSize: "16px",
                color: "blue"
            },
            groupId: "67890"
        }));

        inputRef.current.value = '';
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    return (
        <motion.div
            className={`bg-prompt ${isSettingsOpen ? 'w-10/12' : 'w-9/12'} text-sm flex items-center justify-center absolute bottom-0 m-3 mb-12 p-3`}
            style={{ height: "3rem", borderRadius: "0.375rem" }}
        >
            {(
                <>
                    <TiAttachmentOutline className='text-2xl mr-2' />
                    <input onKeyPress={handleKeyPress} defaultValue={reply.name ?? ''} ref={inputRef} type='text' className='bg-transparent grow outline-none' placeholder='Message' />
                    <button onClick={sendMessage} className='dark:hover:bg-secondary-darker/25 rounded-md'>
                        <BiSubdirectoryRight className='text-2xl rounded-md' />
                    </button>
                </>
            )}
        </motion.div>
    );
}

export default Prompt;