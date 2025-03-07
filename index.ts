import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Jupiter, getQuote } from "@jup-ag/api";
import axios from "axios";
import * as fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

// Load Solana wallet
const WALLET = Keypair.fromSecretKey(
  new Uint8Array(JSON.parse(fs.readFileSync("wallet.json", "utf-8")))
);

// Connect to Solana
const connection = new Connection("https://api.mainnet-beta.solana.com");

// Define tokens
const USDC = new PublicKey("A6QcYYZtYF5s3ktz6FtGfr4hWUw9fEKXmpF8sZbPLv2H"); // USDC Address
const SOL = new PublicKey("So11111111111111111111111111111111111111112"); // SOL Address

// Function to fetch Jupiter DEX price
async function getDexPrice() {
  const quote = await getQuote(connection, {
    inputMint: SOL,
    outputMint: USDC,
    amount: 1_000_000_000, // 1 SOL
    slippageBps: 50,
  });

  return parseFloat(quote.outAmount) / 10 ** 6;
}

// Function to fetch Binance SOL price
async function getCexPrice() {
  const response = await axios.get(
    "https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT"
  );
  return parseFloat(response.data.price);
}

// Main arbitrage logic
async function checkArbitrage() {
  const dexPrice = await getDexPrice();
  const cexPrice = await getCexPrice();

  console.log(`DEX Price: $${dexPrice}, CEX Price: $${cexPrice}`);

  if (dexPrice < cexPrice * 0.99) {
    console.log(
      "⚡ Arbitrage Opportunity Found! Buying on DEX, Selling on CEX!"
    );
    // Execute trade logic here
  } else {
    console.log("❌ No arbitrage opportunity.");
  }
}

// Run every 10 seconds
setInterval(checkArbitrage, 10000);
