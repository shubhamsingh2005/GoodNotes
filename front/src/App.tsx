import React from 'react';
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

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <DarkModeProvider>
          <SidebarProvider>
            <Router>
              <div className="w-full h-full m-0 p-0 font-sans text-gray-900 dark:text-gray-100">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

                  {/* Protected Routes */}
                  <Route element={<ProtectedRoute />}>
                     {/* NoteProvider only active when authenticated */}
                     <Route element={<NoteProvider><Layout /></NoteProvider>}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/note-editor" element={<NoteEditor />} />
                        
                        {/* Sidebar Pages */}
                        <Route path="/my-notes" element={<MyNotes />} />
                        <Route path="/add-note" element={<AddNote />} />
                        <Route path="/folders" element={<Folders />} />
                        <Route path="/starred-notes" element={<StarredNotes />} />
                        <Route path="/tags" element={<Tags />} />
                        <Route path="/shared-with-me" element={<SharedWithMe />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/trash" element={<Trash />} />
                        <Route path="/about" element={<About />} /> {/* About Route */}
                     </Route>
                  </Route>

                  {/* Redirects */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <ToastContainer theme="colored" position="bottom-right" />
              </div>
            </Router>
          </SidebarProvider>
        </DarkModeProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
