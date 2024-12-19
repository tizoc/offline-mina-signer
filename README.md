# Offline Mina Message Signer

This application derives Mina-compatible private and public keys from a mnemonic and signs messages offline. It uses the `mina-signer` library for generating and verifying Mina keys and signatures.

## Features

- Derive Mina private and public keys from a mnemonic.
- Sign messages offline with the derived private key.
- Verify signed messages.

---

## Prerequisites

- Node.js.
- NPM or Yarn installed on your system.

---

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory.
3. Install the required dependencies:

   ```bash
   npm install
   ```

---

## Usage

Run the application using the following command:

```bash
node index.mjs "your mnemonic" "optional message"
```

### Example

1. **Derive Keys Only**:
   ```bash
   node index.mjs "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about" 
   ```
   **Output**:
   ```
   Mina Private Key: EKEZR2TCrbFRyN94roqjZUCu1PDpDuKnN2sg8sZLep9Jo1TYZZ3E
   Mina Public Key: B62qpqCoBci3mKNrfCnLkKS2SSV9QyrPbPBABe4stVWnRRfkG8sn3t4
   ```

2. **Sign a Message**:
   ```bash
   node index.mjs "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about" "hello mina"
   ```
   **Output**:
   ```
   Mina Private Key: EKEZR2TCrbFRyN94roqjZUCu1PDpDuKnN2sg8sZLep9Jo1TYZZ3E
   Mina Public Key: B62qpqCoBci3mKNrfCnLkKS2SSV9QyrPbPBABe4stVWnRRfkG8sn3t4
   Message: hello mina
   Signature field: 9052086882362500211121293548326467096160846808525301576969879446919825085086
   Signature scalar:    15338095341319804139308033170764314134470035736709448089680152939796145172060
   Message verified: true
   ```

---

## Dependencies

- `bip32`: For hierarchical deterministic key derivation.
- `bip39`: For mnemonic generation and seed derivation.
- `bs58check`: For Base58Check encoding.
- `mina-signer`: For Mina key derivation, signing, and message verification.
- `tiny-secp256k1`: Elliptic curve cryptography library.
