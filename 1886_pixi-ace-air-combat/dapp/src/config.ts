import { http, createConfig } from "wagmi";
import { defineChain } from "viem";
import { metaMask } from "wagmi/connectors";

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
});

export const config = createConfig({
  chains: [testnet],
  connectors: [metaMask()],
  transports: {
    [testnet.id]: http(),
  },
});
