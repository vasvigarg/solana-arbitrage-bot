"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const api_1 = require("@jup-ag/api");
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// Load Solana wallet
const WALLET = web3_js_1.Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync("wallet.json", "utf-8"))));
// Connect to Solana
const connection = new web3_js_1.Connection("https://api.mainnet-beta.solana.com");
// Define tokens
const USDC = new web3_js_1.PublicKey("A6QcYYZtYF5s3ktz6FtGfr4hWUw9fEKXmpF8sZbPLv2H"); // USDC Address
const SOL = new web3_js_1.PublicKey("So11111111111111111111111111111111111111112"); // SOL Address
// Function to fetch Jupiter DEX price
function getDexPrice() {
    return __awaiter(this, void 0, void 0, function* () {
        const quote = yield (0, api_1.getQuote)(connection, {
            inputMint: SOL,
            outputMint: USDC,
            amount: 1000000000, // 1 SOL
            slippageBps: 50,
        });
        return parseFloat(quote.outAmount) / 10 ** 6;
    });
}
// Function to fetch Binance SOL price
function getCexPrice() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get("https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT");
        return parseFloat(response.data.price);
    });
}
// Main arbitrage logic
function checkArbitrage() {
    return __awaiter(this, void 0, void 0, function* () {
        const dexPrice = yield getDexPrice();
        const cexPrice = yield getCexPrice();
        console.log(`DEX Price: $${dexPrice}, CEX Price: $${cexPrice}`);
        if (dexPrice < cexPrice * 0.99) {
            console.log("⚡ Arbitrage Opportunity Found! Buying on DEX, Selling on CEX!");
            // Execute trade logic here
        }
        else {
            console.log("❌ No arbitrage opportunity.");
        }
    });
}
// Run every 10 seconds
setInterval(checkArbitrage, 10000);
