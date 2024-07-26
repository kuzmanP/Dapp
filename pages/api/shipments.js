import { connectToDatabase } from "../../lib/mongodb";
import Shipment from "../../models/shipment";

export default async (req, res) => {
    if (req.method == "GET") {
        try {
            await connectToDatabase();
            let query = req.query;
            if (query.transactionHash) {
                let shipment = await Shipment.collection.findOne({ transactionHash: query.transactionHash });
                res.status(200).json({ shipment });
            } else {
                let shipments = await Shipment.collection.find().toArray();
                res.status(200).json({ shipments });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method == "POST") {
        try {
            await connectToDatabase();
            const shipment = await Shipment.collection.insertOne(req.body);
            res.status(201).json(shipment);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    } else if (req.method == "GET" && req.query.count) {
        try {
            await connectToDatabase();
            let count = await Shipment.collection.countDocuments();
            res.status(200).json({ count });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};