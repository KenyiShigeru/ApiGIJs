const express = require('express');
const conexion = require('./.env/conexion.js');
var app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.get('/api/data', async (req, res) => {
    // Realizar una consulta a la base de datos
    await conexion.all('SELECT * FROM personajes', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // Enviar los resultados como respuesta
        res.json(rows);
    }
    );
}
);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);