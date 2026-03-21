const Genero = require('../models/Genero');

const { request, response} = require('express');

const getGeneros = async (req = request, res = response) => {
    try {
        const generos = await Genero.find();
        res.status(200).json(generos);
    } catch (error) {
        console.error('Error al obtener los géneros:', error);
        res.status(500).json({msg: 'Ocurrió un error al obtener los géneros'});
    }
};
const createGenero = async (req = request, res = response) => {
    try {
        const {nombre, descripcion} = req.body;

        const generoDB = await Genero.findOne({nombre});

        if (generoDB) {
            return res.status(400).json({ msg: 'El género ' + nombre + ' ya existe'});
        }

        const genero = new Genero({nombre, descripcion});
        await genero.save();
        res.status(201).json(genero);

    } catch (error) {
        console.error('Error al crear el género:', error);
        res.status(500).json({msg: 'Ocurrió un error al crear el género'});
    }
};
// Función para Actualizar (PUT)
const updateGenero = async (req, res) => {
    try {
        const { id } = req.params;
        // findByIdAndUpdate busca por ID y actualiza con lo que venga en req.body
        // el { new: true } es para que nos devuelva el objeto ya actualizado
        const generoActualizado = await Genero.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!generoActualizado) {
            return res.status(404).json({ msg: 'Género no encontrado' });
        }
        res.json(generoActualizado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al actualizar el género' });
    }
};

// Función para Eliminar (DELETE)
const deleteGenero = async (req, res) => {
    try {
        const { id } = req.params;
        const generoEliminado = await Genero.findByIdAndDelete(id);
        
        if (!generoEliminado) {
            return res.status(404).json({ msg: 'Género no encontrado' });
        }
        res.json({ msg: 'Género eliminado con éxito' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al eliminar el género' });
    }
};

// ¡Asegúrate de exportarlas al final de tu archivo!
module.exports = {
    createGenero, // la que ya tenías
    getGeneros,   // la que ya tenías
    updateGenero, // NUEVA
    deleteGenero  // NUEVA
};
