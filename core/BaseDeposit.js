const debug = require("debug")("Deposit:BaseDeposit");
import * as configs from "../configs";
import _ from "lodash";
import latestBlock from "../models/latest_block.model";
import webhook from "../lib/webhook";

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

  transformDataTransaction(tx) {
    throw new Error("Implement me .....");
  }

  async getAllTransactionFromBlocks(blocks) {
    if (blocks.length == 0) {
      debug("Haven't block scanned ...");
      return;
    }
    /** Get & Transform data of transaction */
    const txs = blocks.reduce((acc, curr) => acc.concat(curr.transactions), []);
    return await Promise.all(txs.map(tx => this.getTransaction(tx)));
  }

  async getBlockRange(from, to) {
    debug(`Scan ${this.CODE} block from ${from} to ${to}`);
    const all = [];
    for (let i = from; i <= to - 1; i += 1) {
      all.push(this.getBlock(i));
    }
    const blocks = await Promise.all(all);
    await this.saveCurrentBlockScan(to);

    return blocks;
  }

  async saveCurrentBlockScan(block) {
    return await latestBlock.findOneAndUpdate({ name: this.CODE }, { block });
  }

  async getLatestBlock() {
    const latestBlockOb = await latestBlock.findOne({ name: this.CODE });
    if (!latestBlockOb) {
      await latestBlock.create({
        name: this.CODE,
        block: configs[this.CODE.toLowerCase()].block_default,
        latest_block: configs[this.CODE.toLowerCase()].block_default
      });
    }

    const latestBlockNumber = await this.getBlockNumber();
    if (latestBlockOb.latest_block != latestBlockNumber) {
      debug(`Update ${this.CODE} latest block ->>>> ${latestBlockNumber}`);
      await latestBlock.findOneAndUpdate(
        { name: this.CODE },
        { latest_block: latestBlockNumber }
      );
    }

    return latestBlockNumber;
  }

  async transformTxsToCallWebhook(txs) {
    debug(`Transform done transation ${txs.length} of block.`);
    const transformTxs = txs.map(tx => this.transformDataTransaction(tx));
    const accounts = await this.ADDRESS_MODEL.find({});
    try {
      for (let acc of accounts) {
        const txFilter = transformTxs.filter(tx => tx.to === acc.address);
        if (txFilter.length > 0) {
          debug(`Save to deposit transaction to ${acc.address}`);
          /** Save to deposit collection */
          await this.DEPOSIT_MODEL.create(txFilter);
          /** Save to tx log */
          /** Call webhook */
          await webhook({
            url: configs.defaultConfig.webhook_url,
            data: txFilter
          });
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async doDeposit() {
    /** Get latest block */
    const latestBlockNumber = await this.getLatestBlock();
    const scanBlock = await latestBlock.findOne({ name: this.CODE });
    const from =
      scanBlock.block || configs[this.CODE.toLowerCase()].block_default;
    const to =
      from + configs.defaultConfig.block_per_time > latestBlockNumber
        ? latestBlockNumber
        : from + configs.defaultConfig.block_per_time;
    if (from == to) {
      debug("Scaned to newest block. Waiting for new block ...");
      return;
    }
    const blocks = await this.getBlockRange(from, to);
    /** Get all transaction detail of all blocks */
    let txs = await this.getAllTransactionFromBlocks(blocks);
    /**
     * Call webhook and update webhook collection
     * Save to deposit collection
     */
    await this.transformTxsToCallWebhook(_.flattenDepth(txs));
  }

  async start() {
    await this.doDeposit();
  }
}
