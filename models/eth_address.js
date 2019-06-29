import { Schema, model } from "mongoose";

const EthAdressSchema = new Schema(
  {
    code: {
      type: String,
      require: true
    },
    address: {
      type: String,
      require: true
    },
    private_key: {
      type: String,
      require: true
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const EthAddress = model("latest_block", EthAdressSchema);

export default EthAddress;
