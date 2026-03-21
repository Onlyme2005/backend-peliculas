const Tipo = require('../models/Tipo');
const { request, response } = require('express');

const getTipos = async (req = request, res = response) => {
    try {
        const tipos = await Tipo.find();
        res.status(200).json(tipos);
    } catch (error) {
        console.error('Error al obtener los tipos:', error);
        res.status(500).json({msg: 'Ocurrió un error al obtener los tipos'});
    }
};

const createTipo = async (req = request, res = response) => {
    try {
        
        const { nombre, descripcion } = req.body;

        const tipoDB = await Tipo.findOne({ nombre });

        if (tipoDB) {
            return res.status(400).json({ msg: 'El tipo ' + nombre + ' ya existe'});
        }

        const tipo = new Tipo({ nombre, descripcion });
        
        await tipo.save();
        res.status(201).json(tipo);

    } catch (error) {
        console.error('Error al crear el tipo:', error);
        res.status(500).json({msg: 'Ocurrió un error al crear el tipo'});
    }
};
// Función para Actualizar (PUT)
const updateTipo = async (req, res) => {
    try {
        const { id } = req.params;
        // findByIdAndUpdate busca por ID y actualiza con lo que venga en req.body
        // el { new: true } es para que nos devuelva el objeto ya actualizado
        const tipoActualizado = await Tipo.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!tipoActualizado) {
            return res.status(404).json({ msg: 'Tipo no encontrado' });
        }
        res.json(tipoActualizado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al actualizar el tipo' });
    }
};

// Función para Eliminar (DELETE)
const deleteTipo = async (req, res) => {
    try {
        const { id } = req.params;
        const tipoEliminado = await Tipo.findByIdAndDelete(id);
        
        if (!tipoEliminado) {
            return res.status(404).json({ msg: 'Tipo no encontrado' });
        }
        res.json({ msg: 'Tipo eliminado con éxito' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al eliminar el tipo' });
    }
};

// ¡Asegúrate de exportarlas al final de tu archivo!
module.exports = {
    createTipo, // la que ya tenías
    getTipos,   // la que ya tenías
    updateTipo, // NUEVA
    deleteTipo  // NUEVA
};

