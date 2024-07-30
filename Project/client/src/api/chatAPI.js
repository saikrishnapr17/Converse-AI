import axios from 'axios';

export const sendMessage = async (query, modelChoice) => {
    try {
        const response = await axios.post('http://localhost:5000/chat', { query, model: modelChoice }, {
            headers: { 'Content-Type': 'application/json' }
        });
        return { success: true, result: response.data.result };
    } catch (error) {
        return { success: false, error: error.response?.data?.error || error.message };
    }
};
