import React, { useContext } from 'react'
import { motion } from 'framer-motion';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import ChatContext from '../Context/ChatContext';

const Reactions = ({ setShowReactions, chatTabId, messageId, isCurrentUser, isHovered }) => {
    const { setMessages, messages } = useContext(ChatContext);

    const reactions = ['👋', '🤚', '❤️', '💪', '🖕', '😠'];

    const reactionsVariants = {
        hidden: { x: isCurrentUser ? 100 : -100, opacity: 0 },
        visible: { x: 0, opacity: 1 },
    };
    const addReaction = (reaction, messageId, userId = "123") => {
        const currentMessages = messages[chatTabId];
        const currentMessage = currentMessages.find(msg => msg._id === messageId);

        // Check if reactions for the emoji exist and if the user has already reacted.
        if (currentMessage.reactions[reaction] && currentMessage.reactions[reaction].includes(userId)) {
            // If yes, remove the user's reaction.
            currentMessage.reactions[reaction] = currentMessage.reactions[reaction].filter(id => id !== userId);
        } else {
            // If not, add the user's reaction.
            currentMessage.reactions[reaction] = [userId, ...(currentMessage.reactions[reaction] ?? [])];
        }
    }


    return (
        <motion.div
            className={`reactions flex items-center p-1.5 mt-9 justify-center bg-primary-lighter rounded-md border border-secondary-lighter/10 mb-[2.2rem] z-10`}
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
            variants={reactionsVariants}
        >
            <BsChevronLeft className={'hover:scale-110 active:scale-90'} />
            <div className='flex items-center justify-center text-xl select-none'>
                {reactions.map(reaction =>
                    <div key={reaction} onClick={() => {
                        setShowReactions(false);
                        addReaction(reaction, messageId);
                    }} className='mx-1 hover:scale-150 active:scale-95 cursor-pointer transition-all duration-300'>{reaction}</div>
                )}
            </div>
            <BsChevronRight className={'hover:scale-110 active:scale-90'} />
        </motion.div>
    )
}

export default Reactions
