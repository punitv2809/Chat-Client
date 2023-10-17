import React, { useState } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa';
import ToggleSwitch from './Micro/ToggleSwitch.js'

const GlobalSettings = () => {
    const [isOn, setIsOn] = useState(false);
    return (
        <>
            <div className='flex rounded-md items-center justify-between p-2 text-sm text-white/50 bg-secondary-darker/10'>
                <p>Stealth Chat Mode</p>
                <ToggleSwitch
                    isOn={isOn}
                    onToggle={() => setIsOn(!isOn)}
                    onIcon={<FaSun />}
                    offIcon={<FaMoon />}
                    onBgColor="bg-ternary"
                />
            </div>
            <div className='flex rounded-md items-center justify-between p-2 text-sm text-white/50 bg-secondary-darker/10'>
                <p>Hide Flash Messages</p>
                <ToggleSwitch
                    isOn={!isOn}
                    onToggle={() => setIsOn(!isOn)}
                    onIcon={<FaSun />}
                    offIcon={<FaMoon />}
                    onBgColor="bg-ternary"
                />
            </div>
        </>
    )
}

export default GlobalSettings
