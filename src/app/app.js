import express from 'express';
import personRouter from '../routes/person.routes.js';
import morgan from 'morgan';
import cors from 'cors'; // Importa CORS
import personStatusRouter from '../routes/personStatus.routes.js';
import roleRouter from '../routes/role.routes.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json());

// Configura CORS para permitir todos los orígenes y métodos (puedes ajustarlo según tu necesidad)
app.use(cors());

app.use('/api/v1', personRouter);
app.use('/api/v1', personStatusRouter);
app.use('/api/v1', roleRouter);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    });
});

export default app;
