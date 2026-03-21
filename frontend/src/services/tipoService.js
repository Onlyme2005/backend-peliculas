import axios from 'axios';

const API_URL = 'http://localhost:4000/api/tipo';

export const getTipos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createTipo = async (tipoData) => {
    try {
        const response = await axios.post(API_URL, tipoData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateTipo = async (id, tipoData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, tipoData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteTipo = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};