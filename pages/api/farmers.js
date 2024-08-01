import { connectToDatabase } from "../../lib/mongodb";
import Farmer from "../../models/farmers";


export default async (req, res) => {
    if (req.method == "GET") {
        try {
            await connectToDatabase();
            let farmers = await Farmer.collection.find().toArray()
            res.status(200).json({ farmers });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method == "POST") {
        try {
            await connectToDatabase();
            const farmers = await Farmer.collection.insertOne(req.body)

            res.status(201).json(farmers);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    } else if (req.query.count) {
        try {
            await connectToDatabase();
            let count = await Farmer.collection.countDocuments({});
            res.status(200).json({ count });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};