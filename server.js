const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb://127.0.0.1:27017/customchocolates', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Create a schema and model for chocolates (you may have more fields)
const chocolateSchema = new mongoose.Schema({
    name: String,
    price: Number,
});

const Chocolate = mongoose.model('Chocolate', chocolateSchema);

// API routes for fetching available chocolates
app.get('/api/chocolates', async (req, res) => {
    try {
        const chocolates = await Chocolate.find();
        res.json(chocolates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
