# Offline Mina Message Signer

A command-line tool to derive Mina keys and sign messages offline.

---

## ⚠️ WARNING: UNTESTED. DO YOUR OWN RESEARCH. USE AT YOUR OWN RISK ⚠️

**IMPORTING YOUR SEED PHRASE INTO THIS SCRIPT CAN BE VERY DANGEROUS.**
- Your **seed phrase** is the master key to all your accounts and funds. If it is exposed, anyone can gain full access to your assets.
- Running this script on a compromised or online machine increases the risk of your seed phrase being leaked.
- Only use this script **offline** on a secure, trusted device.

### Best Practices:
1. **Do not use your main wallet seed phrase.** Create a test wallet with a new seed phrase for experimenting with this script.
2. **Run the script offline.** Disconnect from the internet before running the script to reduce the risk of unauthorized access.
3. **Delete the script and any temporary files immediately after use.**
4. **Understand the risks** before proceeding.

---

## Overview

This application derives Mina-compatible private and public keys from a mnemonic and signs messages offline. It uses the `mina-signer` library for generating and verifying Mina keys and signatures.

## Features

- Derive Mina private and public keys from a mnemonic.
- Sign messages offline with the derived private key.
- Verify signed messages.

---

## 🚨 **Recommended Setup** 🚨

To run this script inside a disposable Docker container, follow the **[Docker Guide](docker-guide.md)**.  
That guide includes step-by-step instructions for setting up and running the script offline in a more isolated, disposable environment to protect sensitive data.

---

## ⚠️ **Important Security Notice** ⚠️

Setting up and running this script directly on the host machine is **strongly discouraged**. Here's why:

### 🛑 Risks of Running on the Host
- **Compromised Dependencies**: If any `npm` dependency is compromised or malicious, it could gain access to your sensitive data, including your mnemonic and private keys.
- **Persistent Environment**: Once installed on your host machine, dependencies or files may linger even after you finish running the script, increasing the risk of leaks or breaches.

### ✅ Why Docker Is Safer
Using the Docker setup ensures:
1. **Isolated Environment**: All dependencies are installed in a disposable, isolated container that is separate from your host machine.
2. **Ephemeral Setup**: The container is deleted after use (`--rm` flag), leaving no trace of your mnemonic, keys, or any installed dependencies on your system.
3. **Minimal Risk**: Even if an `npm` dependency is compromised, it operates only within the isolated Docker environment, reducing the risk of affecting your host machine or other applications.

### 🔒 **Recommendation**
To maximize security, always use the **[Docker Guide](docker-guide.md)** to set up and run this script inside a disposable Docker container. Avoid running it directly on your host machine.

---

### ⚠️ **If You Decide to Go Without Docker...**

Running this script directly on the host machine is not recommended due to the risks outlined above. However, if Docker cannot be used and proceeding without it is necessary, follow the following instructions carefully.

- Ensure the machine is online **only while installing dependencies** and disconnect from the internet **before running the script**.
- Use a trusted, secure environment with minimal risk of malware or compromise.
- Avoid using a sensitive or primary mnemonic.
- Use output redirection followed by immediate screen cleanup:
   `node index.mjs ... > signer-output; clear; printf '\e[3J'; cat signer-output`

**Proceed with caution.**

## Dependencies

- `bip32`: For hierarchical deterministic key derivation.
- `bip39`: For mnemonic generation and seed derivation.
- `bs58check`: For Base58Check encoding.
- `mina-signer`: For Mina key derivation, signing, and message verification.
- `tiny-secp256k1`: Elliptic curve cryptography library.
