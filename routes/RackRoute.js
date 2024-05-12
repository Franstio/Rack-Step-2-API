import express from "express";
import {getRackList} from "../controllers/Rack.js"

const router = express.Router();

router.get('/racklist', getRackList);


export default router;