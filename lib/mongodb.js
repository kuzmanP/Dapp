// lib/mongodb.js
import { MongoClient } from 'mongodb';

// Connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'shipping';

// Create a new MongoClient instance with options
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout for server selection
  socketTimeoutMS: 45000,         // Timeout for socket connection
  connectTimeoutMS: 10000         // Timeout for initial connection
});

let db = null;

async function connectToDatabase() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    // Select the database
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw error; // Throw error to handle it elsewhere
  }
}

export { connectToDatabase };
