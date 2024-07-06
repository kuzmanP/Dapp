// // server.js or app.js (whichever is your main server file)
// const express = require('express');
// const Shipmentxx = require('./models/shipment');
// const connectDB = require('./db');
// const app = express();

// connectDB();

// app.use(express.json());

// app.post('/api/shipments', async (req, res) => {
//     try {
//         const shipment = new Shipmentxx({
//             receiver: req.body.receiver,
//             pickupTime: req.body.pickupTime,
//             distance: req.body.distance,
//             price: req.body.price,
//             transactionHash: req.body.transactionHash,
//             isPaid: req.body.isPaid,
//             status: req.body.status
//         });

//         const newShipment = await shipment.save();
//         res.status(201).json(newShipment);
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating shipment', error });
//     }
// });

// app.get('/api/shipments', async (req, res) => {
//     try {
//         const shipments = await Shipmentxx.find();
//         res.json(shipments);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching shipments', error });
//     }
// });

// const PORT = process.env.PORT || 6700;
// app.listen(PORT, () => console.log('Server running on port 6700'));