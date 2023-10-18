import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Mention from './Mention';
import Reactions from './Reactions';
import Reply from './Reply';
import Reaction from '../Micro/Reaction';
import { FiCornerDownRight } from 'react-icons/fi';

const Message = ({ chatTabId, userId, messageId, isCurrentUser, content, reactions, replyState, replyId = null, replyMessage = null }) => {
    const [showReactions, setShowReactions] = useState(false);
    const dragConstraints = isCurrentUser ? { left: 0, right: 0.5 } : { left: -0.5, right: 0 };
    console.log(replyMessage)

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
    const contentLength = content.map((segment, index) => renderSegment(segment))[0].length

    const messageVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 }
    };

    const imageVariants = {
        hidden: { opacity: 0, x: isCurrentUser ? 10 : -10 },
        visible: { opacity: 1, x: 0 }
    };
    const getTextFromMessage = (messageContent) => {
        let text = '';
        for (const msg of messageContent) {
            if (msg.type === 'text')
                text += msg.value
        }
        return text;
    }

    return (
        <div id={`${messageId}`}>
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
                    replyState(prev => ({
                        ...prev,
                        _id: messageId,
                        content: text.length > 200 ? text.substring(0, 200) + '...' : text,
                        name: 'punit@verma'
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
                <div className={`content max-w-fit w-full relative flex ${isCurrentUser ? 'flex-row-reverse' : ''} items-start justify-center`}>
                    <div className='p-3 w-full'>
                        <div className='flex items-center justify-between mb-1 pr-3'>
                            <p>John Doe</p>
                            <p className='ml-2 text-xs text-white/50'>9:06</p>
                        </div>
                        {/* reply */}
                        {
                            Boolean(replyId) && Boolean(replyMessage) &&
                            <a href={`#${replyId}`}>
                                <div className={`${background} rounded-md m-2 p-3 italic text-white/50`}>
                                    <FiCornerDownRight />
                                    <p>{getTextFromMessage(replyMessage.content)}</p>
                                </div>
                            </a>
                        }
                        <span className={`inline-flex w-full flex-wrap items-center ${background} p-3 ${roundedClass} break-all`}>
                            {content.map((segment, index) => renderSegment(segment))}
                        </span>
                        <div className={`flex flex-wrap ${contentLength > 10 ? 'w-40' : 'w-32'} gap-2 my-2`}>
                            {
                                Object.keys(reactions).map((reaction, index) => <Reaction key={index} reactors={reactions[reaction]} emoji={reaction} />)
                            }
                        </div>
                        <div className='flex items-center justify-start gap-2 seen mt-1.5 ml-1 text-white/50'>
                            <img src='https://source.unsplash.com/50x50/?avatar' className='w-4 h-4 rounded-full' />
                            <img src='https://source.unsplash.com/50x50/?new' className='w-4 h-4 rounded-full' />
                            <img src='https://source.unsplash.com/50x50/?nature' className='w-4 h-4 rounded-full' />
                            <p className='text-xs text-white/50'>+9</p>
                        </div>
                    </div>
                    {/* reactions */}
                    <Reactions setShowReactions={setShowReactions} chatTabId={chatTabId} messageId={messageId} userId={userId} isCurrentUser={isCurrentUser} isHovered={showReactions} />
                </div>
            </motion.div>
        </div>
    );
}

export default Message;