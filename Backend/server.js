const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const destinationsRouter = require('./routes/destinations');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ruta de prueba
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Rutas principales
app.use('/api/destinations', destinationsRouter);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));