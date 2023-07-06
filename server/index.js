require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

// Define your database names
const databaseNames = [process.env.DB_NAME_1, process.env.DB_NAME_2];

// Define your MongoDB connection URIs
const mongoURIs = databaseNames.map((databaseName) => {
  return process.env[`DB_URI_${databaseNames.indexOf(databaseName) + 1}`];
});

// Create Mongoose connections for each database
const connections = [];
mongoURIs.forEach((uri, index) => {
  const connection = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connection.name = databaseNames[index]; // Set the connection name to the corresponding database name
  connections.push(connection);
  console.log(`Connected to ${databaseNames[index]} database successfully`);
});

app.get('/api/:databaseName/collections', async (req, res) => {
  const databaseName = req.params.databaseName;

  // Find the corresponding connection for the specified database
  const connection = connections.find((conn) => conn.name === databaseName);

  if (!connection) {
    return res.status(404).json({ error: 'Database not found' });
  }

  try {
    const collections = await connection.db.listCollections().toArray();
    const collectionNames = collections.map((collection) => collection.name);
    res.json(collectionNames);
  } catch (error) {
    console.error(`Error fetching collections from database ${databaseName}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/:databaseName/collections/:collectionName', async (req, res) => {
  const databaseName = req.params.databaseName;
  const collectionName = req.params.collectionName;

  // Find the corresponding connection for the specified database
  const connection = connections.find((conn) => conn.name === databaseName);

  if (!connection) {
    return res.status(404).json({ error: 'Database not found' });
  }

  try {
    const documents = await connection.db.collection(collectionName).find().toArray();
    res.json(documents);
  } catch (error) {
    console.error(`Error fetching documents from collection ${collectionName} in database ${databaseName}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
