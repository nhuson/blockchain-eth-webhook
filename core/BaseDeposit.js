const debug = require("debug")("Deposit:BaseDeposit");
const logger = require("pino")({});
import * as configs from "../configs";
export default class BaseDeposit {
  async getBlockNumber() {
    throw new Error("Implement me .....");
  }

  async getBlock(block) {
    throw new Error("Implement me .....");
  }

  async getTransaction(tx) {
    throw new Error("Implement me .....");
  }

  async getBlockRange(from, to) {
    const all = [];
    for (let i = from; i <= to; i += 1) {
      all.push(this.getBlock(i));
    }

    return Promise.all(all);
  }

  async getAllTransactionFromBlock(txs) {
    if (txs.length == 0) {
      debug("Haven't transaction in the block ...");
    }
  }

  async doDeposit() {}

  async start() {
    const block = await this.getBlock(4638718);
    debug(block);
  }
}
