import express from "express";
import {getRackList, Login} from "../controllers/Rack.js"

const router = express.Router();

router.get('/racklist', getRackList);
router.post('/login', Login);


export default router;