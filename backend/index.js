
require('dotenv').config();

const express = require('express');
const cors = require('cors');

//  Importar tu archivo de conexión
const { getConnection } = require('./db/db-connection-mongo');

//  Inicializar Express
const app = express();
app.use(cors());
app.use(express.json());

//  Conectar a la base de datos (Esto usará el MONGO_URI de tu .env)
getConnection();

//  Rutas de tu API
app.use('/api/genero', require('./routes/genero'));
app.use('/api/media', require('./routes/media'));
app.use('/api/director', require('./routes/director'));
app.use('/api/productora', require('./routes/productora'));
app.use('/api/tipo', require('./routes/tipo'));

//  Levantar el servidor usando el puerto del .env o el 4000 por defecto
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`---Servidor corriendo en el puerto ${PORT}`);
});