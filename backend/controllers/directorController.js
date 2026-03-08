const GDirector = require('../models/Director');

const { response} = require('express');

const getDirectores = async (req = request, res = response) => {
    try {
        const directores = await GDirector.find();
        res.status(200).json(directores);
    } catch (error) {
        console.error('Error al obtener los directores:', error);
        res.status(500).json({msg: 'Ocurrió un error al obtener los directores'});
    }
};
const createDirector = async (req = request, res = response) => {
    try {
        const {nombres, descripcion} = req.body;

        const directorDB = await GDirector.findOne({nombres});

        if (directorDB) {
            return res.status(400).json({ msg: 'El director ' + nombres + ' ya existe'});
        }

        const director = new GDirector({nombres, descripcion});
        await director.save();
        res.status(201).json(director);

    } catch (error) {
        console.error('Error al crear el director:', error);
        res.status(500).json({msg: 'Ocurrió un error al crear el director'});
    }
}

module.exports = {
    getDirectores,
    createDirector
}