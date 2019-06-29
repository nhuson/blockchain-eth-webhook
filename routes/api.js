import { Router } from "express";
import pickHandler from "../lib/handlerRoute";
const router = Router();

router.get("/eth/address", pickHandler("EthController@createAddress"));

export default router;
