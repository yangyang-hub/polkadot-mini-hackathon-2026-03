import { http, createConfig } from "wagmi";
import { defineChain } from "viem";
import { metaMask } from "wagmi/connectors";

export const CONTRACT_ADDRESS =
  "0x5409d44eFAc0227CbD47a309317EE169a9CE95aA" as const; // TODO: Replace with the deployed contract address

const testnet = defineChain({
  id: 420420417,
  name: "Polkadot Hub TestNet",
  network: "polkadot-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "PAS",
    symbol: "PAS",
  },
  rpcUrls: {
    default: {
      http: ["https://eth-rpc-testnet.polkadot.io/"],
    },
  },
  // ✅ Override the broken RPC gas price estimate
  fees: {
    defaultPriorityFee: 0n,
    async estimateFeesPerGas() {
      return {
        maxFeePerGas: 2_000_000_000_000n, // 2000 Gwei — matches successful deployment
        maxPriorityFeePerGas: 2_000_000_000_000n,
      };
    },
  },
});

export const config = createConfig({
  chains: [testnet],
  connectors: [metaMask()],
  transports: {
    [testnet.id]: http(),
  },
});
