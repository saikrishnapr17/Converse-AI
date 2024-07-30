// src/MessageComp/messagesListStyles.js
export const messagesListStyles = {
    listItem: (type) => ({
        flexDirection: 'column',
        alignItems: type === 'user' ? 'flex-end' : 'flex-start',
    }),
    paper: (type) => ({
        p: 2,
        maxWidth: '70%',
        backgroundColor: type === 'user' ? 'primary.main' : 'background.paper',
    }),
    markdownBox: {
        '& p': { margin: 0 },
    },
};
