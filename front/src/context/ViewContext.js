import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
const ViewContext = createContext(undefined);
export const ViewProvider = ({ children }) => {
    const [view, setView] = useState('grid');
    const toggleView = () => {
        setView((prev) => (prev === 'grid' ? 'list' : 'grid'));
    };
    return (_jsx(ViewContext.Provider, { value: { view, toggleView }, children: children }));
};
export const useView = () => {
    const context = useContext(ViewContext);
    if (!context) {
        throw new Error('useView must be used within a ViewProvider');
    }
    return context;
};
