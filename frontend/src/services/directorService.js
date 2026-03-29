import axios from 'axios';

const API_URL = 'https://backend-peliculas-1.onrender.com/api/director';


export const getDirectores = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createDirector = async (directorData) => {
    try {
        const response = await axios.post(API_URL, directorData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateDirector = async (id, directorData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, directorData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteDirector = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};