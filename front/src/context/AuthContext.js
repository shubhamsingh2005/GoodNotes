import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    // Verify token and get user details
                    const response = await API.get('/me', {
                        headers: { Authorization: `Bearer ${storedToken}` }
                    });
                    setUser(response.data);
                    setToken(storedToken);
                }
                catch (error) {
                    console.error("Auth check failed:", error);
                    logout();
                }
            }
            setIsLoading(false);
        };
        initAuth();
    }, []);
    const login = (newToken, newUser) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(newUser);
        // Set default header for future requests
        API.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    };
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete API.defaults.headers.common['Authorization'];
    };
    return (_jsx(AuthContext.Provider, { value: { user, token, isAuthenticated: !!user, login, logout, isLoading }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
