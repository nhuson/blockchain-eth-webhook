require("dotenv").config({ path: ".env" });
import { runDeposit } from "./services/DepositService";
import mongoose from "./lib/mongoose";
/** Connect to mongoo */

mongoose().then(() => runDeposit());
