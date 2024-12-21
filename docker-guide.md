# Offline Docker Guide

⚠️ WARNING: UNTESTED. DO YOUR OWN RESEARCH. USE AT YOUR OWN RISK ⚠️

⚠️ SECURITY NOTICE:
- This process has not undergone a security audit
- For maximum security, perform these operations on an air-gapped machine that has never been and will never be connected to the internet
- Transfer results using offline methods (USB drive, QR codes, paper)

## Using the Script Inside a Docker Container

⚠️ **Shell Security**: Consider using a clean shell session without history when running these commands. See [Shell History Security](README.md#shell-history-security) in the README.

### Step 0: Get the code from this repository

Get the code using one of these methods:

```bash
# Option 1: Clone with git
git clone https://github.com/tizoc/offline-mina-signer.git
cd offline-mina-signer

# Option 2: Download and extract
curl -LO https://github.com/tizoc/offline-mina-signer/archive/refs/heads/master.zip
unzip master.zip
cd offline-mina-signer-master
```

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
   docker run --read-only --log-driver=none -it --rm offline-mina-signer "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"
   ```

   Output:

   ```
   Mina Public Key: B62qpqCoBci3mKNrfCnLkKS2SSV9QyrPbPBABe4stVWnRRfkG8sn3t4
   ```

2. Once you confirm it works, you can disconnect from the internet.

---

### Step 4: Run the Script Offline

## ⚠️ **CRITICAL STEP: DISCONNECT FROM THE INTERNET** ⚠️

**Before running the script with your mnemonic, make sure your computer is completely offline.**  
This step is essential to improve the security of your seed phrase and prevent unauthorized access to your private keys.  

### ✅ Things to do before proceeding:
- Disable Wi-Fi and unplug Ethernet
- Ensure no active internet connections are available (example: `ping -c1 1.1.1.1`)
- Disable automatic sleep/screen lock for duration of operation
- Disable automatic screenshots/screen recording

**🔒 Why is this important?**
- Network isolation: Being offline prevents sensitive data interception
- Screen security:
  - Sleep/hibernation can write memory contents to disk
  - Wake-up could expose sensitive data on screen
  - System screenshots might automatically capture seed phrase
- Memory security:
  - Avoid swap file exposure of sensitive data
  - Prevent memory dumps during sleep/hibernate
  - Clear terminal to remove data from RAM

1. **Disconnect your machine from the internet**.
2. Start a fresh, disposable container to run the script offline:
   ```bash
   docker run --read-only --tmpfs /tmp:rw,size=64M,noexec \
      --log-driver=none \
      --ipc=private \
      --security-opt no-new-privileges \
      -it --rm --entrypoint /bin/bash offline-mina-signer
   # And then inside the container run
   node index.mjs "your mnemonic" "optional message" > /tmp/signer-output; clear; printf '\e[3J'; cat /tmp/signer-output
   # Then exit the container
   exit
   ```
   3. After exiting the container, clear your terminal (in case the above was not enough):
   ```bash
   clear && printf '\e[3J'  # Clears screen and scrollback buffer
   ```

   - Replace `"your mnemonic"` with your 12- or 24-word seed phrase.
   - Optionally replace `"optional message"` with a message to sign.
   - If you need to use a specific account index (other than the default 0), provide it as a third argument. If you’re unsure about this, it’s safe to skip this step.

3. The output will show your public key, and (if a message is provided) the signature.

### Usage

```bash
node index.mjs "your mnemonic phrase" [message] [accountIndex] [passphrase] [--show-private-key]
```

#### Options
- `mnemonic`: Your 12-word mnemonic phrase (required)
- `message`: Message to sign (optional)
- `accountIndex`: Account index to derive (optional, defaults to 0)
- `passphrase`: BIP39 passphrase (optional)
- `--show-private-key`: Display the private key (optional, use with caution)

---

### Security Considerations

| Risk | Impact | Mitigation |
|------|---------|------------|
| Network exposure | Seed phrase interception | - Offline usage required<br>- Network verification (`ping` test) |
| Container logs | Command history exposure | - `--log-driver=none` flag<br>- `--rm` flag for container cleanup |
| Memory leaks | Sensitive data in RAM | - `--tmpfs` mount for temporary storage<br>- `--ipc=private` for memory isolation |
| Privilege escalation | Container breakout | - `--read-only` filesystem<br>- `--security-opt no-new-privileges` |
| Screen capture | Seed phrase visibility | - Disable screenshots/recording<br>- Clear screen after use |
| System sleep | Memory dumps to disk | - Disable sleep/hibernate during use<br>- Complete operation quickly |

Each security feature is mandatory - do not skip or modify the protection flags.

