# 🦘 Roo Pass

**Roo Pass** is a secure, offline-first password generator that runs entirely in your browser — no internet required, no data ever leaves your device.

> Generate strong, unique passwords instantly — even with a simple master password — using a custom key file, hashing, obfuscation, and scrambling.

---

## 🔒 Why Use Roo Pass?

- ✅ **Completely offline** — works without an internet connection  
- 🔐 **Secure with weak passwords** — protected by an optional key file (salt)  
- 🚫 **No cloud, no tracking, no storage** — nothing leaves your browser  
- 🧠 **Deterministic** — generate the same password every time with the same inputs  
- 🪶 **Lightweight and portable** — just open the `index.html` in any browser  
- 💡 **User-friendly** — simple UI, mobile-ready, easy to back up  

---

## 🚀 How to Use

1. **Download or clone this repo**
2. (Optional but recommended) Open key.js and enter your secret key.
    - This strengthens your password even if it's super weak or the master password is stolen.
3. Open `index.html` in any browser (mobile or desktop)
4. Fill in:
   - Username
   - Name of the service/program (e.g. `Gmail`, `Dropbox`)
   - Master password
   - Optional: customize password length and character rules
5. Click **Show Password** or **Copy** to generate and use your password

---

## 🧪 Inputs & Logic

Roo Pass combines the following into a secure hash using SHA-256:
- Username
- Master password
- Program Name
- Key from Key.js
That hash is then:
- Peppered with derived values from your input
- Obscured using a custom character bank
- Scrambled for additional entropy
- Sliced at a pseudorandom point

The result is a consistent, strong password — with zero storage.
