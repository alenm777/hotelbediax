const express = require('express');
const fs = require('fs-extra');
const path = require('path');

const router = express.Router();
const DATA_PATH = path.join(__dirname, '..', 'data', 'data.json');

// Leer datos
async function readData() {
  await fs.ensureFile(DATA_PATH);
  const txt = await fs.readFile(DATA_PATH, 'utf8').catch(() => '[]');
  return JSON.parse(txt || '[]');
}

// Guardar datos
async function writeData(data) {
  await fs.outputJson(DATA_PATH, data, { spaces: 2 });
}

// Listar con paginación y filtros
router.get('/', async (req, res) => {
  const { page = 1, limit = 20, q, country, city } = req.query;

  let items = await readData();

  if (q) {
    const ql = q.toLowerCase();
    items = items.filter(i =>
      (i.name || '').toLowerCase().includes(ql) ||
      (i.description || '').toLowerCase().includes(ql)
    );
  }

  if (country) items = items.filter(i => (i.country || '').toLowerCase() === country.toLowerCase());
  if (city) items = items.filter(i => (i.city || '').toLowerCase() === city.toLowerCase());

  const total = items.length;
  const p = Math.max(1, parseInt(page));
  const lim = Math.max(1, parseInt(limit));

  const start = (p - 1) * lim;
  const paginated = items.slice(start, start + lim);

  res.json({ total, page: p, limit: lim, data: paginated });
});

// Obtener uno
router.get('/:id', async (req, res) => {
  const items = await readData();
  const item = items.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// Crear
router.post('/', async (req, res) => {
  const items = await readData();
  const payload = req.body;

  const newItem = {
    id: Date.now().toString(),
    name: payload.name || '',
    country: payload.country || '',
    city: payload.city || '',
    description: payload.description || '',
    rating: payload.rating || 0,
    createdAt: new Date().toISOString()
  };

  items.unshift(newItem);
  await writeData(items);
  res.status(201).json(newItem);
});

// Actualizar
router.put('/:id', async (req, res) => {
  const items = await readData();
  const idx = items.findIndex(i => i.id === req.params.id);

  if (idx === -1) return res.status(404).json({ error: 'Not found' });

  items[idx] = { ...items[idx], ...req.body, updatedAt: new Date().toISOString() };

  await writeData(items);
  res.json(items[idx]);
});

// Eliminar
router.delete('/:id', async (req, res) => {
  let items = await readData();
  const idx = items.findIndex(i => i.id === req.params.id);

  if (idx === -1) return res.status(404).json({ error: 'Not found' });

  const deleted = items.splice(idx, 1)[0];
  await writeData(items);

  res.json(deleted);
});

module.exports = router;