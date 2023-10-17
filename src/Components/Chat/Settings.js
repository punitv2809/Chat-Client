import React, { useState } from 'react'
import ToggleSwitch from '../Micro/ToggleSwitch'
import { FaSun, FaMoon } from 'react-icons/fa';

const Settings = ({ isOpened = false }) => {
    const [isOn, setIsOn] = useState(false);
    return (
        <div className={`${isOpened ? 'block' : "hidden"} divide-y divide-white/20 col-span-3 h-[95vh] bg-primary-darker`}>
            <div className='flex items-center justify-between p-2 text-sm text-white/50 bg-secondary-darker/10'>
                <p>Stealth Chat Mode</p>
                <ToggleSwitch
                    isOn={isOn}
                    onToggle={() => setIsOn(!isOn)}
                    onIcon={<FaSun />}
                    offIcon={<FaMoon />}
                    onBgColor="bg-ternary"
                />
            </div>
            <div className='flex items-center justify-between p-2 text-sm text-white/50 bg-secondary-darker/10'>
                <p>Hide Flash Messages</p>
                <ToggleSwitch
                    isOn={!isOn}
                    onToggle={() => setIsOn(!isOn)}
                    onIcon={<FaSun />}
                    offIcon={<FaMoon />}
                    onBgColor="bg-ternary"
                />
            </div>
        </div >
    )
}

export default Settings
