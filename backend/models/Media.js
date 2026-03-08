const { Schema, model } = require('mongoose');

const MediaSchema = new Schema({
    serial: { 
        type: String, 
        required: [true, 'El serial es obligatorio'], 
        unique: true 
    },
    titulo: { 
        type: String, 
        required: [true, 'El título es obligatorio'] 
    },
    sinopsis: { 
        type: String 
    },
    url: { 
        type: String, 
        required: [true, 'La URL es obligatoria'], 
        unique: true 
    },
    imagen: { 
        type: String
    },
    fechaCreacion: { 
        type: Date, 
        default: Date.now 
    },
    fechaActualizacion: { 
        type: Date, 
        default: Date.now 
    },
    anoEstreno: { 
        type: Number, 
        required: [true, 'El año de estrenio es obligatorio'] 
    },
    generoPrincipal: { 
        type: Schema.Types.ObjectId, 
        ref: 'Genero', 
        required: true 
    },
    directorPrincipal: { 
        type: Schema.Types.ObjectId, 
        ref: 'Director', 
        required: true 
    },
    productora: { 
        type: Schema.Types.ObjectId, 
        ref: 'Productora', 
        required: true 
    },
    tipo: { 
        type: Schema.Types.ObjectId, 
        ref: 'Tipo', 
        required: true 
    }
});

module.exports = model('Media', MediaSchema);