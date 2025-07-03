const express = require('express');
const cors    = require('cors');
const app     = express();

// parse JSON + enable CORS
app.use(express.json());
app.use(cors());

// mount the treatments router on /api/treatments
const treatmentRoutes = require('./routes/treatmentRoutes');
app.use('/api/treatments', treatmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));