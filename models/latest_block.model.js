import { Schema, model } from "mongoose";

const LatestBlockSchema = new Schema(
  {
    name: {
      type: String,
      require: true
    },
    block: {
      type: Number,
      require: true
    },
    latest_block: {
      type: Number,
      require: true
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const LatestBlock = model("latest_block", LatestBlockSchema);

export default LatestBlock;
