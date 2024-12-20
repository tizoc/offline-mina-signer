#!/usr/bin/env node

import { mnemonicToSeedSync, validateMnemonic } from 'bip39';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';
import bs58check from 'bs58check';
import Client from 'mina-signer';

const MINA_COIN_TYPE = 12586;
const PURPOSE = 44;
const ADDRESS_INDEX = 0;

const bip32 = BIP32Factory(ecc);
const client = new Client({ network: 'mainnet' });

function getHDpath(account = 0, index = 0) {
  // Standard Mina derivation path: m/44'/12586'/account'/0/index
  return `m/${PURPOSE}'/${MINA_COIN_TYPE}'/${account}'/0/${index}`;
}

function reverseBytes(buffer) {
  const arr = new Uint8Array(buffer);
  arr.reverse();
  return Buffer.from(arr);
}

function deriveMinaPrivateKey(mnemonic, accountIndex, addressIndex, passphrase = '') {
  if (!validateMnemonic(mnemonic)) {
    throw new Error("Invalid mnemonic phrase");
  }
  const seed = mnemonicToSeedSync(mnemonic, passphrase);
  const root = bip32.fromSeed(seed);
  const path = getHDpath(accountIndex, addressIndex);

  const child = root.derivePath(path);
  if (!child.privateKey) {
    throw new Error("Unable to derive private key");
  }

  // Mask the first byte
  child.privateKey[0] &= 0x3f;

  // Reverse the private key and add the 5a01 prefix for Mina format
  const reversedForDisplay = reverseBytes(child.privateKey);
  const privateKeyHex = `5a01${reversedForDisplay.toString('hex')}`;
  const privateKeyBase58 = bs58check.encode(Buffer.from(privateKeyHex, 'hex'));

  return privateKeyBase58;
}

(async () => {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error("Usage: node index.mjs \"mnemonic\" [message] [accountIndex] [passphrase]");
    process.exit(1);
  }

  const mnemonic = args[0];
  const messageToSign = args[1];
  const accountIndex = args.length > 2 ? parseInt(args[2], 10) : 0; // Default account index is 0
  const passphrase = args.length > 3 ? args[3] : ''; // Optional passphrase

  if (isNaN(accountIndex) || accountIndex < 0) {
    console.error("Invalid account index. Must be a non-negative integer.");
    process.exit(1);
  }

  try {
    const privateKeyBase58 = deriveMinaPrivateKey(mnemonic, accountIndex, ADDRESS_INDEX, passphrase);
    const publicKey = client.derivePublicKey(privateKeyBase58);

    //console.log("Mina Private Key:", privateKeyBase58);
    console.log("Mina Public Key:", publicKey);

    if (messageToSign) {
      const signed = client.signMessage(messageToSign, privateKeyBase58);
      console.log("Message:", messageToSign);
      console.log("Signature field:", signed.signature.field);
      console.log("Signature scalar:", signed.signature.scalar);

      const verified = client.verifyMessage(signed);
      console.log("Message verified:", verified);
    }
  } catch (error) {
    console.error("ERROR:", error.message);
    process.exit(1);
  }
})();