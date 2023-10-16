import React, { useContext, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineReload } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';
import ChatContext from './Context/ChatContext';

const Modal = ({ isOpen = false, setIsOpen }) => {
    const [initial, setInitial] = useState('');
    const [gradient, setGradient] = useState(generateRandomGradient());
    const [avatarBg, setAvatarBg] = useState(null);
    const [error, setError] = useState(null);
    const groupName = useRef();

    const { socket, setUsers, setChatTabs } = useContext(ChatContext)

    const closeModal = () => {
        setIsOpen(false);
    };

    function generateRandomGradient() {
        const colors = ['#FF5733', '#33FF57', '#5733FF', '#33F0FF', '#FF33F5', '#FF6E33', '#B733FF', '#33FF8A'];
        const randomColor1 = colors[Math.floor(Math.random() * colors.length)];
        const randomColor2 = colors[Math.floor(Math.random() * colors.length)];
        return `linear-gradient(45deg, ${randomColor1}, ${randomColor2})`;
    }

    const changeGradient = () => {
        setGradient(generateRandomGradient());
        setAvatarBg(null); // reset image background when gradient changes
    };

    const handleDrop = (e) => {
        e.preventDefault();

        if (e.dataTransfer.items) {
            const item = e.dataTransfer.items[0];

            if (item.kind === 'file') {
                const file = item.getAsFile();
                const reader = new FileReader();

                reader.onloadend = () => {
                    setAvatarBg(reader.result);
                };

                reader.readAsDataURL(file);
            } else if (item.kind === 'string') {
                item.getAsString(url => {
                    setAvatarBg(`url(${url})`);
                });
            }
        }
    };

    const handleGroupCreate = (e) => {
        const groupCreateData = {
            userId: "651c64153e249ed2dcab1460",
            conversationName: groupName.current.value,
            avatar: {
                type: avatarBg ? "image" : "gradient",
                data: avatarBg ? avatarBg : gradient
            }
        };
        socket.emit('group-created', groupCreateData, (response) => {
            if (response.status) {
                setIsOpen(false);
                setUsers(prev => [...prev, {
                    _id: "652d5f9cabf9119a0fc9a372",
                    userId: "651c64153e249ed2dcab1460",
                    conversationName: groupCreateData.conversationName,
                    avatar: {
                        type: groupCreateData.type,
                        data: groupCreateData.data
                    },
                    type: "group",
                    recentMessage: null,
                    recentMessageTime: null,
                    unseenCount: 0,
                    status: null
                }])
                setChatTabs(prev => [...prev, {
                    id: 5,
                    name: groupCreateData.conversationName,
                    userId: 1
                }])
            } else {
                setError(response.message)
            }
            console.log(response)
        });
    }

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } },
        exit: { opacity: 0, scale: 0.7, transition: { duration: 0.2 } }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className='fixed top-0 z-50 bottom-0 left-0 right-0 w-screen h-screen bg-primary-lighter/25 flex items-center justify-center'>
                    <motion.div
                        className='bg-primary-lighter text-white w-4/12 rounded-xl shadow-lg p-4'
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={modalVariants}
                    >
                        <div className='modal-header w-full flex items-center justify-end mb-4'>
                            <AiOutlineClose className='text-xl cursor-pointer text-purple-700' onClick={closeModal} />
                        </div>
                        <div className='modal-body text-justify flex flex-col items-center justify-center space-y-4'>
                            <div
                                className='avatar relative'
                                onDrop={handleDrop}
                                onDragOver={e => e.preventDefault()}
                            >
                                <div className='initials bg-contain bg-center w-32 h-32 rounded-full flex items-center justify-center text-4xl font-black tracking-wider uppercase' style={
                                    {
                                        backgroundImage: avatarBg || gradient,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center'
                                    }
                                }>
                                    {!avatarBg && <p>{initial}</p>}
                                </div>
                                <button onClick={changeGradient} className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-md text-purple-700">
                                    <AiOutlineReload />
                                </button>
                            </div>
                            <p className="w-full text-center">Some content here</p>
                            <div className='w-full'>
                                <input
                                    ref={groupName}
                                    onChange={(e) => {
                                        let words = null;
                                        let value = e.target.value.split(' ').filter(w => w.trim());
                                        if (value.length > 1) {
                                            words = value[0][0] + value[1][0];
                                        } else if (value.length === 1 && value[0].length > 1) {
                                            words = value[0][0] + value[0][1];
                                        }
                                        setInitial(words);
                                    }}
                                    type='text'
                                    placeholder='Your group name'
                                    className='w-full bg-primary-darker rounded-xl text-white/50 p-2 placeholder:italic placeholder:text-white/25 outline-none'
                                />
                                <span className='text-rose-500 italic text-xs font-bold ml-2'>{error}</span>
                            </div>
                        </div>
                        <div className='modal-footer flex items-center justify-center mt-4'>
                            <button onClick={handleGroupCreate} disabled={!initial} className={`bg-ternary hover:bg-ternary-darker text-white px-3 py-1.5 rounded-md text-sm ${!initial ? 'opacity-50 cursor-not-allowed' : ''}`}>Create Group</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default Modal;
