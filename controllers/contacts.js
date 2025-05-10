const mongodb = require('../data/database.js');
const { ObjectId } = require('mongodb');

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

const createContact = async (req, res) => {
    try {
        console.log("🔍 Received contact data:", req.body);
        const newContact = req.body;

        // Validate request body
        if (!newContact || typeof newContact !== "object") {
            throw new Error("❌ Invalid contact data");
        }

        const result = await mongodb.getDatabase().db().collection("contacts").insertOne(newContact);

        if (!result.insertedId) {
            throw new Error("❌ Insert operation failed");
        }

        res.status(201).json({ message: "🚀 Contact created successfully", id: result.insertedId });
    } catch (error) {
        console.error("❌ Error creating contact:", error);
        res.status(500).json({ error: error.message });
    }
};

const updateContact = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        const updatedContact = req.body;

        const result = await mongodb.getDatabase().db().collection("contacts").updateOne(
            { _id: contactId },
            { $set: updatedContact }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "❌ Contact not found" });
        }

        res.status(200).json({ message: "✅ Contact updated successfully" });
    } catch (error) {
        console.error("❌ Error updating contact:", error);
        res.status(500).json({ error: error.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection("contacts").deleteOne({ _id: contactId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "❌ Contact not found" });
        }

        res.status(200).json({ message: "🗑️ Contact deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting contact:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { 
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};
