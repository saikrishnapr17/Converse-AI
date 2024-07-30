import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DinoGame from '../../DinoComponent/DinoGame';
import { mainContainerStyle, leftGridItemStyle, formBoxStyle, formContainerStyle, errorTextStyle, signInButtonStyle, rightGridItemStyle } from './Styles'; // Import styles
import { loginUser } from '../../api/loginAPI'; // Import the new API call

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await loginUser(email, password);
        if (result.success) {
            onLogin(result.message);
        } else {
            setError(result.message);
        }
    };

    return (
        <Grid container component="main" sx={mainContainerStyle}>
            <Grid item xs={leftGridItemStyle.xs} sm={leftGridItemStyle.sm} md={leftGridItemStyle.md} component={Paper} elevation={leftGridItemStyle.elevation} square={leftGridItemStyle.square}>
                <Box sx={formBoxStyle}>
                    <Typography component="h1" variant="h5">
                        Sign in to AI Chat
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={formContainerStyle}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && (
                            <Typography color="error" variant="body2" sx={errorTextStyle}>
                                {error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={signInButtonStyle}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={false} sm={4} md={7} sx={rightGridItemStyle}>
                <DinoGame />
            </Grid>
        </Grid>
    );
};

export default Login;
