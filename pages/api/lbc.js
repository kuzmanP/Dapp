import { connectToDatabase } from "../../lib/mongodb";
import LBC from "../../models/lbc";


export default async (req, res) => {
    if (req.method == "GET") {
        try {
            await connectToDatabase();
            let lbcs = await LBC.collection.find().toArray()
            res.status(200).json({ lbcs });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method == "POST") {
        try {
            await connectToDatabase();
            const lbcs = await LBC.collection.insertOne(req.body)

            res.status(201).json(lbcs);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }
};