# Solana Arbitrage Bot

This is a Solana-based arbitrage trading bot that compares the price of SOL on a decentralized exchange (DEX) with its price on Binance (CEX). If an arbitrage opportunity is detected, the bot can be programmed to execute trades.

## 🚀 Features

- Fetches SOL/USDC price from a Solana DEX using the **Jupiter Aggregator API**.
- Fetches SOL/USDT price from Binance API.
- Identifies arbitrage opportunities and logs them.
- Can be extended to execute buy/sell trades.

---

## 📦 Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/yourusername/solana-arbitrage-bot.git
cd solana-arbitrage-bot
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the project root and add:

```sh
RPC_URL=https://api.mainnet-beta.solana.com
```

### 4️⃣ Run the Bot

```sh
node index.js
```

---

## 🛠 Configuration

You can modify the following parameters in `index.js`:

- **DEX Token Pairs** (e.g., SOL/USDC)
- **Slippage Tolerance**
- **Trade Execution Logic** (Currently only logs opportunities)

---

## ❌ Troubleshooting

### 1. **Module Not Found Error**

Run:

```sh
npm install @jup-ag/api@latest
```

### 2. **TypeError: getQuote is not a function**

Make sure you’re using `getJupiterQuote()` instead of `getQuote()` in `index.js`.

### 3. **Cannot use import statement outside a module**

- Ensure your `package.json` contains:
  ```json
  "type": "module"
  ```
- Alternatively, use `require()` instead of `import`.

---

## 📜 License

MIT License. Free to use and modify!

---

## 🤝 Contributing

Feel free to submit issues or pull requests to improve this bot!

---

### 📧 Contact

For support, reach out via GitHub Issues.
