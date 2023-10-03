import React, { useState } from 'react'
import ToggleSwitch from '../Micro/ToggleSwitch'
import { FaSun, FaMoon } from 'react-icons/fa';

const Settings = ({ isOpened = false }) => {
    const [isOn, setIsOn] = useState(false);
    return (
        <div className={`${isOpened ? 'block' : "hidden"} col-span-3 h-[95vh] bg-ternary`}>
            <ToggleSwitch
                isOn={isOn}
                onToggle={() => setIsOn(!isOn)}
                onIcon={<FaSun />}
                offIcon={<FaMoon />}
                onBgColor="bg-red-500"
            />
        </div >
    )
}

export default Settings
