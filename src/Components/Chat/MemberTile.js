import React, { useContext, useId } from 'react';
import { motion } from 'framer-motion';
import ChatContext from '../Context/ChatContext';

const MemberTile = ({
    id,
    avatar,
    conversationName,
    setCurrentChatId,
    active = false,
    status = "offline"
}) => {
    const baseClasses = "transition-all duration-300 cursor-pointer p-3 pr-2 flex items-center justify-center rounded-lg";
    const bgColorClass = active ? "bg-secondary/25 dark:bg-secondary/25" : "bg-secondary dark:bg-primary-lighter";
    const hoverClass = active ? "" : "hover:bg-secondary/25 dark:hover:bg-secondary/25";
    const textColorClass = "text-primary-dark dark:text-white";
    const statusColor = status === "offline" ? "bg-red-500" : "bg-green-500";
    const borderColorClass = active ? "border-secondary/25 dark:border-secondary/25" : "border-secondary dark:border-primary";

    const { messages, user } = useContext(ChatContext);

    const getUnSeenMessages = (messages, userId) => {
        let badgeCount = 0;
        if (!messages) return 0;

        messages.forEach(message => {
            message.seen && !message.seen.includes(userId) ? (badgeCount += 1) : null
        })

        return badgeCount;
    }
    const getRecentMessage = (messages) => {
        if (!messages) return false;
        let lastMessage = '';
        messages[messages.length - 1].content.forEach(msg => msg.type === 'text' ? lastMessage += ' ' + msg.value : null)
        return lastMessage;
    }
    const getRecentMessageTime = (messages) => {
        if (!messages) return false;
        return messages[messages.length - 1].at
    }

    let notificationBadge = null;
    let unseenCount = getUnSeenMessages(messages[id], user._id);

    if (unseenCount) {
        notificationBadge = <div className="bg-ternary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1">{parseInt(unseenCount) > 9 ? '9+' : unseenCount}</div>
    }
    const getInitials = (name) => {
        let words = null;
        let value = name.split(' ').filter(w => w.trim());
        if (value.length > 1) {
            words = value[0][0] + value[1][0];
        } else if (value.length === 1 && value[0].length > 1) {
            words = value[0][0] + value[0][1];
        }
        return words
    }
    // Avatar rendering logic
    const renderAvatar = () => {
        if (avatar.type === "image") {
            return <img src={avatar.data} alt="member avatar" className="w-12 h-12 rounded-full" />;
        } else if (avatar.type === "gradient") {
            // return <div style={{ backgroundImage: avatar.data }} className="w-12 h-12 rounded-full">
            return <div className='initials bg-contain bg-center w-12 h-12 rounded-full flex items-center justify-center text-xl font-black tracking-wider uppercase' style={
                {
                    backgroundImage: avatar.data,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center'
                }
            }>
                <p>{getInitials(conversationName)}</p>
            </div>;
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={setCurrentChatId}
            className={`${baseClasses} ${bgColorClass} ${hoverClass} ${textColorClass}`}
        >
            {/* Avatar and Status */}
            <div className="relative mr-4">
                {renderAvatar()}
                <span className={`absolute bottom-0 right-0 w-3 h-3 ${statusColor} rounded-full border-2 ${borderColorClass}`}></span>
            </div>

            {/* Name & Recent Message */}
            <div className="flex-grow">
                <h3 className="font-bold capitalize">{conversationName}</h3>
                <p className="truncate lowercase text-sm text-black/50 dark:text-white/50">{getRecentMessage(messages[id]) ?? 'no recent messages'}</p>
            </div>

            {/* Recent Message Time & Unseen Count */}
            <div className="text-right min-w-fit flex flex-col items-end justify-between">
                <p className="font-light text-black/50 dark:text-white/50 text-sm">{getRecentMessageTime(messages[id])}</p>
                <div className={'grow'}></div>
                {notificationBadge}
            </div>
        </motion.div>
    );
}

export default MemberTile;
