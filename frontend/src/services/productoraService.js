import axios from 'axios';

const API_URL = 'http://localhost:4000/api/productora';

export const getProductoras = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createProductora = async (productoraData) => {
    try {
        const response = await axios.post(API_URL, productoraData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProductora = async (id, productoraData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, productoraData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteProductora = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};