const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');

const { response, request } = require('express');

// GET: Listar todas las películas/series
const getMedias = async (req = request, res = response) => {
    try {
        // El populate permite traer los datos del objeto relacionado, no solo el ObjectId
        const medias = await Media.find()
            .populate('generoPrincipal', 'nombre estado')
            .populate('directorPrincipal', 'nombres estado') 
            .populate('productora', 'nombre estado') 
            .populate('tipo', 'nombre'); 
            
        res.status(200).json(medias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al obtener las producciones' });
    }
};

// POST - Crear una película/serie
const createMedia = async (req = request, res = response) => {
    try {
        const { serial, url, generoPrincipal, directorPrincipal, productora, tipo, ...resto } = req.body;

        // 1. Validar unicidad de Serial y URL
        const mediaExiste = await Media.findOne({ $or: [{ serial }, { url }] });
        if (mediaExiste) {
            return res.status(400).json({ msg: 'El serial o la URL ya están registrados' });
        }

        // 2. Validar que el Género exista y esté ACTIVO
        const generoDB = await Genero.findById(generoPrincipal);
        if (!generoDB || generoDB.estado !== 'Activo') {
            return res.status(400).json({ msg: 'El género no existe o está Inactivo' });
        }

        // 3. Validar que el Director, Productora estén ACTIVO
        const directorDB = await Director.findById(directorPrincipal);
        if (!directorDB || directorDB.estado !== 'Activo') {
            return res.status(400).json({ msg: 'El director no existe o está Inactivo' });
        }
        
        const productoraDB = await Productora.findById(productora);
        if (!productoraDB || productoraDB.estado !== 'Activo') {
            return res.status(400).json({ msg: 'La productora no existe o está Inactiva' });
        }
        const tipoDB = await Tipo.findById(tipo);
        if (!tipoDB) {
            return res.status(400).json({ msg: 'El tipo especificado no existe' });
        }
        
        

        // 4. Crear y guardar
        const data = { serial, url, generoPrincipal, directorPrincipal, productora, tipo, ...resto };
        const media = new Media(data);
        await media.save();

        res.status(201).json(media);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al crear la producción' });
    }
};

// PUT - Actualizar
const updateMedia = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { serial, fechaCreacion, ...data } = req.body; 
        data.fechaActualizacion = Date.now();

        const mediaActualizada = await Media.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json(mediaActualizada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar' });
    }
};

// DELETE - Borrar
const deleteMedia = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        await Media.findByIdAndDelete(id);
        res.status(200).json({ msg: 'Producción eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al borrar' });
    }
};

module.exports = {
    getMedias,
    createMedia,
    updateMedia,
    deleteMedia
};