const SHA256 = require('crypto-js/sha256');

// Transaction class to represent a transaction
class Transaction {
    constructor(sender, receiver, amount) {
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
        this.timestamp = Date.now();
    }

    // Generate a hash of the transaction for identification
    hash() {
        return SHA256(this.sender + this.receiver + this.amount + this.timestamp).toString();
    }
}

// Block class to represent a block in the blockchain
class Block {
    constructor(index, previousHash, transactions, timestamp = Date.now()) {
        this.index = index;
        this.previousHash = previousHash;
        this.transactions = transactions;
        this.timestamp = timestamp;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + JSON.stringify(this.transactions) + this.timestamp).toString();
    }
}

// Blockchain class to represent the blockchain
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
        this.difficulty = 2;
    }

    createGenesisBlock() {
        return new Block(0, "0", [], Date.now());
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Add a new transaction to the pool
    addTransaction(transaction) {
        if (!transaction.sender || !transaction.receiver || !transaction.amount) {
            throw new Error('Invalid transaction');
        }
        this.pendingTransactions.push(transaction);
    }

    // Mine a new block with the transactions in the pool
    mineBlock() {
        const lastBlock = this.getLatestBlock();
        const newBlock = new Block(
            lastBlock.index + 1,
            lastBlock.hash,
            this.pendingTransactions
        );
        this.chain.push(newBlock);
        this.pendingTransactions = []; // Clear the transaction pool after mining
    }

    // Validate the blockchain
    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Check if the current block's hash is valid
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            // Check if the previous block's hash is valid
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    // Return the entire blockchain
    getBlockchain() {
        return this.chain;
    }
}

module.exports = { Blockchain, Transaction };
