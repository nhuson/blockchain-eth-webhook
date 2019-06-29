import BaseController from "./BaseController";
import * as ethService from "../coins/eth/EthService";
import EthAddressModel from "../models/eth_address";
import * as configs from "../configs";

export default class EthController extends BaseController {
  constructor() {
    super();
    this.model = EthAddressModel;
  }

  async createAddress(req, res, next) {
    try {
      const account = await ethService.createAddress();
      await this.create({
        code: configs.eth.coin,
        address: account.address,
        private_key: account.privateKey
      });

      res.status(200).json({
        success: true,
        address: account.address,
        private_key: account.privateKey,
        message: "Create ETH address successfully."
      });
    } catch (err) {
      next(err);
    }
  }
}
