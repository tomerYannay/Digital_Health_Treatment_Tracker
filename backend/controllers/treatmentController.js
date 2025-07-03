// backend/controllers/treatmentController.js
const Treatment = require('../models/treatmentModel');

exports.list = async (req, res) => {
  try {
    const all = await Treatment.getAll();
    res.json(all);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load treatments.' });
  }
};

exports.create = async (req, res) => {
  const { identifier, patientName, type, date, notes } = req.body;

  // Required validation
  if (!identifier || !patientName || !type || !date) {
    return res.status(400).json({ error: 'All fields except notes are required.' });
  }

  // Identifier validation (9 numeric digits)
  if (!/^\d{9}$/.test(identifier)) {
    return res.status(400).json({ error: 'Identifier must contain exactly 9 numeric digits.' });
  }

  // Patient name validation
  if (!/^[A-Za-z\s]+$/.test(patientName)) {
    return res.status(400).json({ error: 'Patient Name may only contain letters and spaces.' });
  }

  // Treatment type validation (optional)
  const validTypes = ['Physiotherapy', 'Ultrasound', 'Stimulation'];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid treatment type provided.' });
  }

  // Efficient duplicate identifier check
  const existing = await Treatment.findByIdentifier(identifier);
  if (existing) {
    return res.status(400).json({ error: `Identifier "${identifier}" already in use.` });
  }

  try {
    const treatment = await Treatment.create({ identifier, patientName, type, date, notes });
    res.status(201).json(treatment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create treatment.' });
  }
};


exports.remove = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const ok = await Treatment.deleteById(id);
    if (ok) return res.json({ success: true });
    res.status(404).json({ error: 'Not found' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete treatment.' });
  }
};
