# Offline Docker Guide

## Using the Script Inside a Docker Container

Follow these instructions to set up and use the script inside a disposable Docker container.

### Step 1: Preparation (Requires Internet)

[Install Docker](https://docs.docker.com/engine/install/) on your system if not already installed.

---

### Step 2: Build the Docker Container (Requires Internet)

Build the Docker container:
   ```bash
   docker build -t offline-mina-signer .
   ```

---

### Step 3: Run the Container for the First Time (Requires Internet)
1. Run the container interactively to verify it works:
   ```bash
   docker run -it --rm offline-mina-signer "test mnemonic"
   ```

   Output:

   ```
   Mina Public Key: B62qkhcVTKNmw6WFqm7dsHgpJidToEdG2mVkLG1LGxJhXrbkJTfq4HC
   ```

2. Once you confirm it works, you can disconnect from the internet.

---

### Step 4: Run the Script Offline

## ⚠️ **CRITICAL STEP: DISCONNECT FROM THE INTERNET** ⚠️

**Before running the script with your mnemonic, make sure your computer is completely offline.**  
This step is essential to improve the security of your seed phrase and prevent unauthorized access to your private keys.  

### ✅ Things to do before proceeding:
- Disconnect from Wi-Fi or unplug the Ethernet cable.
- Ensure no active internet connections are available.

**🔒 Why is this important?**
- Being offline prevents your sensitive data (such as the mnemonic or private keys) from being intercepted by malicious actors or malware.

1. **Disconnect your machine from the internet**.
2. Start a fresh, disposable container to run the script offline:
   ```bash
   docker run -it --rm offline-mina-signer "your mnemonic" "optional message"
   ```

   - Replace `"your mnemonic"` with your 12- or 24-word seed phrase.
   - Optionally replace `"optional message"` with a message to sign.
   - If you need to use a specific account index (other than the default 0), provide it as a third argument. If you’re unsure about this, it’s safe to skip this step.

3. The output will show your public key, and (if a message is provided) the signature.

---

### Example Workflow

#### 1. First Run (Online):
```bash
docker build -t offline-mina-signer .
docker run -it --rm offline-mina-signer "oval episode milk chimney rescue cabbage settle speak axis similar flip victory"
```
**Output:**
```plaintext
Mina Public Key: B62qo7BiXEN2FUjrpieUTPFPi8VyQqtMdCaCk9moJqLhnG18L7zLAgy
```

#### 2. Second Run (Offline):
1. Disconnect from the internet.
2. Run the same command in a fresh container:
   ```bash
   docker run -it --rm offline-mina-signer "oval episode milk chimney rescue cabbage settle speak axis similar flip victory" "hello mina"
   ```

**Output:**
```plaintext
Mina Public Key: B62qo7BiXEN2FUjrpieUTPFPi8VyQqtMdCaCk9moJqLhnG18L7zLAgy
Message: hello mina
Signature field: 25507160ba42e83e0eeea56c7a88b54433cf477b6fc58ec594ee590c081a1055
Signature scalar: f66b68d4d6c5f42ff981452e1c44735f59c3a2957aa48a08fc08ce03737d7e02
Message verified: true
```

---

### Step 5: Delete the Container
Once you've finished using the script, the container can be deleted entirely without leaving traces:

```bash
docker image rm offline-mina-signer
```

---

### Security Notes
- **Internet Connection**: Only connect to the internet when building the container and verifying it for the first time. After that, disconnect your system.
- **Ephemeral Container**: The `--rm` flag ensures the container is deleted after use. No data is stored persistently.
- **Offline Use**: Ensure your system is offline when importing sensitive seed phrases or signing messages.

By following this process, you can use the script in an more isolated and disposable environment.
