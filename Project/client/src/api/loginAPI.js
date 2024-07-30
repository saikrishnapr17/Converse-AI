import axios from 'axios';

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:5000/login', { email, password });
        return { success: true, message: response.data.message };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Invalid email or password' };
    }
};
