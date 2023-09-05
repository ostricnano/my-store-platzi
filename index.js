//traemos el modulo express
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const { checkApiKey } = require('./middlewares/auth.handler');

//creamos una instancia de express
const app = express();

//le decimos el puerto en el que va a correr
const port = process.env.PORT || 3000;

//le decimos que va a recibir json
app.use(express.json());
//creo un array con los dominios permitidos
const whitelist = ['http://localhost:8080', 'https://myapp.com']
const options = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido'));
        }
    }
}
//habilita cualquier dominio
app.use(cors(options));

require('./utils/auth');

//llamamos a la funcion que creamos en routes\index.js
routerApi(app);
//Los midlewares se ejecutan en el orden en el que se declaran
//siempre se debe declarar al final de las rutas
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


