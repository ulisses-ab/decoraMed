import axios from 'axios';
import { API_URL } from './../../config.json';

const sendLogin = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
    });

    return response.data.token; 
};

const sendRegistration = async (name, email, password) => {
    const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password
    });

    return response.data; 
}

const getUser = async (token) => {
    const response = await axios.get(`${API_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

const verify = async (token) => {
    console.log(token);
    const response = await axios.get(`${API_URL}/auth/verify/${token}`);

    return response.data.token;
}


export { sendLogin, sendRegistration, getUser, verify };