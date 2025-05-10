const mongodb = require('../data/database.js');

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('contacts').find().toArray(); 
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error("❌ Error fetching contacts:", error);
        res.status(500).json({ error: error.message });
    }
};

const { ObjectId } = require('mongodb');

const getSingle = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id); 
        const result = await mongodb.getDatabase().db().collection('contacts').findOne({ _id: contactId });

        if (!result) {
            return res.status(404).json({ message: "❌ Contact not found" });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error("❌ Error fetching contact:", error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getAll,
    getSingle
};