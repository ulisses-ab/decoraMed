import axios from 'axios';
import { API_URL } from './../../config.json';

const getDeck = async (token, deckId) => {
    if(!deckId) return {};

    const response = await axios.get(`${API_URL}/decks/${deckId}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

const newDeck = async (token, parentId, name) => {
    const response = await axios.post(`${API_URL}/decks/`, {
        name: name,
        parentDeckId: parentId
    },
    {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return response.data;
}

const renameDeck = async (token, id, name) => {
    const response = await axios.put(`${API_URL}/decks/${id}`, {
        name: name
    },
    {
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

const deleteDeck = async (token, parentDeckId) => {
    const response = await axios.delete(`${API_URL}/decks/${parentDeckId}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

export { getDeck, newDeck, renameDeck, deleteDeck };