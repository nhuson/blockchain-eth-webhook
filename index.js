require("dotenv").config({ path: ".env" });
import { runDeposit } from "./services/DepositService";

runDeposit();
