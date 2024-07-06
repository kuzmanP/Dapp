// db.js
const mongoose = require('mongoose');
import Shipment from './models/shipment';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/shipping', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');

    // Now you can use the Shipment model
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // process.exit(1);
  }
};



module.exports = {
  connectDB,
 
};
