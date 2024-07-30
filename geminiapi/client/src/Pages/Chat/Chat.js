import React, { useState } from 'react';
import { Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MessagesList from '../../Components/MessageList/MessageList'; // Import MessageList
import AppBarComponent from '../../Components/AppBar/AppBarComponent'; // Import AppBarComponent
import MessageInputForm from '../../Components/MessageInput/MessageInputForm'; // Import MessageInputForm
import { boxStyle, paperStyle } from './Styles'; // Import styles
import { sendMessage } from '../../api/chatAPI'; // Import the new API call

const Chat = ({ onLogout }) => {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([]);
    const [modelChoice, setModelChoice] = useState('gemini');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const newMessages = [...messages, { type: 'user', text: query }];
        setMessages(newMessages);
        setQuery('');

        const result = await sendMessage(query, modelChoice);
        if (result.success) {
            setMessages([...newMessages, { type: 'bot', text: result.result }]);
        } else {
            console.error('Error:', result.error);
        }
    };

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <Box sx={boxStyle}>
            <AppBarComponent onLogout={handleLogout} /> {/* Use AppBarComponent */}
            <Paper sx={paperStyle}>
                <MessagesList messages={messages} modelChoice={modelChoice} /> {/* Use MessagesList */}
            </Paper>
            <MessageInputForm
                query={query}
                setQuery={setQuery}
                handleSubmit={handleSubmit}
                modelChoice={modelChoice}
                setModelChoice={setModelChoice}
            /> {/* Use MessageInputForm */}
        </Box>
    );
};

export default Chat;
