import React from 'react';
import { motion } from 'framer-motion';

const MemberTile = ({ avatar, name, recentMessage, recentMessageTime, unseenCount, setCurrentChatId, active = false, status = "offline" }) => {
    const baseClasses = "transition-all duration-300 cursor-pointer p-3 pr-2 flex items-center justify-center rounded-lg";
    const bgColorClass = active ? "bg-secondary/25 dark:bg-secondary/25" : "bg-secondary dark:bg-primary-lighter";
    const hoverClass = active ? "" : "hover:bg-secondary/25 dark:hover:bg-secondary/25";
    const textColorClass = "text-primary-dark dark:text-white";
    const statusColor = status === "offline" ? "bg-red-500" : "bg-green-500";
    const borderColorClass = active ? "border-secondary/25 dark:border-secondary/25" : "border-secondary dark:border-primary";

    let notificationBadge = null;

    if (unseenCount && parseInt(unseenCount)) {
        notificationBadge = <div className="bg-ternary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1">{parseInt(unseenCount) > 9 ? '9+' : unseenCount}</div>

    }

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
                <img src={avatar} alt="member avatar" className="w-12 h-12 rounded-full" />
                <span className={`absolute bottom-0 right-0 w-3 h-3 ${statusColor} rounded-full border-2 ${borderColorClass}`}></span>
            </div>

            {/* Name & Recent Message */}
            <div className="flex-grow">
                <h3 className="font-bold">{name}</h3>
                <p className="truncate text-sm text-black/50 dark:text-white/50">{recentMessage}</p>
            </div>

            {/* Recent Message Time & Unseen Count */}
            <div className="text-right min-w-fit flex flex-col items-end justify-between">
                <p className="font-light text-black/50 dark:text-white/50 text-sm">{recentMessageTime}</p>
                <div className={'grow'}></div>
                {notificationBadge}
            </div>
        </motion.div>
    );
}

export default MemberTile;
