import axios from 'axios';

const API_URL = 'https://backend-peliculas-1.onrender.com/api/media';

export const getMedia = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createMedia = async (mediaData) => {
    try {
        const response = await axios.post(API_URL, mediaData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
// Función para actualizar (editar) una producción existente
export const updateMedia = async (id, mediaData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, mediaData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
// Función para eliminar una producción (DELETE)
export const deleteMedia = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};