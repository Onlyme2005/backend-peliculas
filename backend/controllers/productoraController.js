const Productora = require('../models/Productora');

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
        const { nombre, estado, slogan, descripcion } = req.body;

        const productoraDB = await Productora.findOne({ nombre});

        if (productoraDB) {
            return res.status(400).json({ msg: 'La productora ' + nombre + ' ya existe'});
        }

        // 3. Le pasamos todos los campos al crear el nuevo objeto
        const productora = new Productora({ nombre, estado, slogan, descripcion });
        
        await productora.save();
        res.status(201).json(productora);

    } catch (error) {
        console.error('Error al crear la productora:', error);
        res.status(500).json({msg: 'Ocurrió un error al crear la productora'});
    }
};
// Función para Actualizar (PUT)
const updateProductora = async (req, res) => {
    try {
        const { id } = req.params;
        // findByIdAndUpdate busca por ID y actualiza con lo que venga en req.body
        // el { new: true } es para que nos devuelva el objeto ya actualizado
        const productoraActualizada = await Productora.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!productoraActualizada) {
            return res.status(404).json({ msg: 'Productora no encontrada' });
        }
        res.json(productoraActualizada);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al actualizar la productora' });
    }
};

// Función para Eliminar (DELETE)
const deleteProductora = async (req, res) => {
    try {
        const { id } = req.params;
        const productoraEliminada = await Productora.findByIdAndDelete(id);
        
        if (!productoraEliminada) {
            return res.status(404).json({ msg: 'Productora no encontrada' });
        }
        res.json({ msg: 'Productora eliminada con éxito' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al eliminar la productora' });
    }
};

// ¡Asegúrate de exportarlas al final de tu archivo!
module.exports = {
    createProductora, // la que ya tenías
    getProductoras,   // la que ya tenías
    updateProductora, // NUEVA
    deleteProductora  // NUEVA
};

