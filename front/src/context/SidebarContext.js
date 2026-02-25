import { jsx as _jsx } from "react/jsx-runtime";
// src/contexts/SidebarContext.tsx
import { createContext, useContext, useState } from 'react';
const SidebarContext = createContext(undefined);
export const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen((prev) => !prev);
    const openSidebar = () => setIsOpen(true);
    const closeSidebar = () => setIsOpen(false);
    return (_jsx(SidebarContext.Provider, { value: { isOpen, toggleSidebar, openSidebar, closeSidebar }, children: children }));
};
export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};
