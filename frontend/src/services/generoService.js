import axios from 'axios';

const API_URL = 'https://backend-peliculas-1.onrender.com/api/genero';

export const getGeneros = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createGenero = async (generoData) => {
    try {
        const response = await axios.post(API_URL, generoData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// NUEVO: Función para Actualizar
export const updateGenero = async (id, generoData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, generoData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// NUEVO: Función para Eliminar
export const deleteGenero = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};