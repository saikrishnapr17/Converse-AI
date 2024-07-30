// src/Pages/SignUp/SignUp.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signUpCall } from '../../api/signUpAPI'; // Adjust path as necessary
import { mainContainerStyle, leftGridItemStyle, formBoxStyle, formContainerStyle, errorTextStyle, signUpButtonStyle, rightGridItemStyle } from './Styles'; // Import styles

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        try {
            const message = await signUpCall(email, password);
            console.log(message);
            navigate('/login');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Grid container component="main" sx={mainContainerStyle}>
            <Grid item xs={leftGridItemStyle.xs} sm={leftGridItemStyle.sm} md={leftGridItemStyle.md} component={Paper} elevation={leftGridItemStyle.elevation} square={leftGridItemStyle.square}>
                <Box sx={formBoxStyle}>
                    <Typography component="h1" variant="h5">
                        Sign up for GeminiChat
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                            sx={signUpButtonStyle}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={false} sm={4} md={7} sx={rightGridItemStyle} />
        </Grid>
    );
};

export default SignUp;
