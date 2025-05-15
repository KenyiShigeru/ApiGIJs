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

app.get('/personajes:nombre', async (req, res) => 
    {
        await conexion.get('SELECT * FROM personajes WHERE lOWER(nombre) = LOWER(?)', [req.params.nombre], (err, row) => {
            console.log(req.params.nombre);
            console.log(row);
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (!row) {
                res.status(404).json({ error: 'No se encontró el personaje' });
                return;
            }
            res.json(row);
        }
        );
    }
);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);