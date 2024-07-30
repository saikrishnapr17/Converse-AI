// src/Components/AppBarComponent.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { appBarStyles } from './Styles';

const AppBarComponent = ({ onLogout }) => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={appBarStyles.typography}>
                AI Chat
            </Typography>
            <Button color="inherit" onClick={onLogout}>Logout</Button>
        </Toolbar>
    </AppBar>
);

export default AppBarComponent;
