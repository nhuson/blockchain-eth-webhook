import DepositManager from "../core/BaseDepositManager";
import EthDeposit from "../coins/eth/EthDeposit";
const Deposit = new DepositManager();
const ethDeposit = new EthDeposit();

export const runDeposit = async () => {
  Deposit.start(ethDeposit);
};
