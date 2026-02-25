import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
// Styles
import '@/App.css';
import '@/index.css';
// Layout
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
// Pages
import LandingPage from './pages/LandingPage';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import NoteEditor from './components/NoteEditor';
// Sidebar Pages
import MyNotes from './pages/SidebarComponents/MyNotes';
import AddNote from './pages/SidebarComponents/AddNote';
import Folders from './pages/SidebarComponents/Folders';
import StarredNotes from './pages/SidebarComponents/StarredNotes';
import Tags from './pages/SidebarComponents/Tags';
import SharedWithMe from './pages/SidebarComponents/SharedWithMe';
import Search from './pages/SidebarComponents/Search';
import Help from './pages/SidebarComponents/Help';
import Trash from './pages/SidebarComponents/Trash';
import Settings from './pages/SidebarComponents/Settings';
import About from './pages/SidebarComponents/About'; // Added About Page
// Context & State
import store from '@/redux/store';
import { SidebarProvider } from './context/SidebarContext';
import { DarkModeProvider } from './context/DarkModeContext';
import { NoteProvider } from './context/NoteContext';
import { AuthProvider } from './context/AuthContext';
// Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
    return (_jsx(Provider, { store: store, children: _jsx(AuthProvider, { children: _jsx(DarkModeProvider, { children: _jsx(SidebarProvider, { children: _jsx(Router, { children: _jsxs("div", { className: "w-full h-full m-0 p-0 font-sans text-gray-900 dark:text-gray-100", children: [_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/signin", element: _jsx(SignIn, {}) }), _jsx(Route, { path: "/signup", element: _jsx(SignUp, {}) }), _jsx(Route, { path: "/forgot-password", element: _jsx(ForgotPassword, {}) }), _jsx(Route, { path: "/reset-password/:resetToken", element: _jsx(ResetPassword, {}) }), _jsx(Route, { element: _jsx(ProtectedRoute, {}), children: _jsxs(Route, { element: _jsx(NoteProvider, { children: _jsx(Layout, {}) }), children: [_jsx(Route, { path: "/home", element: _jsx(Home, {}) }), _jsx(Route, { path: "/note-editor", element: _jsx(NoteEditor, {}) }), _jsx(Route, { path: "/my-notes", element: _jsx(MyNotes, {}) }), _jsx(Route, { path: "/add-note", element: _jsx(AddNote, {}) }), _jsx(Route, { path: "/folders", element: _jsx(Folders, {}) }), _jsx(Route, { path: "/starred-notes", element: _jsx(StarredNotes, {}) }), _jsx(Route, { path: "/tags", element: _jsx(Tags, {}) }), _jsx(Route, { path: "/shared-with-me", element: _jsx(SharedWithMe, {}) }), _jsx(Route, { path: "/search", element: _jsx(Search, {}) }), _jsx(Route, { path: "/settings", element: _jsx(Settings, {}) }), _jsx(Route, { path: "/help", element: _jsx(Help, {}) }), _jsx(Route, { path: "/trash", element: _jsx(Trash, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), " "] }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }), _jsx(ToastContainer, { theme: "colored", position: "bottom-right" })] }) }) }) }) }) }));
};
export default App;
