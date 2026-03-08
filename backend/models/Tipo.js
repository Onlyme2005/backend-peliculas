const {Schema, model} = require('mongoose');

const TipoSchema = new Schema({ 
    nombre: {
        type: String,
        required: [true, 'El nombre del tipo es obligatorio'],
        unique: true,
        trim: true
    },
    fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        required: true,
        default: Date.now
    },
    descripcion: {
        type: String,
        trim: true
    }
});

module.exports = model('Tipo', TipoSchema);