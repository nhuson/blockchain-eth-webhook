require("dotenv").config({ path: ".env" });
import Web3 from "web3";

const options = {
  defaultBlock: "latest",
  defaultGas: 1,
  defaultGasPrice: 0,
  transactionBlockTimeout: 50,
  transactionConfirmationBlocks: 24,
  transactionPollingTimeout: 480
};
export default new Web3(process.env.ETH_NETWORK_URL, null, options);

// web3.eth.getBlockNumber().then(block => console.log(block));
