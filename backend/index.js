// 1. Cargar variables de entorno (¡DEBE SER LA PRIMERA LÍNEA!)
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// 2. Importar tu archivo de conexión
const { getConnection } = require('./db/db-connection-mongo');

// 3. Inicializar Express
const app = express();
app.use(cors());
app.use(express.json());

// 4. Conectar a la base de datos (Esto usará el MONGO_URI de tu .env)
getConnection();

// 5. Rutas de tu API
app.use('/api/genero', require('./routes/genero'));
app.use('/api/media', require('./routes/media'));
app.use('/api/director', require('./routes/director'));
app.use('/api/productora', require('./routes/productora'));
app.use('/api/tipo', require('./routes/tipo'));

// 6. Levantar el servidor usando el puerto del .env o el 4000 por defecto
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`---Servidor corriendo en el puerto ${PORT}`);
});