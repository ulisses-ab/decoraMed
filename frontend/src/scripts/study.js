import axios from 'axios';
import { API_URL } from './../../config.json';

const getDueCards = async (token, deckId) => {
    const response = await axios.get(`${API_URL}/study/${deckId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    return response.data;
}

const getTimes = async (token, cardId) => {
    const response = await axios.get(`${API_URL}/study/times/${cardId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    return response.data;
}

const putStudy = async (token, cardId, difficulty) => {
    const response = await axios.get(`${API_URL}/study/send/${cardId}/${difficulty}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    return response.data;
}
export { getDueCards, getTimes, putStudy };

