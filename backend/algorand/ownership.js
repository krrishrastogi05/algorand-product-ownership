// algorand/ownership.js
const algosdk = require('algosdk');
const { algodClient, indexerClient } = require('./client');

// Company wallet (mnemonic should be in .env)
const COMPANY_MNEMONIC = process.env.COMPANY_MNEMONIC;
const companyAccount = algosdk.mnemonicToSecretKey(COMPANY_MNEMONIC);

function encodeNote(obj) {
  return new TextEncoder().encode(JSON.stringify(obj));
}

function decodeNote(encoded) {
  return JSON.parse(Buffer.from(encoded, 'base64').toString());
}

// Record ownership transfer to user
async function assignOwnership(productId, name, phone) {
  const note = {
    product_id: productId,
    owner: name,
    phone: phone,
    action: 'buy',
    timestamp: new Date().toISOString()
  };

  const suggestedParams = await algodClient.getTransactionParams().do();

  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: companyAccount.addr,
    to: companyAccount.addr, // self-transfer (just to embed note)
    amount: 1000, // microAlgos
    note: encodeNote(note),
    suggestedParams
  });

  const signedTxn = txn.signTxn(companyAccount.sk);
  const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
  await algosdk.waitForConfirmation(algodClient, txId, 3);
  return txId;
}

// Mark ownership returned to company
async function returnOwnership(productId, name, phone) {
  const note = {
    product_id: productId,
    owner: 'Company',
    action: 'return',
    returned_by: name,
    phone: phone,
    timestamp: new Date().toISOString()
  };

  const suggestedParams = await algodClient.getTransactionParams().do();

  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: companyAccount.addr,
    to: companyAccount.addr,
    amount: 1000,
    note: encodeNote(note),
    suggestedParams
  });

  const signedTxn = txn.signTxn(companyAccount.sk);
  const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
  await algosdk.waitForConfirmation(algodClient, txId, 3);
  return txId;
}

// Get current ownership from indexer
async function getOwnershipStatus(productId) {
  const response = await indexerClient
    .searchForTransactions()
    .address(companyAccount.addr)
    .notePrefix(Buffer.from('{')) // only notes with JSON
    .limit(1000)
    .do();

  const productTxns = response.transactions
    .map(txn => ({
      ...txn,
      decodedNote: decodeNote(txn.note)
    }))
    .filter(txn => txn.decodedNote.product_id === productId)
    .sort((a, b) => b['confirmed-round'] - a['confirmed-round']);

  if (productTxns.length === 0) {
    return { productId, owner: 'Unknown', status: 'Not Found' };
  }

  const latest = productTxns[0].decodedNote;
  return {
    productId,
    owner: latest.owner,
    action: latest.action,
    timestamp: latest.timestamp
  };
}

module.exports = {
  assignOwnership,
  returnOwnership,
  getOwnershipStatus
};
