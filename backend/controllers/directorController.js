const Director = require('../models/Director');
const { request, response } = require('express');

const getDirectores = async (req = request, res = response) => {
    try {
        const directores = await Director.find();
        res.status(200).json(directores);
    } catch (error) {
        console.error('Error al obtener los directores:', error);
        res.status(500).json({msg: 'Ocurrió un error al obtener los directores'});
    }
};

const createDirector = async (req = request, res = response) => {
    try {
        // Extraemos solo lo que pertenece al Director
        const { nombres, estado } = req.body;

        const directorDB = await Director.findOne({ nombres });

        if (directorDB) {
            return res.status(400).json({ msg: 'El director ' + nombres + ' ya existe'});
        }

        const director = new Director({ nombres, estado });
        
        await director.save();
        res.status(201).json(director);

    } catch (error) {
        console.error('Error al crear el director:', error);
        res.status(500).json({msg: 'Ocurrió un error al crear el director'});
    }
};
// Función para Actualizar (PUT)
const updateDirector = async (req, res) => {
    try {
        const { id } = req.params;
        // findByIdAndUpdate busca por ID y actualiza con lo que venga en req.body
        // el { new: true } es para que nos devuelva el objeto ya actualizado
        const directorActualizado = await Director.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!directorActualizado) {
            return res.status(404).json({ msg: 'Director no encontrado' });
        }
        res.json(directorActualizado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al actualizar el director' });
    }
};

// Función para Eliminar (DELETE)
const deleteDirector = async (req, res) => {
    try {
        const { id } = req.params;
        const directorEliminado = await Director.findByIdAndDelete(id);
        
        if (!directorEliminado) {
            return res.status(404).json({ msg: 'Director no encontrado' });
        }
        res.json({ msg: 'Director eliminado con éxito' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al eliminar el director' });
    }
};

// ¡Asegúrate de exportarlas al final de tu archivo!
module.exports = {
    createDirector, // la que ya tenías
    getDirectores,   // la que ya tenías
    updateDirector, // NUEVA
    deleteDirector  // NUEVA
};
