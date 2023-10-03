import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
    // Initially, check if a theme preference exists in localStorage
    const storedThemePreference = localStorage.getItem('darkMode');
    const initialDarkMode = storedThemePreference ? JSON.parse(storedThemePreference) : false;

    const [darkMode, setDarkMode] = useState(initialDarkMode);

    // Toggle the darkMode state
    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('darkMode', true);
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('darkMode', false);
        }

        // Cleanup to prevent potential issues if component is unmounted
        return () => {
            document.body.classList.remove('dark');
        };
    }, [darkMode]);

    return (
        <button className='fixed bottom-0 right-0 m-3 bg-stone-900 dark:bg-ternary text-white text-xs rounded-md px-3 py-2' onClick={toggleDarkMode}>
            Toggle Theme
        </button>
    );
}

export default ThemeToggle;
