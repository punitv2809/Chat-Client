import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Mention from './Mention';
import Reactions from './Reactions';

const Reply = ({ isCurrentUser, content }) => {

    const messageClass = isCurrentUser
        ? 'flex flex-row-reverse text-sm'
        : 'flex text-sm';

    const replyBackground = isCurrentUser
        ? 'bg-primary-lightest'
        : 'bg-ternary-lighter';

    const replyRoundedClass = isCurrentUser
        ? 'rounded-tl-xl rounded-br-xl rounded-bl-sm'
        : 'rounded-bl-xl rounded-tr-xl rounded-br-sm';

    const renderSegment = (segment) => {
        if (segment.type === 'text') {
            return segment.value;
        } else if (segment.type === 'mention') {
            return <Mention avatar={'https://i.giphy.com/media/RT7aITJt2BgUo/giphy.webp'} key={segment.id} name={segment.displayName} />
        }
    }

    const messageVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 }
    };

    const imageVariants = {
        hidden: { opacity: 0, x: isCurrentUser ? 10 : -10 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={messageVariants}
            className={`${messageClass} ml-8`}
        >
            <div className={`content max-w-fit w-9/12 relative flex ${isCurrentUser ? 'flex-row-reverse' : ''} items-end justify-center`}>
                <div className='p-3 w-full'>
                    <div className='flex items-center justify-between mb-1 pr-3'>
                        <p>Reply Author</p>
                        <p className='ml-2 text-xs text-white/50'>9:07</p>
                    </div>
                    <span className={`inline-flex w-full flex-wrap items-center ${replyBackground} p-3 ${replyRoundedClass} break-all`}>
                        {content.map((segment, index) => renderSegment(segment))}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

export default Reply;