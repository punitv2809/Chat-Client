import React from 'react';
import { motion } from 'framer-motion';
import Mention from './Mention';

const Message = ({ isCurrentUser, content }) => {
    const messageClass = isCurrentUser
        ? 'flex flex-row-reverse text-sm'
        : 'flex text-sm';

    const roundedClass = isCurrentUser
        ? 'rounded-tl-xl rounded-br-xl rounded-bl-xl'
        : 'rounded-bl-xl rounded-tr-xl rounded-br-xl';

    const background = isCurrentUser
        ? 'bg-primary-lighter'
        : 'bg-ternary';

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
            variants={messageVariants}
            className={messageClass}
        >
            <motion.img
                initial="hidden"
                animate="visible"
                variants={imageVariants}
                src='https://i.giphy.com/media/YTJXDIivNMPuNSMgc0/giphy.webp'
                className='w-12 h-12 rounded-full'
            />
            <div className='content max-w-fit p-3 w-6/12'>
                <div className='flex items-center justify-between mb-1 pr-3'>
                    <p>John Doe</p>
                    <p className='ml-2 text-xs text-white/50'>9:06</p>
                </div>
                <span className={`inline-flex w-full flex-wrap items-center ${background} p-3 ${roundedClass} break-all`}>
                    {content.map((segment, index) => renderSegment(segment))}
                </span>
            </div>
        </motion.div>
    );
}

export default Message;