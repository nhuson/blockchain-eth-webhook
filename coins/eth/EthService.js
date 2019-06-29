const debug = require("debug")("Service:ETH");
import web3 from "./index";

export const createAddress = async () => web3.eth.accounts.create();
