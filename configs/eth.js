require("dotenv").config({ path: ".env" });
export const eth = {
  network: process.env.ETH_NETWORK,
  host: process.env.ETH_NETWORK_URL,
  confirmation: 7,
  coin: "ETH",
  block_default: 4638718,
  confirmation: 7
};
