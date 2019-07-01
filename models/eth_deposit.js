import { Schema, model } from "mongoose";

const EthDepositSchema = new Schema(
  {
    code: {
      type: String,
      require: true
    },
    block_number: {
      type: Number,
      require: true
    },
    block_hash: {
      type: String,
      require: false
    },
    from: {
      type: String,
      require: true
    },
    to: {
      type: String,
      require: true
    },
    tx_hash: {
      type: String,
      require: true
    },
    balance: {
      type: Number,
      require: true
    },
    gas: {
      type: Number,
      require: true
    },
    tx_nonce: {
      type: Number,
      require: true
    },
    status: {
      type: String,
      require: true,
      default: "PENDING"
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const EthAddress = model("eth_deposit", EthDepositSchema);

export default EthAddress;
