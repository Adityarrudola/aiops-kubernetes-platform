const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');

const noteRoutes = require('./routes/noteRoutes');
const seedDB = require('./seed');

const app = express();

// Logging functionku
const log = (message, level = "info") => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message
  };

  console.log(JSON.stringify(logEntry));
  fs.appendFileSync('/var/log/app/app.log', JSON.stringify(logEntry) + '\n'); 
};

// CORS
app.use(cors());

// Middleware
app.use(express.json());

// Health check (Kubernetes readiness/liveness)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Routes
app.use('/api/notes', noteRoutes);

// MongoDB connection + seeding
const connectDB = async () => {
  while (true) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      log("MongoDB Connected");
      await seedDB();
      break;
    } catch (err) {
      log("Mongo retrying...");
      await new Promise(res => setTimeout(res, 3000));
    }
  }
};

connectDB();

// Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  log(`Server running on port ${PORT}`);
});







