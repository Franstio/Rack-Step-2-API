import express from "express";
import {getRackList, Login} from "../controllers/Rack.js"
import { SaveTransaksiRack } from "../controllers/Employee.js";

const router = express.Router();

router.get('/racklist', getRackList);
router.post('/login', Login);
router.post('/Transaksi',SaveTransaksiRack);

export default router;