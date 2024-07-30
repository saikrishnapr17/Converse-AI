// src/components/MessageInputForm.js
import React from 'react';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { messageInputFormStyles } from './Styles';

const MessageInputForm = ({ query, setQuery, handleSubmit, modelChoice, setModelChoice }) => (
    <Box component="form" onSubmit={handleSubmit} sx={messageInputFormStyles.formBox}>
        <FormControl fullWidth sx={messageInputFormStyles.formControl}>
            <InputLabel id="model-select-label">Model</InputLabel>
            <Select
                labelId="model-select-label"
                value={modelChoice}
                label="Model"
                onChange={(e) => setModelChoice(e.target.value)}
            >
                <MenuItem value="gemini">Gemini</MenuItem>
                <MenuItem value="llama">Llama</MenuItem>
            </Select>
        </FormControl>
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={messageInputFormStyles.textField}
        />
        <Button type="submit" variant="contained" fullWidth>
            Send
        </Button>
    </Box>
);

export default MessageInputForm;
