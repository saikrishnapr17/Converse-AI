// src/APICalls/ChatCalls/signUpCall.js
import axios from 'axios';

export const signUpCall = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:5000/signup', { email, password });
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
};
