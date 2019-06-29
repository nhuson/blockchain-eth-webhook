const debug = require("debug")("Deposit:EthDeposit");
import BaseDeposit from "../../core/BaseDeposit";
import web3 from "./index";

export default class EthDeposit extends BaseDeposit {
  async getBlockNumber() {
    const latestBlock = await web3.eth.getBlockNumber();
    return latestBlock;
  }

  async getBlock(block) {
    const dataBlock = await web3.eth.getBlock(block);
    return dataBlock;
  }
}
