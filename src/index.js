import https from 'https';
import fs from 'fs';
import app from './app/app.js'; // Asegúrate de tener la ruta correcta a tu archivo app.js
import dotenv from 'dotenv';
import { modelsApp } from './config/models.app.js';

dotenv.config({ path: '../.env'});
modelsApp(false);

const options = {
  key: fs.readFileSync('/path/to/private.key'), // Ruta a tu clave privada
  cert: fs.readFileSync('/path/to/certificate.crt'), // Ruta a tu certificado
};

const port = process.env.SERVER_PORT || 3001;

https.createServer(options, app).listen(port, () => {
  console.log(`Connected Server on port ${port}`);
});
