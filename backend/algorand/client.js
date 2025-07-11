// algorand/client.js
const algosdk = require('algosdk');

const algodToken = process.env.ALGOD_TOKEN || '';
const algodServer = process.env.ALGOD_SERVER || 'https://testnet-api.algonode.cloud';
const algodPort = '';

const indexerServer = process.env.INDEXER_SERVER || 'https://testnet-idx.algonode.cloud';
const indexerToken = process.env.INDEXER_TOKEN || '';

const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
const indexerClient = new algosdk.Indexer(indexerToken, indexerServer, '');

module.exports = { algodClient, indexerClient };
