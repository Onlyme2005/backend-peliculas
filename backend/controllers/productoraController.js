const Productora = require('../models/Productora');
// 1. Agregamos "request" a la importación
const { request, response } = require('express');

const getProductoras = async (req = request, res = response) => {
    try {
        const productoras = await Productora.find();
        res.status(200).json(productoras);
    } catch (error) {
        console.error('Error al obtener las productoras:', error);
        res.status(500).json({msg: 'Ocurrió un error al obtener las productoras'});
    }
};

const createProductora = async (req = request, res = response) => {
    try {
        // 2. Extraemos TODOS los campos que pertenecen a Productora
        const { nombreProductora, estado, slogan, descripcion } = req.body;

        const productoraDB = await Productora.findOne({ nombreProductora });

        if (productoraDB) {
            return res.status(400).json({ msg: 'La productora ' + nombreProductora + ' ya existe'});
        }

        // 3. Le pasamos todos los campos al crear el nuevo objeto
        const productora = new Productora({ nombreProductora, estado, slogan, descripcion });
        
        await productora.save();
        res.status(201).json(productora);

    } catch (error) {
        console.error('Error al crear la productora:', error);
        res.status(500).json({msg: 'Ocurrió un error al crear la productora'});
    }
}

module.exports = {
    getProductoras,
    createProductora
}