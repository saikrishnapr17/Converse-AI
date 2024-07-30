import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Chat from './Pages/Chat/Chat';
import theme from './Pages/theme';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (message) => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
                    <Routes>
                        <Route path="/login" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/chat" />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/chat" element={isLoggedIn ? <Chat onLogout={handleLogout} /> : <Navigate to="/login" />} />
                        <Route path="/" element={<Navigate to="/login" />} />
                    </Routes>
                </Box>
            </Router>
        </ThemeProvider>
    );
};

export default App;