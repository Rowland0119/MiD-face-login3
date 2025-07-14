# MiD – My Decentralized Face Identity: MVP Brief

---

## What is MiD?

MiD (My Decentralized Face Identity) is a Web3-native authentication tool that allows users to register and use their face as a secure, privacy-preserving, and decentralized identity. By linking facial biometrics (stored only in each user’s browser) with their Polkadot.js wallet, MiD enables passwordless login and a new level of trust and user experience for Dapps.

---

## Why is MiD Essential in Web3?

- **Human-Only Access:**  
  MiD brings a strong “proof of personhood” to the blockchain, making it much harder for bots and fake accounts to abuse, spam, or game decentralized systems.

- **Privacy & Security:**  
  No sensitive biometric data ever leaves the user’s device. Face templates are stored locally, not on a central server or chain, so users are always in control.

- **Frictionless Onboarding:**  
  Users can access Dapps instantly—no passwords, no seed phrases to remember, no complex onboarding. Just scan your face, connect your wallet, and you’re in.

- **Sybil Resistance:**  
  By tying each face to a unique wallet, MiD helps Dapps enforce one-person-one-account rules and fairly distribute rewards, votes, or resources.

- **Decentralized & Modular:**  
  Built for cross-chain compatibility, starting with Polkadot but designed to expand to Ethereum, Solana, and beyond.

---

## Tackling Bots and Fake Accounts

- MiD’s biometric verification ensures only real, unique humans access Dapps or participate in key activities (airdrops, voting, governance, etc).
- This slashes the risk of Sybil attacks—where a single user creates endless fake accounts to exploit systems.
- Dapps can require MiD login for their most important or vulnerable actions, making automation and bot abuse much more difficult.

---

## Dapps That Can Benefit from MiD

- **DAOs and Governance Platforms:**  
  Enforce “one person, one vote” with confidence.

- **Airdrops & Token Launches:**  
  Distribute tokens only to verified, unique individuals—no more bot/fake account farming.

- **Decentralized Social Media:**  
  Limit spam, fake profiles, and harassment by requiring human-verified accounts for posting or messaging.

- **DeFi Platforms:**  
  Use MiD for high-value actions (withdrawals, large swaps, account upgrades) as an added layer of security.

- **NFT Marketplaces:**  
  Reduce fraud by ensuring only real users can mint, buy, or sell NFTs.

- **Gaming and Play-to-Earn:**  
  Prevent botting and multi-account abuse, ensuring fair play and reward distribution.

- **Cross-Chain Applications:**  
  As MiD expands to other chains, any app needing human verification or strong, decentralized authentication can integrate MiD.

---

## MVP Features

1. **Face Enrollment**  
   - User scans their face (webcam/phone).
   - Face template is securely created and stored only in the browser (localStorage or IndexedDB).

2. **Wallet Linking**  
   - User connects their Polkadot.js wallet.
   - Face identity is cryptographically linked to the wallet address.

3. **Face Login for Dapps**  
   - Dapps can integrate MiD for passwordless, face-based login and account verification.

4. **Sensitive Actions: Wallet Signature**  
   - Optional (user-controlled): For actions like token transfers or profile updates, require a wallet signature for extra security.

5. **Settings & User Control**  
   - Users can enable/disable wallet signature requirement for sensitive actions.
   - All security settings are transparent and user-driven.

---

## User Flow

1. **Registration**
   - Open MiD app.
   - Scan face.
   - Connect Polkadot.js wallet.
   - Link face to wallet.

2. **Login (Dapp using MiD)**
   - Click “Login with MiD”.
   - Scan face.
   - MiD authenticates and unlocks Dapp using wallet.

3. **Sensitive Action**
   - User initiates a sensitive action.
   - If required (by user or Dapp), app prompts for wallet signature.
   - User signs message with wallet.
   - Action proceeds on successful verification.

---

## Technical Notes

- **Face Recognition:**  
  Use a browser-based library like [face-api.js](https://justadudewhohacks.github.io/face-api.js/) (no backend needed for MVP).

- **Wallet Integration:**  
  Use [@polkadot/extension-dapp](https://polkadot.js.org/docs/extension/) for Polkadot.js wallet connection and message signing.  
  Sensitive actions: use the `signer.signRaw` method.

- **Demo Dapp:**  
  Build a simple Dapp that requests MiD login, demonstrates the flow, and shows “user logged in as [address]”.  
  Add a demo sensitive action (“Transfer” or “Change Settings”) that requires face authentication + wallet signature, if enabled.

- **Decentralized Storage:**  
  Face biometric templates are only saved in the user’s browser, never uploaded to a server.

- **Integration & Cross-Chain:**  
  MiD exposes simple APIs for Dapps to integrate "Login with Face".  
  Built to support other chains and wallets in the future.

---

## Stretch Goals

- Mobile version (React Native or PWA).
- Integration with Ethereum, Solana, etc.

---

## Demo

- Use the provided React prototype for a clickable demo (https://mi-d-face-login3.vercel.app/)
- For a full MVP, implement with [face-api.js](https://justadudewhohacks.github.io/face-api.js/) and [@polkadot/extension-dapp](https://polkadot.js.org/docs/extension/).

---

## Team Members

- Get to know the team on x (https://x.com/rowlandd__?s=11) and (https://x.com/vi_cdan?s=11)

---

**Contact:**  
For questions, demo, or partnerships, contact (copyrowland@gmail.com)
Reach MiD on x @MiD 
