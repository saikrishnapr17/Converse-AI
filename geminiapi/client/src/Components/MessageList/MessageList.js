// src/MessageComp/MessagesList.js
import React, { useRef, useEffect } from 'react';
import { List, ListItem, ListItemText, Paper, Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { messagesListStyles } from './Styles';

const MessagesList = ({ messages, modelChoice }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    return (
        <List>
            {messages.map((message, index) => (
                <ListItem key={index} sx={messagesListStyles.listItem(message.type)}>
                    <Paper elevation={1} sx={messagesListStyles.paper(message.type)}>
                        <ListItemText
                            primary={message.type === 'user' ? 'You' : modelChoice === 'gemini' ? 'Gemini' : 'Llama'}
                            secondary={
                                <Box component="div" sx={messagesListStyles.markdownBox}>
                                    <ReactMarkdown>{message.text}</ReactMarkdown>
                                </Box>
                            }
                            primaryTypographyProps={{ fontWeight: 'bold' }}
                            secondaryTypographyProps={{ component: 'div' }}
                        />
                    </Paper>
                </ListItem>
            ))}
            <div ref={messagesEndRef} />
        </List>
    );
};

export default MessagesList;
