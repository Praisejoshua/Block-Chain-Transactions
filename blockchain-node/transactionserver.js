const express = require('express');
const bodyParser = require('body-parser');
const { Blockchain, Transaction } = require('./transactionblockchain'); // Import the Blockchain and Transaction classes

const app = express();
const port = 3000;

app.use(bodyParser.json());

const blockchain = new Blockchain();

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index2.html');
});

// Endpoint to get the current blockchain
app.get('/blockchain', (req, res) => {
    res.json(blockchain.getBlockchain());
});

// Endpoint to add a new transaction
app.post('/add-transaction', (req, res) => {
    const { sender, receiver, amount } = req.body;

    try {
        const newTransaction = new Transaction(sender, receiver, amount);
        blockchain.addTransaction(newTransaction);
        res.json({ message: 'Transaction added to the pool!' });
    } catch (error) {
        res.status(400).json({ message: 'Error adding transaction', error: error.message });
    }
});

// Endpoint to mine a new block
app.post('/mine', (req, res) => {
    blockchain.mineBlock();
    res.json({ message: 'Block mined successfully!', blockchain: blockchain.getBlockchain() });
});

// Endpoint to validate the blockchain
app.get('/validate', (req, res) => {
    const isValid = blockchain.isValid();
    res.json({ isValid });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
