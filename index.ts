import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import {
  Jupiter,
  RouteInfo,
  QuoteResponse,
  getJupiterQuote,
} from "@jup-ag/api";
import axios from "axios";
import * as fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

const connection = new Connection("https://api.mainnet-beta.solana.com");
const USDC = new PublicKey("A6QcYYZtYF5s3ktz6FtGfr4hWUw9fEKXmpF8sZbPLv2H");
const SOL = new PublicKey("So11111111111111111111111111111111111111112");

// ✅ Use getJupiterQuote instead of getQuote
async function getDexPrice() {
  const quote = await getJupiterQuote({
    connection,
    inputMint: SOL,
    outputMint: USDC,
    amount: 1_000_000_000, // 1 SOL
    slippageBps: 50,
  });

  return parseFloat(quote.data.outAmount) / 10 ** 6;
}

// ✅ Fetch Binance price (for arbitrage)
async function getCexPrice() {
  const response = await axios.get(
    "https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT"
  );
  return parseFloat(response.data.price);
}

// ✅ Check arbitrage opportunity
async function checkArbitrage() {
  try {
    const dexPrice = await getDexPrice();
    const cexPrice = await getCexPrice();

    console.log(`DEX Price: $${dexPrice}, CEX Price: $${cexPrice}`);

    if (dexPrice < cexPrice * 0.99) {
      console.log(
        "⚡ Arbitrage Opportunity Found! Buying on DEX, Selling on CEX!"
      );
      // Execute trade logic
    } else {
      console.log("❌ No arbitrage opportunity.");
    }
  } catch (error) {
    console.error("Error fetching prices:", error);
  }
}

// Run every 10 seconds
setInterval(checkArbitrage, 10000);
