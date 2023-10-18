import React, { useContext, useRef, useState } from 'react';
import { TiAttachmentOutline } from 'react-icons/ti';
import { BiSubdirectoryRight } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';
import ChatContext from '../Context/ChatContext';
import Message from '../../Models/Message';
import { FaTimesCircle } from 'react-icons/fa';

const Prompt = ({ reply = {}, replyState, tabKey }) => {
    console.log("prompt : ", reply);
    const { messages, setMessages, socket, isSettingsOpen } = useContext(ChatContext)

    const inputRef = useRef(null);

    const sendMessage = () => {
        const msg = String(inputRef.current.value).trim();
        if (!msg) return;

        const newMessage = {
            isCurrentUser: true,
            content: [
                { type: "text", value: msg, at: '20:15' },
            ],
            at: '19:40',
            seen: [],
            reactions: {}
        }
        // if this was a reply
        if (Object.keys(reply).length) {
            newMessage.repliedTo = reply._id;
        }
        console.log("tab key", tabKey)
        console.log("message", newMessage);
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
        replyState({})
    }

    // Function to handle animating in
    const animateIn = { opacity: 1, y: 0 };
    // Function to handle animating out
    const animateOut = { opacity: 0, y: 20 };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }
    const handleClose = () => {
        // Animate out when the close button is clicked
        replyState({});
    }

    return (
        <div className={`absolute ${isSettingsOpen ? 'w-10/12' : 'w-9/12'} transition-all duration-300 bottom-0 m-3 mb-12 bg-prompt rounded-md`}>
            <AnimatePresence> {/* Use AnimatePresence */}
                {Boolean(Object.keys(reply).length) && Boolean(reply.content) && (
                    <motion.div
                        className='border-b border-white/25 w-full mb-1 p-3  rounded-t-md text-sm'
                        initial={animateOut} // Initial animation state
                        animate={animateIn} // Animate state
                        exit={animateOut} // Animate out state
                        transition={{ duration: 0.2 }}
                        onAnimationStart={() => { inputRef.current.focus() }}
                    >
                        <div className='flex items-center justify-start gap-1'>
                            <FaTimesCircle onClick={handleClose} className='cursor-pointer text-lg mr-1' />
                            <p className='text-white/50'>replying to </p>
                            <p className='text-purple-400 capitalize font-bold'>{reply.name ?? ""}</p>
                        </div>
                        <div className='content px-3 py-1'>
                            <p>{reply.content}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                className={` text-sm flex items-center justify-center p-3`}
                style={{ height: "3rem", borderRadius: "0.375rem" }}
            >
                {(
                    <>
                        <TiAttachmentOutline className='text-2xl mr-2' />
                        <input onKeyPress={handleKeyPress} ref={inputRef} type='text' className='bg-transparent grow outline-none' placeholder='Message' />
                        <button onClick={sendMessage} className='dark:hover:bg-secondary-darker/25 rounded-md'>
                            <BiSubdirectoryRight className='text-2xl rounded-md' />
                        </button>
                    </>
                )}
            </motion.div>
        </div>
    );
}

export default Prompt;