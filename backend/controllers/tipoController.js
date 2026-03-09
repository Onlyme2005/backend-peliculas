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
}

module.exports = {
    getTipos,
    createTipo
}