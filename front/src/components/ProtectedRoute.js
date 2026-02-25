import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
        return _jsx("div", { className: "flex justify-center items-center h-screen", children: "Loading..." });
    }
    return isAuthenticated ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/signin", replace: true });
};
export default ProtectedRoute;
