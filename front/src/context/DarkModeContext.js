import { jsx as _jsx } from "react/jsx-runtime";
// src/contexts/DarkModeContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
const DarkModeContext = createContext(undefined);
export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        // Check for saved preference first
        const storedMode = localStorage.getItem('darkMode');
        if (storedMode !== null) {
            return JSON.parse(storedMode);
        }
        // If no preference, use system settings
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    useEffect(() => {
        const root = window.document.documentElement;
        // Forcefully remove the old class before adding the new one
        root.classList.remove(darkMode ? 'light' : 'dark');
        root.classList.add(darkMode ? 'dark' : 'light');
        // Save preference to local storage
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);
    const toggleDarkMode = () => setDarkMode(prev => !prev);
    return (_jsx(DarkModeContext.Provider, { value: { darkMode, toggleDarkMode }, children: children }));
};
export const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if (!context) {
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }
    return context;
};
