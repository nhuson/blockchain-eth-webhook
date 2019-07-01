const debug = require("debug")("Deposit:EthDeposit");
import BaseDeposit from "../../core/BaseDeposit";
import web3 from "./index";
import * as configs from "../../configs";
import ethAddress from "../../models/eth_address";
import ethDeposit from "../../models/eth_deposit";

export default class EthDeposit extends BaseDeposit {
  constructor() {
    super();
    this.CODE = configs.eth.coin;
    this.ADDRESS_MODEL = ethAddress;
    this.DEPOSIT_MODEL = ethDeposit;
  }

  async getBlockNumber() {
    const latestBlock = await web3.eth.getBlockNumber();
    return latestBlock;
  }

  async getBlock(block) {
    const dataBlock = await web3.eth.getBlock(block);
    return dataBlock;
  }

  async getTransaction(tx) {
    return await web3.eth.getTransaction(tx);
  }

  transformDataTransaction(tx) {
    return {
      block_hash: tx.blockHash,
      block_number: tx.blockNumber,
      from: tx.from,
      to: tx.to,
      balance: tx.value,
      gas: tx.gas,
      tx_hash: tx.hash,
      tx_nonce: tx.nonce
    };
  }
}
