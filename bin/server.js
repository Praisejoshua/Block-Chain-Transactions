const express = require('express');
const path = require('path');
const Blockchain = require('./blockchain');

// Initialize app and blockchain
const app = express();
const blockchain = new Blockchain();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoints

// Fetch the blockchain
app.get('/blockchain', (req, res) => {
    res.json(blockchain.chain);
});

// Add a new block
app.post('/add-block', (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({ message: 'Data is required to add a block.' });
    }
    blockchain.addBlock(data);
    res.json({ message: 'Block added successfully!', blockchain: blockchain.chain });
});

// Validate the blockchain
app.get('/validate', (req, res) => {
    const isValid = blockchain.isValid();
    res.json({ isValid });
});

// Serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
