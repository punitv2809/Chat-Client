import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Mention from './Mention';
import Reactions from './Reactions';
import Reply from './Reply';

const Message = ({ isCurrentUser, content, replyState, reply = null }) => {
    const [showReactions, setShowReactions] = useState(false);
    const dragConstraints = isCurrentUser ? { left: 0, right: 0.5 } : { left: -0.5, right: 0 };

    const handleMiddleMouseDown = (event) => {
        if (event.button === 1) {  // 1 is for the middle button.
            event.preventDefault();  // This prevents the default "auto-scroll" behavior.
            setShowReactions(prev => !prev); // Toggle the reactions display.
        }
    }

    const handleMouseLeave = () => {
        setShowReactions(false);
    }

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
        <div>
            <motion.div
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={messageVariants}
                className={messageClass}
                onMouseDown={handleMiddleMouseDown}
                onMouseLeave={handleMouseLeave}
                drag="x"  // Enable drag on the x-axis
                dragConstraints={dragConstraints}  // Restrict the drag distance to 100 pixels either way
                dragMomentum={true}  // Disabling the momentum effect
                onDragEnd={() => {
                    const text = content.reduce((acc, curr) => {
                        return curr.type === 'text' ? acc + curr.value : acc;
                    }, '');
                    return replyState(prev => ({
                        ...prev,
                        name: text.length > 50 ? text.substring(0, 10) + '...' : text
                    }))
                }}
            >
                <motion.img
                    initial="hidden"
                    animate="visible"
                    variants={imageVariants}
                    src='https://i.giphy.com/media/YTJXDIivNMPuNSMgc0/giphy.webp'
                    className='w-12 h-12 rounded-full'
                />
                <div className={`content max-w-fit w-9/12 relative flex ${isCurrentUser ? 'flex-row-reverse' : ''} items-end justify-center`}>
                    <div className='p-3 w-full'>
                        <div className='flex items-center justify-between mb-1 pr-3'>
                            <p>John Doe</p>
                            <p className='ml-2 text-xs text-white/50'>9:06</p>
                        </div>
                        <span className={`inline-flex w-full flex-wrap items-center ${background} p-3 ${roundedClass} break-all`}>
                            {content.map((segment, index) => renderSegment(segment))}
                        </span>
                        <div className='flex items-center justify-start gap-2 seen mt-1.5 ml-1 text-white/50'>
                            <img src='https://source.unsplash.com/50x50/?avatar' className='w-4 h-4 rounded-full' />
                            <img src='https://source.unsplash.com/50x50/?new' className='w-4 h-4 rounded-full' />
                            <img src='https://source.unsplash.com/50x50/?nature' className='w-4 h-4 rounded-full' />
                            <p className='text-xs text-white/50'>+9</p>
                        </div>
                    </div>
                    {/* reactions */}
                    <Reactions isCurrentUser={isCurrentUser} isHovered={showReactions} />
                </div>
            </motion.div>
            {reply && <Reply isCurrentUser={reply.isCurrentUser} content={reply.content} />}
        </div>
    );
}

export default Message;