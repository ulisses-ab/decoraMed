import axios from 'axios';
import { API_URL } from './../../config.json';

const addCard = async (token, deckId, type, front, back) => {
    const response = await axios.post(`${API_URL}/cards`, 
        {
            type,
            front,
            back,
            deckId
        },
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}

const getCard = async (token, id) => {
    const response = await axios.get(`${API_URL}/cards/${id}`, 
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}

const editCard = async (token, cardId, front, back) => {
    const response = await axios.put(`${API_URL}/cards/${cardId}`, {
        front,
        back
    },
    {
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

const deleteCard = async (token, cardId) => {
    const response = await axios.delete(`${API_URL}/cards/${cardId}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    return response.data;
}
export { addCard, deleteCard, getCard, editCard };