import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToggleSwitch = ({ isOn, onToggle, onIcon = null, offIcon = null, onBgColor = "bg-primary dark:bg-primary-darker" }) => {
    const toggleVariants = {
        on: { x: "100%" },
        off: { x: 0 }
    };

    return (
        <div
            className={`relative w-16 h-8 rounded-full cursor-pointer ${isOn ? onBgColor : 'bg-gray-300 dark:bg-gray-700'}`}
            onClick={onToggle}
        >
            <AnimatePresence>
                {isOn && onIcon && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-2 left-2">{onIcon}</motion.div>}
                {!isOn && offIcon && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-2 right-2">{offIcon}</motion.div>}
            </AnimatePresence>

            <motion.div
                initial={false}
                animate={isOn ? 'on' : 'off'}
                variants={toggleVariants}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full shadow-md`}
            ></motion.div>
        </div>
    );
}

export default ToggleSwitch;
