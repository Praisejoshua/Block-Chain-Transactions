class Blockchain {
    constructor() {
        this.chain = [];
        this.createGenesisBlock();
    }

    createGenesisBlock() {
        const genesisBlock = {
            index: 0,
            timestamp: Date.now(),
            data: "Genesis Block",
            previousHash: "0",
            hash: "genesis-hash"
        };
        this.chain.push(genesisBlock);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data) {
        const previousBlock = this.getLatestBlock();
        const newBlock = {
            index: this.chain.length,
            timestamp: Date.now(),
            data,
            previousHash: previousBlock.hash,
            hash: this.calculateHash(previousBlock.hash, data)
        };
        this.chain.push(newBlock);
    }

    calculateHash(previousHash, data) {
        return `${previousHash}-${data}-${Date.now()}`; // Simple hash logic
    }

    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

module.exports = Blockchain;
