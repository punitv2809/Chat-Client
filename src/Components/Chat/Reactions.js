import React from 'react'
import { motion } from 'framer-motion';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'

const Reactions = ({ isCurrentUser, isHovered }) => {
    const reactions = ['👋', '🤚', '🫵', '💪', '🧤', '🧣'];

    const reactionsVariants = {
        hidden: { x: isCurrentUser ? 100 : -100, opacity: 0 },
        visible: { x: 0, opacity: 1 },
    };

    return (
        <motion.div
            className={`reactions flex items-center p-1.5 justify-center bg-primary-lighter rounded-md border border-secondary-lighter/10 mb-[2.2rem] z-10`}
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
            variants={reactionsVariants}
        >
            <BsChevronLeft className={'hover:scale-110 active:scale-90'} />
            <div className='flex items-center justify-center text-xl select-none'>
                {reactions.map(reaction =>
                    <div key={reaction} className='mx-1 hover:scale-150 active:scale-95 cursor-pointer transition-all duration-300'>{reaction}</div>
                )}
            </div>
            <BsChevronRight className={'hover:scale-110 active:scale-90'} />
        </motion.div>
    )
}

export default Reactions
